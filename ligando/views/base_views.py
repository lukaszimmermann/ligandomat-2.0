from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func, distinct, String
import simplejson as json

from ligando.models import (
    DBSession,
    Source,
    MsRun,
    Protein,
    HlaType,
    t_hla_map,
    SpectrumHit,
    t_spectrum_protein_map)
from ligando.views.view_helper import conn_err_msg, js_list_creator, js_list_creator_dataTables


@view_config(route_name='source', renderer='../templates/base_templates/source.pt', request_method="GET")
def source_page(request):
    try:
        # Catch if there are no peptides!!
        query = DBSession.query(func.count(SpectrumHit.spectrum_hit_id).label("count_hits"),
                                func.count(SpectrumHit.sequence.distinct()).label("count_pep"),
                                func.count(Protein.name.distinct()).label("count_prot")
                                )
        query = query.join(Source)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(Source.patient_id == request.matchdict["source"])
        statistics = json.dumps(query.all())

        query = DBSession.query(Source.histology, Source.patient_id, Source.organ,
                                Source.comment, Source.dignity, Source.celltype, Source.location,
                                Source.metastatis, Source.person, Source.organism,
                                func.group_concat(
                                    (HlaType.hla_string.distinct().op('order by')(HlaType.hla_string))).label(
                                    'hla_typing')
                                )
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(Source.patient_id == request.matchdict["source"])
        query = query.group_by(Source.patient_id)
        metadata = json.dumps(query.all())





        query = DBSession.query(MsRun.ms_run_id, MsRun.filename).join(Source).filter(
            Source.patient_id == request.matchdict["source"])
        runs = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"statistic": statistics, "metadata" : metadata, "runs": runs, "source": request.matchdict["source"]}


@view_config(route_name='hla', renderer='../templates/base_templates/hla.pt', request_method="GET")
def hla_page(request):
    try:
        query = DBSession.query(Source.organ,
                                Source.histology, Source.patient_id)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(HlaType.hla_string == request.matchdict["hla"])
        # * --> %2A cause * is reserved character
        # : --> %3A
        sources = json.dumps(query.all())

        query = DBSession.query(func.count(SpectrumHit.sequence.distinct()).label("pep_count"))
        query = query.join(Source)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(HlaType.hla_string == request.matchdict["hla"])
        statistic = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"sources": sources, "hla": request.matchdict["hla"], "statistic": statistic}


@view_config(route_name='msrun', renderer='../templates/base_templates/msrun.pt', request_method="GET")
def msrun_page(request):
    try:
        query = DBSession.query(func.count(SpectrumHit.spectrum_hit_id).label("count_hits"),
                                func.count(SpectrumHit.sequence.distinct()).label("count_pep"),
                                func.count(Protein.name.distinct()).label("count_prot")
                               )

        query = query.join(MsRun, SpectrumHit.ms_run_ms_run_id == MsRun.ms_run_id)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(MsRun.ms_run_id == request.matchdict["msrun"])
        statistics = json.dumps(query.all())

        query = DBSession.query(MsRun.filename,
                                func.group_concat(
                                    (HlaType.hla_string.distinct().op('order by')(HlaType.hla_string))).label(
                                    'hla_typing'),
                                Source.histology,Source.source_id, Source.patient_id, Source.organ,
                                Source.comment, Source.dignity, Source.celltype, Source.location,
                                Source.metastatis, Source.person, Source.organism,
                                func.cast(MsRun.ms_run_date, String).label("ms_run_date"), MsRun.used_share,
                                MsRun.comment.label("msrun_comment"),
                                MsRun.sample_mass, MsRun.sample_volume, MsRun.antibody_set,
                                MsRun.antibody_mass)
        query = query.join(Source)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(MsRun.ms_run_id == request.matchdict["msrun"])
        metadata = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"statistics": statistics, "metadata": metadata, "msrun": request.matchdict["msrun"]}


@view_config(route_name='protein', renderer='../templates/base_templates/protein.pt', request_method="GET")
def protein_page(request):
    try:
        query = DBSession.query(Protein.name,
                                Protein.organism,
                                Protein.description,
                                Protein.sequence,
                                Protein.gene_name)
        query = query.filter(Protein.name == request.matchdict["protein"])
        temp_statistics = query.all()
        statistics = json.dumps(temp_statistics)
        query = DBSession.query(SpectrumHit.sequence.distinct())
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(Protein.name == request.matchdict["protein"])
        sequences = query.all()
        # print sequences
        sequence_start = list()
        sequence_end = list()
        for seq in sequences:
            pos = temp_statistics[0][3].find(seq[0])
            if pos > -1:
                sequence_start.append(pos)
                sequence_end.append(pos + len(seq[0]))
        sequence_start = json.dumps(sequence_start)
        sequence_end = json.dumps(sequence_end)
        sequences = js_list_creator_dataTables(sequences)

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"statistics": statistics,
            "protein": request.matchdict["protein"],
            "sequence_start": sequence_start, "sequence_end": sequence_end, "sequences": sequences}


