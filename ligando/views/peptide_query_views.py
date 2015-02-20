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
from ligando.views.view_helper import conn_err_msg, create_filter



@view_config(route_name='peptide_query', renderer='../templates/peptide_query.pt', request_method="GET")
def peptide_query(request):
    return dict()


@view_config(route_name='peptide_query', renderer='../templates/peptide_query_result.pt', request_method="POST")
def peptide_query_result(request):
    params_check_dict = ['sequence', 'sequence_rule',
                         'source', 'source_rule',
                         'run_name', 'run_name_rule',
                         'organ', 'organ_rule',
                         'histology', 'histology_rule',
                         'dignity', 'dignity_rule',
                         'hla_typing', 'hla_typing_rule',
                         'digits',
                         'protein', 'protein_rule',
                         'length_1', 'length_2',
                         'antibody', 'antibody_rule']
    input_check = False
    filter_dict = dict()
    for param in params_check_dict:
        if (param in request.params):
            if len(request.params[param]) > 0:
                filter_dict[param] = request.params[param]
                input_check = True
            else:
                filter_dict[param] = request.params[param]
        else:
            filter_dict[param] = ""

    # TODO: sort group_concat items before concat
    if request.params['grouping'] == "peptide":
        try:
            query = DBSession.query(PeptideRun.sequence,
                                    func.group_concat(Protein.name.distinct().op('separator')(', ')).label("protein"),
                                    func.group_concat(Source.histology.distinct().op('separator')(', ')).label("name"),
                                    #func.group_concat((HlaType.hla_string.distinct().op('order by')(HlaType.hla_string)).op('separator')(', ')).label('hla_typing'))
            func.group_concat(HlaType.hla_string.distinct().op('separator')(', ')).label(
                                         'hla_typing'))
            query = query.join(Source)
            query = query.join(MsRun, PeptideRun.ms_run_ms_run_id == MsRun.ms_run_id)
            query = query.join(HlaLookup)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(t_peptide_protein_map)
            query = query.join(Protein)

            # Sequence filter
            query = create_filter(query, 'sequence', filter_dict, "sequence", PeptideRun, 'sequence_rule', True, set=False)
            query = create_filter(query, 'source', filter_dict, "name", Source, 'source_rule', True, set=False)
            query = create_filter(query, 'run_name', filter_dict, "filename", MsRun, 'run_name_rule', True, set=False)
            query = create_filter(query, 'organ', filter_dict, "organ", Source, 'organ_rule', False, set=False)
            query = create_filter(query, 'histology', filter_dict, "histology", Source, 'histology_rule', False, set=False)
            query = create_filter(query, 'dignity', filter_dict, "dignity", Source, 'dignity_rule', False, set=False)
            query = create_filter(query, 'hla_typing', filter_dict, "hla_string", HlaType, 'hla_typing_rule', False, set=False,
                                  fk=HlaLookup.fk_hla_typess)
            query = create_filter(query, 'digits', filter_dict, 'digits', HlaType, None, False, set=False)
            query = create_filter(query, 'protein', filter_dict, "name", Protein, 'protein_rule', False, set=False,
                                  fk=PeptideRun.protein_proteins)
            query = create_filter(query, 'length_1', filter_dict, 'length', PeptideRun, ">", False, set=False)
            query = create_filter(query, 'length_2', filter_dict, 'length', PeptideRun, "<", False, set=False)
            query = create_filter(query, 'antibody', filter_dict, "antibody_set", MsRun, 'antibody_rule', False, set=True)


            query = query.group_by(PeptideRun.sequence)

            your_json = json.dumps(query.all())
            grouping = "peptide"
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
    elif request.params['grouping'] == "run":
        try:
            query = DBSession.query(PeptideRun.peptide_run_id,
                                    PeptideRun.sequence, PeptideRun.minRT, PeptideRun.maxRT,
                                    PeptideRun.minScore, PeptideRun.maxScore, PeptideRun.minE, PeptideRun.maxE,
                                    PeptideRun.minQ, PeptideRun.maxQ, PeptideRun.PSM,
                                    func.group_concat(HlaType.hla_string.distinct().op('separator')(', ')).label('hla_typing'),
                                    func.group_concat(Protein.name.distinct().op('separator')(', ')).label("protein"),
                                    Source.histology, Source.name, MsRun.filename)
            query = query.join(Source)
            query = query.join(MsRun, PeptideRun.ms_run_ms_run_id == MsRun.ms_run_id)
            query = query.join(HlaLookup)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(t_peptide_protein_map)
            query = query.join(Protein)

            # Sequence filter
            query = create_filter(query, 'sequence', filter_dict, "sequence", PeptideRun, 'sequence_rule', True, set=False)
            query = create_filter(query, 'source', filter_dict, "name", Source, 'source_rule', True, set=False)
            query = create_filter(query, 'run_name', filter_dict, "filename", MsRun, 'run_name_rule', True, set=False)
            query = create_filter(query, 'organ', filter_dict, "organ", Source, 'organ_rule', False, set=False)
            query = create_filter(query, 'histology', filter_dict, "histology", Source, 'histology_rule', False, set=False)
            query = create_filter(query, 'dignity', filter_dict, "dignity", Source, 'dignity_rule', False, set=False)
            query = create_filter(query, 'hla_typing', filter_dict, "hla_string", HlaType, 'hla_typing_rule', False, set=False,
                                  fk=HlaLookup.fk_hla_typess)
            query = create_filter(query, 'digits', filter_dict, 'digits', HlaType, None, False, set=False)

            query = create_filter(query, 'protein', filter_dict, "name", Protein, 'protein_rule', False, set=False,
                                  fk=PeptideRun.protein_proteins)
            query = create_filter(query, 'length_1', filter_dict, 'length', PeptideRun, ">", False, set=False)
            query = create_filter(query, 'length_2', filter_dict, 'length', PeptideRun, "<", False, set=False)
            query = create_filter(query, 'antibody', filter_dict, "antibody_set", MsRun, 'antibody_rule', False, set=True)

            query = query.group_by(PeptideRun.peptide_run_id)
            your_json = json.dumps(query.all())
            grouping = "run"
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
    elif request.params['grouping'] == "source":
        try:
            query = DBSession.query(PeptideRun.peptide_run_id,
                                    PeptideRun.sequence,
                                    func.min(PeptideRun.minRT).label("minRT"),
                                    func.max(PeptideRun.maxRT).label("maxRT"),
                                    func.min(PeptideRun.minScore).label("minScore"),
                                    func.max(PeptideRun.maxScore).label("maxScore"),
                                    func.min(PeptideRun.minE).label("minE"),
                                    func.max(PeptideRun.maxE).label("maxE"),
                                    func.min(PeptideRun.minQ).label("minQ"),
                                    func.max(PeptideRun.maxQ).label("maxQ"),
                                    func.group_concat(HlaType.hla_string.distinct().op('separator')(', ')).label(
                                        'hla_typing'),
                                    func.group_concat(Protein.name.distinct().op('separator')(', ')).label("protein"),
                                    Source.histology, Source.name.label("source_name"))
            query = query.join(Source)
            query = query.join(MsRun, PeptideRun.ms_run_ms_run_id == MsRun.ms_run_id)
            query = query.join(HlaLookup)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(t_peptide_protein_map)
            query = query.join(Protein)

            # Sequence filter
            query = create_filter(query, 'sequence', filter_dict, "sequence", PeptideRun, 'sequence_rule', True, set=False)
            query = create_filter(query, 'source', filter_dict, "name", Source, 'source_rule', True, set=False)
            query = create_filter(query, 'run_name', filter_dict, "filename", MsRun, 'run_name_rule', True, set=False)
            query = create_filter(query, 'organ', filter_dict, "organ", Source, 'organ_rule', False, set=False)
            query = create_filter(query, 'histology', filter_dict, "histology", Source, 'histology_rule', False, set=False)
            query = create_filter(query, 'dignity', filter_dict, "dignity", Source, 'dignity_rule', False, set=False)
            query = create_filter(query, 'hla_typing', filter_dict, "hla_string", HlaType, 'hla_typing_rule', False, set=False,
                                  fk=HlaLookup.fk_hla_typess)
            query = create_filter(query, 'digits', filter_dict, 'digits', HlaType, None, False, set=False)
            query = create_filter(query, 'protein', filter_dict, "name", Protein, 'protein_rule', False, set=False,
                                  fk=PeptideRun.protein_proteins)
            query = create_filter(query, 'length_1', filter_dict, 'length', PeptideRun, ">", False, set=False)
            query = create_filter(query, 'length_2', filter_dict, 'length', PeptideRun, "<", False, set=False)
            query = create_filter(query, 'antibody', filter_dict, "antibody_set", MsRun, 'antibody_rule', False, set=True)

            query = query.group_by(Source.source_id, PeptideRun.sequence)

            your_json = json.dumps(query.all())
            grouping = "source"
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
    elif request.params['grouping'] == "source_psm":
        try:
            query = DBSession.query(
                SpectrumHit.sequence,
                func.min(SpectrumHit.ionscore).label("minScore"),
                func.max(SpectrumHit.ionscore).label("maxScore"),
                func.min(SpectrumHit.e_value).label("minE"),
                func.max(SpectrumHit.e_value).label("maxE"),
                func.min(SpectrumHit.q_value).label("minQ"),
                func.max(SpectrumHit.q_value).label("maxQ"),
                func.count(SpectrumHit.spectrum_hit_id.distinct()).label("PSM"),
                func.group_concat(HlaType.hla_string.distinct().op('separator')(', ')).label('hla_typing'),
                func.group_concat(Protein.name.distinct().op('separator')(', ')).label("protein"),
                Source.histology, Source.name.label("source_name"))
            query = query.join(Source)
            query = query.join(MsRun, SpectrumHit.ms_run_ms_run_id == MsRun.ms_run_id)
            query = query.join(HlaLookup)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(t_spectrum_protein_map)
            query = query.join(Protein)

            # Sequence filter
            query = create_filter(query, 'sequence', filter_dict, "sequence", SpectrumHit, 'sequence_rule', True, set=False)
            query = create_filter(query, 'source', filter_dict, "name", Source, 'source_rule', True, set=False)
            query = create_filter(query, 'run_name', filter_dict, "filename", MsRun, 'run_name_rule', True, set=False)
            query = create_filter(query, 'organ', filter_dict, "organ", Source, 'organ_rule', False, set=False)
            query = create_filter(query, 'histology', filter_dict, "histology", Source, 'histology_rule', False, set=False)
            query = create_filter(query, 'dignity', filter_dict, "dignity", Source, 'dignity_rule', False, set=False)
            query = create_filter(query, 'hla_typing', filter_dict, "hla_string", HlaType, 'hla_typing_rule', False, set=False,
                                  fk=HlaLookup.fk_hla_typess)
            query = create_filter(query, 'digits', filter_dict, 'digits', HlaType, None, False, set=False)
            query = create_filter(query, 'protein', filter_dict, "name", Protein, 'protein_rule', False, set=False,
                                  fk=SpectrumHit.protein_proteins)
            query = create_filter(query, 'length_1', filter_dict, 'length', SpectrumHit, ">", False, set=False)
            query = create_filter(query, 'length_2', filter_dict, 'length', SpectrumHit, "<", False, set=True)

            query = query.group_by(Source.source_id, SpectrumHit.sequence)

            your_json = json.dumps(query.all())
            grouping = "source_psm"
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)

    return {'project': your_json, 'grouping': grouping}

