from pyramid.httpexceptions import HTTPFound

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
    t_hla_map,
    t_peptide_protein_map,
    SpectrumHit,
    t_spectrum_protein_map, Binding_prediction, Peptide_query)
from ligando.views.view_helper import conn_err_msg, create_filter, js_list_creator


# peptide Query GET
@view_config(route_name='peptide_query', renderer='../templates/peptide_query.pt', request_method="GET")
def peptide_query(request):
    # patient_id
    query = DBSession.query(Source.patient_id.distinct()).order_by(Source.patient_id)
    patient_id = js_list_creator(query.all())
    # antibodys
    query = DBSession.query(MsRun.antibody_set.distinct())
    antibody = js_list_creator(query.all())
    # dignity
    query = DBSession.query(Source.dignity.distinct()).order_by(Source.dignity)
    dignity = js_list_creator(query.all())
    # organ
    query = DBSession.query(Source.organ.distinct()).order_by(Source.organ)
    organ = js_list_creator(query.all())
    # histology
    query = DBSession.query(Source.histology.distinct()).order_by(Source.histology)
    histology = js_list_creator(query.all())
    # celltype
    query = DBSession.query(Source.celltype.distinct()).order_by(Source.celltype)
    celltype = js_list_creator(query.all())
    # celltype
    query = DBSession.query(HlaType.hla_string.distinct()).order_by(HlaType.hla_string)
    hla = js_list_creator(query.all())
    # treatment
    query = DBSession.query(Source.treatment.distinct()).order_by(Source.treatment)
    treatment = js_list_creator(query.all())

    return {"antibody": antibody, "dignity": dignity, "organ": organ, "histology": histology, "celltype": celltype,
            "hla": hla, 'patient_id':patient_id, 'treatment':treatment}


# peptide Query POST
@view_config(route_name='peptide_query', renderer='../templates/peptide_query_result.pt', request_method="POST")
def peptide_query_result(request):
    # BUG: Query incorrect for hla!!!
    # Check if one of these parameters is set, if not forward to peptide_query page
    params_check_dict = ['sequence',
                         'source_id',
                         'patient_id',
                         'run_name',
                         'organ',
                         'histology',
                         'dignity',
                         'hla_typing',
                         'protein',
                         'length_1', 'length_2',
                         'antibody',
                         'celltype',
                         'treatment']
    input_check = False
    for param in params_check_dict:
        if param in request.params:
            if len(request.params[param]) > 0:
                input_check = True

    # if there is no input forward to peptide_query
    if not input_check:
        raise HTTPFound(request.route_url("peptide_query"))

    #try:
    query = DBSession.query(Peptide_query.sequence.distinct().label("sequence"),
                            Peptide_query.proteins.label(
                                "protein"),
                            Peptide_query.tissues.label(
                                "tissue"),
                            Peptide_query.hla_types.label(
                                'hla_typing'))
    query = query.join(PeptideRun, PeptideRun.sequence == Peptide_query.sequence)
    query = query.join(Source)
    query = query.join(MsRun, PeptideRun.ms_run_ms_run_id == MsRun.ms_run_id)
    query = query.join(t_hla_map)
    query = query.join(HlaType)
    query = query.join(t_peptide_protein_map)
    query = query.join(Protein)
    query = query.join(Binding_prediction, Binding_prediction.sequence== PeptideRun.sequence)

    # filter
    query = create_filter(query, 'sequence', request.params, "sequence", PeptideRun, 'sequence_rule', True,
                          set=False)
    query = create_filter(query, 'patient_id', request.params, "patient_id", Source, 'patient_id_rule', True, set=False)
    query = create_filter(query, 'source_id', request.params, "source_id", Source, 'source_id_rule', True,
                          set=False)
    query = create_filter(query, 'run_name', request.params, "filename", MsRun, 'run_name_rule', True,
                          set=False)
    query = create_filter(query, 'organ', request.params, "organ", Source, 'organ_rule', False, set=False)
    query = create_filter(query, 'histology', request.params, "histology", Source, 'histology_rule', False,
                          set=False)
    query = create_filter(query, 'dignity', request.params, "dignity", Source, 'dignity_rule', False, set=False)
    query = create_filter(query, 'hla_typing', request.params, "hla_string", HlaType, 'hla_typing_rule', False,
                          set=False) # TODO: check if it works withou fk,
                          #fk=HlaLookup.fk_hla_typess)

    query = query.filter(Binding_prediction.binder == 1)
    #if "hla_typing" in request.params:
    query = query.filter(Binding_prediction.hla_type_hla_type_id == HlaType.hla_type_id)

    query = create_filter(query, 'digits', request.params, 'digits', HlaType, None, False, set=False)
    query = create_filter(query, 'protein', request.params, "name", Protein, 'protein_rule', False, set=False,
                          fk=PeptideRun.protein_proteins)
    query = create_filter(query, 'length_1', request.params, 'length', PeptideRun, ">", False, set=False)
    query = create_filter(query, 'length_2', request.params, 'length', PeptideRun, "<", False, set=False)
    query = create_filter(query, 'antibody', request.params, "antibody_set", MsRun, 'antibody_rule', False,
                          set=True)
    query = create_filter(query, 'celltype', request.params, "celltype", Source, 'celltype_rule', False,
                          set=False)
    query = create_filter(query, 'treatment', request.params, "treatment", Source, 'treatment_rule', False,
                          set=False)
    #sequences = query.all()

    # TODO: create static table with precomputed content
    # query = DBSession.query(Peptide_query.sequence,
    #                         Peptide_query.proteins.label(
    #                             "protein"),
    #                         Peptide_query.tissues.label(
    #                             "tissue"),
    #                         Peptide_query.hla_types.label(
    #                             'hla_typing'))
    #
    # query = query.filter(or_(*[ Peptide_query.sequence == s[0] for s in sequences]))
    result = json.dumps(query.all())


    grouping = "peptide"
    #except DBAPIError:
    #    return Response(conn_err_msg, content_type='text/plain', status_int=500)
    # MS run group by


    return {'project': result, 'grouping': grouping}

