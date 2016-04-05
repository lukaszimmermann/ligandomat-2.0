from sqlite3 import complete_statement
from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func, distinct, String, desc
import simplejson as json
from sqlalchemy import or_, func
from ligando.views.view_helper import get_chart_data
import pyopenms as oms


from ligando.models import (
    DBSession,
    Source,
    MsRun,
    Protein,
    HlaType,
    t_hla_map,
    SpectrumHit,
    t_spectrum_protein_map, Tissue_protein_count, Tissue_specific_peptides, HLA_statistics, PeptideRun,
    t_peptide_run_spectrum_hit_map, Binding_prediction, Tissue_hla_protein_count, Tissue_hla_specific_peptides)
from ligando.views.view_helper import conn_err_msg, js_list_creator, js_list_creator_dataTables


@view_config(route_name='source', renderer='../templates/base_templates/source.pt', request_method="GET")
def source_page(request):
    try:
        # Catch if there are no peptides!!
        query = DBSession.query(func.count(PeptideRun.peptide_run_id).label("count_hits"),
                                func.count(PeptideRun.sequence.distinct()).label("count_pep"),
                                func.count(Protein.name.distinct()).label("count_prot")
        )
        query = query.join(Source)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(Source.patient_id == request.matchdict["source"])
        statistics = json.dumps(query.all())

        query = DBSession.query(Source.patient_id,
                                func.group_concat(Source.histology.distinct().op('order by')(Source.histology)).label(
                                    'histology'),
                                func.group_concat(Source.source_id.distinct().op('order by')(Source.source_id)).label(
                                    'source_id'),
                                func.group_concat(Source.organ.distinct().op('order by')(Source.organ)).label(
                                    'organ'), func.group_concat(
                (Source.comment.distinct().op('order by')(Source.comment))).label(
                'comment'), func.group_concat(
                (Source.dignity.distinct().op('order by')(Source.dignity))).label(
                'dignity'),
                                func.group_concat(
                                    (Source.celltype.distinct().op('order by')(Source.celltype))).label(
                                    'celltype')
                                , func.group_concat(
                (Source.location.distinct().op('order by')(Source.location))).label(
                'location')
                                , func.group_concat(
                (Source.metastatis.distinct().op('order by')(Source.metastatis))).label(
                'metastatis'),
                                func.group_concat(
                                    (Source.person.distinct().op('order by')(Source.person))).label(
                                    'person'),
                                func.group_concat(
                                    (Source.organism.distinct().op('order by')(Source.organism))).label(
                                    'organism'),
                                func.group_concat(
                                    (HlaType.hla_string.distinct().op('order by')(HlaType.hla_string))).label(
                                    'hla_typing'),
                                func.group_concat(
                                    (Source.treatment.distinct().op('order by')(Source.treatment))).label(
                                    'treatment')
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
    return {"statistic": statistics, "metadata": metadata, "runs": runs, "source": request.matchdict["source"]}


@view_config(route_name='source_id', renderer='../templates/base_templates/source_id.pt', request_method="GET")
def source_id_page(request):
    try:
        # Catch if there are no peptides!!
        query = DBSession.query(func.count(PeptideRun.peptide_run_id).label("count_hits"),
                                func.count(PeptideRun.sequence.distinct()).label("count_pep"),
                                func.count(Protein.name.distinct()).label("count_prot")
        )
        query = query.join(Source)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(Source.source_id == request.matchdict["source_id"])
        statistics = json.dumps(query.all())

        query = DBSession.query(Source.source_id, func.group_concat(
            (Source.histology.distinct().op('order by')(Source.histology))).label(
            'histology')
                                , func.group_concat(
                (Source.patient_id.distinct().op('order by')(Source.patient_id))).label(
                'patient_id')
                                , func.group_concat(
                (Source.organ.distinct().op('order by')(Source.organ))).label(
                'organ')
                                , func.group_concat(
                (Source.comment.distinct().op('order by')(Source.comment))).label(
                'comment')
                                , func.group_concat(
                (Source.dignity.distinct().op('order by')(Source.dignity))).label(
                'dignity')
                                ,
                                func.group_concat(
                                    (Source.celltype.distinct().op('order by')(Source.celltype))).label(
                                    'celltype')
                                , func.group_concat(
                (Source.location.distinct().op('order by')(Source.location))).label(
                'location')
                                , func.group_concat(
                (Source.metastatis.distinct().op('order by')(Source.metastatis))).label(
                'metastatis')
                                ,
                                func.group_concat(
                                    (Source.person.distinct().op('order by')(Source.person))).label(
                                    'person')
                                , func.group_concat(
                (Source.organism.distinct().op('order by')(Source.organism))).label(
                'organism')
                                ,
                                func.group_concat(
                                    (HlaType.hla_string.distinct().op('order by')(HlaType.hla_string))).label(
                                    'hla_typing')
        )
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(Source.source_id == request.matchdict["source_id"])
        query = query.group_by(Source.source_id)
        metadata = json.dumps(query.all())

        query = DBSession.query(MsRun.ms_run_id, MsRun.filename).join(Source).filter(
            Source.source_id == request.matchdict["source_id"])
        runs = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"statistic": statistics, "metadata": metadata, "runs": runs, "source": request.matchdict["source_id"]}


