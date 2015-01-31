import ast
import datetime
from pyramid.httpexceptions import HTTPFound, exception_response
from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func, distinct, String
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


@view_config(route_name='home', renderer='templates/home.pt')
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

        result_dict["orphan_msrun_count"] =  DBSession.query(func.count(distinct(MsRun.filename))).filter(MsRun.source_source_id is None).one()[0]
        result_dict["all_msrun_count"] = DBSession.query(func.count(distinct(MsRun.filename))).one()[0]
        result_dict["sources_count"] = DBSession.query(func.count(distinct(Source.name))).one()[0]
        # TODO: activate the filter, if there are finally orphan runs
        #result_dict["orphan_msrun"] = js_list_creator(
        #    DBSession.query(distinct(MsRun.filename)).filter(MsRun.source_source_id is None).all())
        result_dict["orphan_msrun"] = js_list_creator(
            DBSession.query(distinct(MsRun.filename)).limit(10).all())

        return result_dict
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)



@view_config(route_name='source_overview', renderer='templates/source_info.pt')
def source_overview(request):
    try:
        your_json = json.dumps(
            DBSession.query(Source.name, Source.dignity, Source.celltype, Source.histology, Source.location,
                            Source.metastatis, Source.person, Source.organ, Source.organism).all())
    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'project': your_json}


@view_config(route_name='run_overview', renderer='templates/run_info.pt')
def run_overview(request):
    try:
        your_json = json.dumps(DBSession.query(MsRun.filename,Source.name.label("name"), Source.organ, Source.dignity,
                                           func.cast(MsRun.ms_run_date, String).label("ms_run_date"), MsRun.antibody_set,
                                           MsRun.prep_comment, MsRun.used_share,
                                           MsRun.sample_mass).filter(Source.source_id == MsRun.source_source_id).all())

    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'project': your_json}


@view_config(route_name='peptide_query', renderer='templates/peptide_query.pt', request_method="GET")
def peptide_query(request):
    return dict()


@view_config(route_name='peptide_query', renderer='templates/peptide_query_result.pt', request_method="POST")
def peptide_query_result(request):
    params_check_dict = ['sequence', 'source', 'run_name', 'organ', 'histology', 'dignity', 'hla_typing', 'protein',
                         'length_1', 'length_2']
    input_check = False
    for param in params_check_dict:
        if len(request.params[param]) > 0:
            input_check = True
    if not input_check:
        return HTTPFound(request.route_url('peptide_query'))

    if request.params['grouping'] == "peptide":
        try:
            query = DBSession.query(PeptideRun.sequence,
                                    func.group_concat(Protein.name.distinct().op('separator')(', ')).label("protein"),
                                    func.group_concat(Source.histology.distinct().op('separator')(', ')).label("name"),
                                    HlaLookup.hla_category)
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
                                    HlaLookup.hla_category,
                                    func.group_concat(Protein.name.distinct().op('separator')(', ')),
                                    Source.histology, Source.name, MsRun.filename)
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
                                    HlaLookup.hla_category,
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
                HlaLookup.hla_category,
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

            query = query.group_by(Source.source_id, SpectrumHit.sequence)

            your_json = json.dumps(query.all())
            grouping = "source_psm"
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)

    return {'project': your_json, 'grouping': grouping}


@view_config(route_name='upload_metadata_source', renderer='templates/upload_metadata_source.pt', request_method="GET")
def upload_metadata_source(request):
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
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return result_dict


