import ast
import datetime
from pyramid.httpexceptions import HTTPFound, exception_response
from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func, distinct, String
from sqlalchemy.exc import DBAPIError
import simplejson as json
from sqlalchemy.orm import class_mapper, aliased

from ligando.models import (
    DBSession,
    Source,
    MsRun,
    PeptideRun,
    Protein,
    HlaType,
    HlaLookup,
    t_hla_map,
    t_peptide_protein_map,
    t_peptide_run_spectrum_hit_map,
    SpectrumHit,
    t_spectrum_protein_map)
from ligando.views.view_helper import js_list_creator, conn_err_msg, create_filter


@view_config(route_name='home', renderer='../templates/home.pt')
def my_view(request):
    try:
        result_dict = dict()
        allowed_elements = {"source_names": Source.name, "organ": Source.organ,
                            "organism": Source.organism, "histology": Source.histology, "dignity": Source.dignity,
                            "celltype": Source.celltype, "location": Source.location, "metastatis": Source.metastatis,
                            "person": Source.person, "typing": HlaType.hla_string}

        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result

        result_dict["orphan_msrun_count"] = \
            DBSession.query(func.count(distinct(MsRun.filename))).filter(MsRun.source_source_id is None).one()[0]
        result_dict["all_msrun_count"] = DBSession.query(func.count(distinct(MsRun.filename))).one()[0]
        result_dict["sources_count"] = DBSession.query(func.count(distinct(Source.name))).one()[0]
        # TODO: activate the filter, if there are finally orphan runs
        # result_dict["orphan_msrun"] = js_list_creator(
        # DBSession.query(distinct(MsRun.filename)).filter(MsRun.source_source_id is None).all())
        result_dict["orphan_msrun"] = js_list_creator(
            DBSession.query(distinct(MsRun.filename)).order_by(MsRun.filename.desc()).limit(10).all())

        return result_dict
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)

