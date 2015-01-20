import ast
import datetime
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func, or_
from sqlalchemy.dialects.postgresql import json
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy.exc import DBAPIError
import simplejson as json
from sqlalchemy.orm import class_mapper, aliased

from .models import (
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


@view_config(route_name='home', renderer='templates/base_layout.pt')
def my_view(request):
    try:
        # one = DBSession.query(MyModel).filter(MyModel.name == 'one').first()
        one = 1
    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'one': one, 'project': 'ligando'}


@view_config(route_name='source_overview', renderer='templates/source_info.pt')
def source_overview(request):
    try:
        serialized_labels = [
            serialize(label, ['name', 'dignity', 'celltype', 'histology', 'location', 'metastatis', 'person', 'organ',
                              'organism'])
            for label in
            DBSession.query(Source.name, Source.dignity, Source.celltype, Source.histology, Source.location,
                            Source.metastatis, Source.person, Source.organ, Source.organism)
        ]
        your_json = json.dumps(serialized_labels)
    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'project': your_json}


@view_config(route_name='run_overview', renderer='templates/run_info.pt')
def run_overview(request):
    try:
        serialized_labels = [
            serialize(label, ["filename", "name", "organ", "dignity", "ms_run_date", "antibody_set", "prep_comment",
                              "used_share", "sample_mass"], joined=True)
            for label in DBSession.query(MsRun, Source).filter(Source.source_id == MsRun.source_source_id)
        ]
        your_json = json.dumps(serialized_labels, default=dthandler)
    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'project': your_json}


@view_config(route_name='peptide_query', renderer='templates/peptide_query.pt', request_method="GET")
def peptide_query(request):
    return dict()