@view_config(route_name='organ', renderer='../templates/base_templates/organ.pt', request_method="GET")
def organ_page(request):
    try:
        query = DBSession.query(Source.organ,
                                Source.histology, Source.patient_id)
        query = query.filter(Source.organ == request.matchdict["organ"])
        sources = json.dumps(query.all())

        query = DBSession.query(func.count(SpectrumHit.sequence.distinct()).label("pep_count"))
        query = query.join(Source)
        query = query.filter(Source.organ == request.matchdict["organ"])
        statistic = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"sources": sources, "organ": request.matchdict["organ"], "statistic": statistic}


@view_config(route_name='person', renderer='../templates/base_templates/person.pt', request_method="GET")
def person_page(request):
    try:
        # TODO: update!
        query = DBSession.query(Source.histology, Source.patient_id, Source.organ,
                                Source.comment, Source.dignity, Source.celltype, Source.location,
                                Source.metastatis, Source.person, Source.organism)
        query = query.filter(Source.person == request.matchdict["person"])
        sources = json.dumps(query.all())

        query = DBSession.query(MsRun.ms_run_id, MsRun.filename).join(Source).filter(
            Source.person == request.matchdict["person"])
        runs = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"sources": sources, "runs": runs, "person": request.matchdict["person"]}


@view_config(route_name='peptide', renderer='../templates/base_templates/peptide.pt', request_method="GET")
def peptide_page(request):
    try:
        query = DBSession.query(Protein.name.label("protein"), Protein.gene_name.label("gene_name"))
        query = query.join(t_spectrum_protein_map)
        query = query.join(SpectrumHit)
        query = query.filter(SpectrumHit.sequence == request.matchdict["peptide"])
        query = query.group_by(Protein.name)
        proteins = json.dumps(query.all())

        query = DBSession.query(Source.patient_id)
        query = query.join(SpectrumHit)
        query = query.filter(SpectrumHit.sequence == request.matchdict["peptide"])
        query = query.group_by(Source.patient_id)
        sources = js_list_creator_dataTables(query.all())


    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"proteins": proteins, "sources": sources,
            "peptide": request.matchdict["peptide"]}


@view_config(route_name='histology', renderer='../templates/base_templates/histology.pt', request_method="GET")
def histology_page(request):
    try:
        query = DBSession.query(Source.organ,
                                Source.histology, Source.patient_id)
        query = query.filter(Source.histology == request.matchdict["histology"])
        sources = json.dumps(query.all())

        query = DBSession.query(func.count(SpectrumHit.sequence.distinct()).label("pep_count"))
        query = query.join(Source)
        query = query.filter(Source.histology == request.matchdict["histology"])
        statistic = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"sources": sources, "histology": request.matchdict["histology"], "statistic": statistic}


@view_config(route_name='celltype', renderer='../templates/base_templates/celltype.pt', request_method="GET")
def celltype_page(request):
    try:
        query = DBSession.query(Source.organ,
                                Source.histology, Source.patient_id)
        query = query.filter(Source.celltype == request.matchdict["celltype"])
        sources = json.dumps(query.all())

        query = DBSession.query(func.count(SpectrumHit.sequence.distinct()).label("pep_count"))
        query = query.join(Source)
        query = query.filter(Source.celltype == request.matchdict["celltype"])
        statistic = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"sources": sources, "celltype": request.matchdict["celltype"], "statistic": statistic}


@view_config(route_name='dignity', renderer='../templates/base_templates/dignity.pt', request_method="GET")
def dignity_page(request):
    try:
        query = DBSession.query(Source.organ,
                                Source.histology, Source.patient_id)
        query = query.filter(Source.dignity == request.matchdict["dignity"])
        sources = json.dumps(query.all())

        query = DBSession.query(func.count(SpectrumHit.sequence.distinct()).label("pep_count"))
        query = query.join(Source)
        query = query.filter(Source.dignity == request.matchdict["dignity"])
        statistic = json.dumps(query.all())
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"sources": sources, "dignity": request.matchdict["dignity"], "statistic": statistic}