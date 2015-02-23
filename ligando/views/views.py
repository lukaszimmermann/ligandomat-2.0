from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func, distinct

from ligando.models import (
    DBSession,
    Source,
    MsRun,
    HlaType)
from ligando.views.view_helper import js_list_creator, conn_err_msg


# home view
@view_config(route_name='home', renderer='../templates/home.pt')
def my_view(request):
    try:
        # query statistics for the main page
        result_dict = dict()
        result_dict["orphan_msrun_count"] = \
            DBSession.query(func.count(distinct(MsRun.filename))).filter(MsRun.source_source_id is None).one()[0]
        result_dict["all_msrun_count"] = DBSession.query(func.count(distinct(MsRun.filename))).one()[0]
        result_dict["sources_count"] = DBSession.query(func.count(distinct(Source.name))).one()[0]
        # TODO: activate the filter, if there are finally orphan runs
        # result_dict["orphan_msrun"] = js_list_creator(
        # DBSession.query(distinct(MsRun.filename)).filter(MsRun.source_source_id is None).all())
        result_dict["orphan_msrun"] = js_list_creator(
            DBSession.query(distinct(MsRun.filename)).order_by(MsRun.filename.desc()).limit(10).all())

        return result_dict
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)

