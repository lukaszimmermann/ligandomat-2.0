__author__ = 'Linus Backert'
from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func
from sqlalchemy.exc import DBAPIError
import simplejson as json
from sqlalchemy import or_

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
    SpectrumHit,
    t_spectrum_protein_map)
from ligando.views.view_helper import  conn_err_msg, create_filter



@view_config(route_name='multi_peptide', renderer='../templates/multi_peptide.pt', request_method="GET")
def multi_peptide(request):
    return dict()


@view_config(route_name='multi_peptide', renderer='../templates/multi_peptide.pt', request_method="POST")
def multi_peptide_result(request):
    if request.params["peptide_input"] != '':
        split_peptides = request.params["peptide_input"].split("\r\n")

        query = DBSession.query(HlaType.hla_string, func.count(Source.source_id).label("source_count"))
        query = query.join(HlaLookup)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.group_by(HlaType.hla_string)
        source_count = query.all()


        query = DBSession.query(SpectrumHit.sequence,
                                Source.name.label("name"),
                                HlaType.hla_string.label("hla"))
        query = query.join(Source)
        query = query.join(HlaLookup)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        temp_code = "query = query.filter(or_("
        for pep in split_peptides:
            #query = query.filter(SpectrumHit.sequence.like(pep))
            temp_code += "SpectrumHit.sequence.like('%s')," % pep
        temp_code = temp_code.strip(",")
        temp_code += "))"
        exec temp_code
        result = query.all()
        # iterate over result and count each HLA
        # TODO: maybe query first only the hla and then get also the source name and a distinct hla for each peptide
        hla_dict = dict()
        for r in result:
            if r[2] in hla_dict:
                hla_dict[r[2]] += 1
            else:
                hla_dict[r[2]] = 1

        print hla_dict
    return dict()

