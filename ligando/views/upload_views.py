from time import strftime, gmtime
from pyramid.httpexceptions import HTTPFound
from pyramid.renderers import render
from sqlalchemy import update, func, String
import simplejson as json

__author__ = 'Linus Backert'

import ast

from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy.exc import DBAPIError
import transaction
from ligando.models import (
    DBSession,
    Source,
    MsRun,
    HlaType,
    t_hla_map, SpectrumHit, PeptideRun)
from ligando.views.view_helper import js_list_creator, conn_err_msg, hla_digits_extractor, log_writer

# Upload Source metadata GET!
@view_config(route_name='upload_metadata_source', renderer='../templates/upload_templates/upload_metadata_source.pt',
             request_method="GET")
def upload_metadata_source(request):
    try:
        # query data for autocomplete
        result_dict = dict()
        allowed_elements = {"patient_id": Source.patient_id, "organ": Source.organ,
                            "organism": Source.organism, "histology": Source.histology, "dignity": Source.dignity,
                            "celltype": Source.celltype, "location": Source.location, "metastatis": Source.metastatis,
                            "treatment": Source.treatment, "person": Source.person, "typing": HlaType.hla_string,
                            'comment' : Source.comment}

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
            query = DBSession.query(Source.source_id) \
                .filter(Source.patient_id == source['patient_id']) \
                .filter(Source.organ == source['organ']) \
                .filter(Source.organism == source['organism']) \
                .filter(Source.histology == source['histology']) \
                .filter(Source.dignity == source['dignity']) \
                .filter(Source.location == source['location']) \
                .filter(Source.treatment == source['treatment']) \
                .filter(Source.metastatis == source['metastatis']) \
                .filter(Source.celltype == source['celltype']) \
                .filter(Source.comment == source['comment']) \
                .filter(Source.person == source['person']) \
                .filter(Source.prep_date == source['prep_date'])

            test_source = query.all()
        except DBAPIError:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)
        # if in DB abort whole upload
        if len(test_source) > 0:
            log_writer("source_metadata_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +source)
            log_writer("source_metadata_complete",strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +"The source is already in the Database. Aborted whole upload!")
            return Response("The source is already in the Database. Aborted whole upload!",
                            content_type='text/plain', status_int=500)

    # upload each source
    for source in source_upload:

        # ####################################################
        # Source:                                           #
        # ####################################################

        try:
            sample_id = source["patient_id"]+"_"+ source["organ"]+"_"+source['dignity']+"_"+ source['histology']+"_"+\
                        source['celltype'] +"_"+ source['location'] +"_"+ source['treatment'] +"_"+ source['prep_date']

            source_insert = Source(patient_id=source['patient_id'], organ=source['organ'], organism=source['organism'],
                                   histology=source['histology'], dignity=source['dignity'],
                                   location=source['location'], treatment=source['treatment'],
                                   metastatis=source['metastatis'], celltype=source['celltype'],
                                   comment=source['comment'], prep_date= source['prep_date'],
                                   person=source['person'], sample_id=sample_id)
            #DBSession.add(source_insert)
            #DBSession.flush()
            #source_id = source_insert.source_id
        except DBAPIError:
            return Response(conn_err_msg + "\n Insert into Source failed!",
                            content_type='text/plain', status_int=500)

        if source['typing'] is not "":
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
                        source_insert.append(hla_type)

                    except DBAPIError:
                        return Response(conn_err_msg + "\n Insert into Hla-Map failed!",
                                        content_type='text/plain', status_int=500)

            try:
                log_writer("source_metadata", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +source)
                log_writer("source_metadata_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +source)
                DBSession.add(source_insert)
                DBSession.flush()
            except DBAPIError:
                return Response(conn_err_msg + "\n Insert into Source failed!",
                                content_type='text/plain', status_int=500)

        else:
            log_writer("source_metadata", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +source)
            log_writer("source_metadata_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +source)
            DBSession.add(source_insert)
            DBSession.flush()
            hla_lookup_id = "NULL"

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
        allowed_elements = {"used_share": MsRun.used_share, "source_id": Source.source_id,
                            "sample_mass": MsRun.sample_mass, "sample_volume": MsRun.sample_volume,
                            "antibody_set": MsRun.antibody_set, "antibody_mass": MsRun.antibody_mass}

        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result

        allowed_elements = {"filename": MsRun.filename}
        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.filter(MsRun.source_source_id == None)
            query = query.filter(MsRun.flag_trash == 0)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return result_dict


# upload MS run metadata POST
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
        source_id = ms_run["source_id"]

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

            # Updating all crossreferences for the source_id
            try:
                spectrum_hits = DBSession.query(SpectrumHit) \
                    .filter(SpectrumHit.ms_run_ms_run_id == ms_run_update[0].ms_run_id).update(
                    {'source_source_id': ms_run['source_source_id']})
            except:
                log_writer("ms_run_upload_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +"SpectrumHit update failed!")
                DBSession.rollback()
                return Response("SpectrumHit update failed!",
                                content_type='text/plain', status_int=500)
            try:
                peptide_runs = DBSession.query(PeptideRun) \
                    .filter(PeptideRun.ms_run_ms_run_id == ms_run_update[0].ms_run_id).update(
                    {'source_source_id': ms_run['source_source_id']})

            except:
                log_writer("ms_run_update_complete", "Peptide Run update failed!")
                DBSession.rollback()
                return Response("Peptide Run update failed!",
                                content_type='text/plain', status_int=500)
            transaction.commit()
            DBSession.flush()
            log_writer("ms_run_metadata_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +ms_run)
            log_writer("ms_run_metadata", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +ms_run)
        else:
            log_writer("ms_run_metadata_complete",strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +"MsRun insert failed! Only already registered MS Runs can be uploaded.")
            DBSession.rollback()
            return Response(conn_err_msg + " \n MsRun insert failed! Only already registered MS Runs can be uploaded.", content_type='text/plain', status_int=500)

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

        # Query Data for autocomplete
        # Person
        query = DBSession.query(Source.person.distinct())
        person = js_list_creator(query.all())
        result_dict["person"] = person

        # MS Runs
        query = DBSession.query(MsRun.filename.distinct())
        query = query.filter(MsRun.flag_trash == 0)
        filename = js_list_creator(query.all())
        result_dict["filename"] = filename

        # Reason
        query = DBSession.query(MsRun.trash_reason.distinct())
        trash_reason = js_list_creator(query.all())
        result_dict["trash_reason"] = trash_reason

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return result_dict


# blacklist ms run POST
@view_config(route_name='blacklist_msrun', renderer='../templates/upload_templates/blacklist_msrun.pt',
             request_method="POST")
def blacklist_ms_run_post(request):
    try:
        blacklist = ast.literal_eval(request.params["ms_runs"])

        for row in blacklist:
            if row['filename'] != " ":
                log_writer("blacklist",
                           strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +
                           row['filename'] + "\t" +
                           row['person'] + "\t" +
                           row['trash_reason']
                           )

                DBSession.query(MsRun).filter(MsRun.filename == row['filename']).update(
                    {"flag_trash": 1,
                     'trash_reason': row['trash_reason'],
                     'ms_run_date': None,
                     'used_share': None,
                     'comment': None,
                     'sample_mass': None,
                     'antibody_set': '',
                     'antibody_mass': None,
                     'sample_volume': None
                    })

                transaction.commit()
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return dict()


# unblacklist ms run GET
@view_config(route_name='unblacklist_msrun', renderer='../templates/upload_templates/unblacklist_msrun.pt',
             request_method="GET")
def unblacklist_ms_run(request):
    result_dict = dict()
    if "run" in request.params:
        result_dict["run"] = request.params["run"]
    else:
        result_dict["run"] = ""
    try:

        # Query Data for autocomplete

        # Person
        query = DBSession.query(Source.person.distinct())
        person = js_list_creator(query.all())
        result_dict["person"] = person

        # MS Runs
        query = DBSession.query(MsRun.filename.distinct())
        query = query.filter(MsRun.flag_trash == 1)
        filename = js_list_creator(query.all())
        result_dict["filename"] = filename

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return result_dict


# unblacklist ms run POST
@view_config(route_name='unblacklist_msrun', renderer='../templates/upload_templates/unblacklist_msrun.pt',
             request_method="POST")
def unblacklist_ms_run_post(request):
    try:
        unblacklist = ast.literal_eval(request.params["ms_runs"])

        for row in unblacklist:
            if row['filename'] != " ":
                log_writer("unblacklist", strftime("%Y.%m.%d %H:%M:%S", gmtime())+"\t"+row['filename']+"\t"+row['person'])
                DBSession.query(MsRun).filter(MsRun.filename == row['filename']).update({"flag_trash": 0, 'trash_reason' : None})
                transaction.commit()


    except:
         return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return dict()


# Update Source metadata GET!
@view_config(route_name='update_metadata_source', renderer='../templates/upload_templates/update_metadata_source_id.pt',
             request_method="GET")
def update_metadata_source(request):
    if "id" in request.params:
        result_dict = dict()
        result_dict["id"] = request.params['id']
        query = DBSession.query(Source.patient_id, Source.organ,
                                Source.organism, Source.histology,
                                Source.dignity,Source.celltype,
                                Source.location, Source.metastatis,
                                Source.treatment,Source.person,
                                func.cast(Source.prep_date, String).label("prep_date")
        ).filter(Source.source_id==request.params["id"])

        source = json.dumps(query.all())
        result_dict['source'] = source
        query = DBSession.query(Source.source_id, HlaType.hla_string).join(t_hla_map).join(HlaType).filter(Source.source_id==request.params["id"])
        hla = json.dumps(query.all())
        result_dict['hla'] = hla


        # getting autocomplete items
        allowed_elements = {"patient_id": Source.patient_id, "organ": Source.organ,
                            "organism": Source.organism, "histology": Source.histology,
                            "dignity": Source.dignity, "celltype": Source.celltype,
                            "location": Source.location, "metastatis": Source.metastatis,
                            "treatment": Source.treatment, "person": Source.person,
                            "comment" : Source.comment, "typing": HlaType.hla_string}
        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result
        #result_dict['original'] = source

        return result_dict

    else:
        try:
            # query data for autocomplete
            result_dict = dict()
            allowed_elements = {"source_id": Source.source_id}

            for k, v in allowed_elements.iteritems():
                query = DBSession.query(v)
                query = query.group_by(v)
                query_result = js_list_creator(query.all())
                result_dict[k] = query_result
            # setting a different renderer
            result = render('../templates/upload_templates/update_metadata_source.pt',
                            result_dict,
                            request=request)
            response = Response(result)
            return response
        except:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)



# Update Source metadata POST!
@view_config(route_name='update_metadata_source', renderer='../templates/upload_templates/update_metadata_source_id.pt',
             request_method="POST")
def update_metadata_source_post(request):
    source = ast.literal_eval(request.params["sources"])
    try:
        log_writer("source_update_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +source)
        source_update = DBSession.query(Source).join(t_hla_map).join(HlaType).filter(Source.source_id == source["source_id"]).all()
    except:
        log_writer("source_update_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +" Source update failed!")
        return Response(conn_err_msg + " \n Source update failed", content_type='text/plain', status_int=500)
    if len(source_update)>0:
        if source['patient_id'] != "":
            source_update[0].patient_id = source['patient_id']
        if source['organ'] != "":
            source_update[0].organ = source['organ']
        if source['organism'] != "":
            source_update[0].orgnaism = source['organism']
        if source['comment'] != "":
            source_update[0].comment = source['comment']
        if source['histology'] != "":
            source_update[0].histology = source['histology']
        if source['dignity'] != "":
            source_update[0].dignity = source['dignity']
        if source['celltype'] != "":
            source_update[0].celltype = source['celltype']
        if source['person'] != "":
            source_update[0].person = source['person']
        if source['location'] != "":
            source_update[0].location = source['location']
        if source['metastatis'] != "":
            source_update[0].metastatis = source['metastatis']
        if source['treatment'] != "":
            source_update[0].treatment = source['treatment']
        if source['prep_date'] != "":
            source_update[0].prep_date = source['prep_date']
        source_update[0].sample_id = source_update[0].patient_id + "_" + source_update[0].organ + "_" + source_update[0].dignity\
                    + "_" + source_update[0].histology + "_" + \
                    source_update[0].celltype + "_" + source_update[0].location + "_" + source_update[0].treatment\
                    + "_" + source_update[0].prep_date


        if source['typing'] != "":
            # remove all mappings
            source_update[0].hlatypes[:] = []
            # create all hla links
            hla_split = source['typing'].split(";")
            for hla_typing in hla_split:
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
                    try:
                        # add the hla type
                        source_update[0].hlatypes.append(hla_type)

                    except DBAPIError:
                        return Response(conn_err_msg + "\n Insert into Hla-Map failed!",
                                        content_type='text/plain', status_int=500)

    try:
        transaction.commit()
        DBSession.flush()
        log_writer("source_update", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +source)
    except:
        log_writer("source_update_complete",strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" + "Source update failed!")
        DBSession.rollback()
        return Response("Source update failed!",
                        content_type='text/plain', status_int=500)
    return HTTPFound(location="/update_metadata_source?id=%s" % source["source_id"])



# Update MS run metadata GET!
@view_config(route_name='update_metadata_ms_run', renderer='../templates/upload_templates/update_metadata_msrun_id.pt',
             request_method="GET")
def update_metadata_msrun(request):
    if "filename" in request.params:
        result_dict = dict()
        result_dict["filename"] = request.params['filename']
        query = DBSession.query(MsRun.filename, MsRun.used_share,
                                MsRun.comment, MsRun.source_source_id,
                                MsRun.sample_mass, MsRun.sample_volume,
                                MsRun.antibody_set, MsRun.antibody_mass,
                                func.cast(MsRun.ms_run_date, String).label("ms_run_date")
        ).filter(MsRun.filename==request.params["filename"])

        ms_run = json.dumps(query.all())
        result_dict['ms_run'] = ms_run

        # getting autocomplete items
        allowed_elements = {"used_share":MsRun.used_share, "comment":MsRun.comment,
                            "sample_mass":MsRun.sample_mass, "antibody_set":MsRun.antibody_set,
                            "antibody_mass":MsRun.antibody_mass,"sample_volume":MsRun.sample_volume, 'source_source_id': Source.source_id }
        for k, v in allowed_elements.iteritems():
            query = DBSession.query(v)
            query = query.group_by(v)
            query_result = js_list_creator(query.all())
            result_dict[k] = query_result
        #result_dict['original'] = source

        return result_dict

    else:
        try:
            # query data for autocomplete
            result_dict = dict()
            result_dict["filename"] = js_list_creator(DBSession.query(MsRun.filename).filter(MsRun.flag_trash==0).group_by(MsRun.filename).all())

            # setting a different renderer
            result = render('../templates/upload_templates/update_metadata_msrun.pt',
                            result_dict,
                            request=request)
            response = Response(result)
            return response
        except:
            return Response(conn_err_msg, content_type='text/plain', status_int=500)



# Update MS run metadata POST!
@view_config(route_name='update_metadata_ms_run', renderer='../templates/upload_templates/update_metadata_msrun_id.pt',
             request_method="POST")
def update_metadata_msrun_post(request):
    ms_run = ast.literal_eval(request.params["ms_runs"])
    # update if already in DB (without metadata included)
    try:
        log_writer("ms_run_update_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +ms_run)
        ms_run_update = DBSession.query(MsRun).filter(MsRun.filename == ms_run["filename"]).all()
    except:
        log_writer("ms_run_update_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +"MS Run update failed!")
        return Response(conn_err_msg + " \n MsRun insert failed", content_type='text/plain', status_int=500)
    if len(ms_run_update)>0:
        if ms_run['ms_run_date'] != "":
            ms_run_update[0].ms_run_date = ms_run['ms_run_date']
        if ms_run['used_share'] != "":
            ms_run_update[0].used_share = ms_run['used_share']
        if ms_run['comment'] != "":
            ms_run_update[0].comment = ms_run['comment']
        if ms_run['sample_mass'] != "":
            ms_run_update[0].sample_mass = ms_run['sample_mass']
        if ms_run['antibody_set'] != "":
            ms_run_update[0].antibody_set = ms_run['antibody_set']
        if ms_run['antibody_mass'] != "":
            ms_run_update[0].antibody_mass = ms_run['antibody_mass']
        if ms_run['sample_volume'] != "":
            ms_run_update[0].sample_volume = ms_run['sample_volume']

        if ms_run['source_source_id'] != "":
            # TODO: update peptide_run and spectrum_hit if source changed
            try:
                spectrum_hits = DBSession.query(SpectrumHit)\
                    .filter(SpectrumHit.source_source_id == ms_run_update[0].source_source_id).update({'source_source_id': ms_run['source_source_id']})
            except:
                log_writer("ms_run_update_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +"SpectrumHit update failed!")
                DBSession.rollback()
                return Response("SpectrumHit update failed!",
                                content_type='text/plain', status_int=500)
            try:
                peptide_runs = DBSession.query(PeptideRun) \
                    .filter(PeptideRun.source_source_id == ms_run_update[0].source_source_id).update({'source_source_id': ms_run['source_source_id']})

            except:
                log_writer("ms_run_update_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +"Peptide Run update failed!")
                DBSession.rollback()
                return Response("Peptide Run update failed!",
                                content_type='text/plain', status_int=500)

            ms_run_update[0].source_source_id = ms_run['source_source_id']

    try:
        transaction.commit()
        DBSession.flush()
        log_writer("ms_run_update", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +ms_run)
    except:
        log_writer("ms_run_update_complete", strftime("%Y.%m.%d %H:%M:%S", gmtime()) + "\t" +"MS Run update failed!")
        DBSession.rollback()
        return Response("MS Run update failed!",
                        content_type='text/plain', status_int=500)
    return HTTPFound(location="/update_metadata_ms_run?filename=%s" % ms_run["filename"])