@view_config(route_name='hla', renderer='../templates/base_templates/hla.pt', request_method="GET")
def hla_page(request):
    try:
        query = DBSession.query(Source.organ,Source.source_id, Source.dignity,
                                Source.histology, Source.patient_id)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(HlaType.hla_string == request.matchdict["hla"])
        # * --> %2A cause * is reserved character
        # : --> %3A
        sources = json.dumps(query.all())

        query = DBSession.query(HLA_statistics.binding_peptide_count,
                                HLA_statistics.sample_count)
        query = query.join(HlaType)
        query = query.filter(HlaType.hla_string == request.matchdict["hla"])
        statistic = json.dumps(query.all())

        #extract data for organ pie chart
        complete_sources = json.loads(sources)
        organ_chart = get_chart_data(complete_sources)

        # TODO: Precalculate these (to slow)
        # Peptide distribution
        query = DBSession.query(func.length(PeptideRun.sequence).label("length") ,func.count(PeptideRun.sequence.distinct()).label("count"))
        query = query.join(MsRun)
        query = query.join(Source)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.join(Binding_prediction, PeptideRun.sequence == Binding_prediction.sequence)
        query = query.filter(Binding_prediction.hla_type_hla_type_id == HlaType.hla_type_id)
        query = query.filter(Binding_prediction.binder == 1)
        query = query.filter(HlaType.hla_string == request.matchdict["hla"])
        query = query.group_by(func.length(PeptideRun.sequence))
        # List of peptides for which one will create the Peptide binding motif-Logo
        peptide_distribution = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"sources": sources, "hla": request.matchdict["hla"], "statistic": statistic, "organ": organ_chart, "peptide_distribution": peptide_distribution}


