from pyramid.response import Response
from pyramid.view import view_config, notfound_view_config, forbidden_view_config
from sqlalchemy import func, distinct
from sqlalchemy.exc import OperationalError as SqlAlchemyOperationalError
from pyramid.httpexceptions import HTTPBadRequest, HTTPUnauthorized
import simplejson as json

from ligando.models import (
    DBSession,
    Source,
    MsRun,
    HlaType, PeptideRun, t_hla_map, HLA_statistics)
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
    result_dict = dict()
    result_dict["test"] = DBSession.query(MsRun.filename).filter(MsRun.filename == "testfilename").all()
    result_dict["count"] = DBSession.query(func.count(MsRun.filename)).filter(MsRun.filename == "testfilename").one()[0]
    return result_dict


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


# news view
@view_config(route_name='news', renderer='../templates/news.pt')
def news(request):
    return dict()


# hla_atlas view
@view_config(route_name='hla_atlas', renderer='../templates/hla_atlas.pt')
def hla_atlas(request):
    # # HLA-A
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("A*%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_a = json.dumps(query.all())
    # # HLA-B
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("B*%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_b = json.dumps(query.all())
    # # HLA-C
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("C*%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_c = json.dumps(query.all())

    query = DBSession.query(HlaType.hla_string.label("hla"), HLA_statistics.sample_count.label("samples"),
                            HLA_statistics.binding_peptide_count.label("scored_peptides"),
                            )

    query = query.join(HLA_statistics)
    query = query.filter(HlaType.digits == 4)
    query = query.filter(HlaType.hla_string.op('regexp')("^[ABC]"))
    # HlaType.hla_string.rlike("[ABC]*%"))
    #query = query.group_by(HlaType.hla_string)
    class1 = json.dumps(query.all())

    return {"class1": class1}  # , "hla_a": hla_a, "hla_b": hla_b, "hla_c": hla_c}


@view_config(route_name='hla_atlas_classII', renderer='../templates/hla_atlas_classII.pt')
def hla_atlas_classII(request):
    # TODO: precalculate Number of peptides beforehand
    # TODO: scored peptides. right now only dummy values
    # HLA-DR, -DP and -DQ
    # DPA1 DPB1 DQA1 DQB1 DRB1 DRB3 DRB4 DRB5 DRB6

    # # HLA-DPA1
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DPA1%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_dpa1 = json.dumps(query.all())
    # # HLA-DPB1
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DPB1%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_dpb1 = json.dumps(query.all())
    # # HLA-DQA1
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DQA1%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_dqa1 = json.dumps(query.all())
    # # HLA-DQB1
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DQB1%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_dqb1 = json.dumps(query.all())
    # # HLA-DRB1
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DRB1%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_drb1 = json.dumps(query.all())
    # # HLA-DRB3
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DRB3%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_drb3 = json.dumps(query.all())
    # # HLA-DRB4
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DRB4%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_drb4 = json.dumps(query.all())
    # # HLA-DRB5
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DRB5%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_drb5 = json.dumps(query.all())
    # # HLA-DRB6
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DRB6%"))
    # query = query.order_by(HlaType.hla_string)
    # hla_drb6 = json.dumps(query.all())

    # # HLA-DR
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DR%"))
    # hla_dr = json.dumps(query.all())
    # # HLA-DP
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DP%"))
    # hla_dp = json.dumps(query.all())
    # # HLA-DQ
    # query = DBSession.query(HlaType.hla_string.label("hla"))
    # query = query.filter(HlaType.digits == 4)
    # query = query.filter(HlaType.hla_string.like("DQ%"))
    # hla_dq = json.dumps(query.all())

    query = DBSession.query(HlaType.hla_string.label("hla"), HLA_statistics.sample_count.label("samples"),
                            HLA_statistics.binding_peptide_count.label("scored_peptides"),
                            )


    query = query.join(HLA_statistics)
    query = query.filter(HlaType.digits == 4)
    query = query.filter(HlaType.hla_string.op('regexp')("^D"))
    #query = query.group_by(HlaType.hla_string)
    class2 = json.dumps(query.all())

    # DPA1 DPB1 DQA1 DQB1 DRB1 DRB3 DRB4 DRB5 DRB6

    return {"class2": class2}  # , "hla_dpa1": hla_dpa1, "hla_dpb1": hla_dpb1,
    # "hla_dqa1": hla_dqa1, "hla_dqb1": hla_dqb1, "hla_drb1": hla_drb1,
    # "hla_drb3": hla_drb3, "hla_drb4": hla_drb5, "hla_drb5": hla_drb5,
    #"hla_drb6": hla_drb6, }
    # return {"class2": class2, "hla_dr": hla_dr, "hla_dp": hla_dp, "hla_dq": hla_dq}


@view_config(route_name='tissue_browser', renderer='../templates/tissue_browser.pt')
def tissue_browser(request):
    return {}


# error page views
# only the five most common errors
@notfound_view_config(renderer='../templates/error_templates/404_error.pt')
def notfound(request):
    request.response.status = 404
    return {}


@view_config(context=SqlAlchemyOperationalError, renderer='../templates/error_templates/500_error.pt')
def internalserver(request):
    request.response.status = 500
    return {}


@forbidden_view_config(renderer='../templates/error_templates/403_error.pt')
def forbidden(request):
    request.response.status = 403
    return {}


@view_config(context=HTTPBadRequest,renderer='../templates/error_templates/400_error.pt')
def badrequest(request):
    request.response.status = 400
    return {}


@view_config(context=HTTPUnauthorized, renderer='../templates/error_templates/401_error.pt')
def unauthorized(request):
    request.response.status = 401
    return {}