@view_config(route_name='peptide_query', renderer='templates/peptide_query_result.pt', request_method="POST")
def peptide_query_result(request):
    params_check_dict = ['sequence', 'source', 'run_name', 'organ', 'histology', 'dignity', 'hla_typing', 'protein', 'length_1', 'length_2']
    input_check = False
    for param in params_check_dict:
        if len(request.params[param]) > 0:
            input_check = True
    if not input_check:
        return HTTPFound(request.route_url('peptide_query'))


    if request.params['grouping'] == "peptide":
        try:
            query = DBSession.query(PeptideRun.sequence, func.group_concat(Protein.name.distinct().op('separator')(', ')),
                                    func.group_concat(Source.histology.distinct().op('separator')(', ')))
            query = query.join(Source)
            query = query.join(MsRun, PeptideRun.ms_run_ms_run_id == MsRun.ms_run_id)
            query = query.join(HlaLookup)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(t_peptide_protein_map)
            query = query.join(Protein)

            # Sequence filter
            query = create_filter(query, 'sequence', request, "sequence", PeptideRun, 'sequence_rule', True)
            query = create_filter(query, 'source', request, "name", Source, 'source_rule', True)
            query = create_filter(query, 'run_name', request, "filename", MsRun, 'run_name_rule', True)
            query = create_filter(query, 'organ', request, "organ", Source, 'organ_rule', False)
            query = create_filter(query, 'histology', request, "histology", Source, 'histology_rule', False)
            query = create_filter(query, 'dignity', request, "dignity", Source, 'dignity_rule', False)
            query = create_filter(query, 'hla_typing', request, "hla_string", HlaType, 'hla_typing_rule', False,
                                  HlaLookup.fk_hla_typess)
            query = create_filter(query, 'protein', request, "name", Protein, 'protein_rule', False,
                                  PeptideRun.protein_proteins)
            query = create_filter(query, 'length_1', request, 'length', PeptideRun, ">", False)
            query = create_filter(query, 'length_2', request, 'length', PeptideRun, "<", False)

            # results = query.all()
            query = query.group_by(PeptideRun.sequence)

            serialized_labels = [
                serialize(label,
                          ["sequence", "name", "histology"],
                          joined=True, specified=True)
                for label in query.all()
            ]
            your_json = json.dumps(serialized_labels, default=dthandler)
            grouping = "peptide"
            # print your_json
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
    #elif: request.params['source_grouping']:
    elif request.params['grouping'] == "run":
        try:
            query = DBSession.query(PeptideRun.peptide_run_id,
                                    PeptideRun.sequence, PeptideRun.minRT, PeptideRun.maxRT,
                                    PeptideRun.minScore, PeptideRun.maxScore, PeptideRun.minE, PeptideRun.maxE,
                                    PeptideRun.minQ, PeptideRun.maxQ, PeptideRun.PSM,
                                    HlaLookup.hla_category, func.group_concat(Protein.name.distinct().op('separator')(', ')),
                                    Source.histology, Source.name, MsRun.filename)
            query = query.join(Source)
            query = query.join(MsRun, PeptideRun.ms_run_ms_run_id == MsRun.ms_run_id)
            query = query.join(HlaLookup)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(t_peptide_protein_map)
            query = query.join(Protein)

            # Sequence filter
            query = create_filter(query, 'sequence', request,"sequence", PeptideRun, 'sequence_rule', True)
            query = create_filter(query, 'source', request, "name", Source, 'source_rule', True)
            query = create_filter(query, 'run_name', request, "filename", MsRun, 'run_name_rule', True)
            query = create_filter(query, 'organ', request, "organ", Source, 'organ_rule', False)
            query = create_filter(query, 'histology', request, "histology", Source, 'histology_rule', False)
            query = create_filter(query, 'dignity', request, "dignity", Source, 'dignity_rule', False)
            query = create_filter(query, 'hla_typing', request, "hla_string", HlaType, 'hla_typing_rule', False, HlaLookup.fk_hla_typess)
            query = create_filter(query, 'protein', request, "name", Protein, 'protein_rule', False, PeptideRun.protein_proteins)
            query = create_filter(query, 'length_1', request, 'length', PeptideRun, ">", False)
            query = create_filter(query, 'length_2', request, 'length', PeptideRun, "<", False)

            #results = query.all()
            query = query.group_by(PeptideRun.peptide_run_id)

            serialized_labels = [
                serialize(label, ["peptide_run_id", "sequence", "minRT", "maxRT", "minScore", "maxScore", "minE", "maxE",
                                  "minQ", "maxQ", "PSM", "hla_category", "name", "histology", "source_name", "filename"], joined=True, specified=True)
                for label in query.all()
            ]
            your_json = json.dumps(serialized_labels, default=dthandler)
            grouping = "run"
            # print your_json
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
    elif request.params['grouping'] == "source":
        try:
            query = DBSession.query(PeptideRun.peptide_run_id,
                                    PeptideRun.sequence, func.min(PeptideRun.minRT), func.max(PeptideRun.maxRT),
                                    func.min(PeptideRun.minScore), func.max(PeptideRun.maxScore),
                                    func.min(PeptideRun.minE), func.max(PeptideRun.maxE),
                                    func.min(PeptideRun.minQ), func.max(PeptideRun.maxQ),
                                    HlaLookup.hla_category,
                                    func.group_concat(Protein.name.distinct().op('separator')(', ')),
                                    Source.histology, Source.name)
            query = query.join(Source)
            query = query.join(MsRun, PeptideRun.ms_run_ms_run_id == MsRun.ms_run_id)
            query = query.join(HlaLookup)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(t_peptide_protein_map)
            query = query.join(Protein)

            # Sequence filter
            query = create_filter(query, 'sequence', request, "sequence", PeptideRun, 'sequence_rule', True)
            query = create_filter(query, 'source', request, "name", Source, 'source_rule', True)
            query = create_filter(query, 'run_name', request, "filename", MsRun, 'run_name_rule', True)
            query = create_filter(query, 'organ', request, "organ", Source, 'organ_rule', False)
            query = create_filter(query, 'histology', request, "histology", Source, 'histology_rule', False)
            query = create_filter(query, 'dignity', request, "dignity", Source, 'dignity_rule', False)
            query = create_filter(query, 'hla_typing', request, "hla_string", HlaType, 'hla_typing_rule', False,
                                  HlaLookup.fk_hla_typess)
            query = create_filter(query, 'protein', request, "name", Protein, 'protein_rule', False,
                                  PeptideRun.protein_proteins)
            query = create_filter(query, 'length_1', request, 'length', PeptideRun, ">", False)
            query = create_filter(query, 'length_2', request, 'length', PeptideRun, "<", False)

            # results = query.all()
            query = query.group_by(Source.source_id, PeptideRun.sequence)

            serialized_labels = [
                serialize(label,
                          ["peptide_run_id", "sequence", "minRT", "maxRT", "minScore", "maxScore", "minE", "maxE",
                           "minQ", "maxQ", "hla_category", "name", "histology", "source_name"],
                          joined=True, specified=True)
                for label in query.all()
            ]
            your_json = json.dumps(serialized_labels, default=dthandler)
            grouping = "source"
            # print your_json
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
    elif request.params['grouping'] == "source_psm":
        try:
            query = DBSession.query(
                                    SpectrumHit.sequence,
                                    func.min(SpectrumHit.ionscore), func.max(SpectrumHit.ionscore),
                                    func.min(SpectrumHit.e_value), func.max(SpectrumHit.e_value),
                                    func.min(SpectrumHit.q_value), func.max(SpectrumHit.q_value),
                                    func.count(SpectrumHit.spectrum_hit_id.distinct()),
                                    HlaLookup.hla_category,
                                    func.group_concat(Protein.name.distinct().op('separator')(', ')),
                                    Source.histology, Source.name)
            query = query.join(Source)
            query = query.join(MsRun, SpectrumHit.ms_run_ms_run_id == MsRun.ms_run_id)
            query = query.join(HlaLookup)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(t_spectrum_protein_map)
            query = query.join(Protein)

            # Sequence filter
            query = create_filter(query, 'sequence', request, "sequence", SpectrumHit, 'sequence_rule', True)
            query = create_filter(query, 'source', request, "name", Source, 'source_rule', True)
            query = create_filter(query, 'run_name', request, "filename", MsRun, 'run_name_rule', True)
            query = create_filter(query, 'organ', request, "organ", Source, 'organ_rule', False)
            query = create_filter(query, 'histology', request, "histology", Source, 'histology_rule', False)
            query = create_filter(query, 'dignity', request, "dignity", Source, 'dignity_rule', False)
            query = create_filter(query, 'hla_typing', request, "hla_string", HlaType, 'hla_typing_rule', False,
                                  HlaLookup.fk_hla_typess)
            query = create_filter(query, 'protein', request, "name", Protein, 'protein_rule', False,
                                  SpectrumHit.protein_proteins)
            query = create_filter(query, 'length_1', request, 'length', SpectrumHit, ">", False)
            query = create_filter(query, 'length_2', request, 'length', SpectrumHit, "<", False)

            # results = query.all()
            query = query.group_by(Source.source_id, SpectrumHit.sequence)

            serialized_labels = [
                serialize(label,
                          ["sequence", "minScore", "maxScore", "minE", "maxE",
                           "minQ", "maxQ", "PSM", "hla_category", "name", "histology", "source_name"],
                          joined=True, specified=True)
                for label in query.all()
            ]
            your_json = json.dumps(serialized_labels, default=dthandler)
            grouping = "source_psm"
            # print your_json
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)

    return {'project': your_json, 'grouping': grouping}