@view_config(route_name='msrun', renderer='../templates/base_templates/msrun.pt', request_method="GET")
def msrun_page(request):
    try:
        query = DBSession.query(func.count(PeptideRun.peptide_run_id).label("count_hits"),
                                func.count(PeptideRun.sequence.distinct()).label("count_pep"),
                                func.count(Protein.name.distinct()).label("count_prot")
                                )

        query = query.join(MsRun, PeptideRun.ms_run_ms_run_id == MsRun.ms_run_id)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(MsRun.ms_run_id == request.matchdict["msrun"])
        statistics = json.dumps(query.all())

        query = DBSession.query(MsRun.filename,
                                func.group_concat(
                                    (HlaType.hla_string.distinct().op('order by')(HlaType.hla_string))).label(
                                    'hla_typing'),
                                Source.histology, Source.source_id, Source.patient_id, Source.organ,
                                Source.comment, Source.dignity, Source.celltype, Source.location,
                                Source.metastatis, Source.person, Source.organism, Source.treatment, Source.comment.label("comment"),
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
        # Checking for different query types
        if request.matchdict["type"] == "geneName":
            query = DBSession.query(Protein.name)
            query = query.filter(Protein.gene_name == request.matchdict["protein"])
            filter = query.one()[0]
        elif request.matchdict["type"] == "uniprot":
            filter = request.matchdict["protein"]
        else:
            return Response("Unknown Protein", content_type='text/plain', status_int=404)
        query = DBSession.query(Protein.name,
                                Protein.organism,
                                Protein.description,
                                Protein.sequence,
                                Protein.gene_name)
        query = query.filter(Protein.name == filter)
        temp_statistics = query.all()
        statistics = json.dumps(temp_statistics)
        query = DBSession.query(PeptideRun.sequence.distinct().label('sequence'))
        query = query.join(Binding_prediction, PeptideRun.sequence == Binding_prediction.sequence)
        query = query.join(t_peptide_run_spectrum_hit_map)
        query = query.join(SpectrumHit)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.join(MsRun, PeptideRun.ms_run_ms_run_id == MsRun.ms_run_id)
        query = query.filter(Protein.name == filter)
        query = query.filter(PeptideRun.source_source_id != None)
        query = query.filter(Binding_prediction.binder ==1)
        sequences = query.all()


        sequence_start = list()
        sequence_end = list()
        for seq in sequences:
            pos = temp_statistics[0][3].find(seq[0])
            if pos > -1:
                sequence_start.append(pos)
                sequence_end.append(pos + len(seq[0]))
        sequence_start = json.dumps(sequence_start)
        sequence_end = json.dumps(sequence_end)

        # TODO: Could be slow for large numbers of peptides
        query = DBSession.query(PeptideRun.sequence.distinct().label('sequence'),
                                func.group_concat(Protein.name.distinct()).label("protein"))
        query = query.join(t_peptide_run_spectrum_hit_map)
        query = query.join(SpectrumHit)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(or_(*[(PeptideRun.sequence == s[0]) for s in sequences]))
        query = query.group_by(PeptideRun.sequence)

        sequences = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"statistics": statistics,
            "protein": request.matchdict["protein"],
            "sequence_start": sequence_start, "sequence_end": sequence_end, "sequences": sequences}