@view_config(route_name='upload_metadata_source', renderer='templates/base_layout.pt', request_method="POST")
def upload_metadata_source_post(request):
    source_upload = ast.literal_eval(request.params["sources"])
    for source in source_upload:
        try:
            sources = DBSession.query(Source.source_id).filter(Source.name == source['source']).all()
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
        if len(sources) > 0:
            return Response("The source " + source['source'] + " is already in the Database. Aborted whole upload!",
                            content_type='text/plain', status_int=500)

    for source in source_upload:
        if source['typing'] is not "":
            # ###############
            # hla_lookup   #
            # ###############
            try:
                query = DBSession.query(HlaLookup.hla_lookup_id)
                query = query.filter(HlaLookup.hla_category == source['typing'])
                hla_lookup_ids = query.all()

            except DBAPIError:
                return Response(conn_err_msg, content_type='text/plain', status_int=500)
            if len(hla_lookup_ids) == 0:
                try:
                    # stmt = DBSession.insert(HlaLookup.insert).values(hla_category=source['typing'])
                    hla_lookup = HlaLookup(hla_category=source['typing'])
                    DBSession.add(hla_lookup)
                    DBSession.flush()
                    hla_lookup_id = hla_lookup.hla_lookup_id
                except DBAPIError:
                    return Response(conn_err_msg + "\n HLA-Category insert failed", content_type='text/plain',
                                    status_int=500)
            else:
                hla_lookup_id = hla_lookup_ids[0][0]
                hla_lookup = DBSession.query(HlaLookup).filter(HlaLookup.hla_category == source['typing']).all()[0]

            # ###############
            # hla_types    #
            # ###############
            hla_alleles = source['typing'].split(";")
            for hla_typing in hla_alleles:
                hla_typing_split = hla_typing.strip().split(":")
                for i in range(0, len(hla_typing_split)):
                    sub_type = ":".join(hla_typing_split[0:i + 1])
                    try:
                        query = DBSession.query(HlaType.hla_types_id).filter(HlaType.hla_string == sub_type)
                        hla_types_id = query.all()
                    except DBAPIError:
                        return Response(conn_err_msg, content_type='text/plain', status_int=500)
                    #unknown hla_lookup
                    if len(hla_types_id) == 0:
                        try:
                            hla_type = HlaType(hla_string=sub_type)
                            DBSession.add(hla_type)
                            DBSession.flush()
                            hla_types_id = hla_type.hla_types_id
                        except DBAPIError:
                            return Response(conn_err_msg + "\n Insert into Hla-Types failed!",
                                            content_type='text/plain', status_int=500)
                    else:
                        hla_types_id = hla_types_id[0]
                        hla_type = query = DBSession.query(HlaType).filter(HlaType.hla_string == sub_type).all()[0]
                    ################
                    # hla_map      #
                    ################

                    try:
                        query = DBSession.query(t_hla_map).filter(HlaType.hla_types_id == hla_types_id).filter(
                            HlaLookup.hla_lookup_id == hla_lookup_id)
                        hla_map_ids = query.all()
                    except DBAPIError:
                        return Response(conn_err_msg, content_type='text/plain', status_int=500)

                    if len(hla_map_ids) == 0:
                        try:
                            hla_lookup.fk_hla_typess.append(hla_type)
                            DBSession.add(hla_lookup)
                            DBSession.flush()
                            DBSession.flush()
                        except DBAPIError:
                            return Response(conn_err_msg + "\n Insert into Hla-Map failed!",
                                            content_type='text/plain', status_int=500)
        else:
            hla_lookup_id = "NULL"
        # ####################################################
        # Source:                                           #
        #####################################################
        try:
            source_insert = Source(name=source['source'], organ=source['organ'], organism=source['organism'],
                                   histology=source['histology'], dignity=source['dignity'],
                                   location=source['location'],
                                   metastatis=source['metastatis'], celltype=source['celltype'],
                                   comment=source['comment'],
                                   fk_hla_lookup_id=hla_lookup_id, person=source['person'])
            DBSession.add(source_insert)
            DBSession.flush()
        except DBAPIError:
            return Response(conn_err_msg + "\n Insert into Source failed!",
                            content_type='text/plain', status_int=500)
    return dict()


@view_config(route_name='upload_metadata_ms_run', renderer='templates/upload_metadata_msrun.pt', request_method="GET")
def upload_metadata_ms_run(request):
    result_dict = dict()
    if("run" in request.params):
        result_dict["run"] = request.params["run"]
    else:
        result_dict["run"] = ""
    try:
        # TODO: Show only processed runs without metadata
        allowed_elements = {"used_share": MsRun.used_share, "source": Source.name,
                            "sample_mass": MsRun.sample_mass, "sample_volume": MsRun.sample_volume,
                            "antibody_set": MsRun.antibody_set, "antibody_mass": MsRun.antibody_mass,
                            "magna": MsRun.magna}

        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result

        allowed_elements = {"filename": MsRun.filename}
        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.filter(MsRun.source_source_id == None)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return result_dict


