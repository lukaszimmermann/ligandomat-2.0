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
    HlaLookup,
    t_hla_map,
    SpectrumHit,
    t_spectrum_protein_map)
from ligando.views.view_helper import conn_err_msg



@view_config(route_name='source', renderer='../templates/source.pt', request_method="GET")
def source_page(request):
    try:
        query = DBSession.query(func.count(SpectrumHit.spectrum_hit_id).label("count_hits"),
                                func.count(SpectrumHit.sequence.distinct()).label("count_pep"),
                                HlaLookup.hla_category,
                                func.count(Protein.name.distinct()).label("count_prot"),
                                Source.histology, Source.name, Source.organ,
                                Source.comment, Source.dignity, Source.celltype, Source.location,
                                Source.metastatis, Source.person, Source.organism)
        query = query.join(Source)
        query = query.join(MsRun, SpectrumHit.ms_run_ms_run_id == MsRun.ms_run_id)
        query = query.join(HlaLookup)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(Source.name == request.matchdict["source"])
        statistics = json.dumps(query.all())

        query = DBSession.query(MsRun.ms_run_id, MsRun.filename).join(Source).filter(Source.name == request.matchdict["source"])
        runs = json.dumps(query.all())


    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"statistics": statistics, "runs": runs, "source": request.matchdict["source"]}


@view_config(route_name='hla', renderer='../templates/hla.pt', request_method="GET")
def hla_page(request):
    try:
        query = DBSession.query(Source.organ,
                                Source.histology, Source.name)
        query = query.join(HlaLookup)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(HlaType.hla_string == request.matchdict["hla"])
        # * --> %2A cause * is reserved character
        # : --> %3A
        sources = json.dumps(query.all())

        query = DBSession.query(func.count(SpectrumHit.sequence.distinct()).label("pep_count"))
        query = query.join(Source)
        query = query.join(HlaLookup)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(HlaType.hla_string == request.matchdict["hla"])
        statistic = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"sources": sources, "hla": request.matchdict["hla"], "statistic": statistic}


@view_config(route_name='msrun', renderer='../templates/msrun.pt', request_method="GET")
def msrun_page(request):
    try:
        query = DBSession.query(func.count(SpectrumHit.spectrum_hit_id).label("count_hits"),
                                func.count(SpectrumHit.sequence.distinct()).label("count_pep"),
                                HlaLookup.hla_category,
                                func.count(Protein.name.distinct()).label("count_prot"),
                                Source.histology, Source.name, Source.organ,
                                Source.comment, Source.dignity, Source.celltype, Source.location,
                                Source.metastatis, Source.person, Source.organism, MsRun.filename,
                                func.cast(MsRun.ms_run_date, String).label("ms_run_date"), MsRun.used_share,MsRun.comment.label("msrun_comment"),
                                MsRun.sample_mass, MsRun.sample_volume, MsRun.antibody_set,
                                MsRun.antibody_mass, MsRun.magna, func.cast(MsRun.prep_date, String).label("prep_date"), MsRun.prep_comment)

        query = query.join(MsRun, SpectrumHit.ms_run_ms_run_id == MsRun.ms_run_id)
        query = query.join(Source)
        query = query.join(HlaLookup)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(MsRun.ms_run_id == request.matchdict["msrun"])
        statistics = json.dumps(query.all())
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"statistics": statistics, "msrun": request.matchdict["msrun"]}

@view_config(route_name='protein', renderer='../templates/protein.pt', request_method="GET")
def protein_page(request):
    try:
        query = DBSession.query(Protein.name,
                                Protein.organism,
                                Protein.description,
                                Protein.sequence,
                                Protein.gene_name)
        query = query.filter(Protein.name == request.matchdict["protein"])
        statistics = json.dumps(query.all())
        query = DBSession.query(SpectrumHit.sequence)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(Protein.name == request.matchdict["protein"])
        sequences = query.all()
        #print sequences
        # TODO: mark peptides in sequence

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"statistics": statistics, "protein": request.matchdict["protein"]}