@view_config(route_name='organ', renderer='../templates/base_templates/organ.pt', request_method="GET")
def organ_page(request):
    try:
        organ = request.matchdict["organ"].lower()

        # TODO: Gene_name is not unique, but using Uniprot names is not understandable
        # Tissue specific proteins
        # class I
        query = DBSession.query(Tissue_protein_count.source_count, Protein.name, Protein.gene_name)
        query = query.order_by(desc(Tissue_protein_count.source_count))
        query = query.join(Protein)
        # query = query.group_by(Protein.name)
        query = query.filter(Tissue_protein_count.tissue == organ)
        query = query.filter(Tissue_protein_count.hla_class == 1)
        query = query.filter(Tissue_protein_count.source_count > 1)
        # query = query.limit(50)
        protein_stats_classI = json.dumps(query.all())
        # class II
        query = DBSession.query(Tissue_protein_count.source_count, Protein.name, Protein.gene_name)
        query = query.order_by(desc(Tissue_protein_count.source_count))
        query = query.join(Protein)
        #query = query.group_by(Protein.name)
        query = query.filter(Tissue_protein_count.tissue == organ)
        query = query.filter(Tissue_protein_count.hla_class == 2)
        query = query.filter(Tissue_protein_count.source_count > 1)
        # query = query.limit(50)
        protein_stats_classII = json.dumps(query.all())
        # combined
        query = DBSession.query(Tissue_protein_count.source_count, Protein.name, Protein.gene_name)
        query = query.order_by(desc(Tissue_protein_count.source_count))
        query = query.join(Protein)
        #query = query.group_by(Protein.name)
        query = query.filter(Tissue_protein_count.tissue == organ)
        query = query.filter(Tissue_protein_count.hla_class == 0)
        query = query.filter(Tissue_protein_count.source_count > 1)
        # query = query.limit(50)
        protein_stats_combined = json.dumps(query.all())

        # Tissues specific PEPTIDES
        # class I
        query = DBSession.query(Tissue_specific_peptides.source_count, Tissue_specific_peptides.peptide_run_sequence)
        query = query.order_by(desc(Tissue_specific_peptides.source_count))
        #query = query.group_by(Tissue_specific_peptides.spectrum_hit_sequence)
        query = query.filter(Tissue_specific_peptides.tissue == organ)
        query = query.filter(Tissue_specific_peptides.hla_class == 1)
        query = query.filter(Tissue_specific_peptides.source_count > 1)
        # query = query.limit(50)
        peptide_stats_classI = json.dumps(query.all())

        # class I
        query = DBSession.query(Tissue_specific_peptides.source_count, Tissue_specific_peptides.peptide_run_sequence)
        query = query.order_by(desc(Tissue_specific_peptides.source_count))
        #query = query.group_by(Tissue_specific_peptides.spectrum_hit_sequence)
        query = query.filter(Tissue_specific_peptides.tissue == organ)
        query = query.filter(Tissue_specific_peptides.hla_class == 2)
        query = query.filter(Tissue_specific_peptides.source_count > 1)
        # query = query.limit(50)
        peptide_stats_classII = json.dumps(query.all())

        # query sources
        query = DBSession.query(Source.source_id, Source.organ,
                                    Source.histology, Source.patient_id, Source.dignity)
        query = query.filter(Source.organ == organ)
        sources = json.dumps(query.all())

        query = DBSession.query(func.count(PeptideRun.sequence.distinct()).label("pep_count"))
        query = query.join(Source)
        query = query.filter(Source.organ == organ)
        statistic = json.dumps(query.all())

        # query HLAs for filtering
        query = DBSession.query(HlaType.hla_string.distinct().label("hla"))
        query = query.join(t_hla_map)
        query = query.join(Source)
        query = query.filter(Source.organ == organ)
        query = query.order_by(HlaType.hla_string)
        hlas = json.dumps(query.all())

    except:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)

    return {"sources": sources,
            "organ": organ[0].upper() + organ[1:],
            "statistic": statistic,
            "protein_stats_classI": protein_stats_classI,
            "protein_stats_classII": protein_stats_classII,
            "protein_stats_combined": protein_stats_combined,
            "peptide_stats_classI": peptide_stats_classI,
            "peptide_stats_classII": peptide_stats_classII,
            "hlas" : hlas
            }