@view_config(route_name='upload_metadata_source', renderer='templates/upload_metadata_source.pt', request_method="GET")
def upload_metadata_source(request):
    try:
        result_dict = dict()
        allowed_elements = {"source_names": Source.name, "organ": Source.organ,
                            "organism": Source.organism, "histology": Source.histology, "dignity": Source.dignity,
                            "celltype": Source.celltype, "location": Source.location, "metastatis": Source.metastatis, "person": Source.person, "typing": HlaType.hla_string}

        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result

        #query = DBSession.query(Source.name)
        #query = query.group_by(Source.name)
        #source_names = js_list_creator(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return result_dict

@view_config(route_name='upload_metadata_source', renderer='templates/base_layout.pt', request_method="POST")
def upload_metadata_source_post(request):
    source_upload = ast.literal_eval( request.params["sources"])

    # TODO: upload all the stuff.................

    return dict()

@view_config(route_name='upload_metadata_ms_run', renderer='templates/base_layout.pt', request_method="GET")
def upload_metadata_ms_run(request):

    return dict()

def js_list_creator(input):
    result_string = '['
    for i in input:
        result_string += '"' + str(i[0]) + '",'
    result_string += ']'
    return result_string

def create_filter(query, parameter, request, sql_object, sql_parent, rule, like, fk=None):
    if len(request.params[parameter]) is not 0:
        split = request.params[parameter].split(';')
        if len(split) > 1:
            if request.params[rule] == "AND":
                for s in range(0,len(split)):
                    if s == 0:
                        if like:
                            query = query.filter(getattr(sql_parent, sql_object).like(split[s]))
                        else:
                            query = query.filter(getattr(sql_parent,sql_object) == split[s])
                    else:
                        a_alias = aliased(sql_parent)
                        query = query.join(a_alias, fk)
                        if like:
                            query = query.filter(getattr(a_alias, sql_object).like(split[s]))
                        else:
                            query = query.filter(getattr(a_alias, sql_object) == split[s])
                        # TODO: add second search to result (e.g. second Protein)
            else:
                temp_code = "query = query.filter(or_("
                for s in split:
                    if like:
                        temp_code += "getattr(sql_parent, sql_object).like(split[s])," %s
                    else:
                        temp_code += "getattr(sql_parent,sql_object) == '%s'," % s
                temp_code = temp_code.strip(",")
                temp_code += "))"
                exec temp_code
                #query.filter(or_(getattr(sql_parent,sql_object) == s for s in split))
        else:
            if rule == ">" or rule == "<":
                if rule == ">":
                    query = query.filter(getattr(sql_parent, sql_object) > split[0])
                else:
                    query = query.filter(getattr(sql_parent, sql_object) < split[0])
            else:
                if like:
                    query = query.filter(getattr(sql_parent, sql_object).like(split[0]))
                else:
                    query = query.filter(getattr(sql_parent, sql_object) == split[0])
    return query


def serialize(model, columns, joined=False, specified=False):
    """Transforms a model into a dictionary which can be dumped to JSON."""
    # first we get the names of all the columns on your model
    if specified:
        result = dict()
        for i in range(0, len(columns)):
            result[columns[i]] = model[i]
        return result
    elif joined:
        result = dict()
        for c in columns:
            for m in model:
                if hasattr(m, c):
                    result[c] = getattr(m, c)
                    continue
        return result

    else:
        if columns is None:
            columns = [c.key for c in class_mapper(model.__class__).columns]
        # then we return their values in a dict
        return dict((c, getattr(model, c)) for c in columns)

# Datetime handler. Allows Json serialization for datetime
dthandler = lambda obj: (
    obj.isoformat()
    if isinstance(obj, datetime.datetime)
       or isinstance(obj, datetime.date)
    else None)

conn_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to run the "initialize_ligando_db" script
    to initialize your database tables.  Check your virtual
    environment's "bin" directory for this script and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""

