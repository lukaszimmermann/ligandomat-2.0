from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func, distinct
import simplejson as json

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
            DBSession.query(func.count(distinct(MsRun.filename))).filter(MsRun.source_source_id == None).filter(MsRun.flag_trash == 0).one()[0]
        result_dict["all_msrun_count"] = DBSession.query(func.count(distinct(MsRun.filename))).one()[0]
        result_dict["sources_count"] = DBSession.query(func.count(distinct(Source.sample_id))).one()[0]
        result_dict["trash_count"] = DBSession.query(func.count(distinct(MsRun.filename))).filter(MsRun.flag_trash == 1).one()[0]


        result_dict["orphan_msrun"] = json.dumps(
        DBSession.query(distinct(MsRun.filename).label("orphan_ms_run")).filter(MsRun.source_source_id == None).filter(MsRun.flag_trash == 0).order_by(MsRun.filename.desc()).limit(10).all())

        #SELECT (organ), count(organ) from Source group by organ
        sources = DBSession.query(Source.organ, func.count(Source.organ)).group_by(Source.organ).order_by(func.count(Source.organ).desc()).all()
        merged_sources = dict()
        source_acc = 0
        for i in range(0,len(sources)):
            if i < 6:
                merged_sources[sources[i][0]] = sources[i][1]
            else:
                source_acc += sources[i][1]
        merged_sources["others"] = source_acc
        result_dict["sources"] = json.dumps(merged_sources)

        return result_dict
    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)

# test view
@view_config(route_name='test_view', renderer='../templates/test_template.pt')
def test_view(request):
    return dict()


# faq view
@view_config(route_name='faq', renderer='../templates/faq.pt')
def faq(request):
    return dict()


# information view
@view_config(route_name='info', renderer='../templates/info.pt')
def info(request):
    return dict()


# contact view
@view_config(route_name='contact', renderer='../templates/contact.pt')
def contact(request):
    return dict()


# contact view
@view_config(route_name='news', renderer='../templates/news.pt')
def news(request):
    return dict()