@view_config(route_name='organ_hla', renderer='../templates/base_templates/organ_hla.pt', request_method="GET")
def organ_hla_page(request):
    try:
        organ = request.matchdict["organ"]
        hla = request.matchdict["hla"]
        hla_id = DBSession.query(HlaType.hla_type_id).filter(HlaType.hla_string == hla).all()[0][0]



        # TODO: Gene_name is not unique, but using Uniprot names is not understandable
        # Tissue specific proteins
        query = DBSession.query(Tissue_hla_protein_count.source_count, Protein.name, Protein.gene_name)
        query = query.order_by(desc(Tissue_hla_protein_count.source_count))
        query = query.join(Protein)
        # query = query.group_by(Protein.name)
        query = query.filter(Tissue_hla_protein_count.tissue == request.matchdict["organ"])
        query = query.filter(Tissue_hla_protein_count.hla_type_hla_type_id == hla_id)
        query = query.filter(Tissue_hla_protein_count.source_count > 0)
        protein_stats = json.dumps(query.all())

        # Tissues specific PEPTIDES
        query = DBSession.query(Tissue_hla_specific_peptides.source_count, Tissue_hla_specific_peptides.peptide_run_sequence)
        query = query.order_by(desc(Tissue_hla_specific_peptides.source_count))
        query = query.filter(Tissue_hla_specific_peptides.tissue == request.matchdict["organ"])
        query = query.filter(Tissue_hla_specific_peptides.hla_type_hla_type_id == hla_id)
        query = query.filter(Tissue_hla_specific_peptides.source_count > 0)
        peptide_stats = json.dumps(query.all())


        # query sources
        query = DBSession.query(Source.source_id, Source.organ,
                                    Source.histology, Source.patient_id, Source.dignity)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(Source.organ == request.matchdict["organ"])
        query = query.filter(HlaType.hla_type_id == hla_id)
        sources = json.dumps(query.all())


        query = DBSession.query(func.count(PeptideRun.sequence.distinct()).label("pep_count"))
        query = query.join(Source)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.join(Binding_prediction, PeptideRun.sequence == Binding_prediction.sequence)
        query = query.filter(Source.organ == request.matchdict["organ"])
        query = query.filter(HlaType.hla_type_id == hla_id)
        query = query.filter(HlaType.hla_type_id == Binding_prediction.hla_type_hla_type_id)
        query = query.filter(Binding_prediction.binder ==1)
        statistic = json.dumps(query.all())

        # # query HLAs for filtering
        # query = DBSession.query(HlaType.hla_string.distinct().label("hla"))
        # query = query.join(t_hla_map)
        # query = query.join(Source)
        # query = query.filter(Source.organ == request.matchdict["organ"])
        # query = query.order_by(HlaType.hla_string)
        # hlas = json.dumps(query.all())

    except:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)

    return {"sources": sources,
            "hla": hla,
            "organ": request.matchdict["organ"][0].upper() + request.matchdict["organ"][1:],
            "statistic": statistic,
            "protein_stats": protein_stats,
            "peptide_stats": peptide_stats
            }


@view_config(route_name='peptide', renderer='../templates/base_templates/peptide.pt', request_method="GET")
def peptide_page(request):
    try:
        # Proteins for the peptide
        query = DBSession.query(Protein.name.label("protein"), Protein.gene_name.label("gene_name"), Protein.sequence)
        query = query.join(t_spectrum_protein_map)
        query = query.join(SpectrumHit)
        query = query.join(t_peptide_run_spectrum_hit_map)
        query = query.join(PeptideRun)
        query = query.filter(PeptideRun.sequence == request.matchdict["peptide"])
        query = query.group_by(Protein.name)
        proteins = json.dumps(query.all())

        # PSMs
        query = DBSession.query(func.sum(PeptideRun.PSM))
        query = query.filter(PeptideRun.sequence == request.matchdict["peptide"])
        psms = query.all()[0][0]

        # Number of MS_runs
        query = DBSession.query(func.count(PeptideRun.ms_run_ms_run_id))
        query = query.filter(PeptideRun.sequence == request.matchdict["peptide"])
        #query = query.group_by(SpectrumHit.sequence)
        #test = query.all()
        ms_run_count = query.all()[0][0]

        # Type of the organ of the sources with the peptides
        query = DBSession.query(Source.organ.distinct())
        query = query.join(PeptideRun)
        query = query.join(MsRun)
        query = query.filter(MsRun.flag_trash ==0)
        query = query.filter(PeptideRun.sequence == request.matchdict["peptide"])
        organs = js_list_creator_dataTables(query.all())


        # query = DBSession.query(Source.patient_id)
        # query = query.join(SpectrumHit)
        # query = query.join(MsRun)
        # query = query.filter(MsRun.flag_trash ==0)
        # query = query.filter(SpectrumHit.sequence == request.matchdict["peptide"])
        # query = query.group_by(Source.patient_id)
        # sources = js_list_creator_dataTables(query.all())

        query = DBSession.query(HlaType.hla_string.distinct().label("hla"),
                                Binding_prediction.binding_score.label("score"))
        query = query.join(t_hla_map)
        query = query.join(Source)
        query = query.join(PeptideRun)
        query = query.join(Binding_prediction, Binding_prediction.sequence == PeptideRun.sequence)
        query = query.filter(MsRun.flag_trash == 0)
        query = query.filter(PeptideRun.sequence == request.matchdict["peptide"])
        query = query.filter(HlaType.digits == 4)
        query = query.filter(HlaType.hla_string.notlike("D%"))
        query = query.filter(HlaType.hla_type_id == Binding_prediction.hla_type_hla_type_id)
        query = query.filter(Binding_prediction.binder == 1)
        hla_class1 = json.dumps(query.all())

        query = DBSession.query(HlaType.hla_string.distinct().label("hla"),
                                Binding_prediction.binding_score.label("score"))
        query = query.join(t_hla_map)
        query = query.join(Source)
        query = query.join(PeptideRun)
        query = query.join(Binding_prediction, Binding_prediction.sequence == PeptideRun.sequence)
        query = query.filter(MsRun.flag_trash == 0)
        query = query.filter(PeptideRun.sequence == request.matchdict["peptide"])
        query = query.filter(HlaType.digits == 4)
        query = query.filter(HlaType.hla_string.like("D%"))
        query = query.filter(HlaType.hla_type_id == Binding_prediction.hla_type_hla_type_id)
        query = query.filter(Binding_prediction.binder == 1)
        hla_class2 = json.dumps(query.all())

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"proteins": proteins, "organs": organs,
            "peptide": request.matchdict["peptide"],
            "hla_class1": hla_class1,
            "hla_class2": hla_class2, "psms": psms, "ms_run_count": ms_run_count}


