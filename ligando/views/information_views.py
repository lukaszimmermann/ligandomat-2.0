__author__ = 'Linus Backert'


from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func, distinct, String
from sqlalchemy.exc import DBAPIError
import simplejson as json

from ligando.models import (
    DBSession,
    Source,
    MsRun)
from ligando.views.view_helper import  conn_err_msg



@view_config(route_name='source_overview', renderer='../templates/info_templates/source_info.pt')
def source_overview(request):
    try:
        # query Sources
        your_json = json.dumps(
            DBSession.query(Source.name, Source.dignity, Source.celltype, Source.histology, Source.location,
                            Source.metastatis, Source.person, Source.organ, Source.organism).all())
    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'project': your_json}


@view_config(route_name='run_overview', renderer='../templates/info_templates/run_info.pt')
def run_overview(request):
    try:
        # query MS runs. Important: run_date has to be castet to string, otherwise  json.dumps can not create json object
        your_json = json.dumps(DBSession.query(MsRun.ms_run_id, MsRun.filename, Source.name.label("name"), Source.organ, Source.dignity,
                                               func.cast(MsRun.ms_run_date, String).label("ms_run_date"),
                                               MsRun.antibody_set,
                                               MsRun.prep_comment, MsRun.used_share,
                                               MsRun.sample_mass).group_by(MsRun.ms_run_id).all())

    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'project': your_json}

@view_config(route_name='orphan_run_overview', renderer='../templates/info_templates/orphan_run_info.pt')
def orphan_run_overview(request):
    try:
        # get orphan runs
        your_json = json.dumps(DBSession.query(MsRun.ms_run_id, MsRun.filename).filter(
            MsRun.source_source_id != None).group_by(
            MsRun.ms_run_id).all())

    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'project': your_json}
