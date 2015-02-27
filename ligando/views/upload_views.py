__author__ = 'Linus Backert'

import ast

from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy.exc import DBAPIError

from ligando.models import (
    DBSession,
    Source,
    MsRun,
    HlaType,
    HlaLookup,
    t_hla_map)
from ligando.views.view_helper import js_list_creator, conn_err_msg, hla_digits_extractor

# Upload Source metadata GET!
@view_config(route_name='upload_metadata_source', renderer='../templates/upload_templates/upload_metadata_source.pt',
             request_method="GET")
def upload_metadata_source(request):
    try:
        # query data for autocomplete
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


# Upload Source metadata POST!
@view_config(route_name='upload_metadata_source', renderer='../templates/upload_templates/base_layout.pt',
             request_method="POST")
def upload_metadata_source_post(request):
    source_upload = ast.literal_eval(request.params["sources"])
    # Check if source already in DB
    for source in source_upload:
        try:
            sources = DBSession.query(Source.source_id).filter(Source.name == source['source']).all()
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
        # if in DB abort whole upload
        if len(sources) > 0:
            return Response("The source " + source['source'] + " is already in the Database. Aborted whole upload!",
                            content_type='text/plain', status_int=500)

    # upload each source
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
                    # unknown hla_lookup
                    if len(hla_types_id) == 0:
                        try:
                            hla_type = HlaType(hla_string=sub_type, digits=hla_digits_extractor(sub_type))
                            DBSession.add(hla_type)
                            DBSession.flush()
                            hla_types_id = hla_type.hla_types_id
                        except DBAPIError:
                            return Response(conn_err_msg + "\n Insert into Hla-Types failed!",
                                            content_type='text/plain', status_int=500)
                    else:
                        hla_types_id = hla_types_id[0]
                        hla_type = query = DBSession.query(HlaType).filter(HlaType.hla_string == sub_type).all()[0]
                    # ###############
                    # hla_map      #
                    # ###############

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
        # ####################################################
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


# uplad MS run metadata GET
@view_config(route_name='upload_metadata_ms_run', renderer='../templates/upload_templates/upload_metadata_msrun.pt',
             request_method="GET")
def upload_metadata_ms_run(request):
    result_dict = dict()
    # fill out the "filename" if forwarded for orphan run table on home
    if "run" in request.params:
        result_dict["run"] = request.params["run"]
    else:
        result_dict["run"] = ""
    try:
        # query data for autocomplete
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


# uplad MS run metadata POST
@view_config(route_name='upload_metadata_ms_run', renderer='../templates/upload_templates/base_layout.pt',
             request_method="POST")
def upload_metadata_ms_run_post(request):
    ms_run_upload = ast.literal_eval(request.params["ms_runs"])
    # Check if  MS run is already in database with METADATA
    for ms_run in ms_run_upload:
        try:
            ms_runs = DBSession.query(MsRun.ms_run_id).filter(MsRun.filename == ms_run['filename']).filter(
                MsRun.source_source_id != None).all()
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
        if len(ms_runs) > 0:
            # if in MS run with Metadata in DB, abort whole Upload
            return Response("The source " + ms_run['source'] + " is already in the Database. Aborted whole upload!",
                            content_type='text/plain', status_int=500)
    # upload the each MS run
    for ms_run in ms_run_upload:
        # check if the reported source is in DB
        try:
            source = DBSession.query(Source.source_id).filter(Source.name == ms_run["source"]).all()
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
        if len(source) == 0:
            # abort whole upload if source is unknown
            return Response("The source " + ms_run[
                'source'] + " is not known in the Database. Aborted whole upload! Pleas provide the source metadata first!",
                            content_type='text/plain', status_int=500)
        else:
            source_id = source[0][0]

        # update if already in DB (without metadata included)
        try:
            ms_run_update = DBSession.query(MsRun).filter(MsRun.filename == ms_run["filename"]).filter(
                MsRun.source_source_id == None).all()
        except:
            return Response(conn_err_msg + " \n MsRun insert failed", content_type='text/plain', status_int=500)

        if len(ms_run_update) > 0:
            ms_run_update[0].source_source_id = source_id
            if ms_run['date'] != "":
                ms_run_update[0].ms_run_date = ms_run['date']
            if ms_run['used_share'] != "" and ms_run['used_share'] != "None":
                ms_run_update[0].used_share = ms_run['used_share']
            if ms_run['comment'] != "":
                ms_run_update[0].comment = ms_run['comment']
            if ms_run['sample_mass'] != "" and ms_run['sample_mass'] != "None":
                ms_run_update[0].sample_mass = ms_run['sample_mass']
            if ms_run['sample_volume'] != "" and ms_run['sample_volume'] != "None":
                ms_run_update[0].sample_volume = ms_run['sample_volume']
            ms_run_update[0].antibody_set = ms_run['antibody_set'].replace(" ", "")
            if ms_run['antibody_mass'] != "" and ms_run['antibody_mass'] != "None":
                ms_run_update[0].antibody_mass = ms_run['antibody_mass']
            ms_run_update[0].magna = ms_run['magna']
            if ms_run['prep_date'] != "":
                ms_run_update[0].prep_date = ms_run['prep_date']
            if ms_run['prep_comment'] != "":
                ms_run_update[0].prep_comment = ms_run['prep_comment']
            DBSession.flush()
        else:
            # This should not happen, cause only metadata for ms runs which are in DB can be uploaded
            try:
                ms_run_insert = MsRun(filename=ms_run['filename'],
                                      source_source_id=source_id,
                                      ms_run_date=ms_run['date'] if ms_run['date'] != "" else None,
                                      used_share=ms_run['used_share'] if ms_run['used_share'] != "" and ms_run[
                                                                                                            'used_share'] != "None" else None,
                                      comment=ms_run['comment'] if ms_run['comment'] != "" else None,
                                      sample_mass=ms_run['sample_mass'] if ms_run['sample_mass'] != "" and ms_run[
                                                                                                               'sample_mass'] != "None" else None,
                                      sample_volume=ms_run['sample_volume'] if ms_run['sample_volume'] != "" and ms_run[
                                                                                                                     'sample_volume'] != "None" else None,
                                      antibody_set=ms_run['antibody_set'].replace(" ", ""),
                                      antibody_mass=ms_run['antibody_mass'] if ms_run['antibody_mass'] != "" and ms_run[
                                                                                                                     'antibody_mass'] != "None" else None,
                                      magna=ms_run['magna'],
                                      prep_date=ms_run['prep_date'] if ms_run['prep_date'] != "" else None,
                                      prep_comment=ms_run['prep_comment'] if ms_run['prep_comment'] != "" else None)
                DBSession.add(ms_run_insert)
                DBSession.flush()
            except DBAPIError:
                return Response(conn_err_msg + " \n MsRun insert failed", content_type='text/plain', status_int=500)

    return dict()


# blacklist ms run GET
@view_config(route_name='blacklist_msrun', renderer='../templates/upload_templates/blacklist_msrun.pt',
             request_method="GET")
def blacklist_ms_run(request):
    result_dict = dict()
    if "run" in request.params:
        result_dict["run"] = request.params["run"]
    else:
        result_dict["run"] = ""
    try:
        # Query data for autocomplete
        # TODO: Show only processed runs without metadata
        allowed_elements = {"person": Source.person}
        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result

        allowed_elements = {"filename": MsRun.filename}
        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return result_dict

    # TODO: # blacklist ms run POST