@view_config(route_name='upload_metadata_ms_run', renderer='templates/base_layout.pt', request_method="POST")
def upload_metadata_ms_run_post(request):
    ms_run_upload = ast.literal_eval(request.params["ms_runs"])
    for ms_run in ms_run_upload:
        try:
            ms_runs = DBSession.query(MsRun.ms_run_id).filter(MsRun.filename == ms_run['filename']).filter(
                MsRun.source_source_id != None).all()
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
        if len(ms_runs) > 0:
            return Response("The source " + ms_run['source'] + " is already in the Database. Aborted whole upload!",
                            content_type='text/plain', status_int=500)

    for ms_run in ms_run_upload:
        try:
            source = DBSession.query(Source.source_id).filter(Source.name == ms_run["source"]).all()
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
        if len(source) == 0:
            return Response("The source " + ms_run['source'] + " is not known in the Database. Aborted whole upload!",
                            content_type='text/plain', status_int=500)
        else:
            source_id = source[0][0]

        # update if already in DB (without metadata included)
        try:
            ms_run_update = DBSession.query(MsRun).filter(MsRun.filename == ms_run["filename"]).filter(
                MsRun.source_source_id == None).all()
        except:
            DBAPIError
            return Response(conn_err_msg + " \n MsRun insert failed", content_type='text/plain', status_int=500)

        if len(ms_run_update) > 0:
            ms_run_update[0].source_source_id = source_id
            if(ms_run['date'] != "" ):
                ms_run_update[0].ms_run_date = ms_run['date']
            if (ms_run['used_share'] != "" and ms_run['used_share'] != "None"):
                ms_run_update[0].used_share = ms_run['used_share']
            if ( ms_run['comment'] != ""):
                ms_run_update[0].comment = ms_run['comment']
            if (ms_run['sample_mass'] != "" and ms_run['sample_mass'] !=  "None"):
                ms_run_update[0].sample_mass = ms_run['sample_mass']
            if (ms_run['sample_volume'] != "" and ms_run['sample_volume'] != "None"):
                ms_run_update[0].sample_volume = ms_run['sample_volume']
            ms_run_update[0].antibody_set = ms_run['antibody_set'].replace(" ","")
            if (ms_run['antibody_mass'] != "" and ms_run['antibody_mass'] != "None"):
                ms_run_update[0].antibody_mass = ms_run['antibody_mass']
            ms_run_update[0].magna = ms_run['magna']
            if (ms_run['prep_date'] != ""):
                ms_run_update[0].prep_date = ms_run['prep_date']
            if (ms_run['prep_comment'] != ""):
                ms_run_update[0].prep_comment = ms_run['prep_comment']
            DBSession.flush()
        else:
            try:
                ms_run_insert = MsRun(filename=ms_run['filename'],
                                      source_source_id=source_id,
                                      ms_run_date=ms_run['date'] if ms_run['date'] != "" else None,
                                      used_share=ms_run['used_share'] if ms_run['used_share'] != "" and ms_run['used_share'] != "None" else None,
                                      comment=ms_run['comment'] if ms_run['comment'] != "" else None,
                                      sample_mass=ms_run['sample_mass'] if ms_run['sample_mass'] != "" and ms_run['sample_mass'] != "None" else None,
                                      sample_volume=ms_run['sample_volume'] if ms_run['sample_volume'] != "" and ms_run['sample_volume'] != "None" else None,
                                      antibody_set=ms_run['antibody_set'].replace(" ",""),
                                      antibody_mass=ms_run['antibody_mass'] if ms_run['antibody_mass'] != "" and ms_run['antibody_mass'] != "None" else None,
                                      magna=ms_run['magna'],
                                      prep_date=ms_run['prep_date'] if ms_run['prep_date'] != "" else None,
                                      prep_comment=ms_run['prep_comment'] if ms_run['prep_comment'] != "" else None)
                DBSession.add(ms_run_insert)
                DBSession.flush()
            except DBAPIError:
                return Response(conn_err_msg + " \n MsRun insert failed", content_type='text/plain', status_int=500)

    return dict()


@view_config(route_name='peptide', renderer='templates/peptide.pt', request_method="get")
def peptide_page(request):

    if ("peptide" in request.params):
        try:
            query = DBSession.query(SpectrumHit.spectrum_hit_id,
                                    SpectrumHit.sequence,
                                    HlaLookup.hla_category,
                                    func.group_concat(Protein.name.distinct().op('separator')(', ')),
                                    Source.histology, Source.name)
            query = query.join(Source)
            query = query.join(MsRun, SpectrumHit.ms_run_ms_run_id == SpectrumHit.ms_run_id)
            query = query.join(HlaLookup)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(t_peptide_protein_map)
            query = query.join(Protein)
            query = query.filter(SpectrumHit.sequence == request.params["peptide"])

            raise exception_response(404)
        except:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
    else:
        return dict()

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
                for s in range(0, len(split)):
                    if s == 0:
                        if like:
                            query = query.filter(getattr(sql_parent, sql_object).like(split[s]))
                        else:
                            query = query.filter(getattr(sql_parent, sql_object) == split[s])
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
                        temp_code += "getattr(sql_parent, sql_object).like(split[s])," % s
                    else:
                        temp_code += "getattr(sql_parent,sql_object) == '%s'," % s
                temp_code = temp_code.strip(",")
                temp_code += "))"
                exec temp_code
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