@view_config(route_name='peptide_ajax', renderer='json', request_method="GET")
def specs(request):
    query = DBSession.query(MsRun.filename)
    query = query.join(SpectrumHit)
    query = query.filter(SpectrumHit.spectrum_hit_id == request.matchdict["spectrum_hit_id"])
    filename = query.all()[0][0]

    query = DBSession.query(SpectrumHit.mzML_id)
    query = query.filter(SpectrumHit.spectrum_hit_id == request.matchdict["spectrum_hit_id"])
    mzML_id = query.all()[0][0]

    mi = str("/Users/Backert/Documents/Doktorarbeit/LigandosphereDb/HLAtlas_test/"+ filename.strip(".RAW")+ ".mzML_shortened.mzml")
    si = mzML_id
    imf_skip = oms.IndexedMzMLFile()
    #imf_skip.setSkipXMLChecks(True)
    imf_skip.openFile(mi)
    print imf_skip.getParsingSuccess()
    if imf_skip.getParsingSuccess():
        p = imf_skip.getSpectrumById(si)
        mz = p.getMZArray()
        inte = p.getIntensityArray()



    return {'peaks': zip(mz, inte), "ntermMod" : 164.07, "filename" : filename}

@view_config(route_name='peptide_spectra', renderer='../templates/base_templates/peptide_spectra.pt', request_method="GET")
def peptide_spectra_page(request):
    sequence = request.matchdict["peptide"]

    # get all spectrum_hits
    query = DBSession.query(SpectrumHit.spectrum_hit_id.label("spectrum_hit_id"),
                            SpectrumHit.search_engine_score.label("score"),
                            SpectrumHit.delta_m.label("delta_m"),
                            SpectrumHit.mzML_id.label("mzML_id"),
                            MsRun.filename.label("filename"),
                            Source.organ.label("organ"))
    query = query.join(MsRun)
    query = query.join(t_peptide_run_spectrum_hit_map)
    query = query.join(PeptideRun)
    query = query.join(Source)
    query = query.filter(PeptideRun.sequence == sequence)
    spectra = json.dumps(query.all())

    #peaks = open("ligando/static/spectra_test/test_output_0_100.txt").readline()
    return {'peptide': sequence, "spectra" : spectra}#, 'peaks': peaks}
