from pyramid.response import Response
from pyramid.view import view_config, notfound_view_config, forbidden_view_config
from sqlalchemy import func
from sqlalchemy.exc import OperationalError as SqlAlchemyOperationalError
from pyramid.httpexceptions import HTTPBadRequest, HTTPUnauthorized
import simplejson as json

from ligando.models import (
    DBSession,
    Source,
    MsRun,
    HlaType, PeptideRun, HLA_statistics, DB_statistics, SpectrumHit)
from ligando.views.view_helper import conn_err_msg


# home view
@view_config(route_name='home', renderer='../templates/home.pt')
def my_view(request):
    try:
        # query statistics for the main page
        source_stat = DBSession.query(func.count(Source.patient_id.distinct())).all()[0][0]
        tissue_stat = DBSession.query(func.count(Source.organ.distinct())).all()[0][0]
        sample_stat = DBSession.query(func.count(Source.source_id.distinct())).all()[0][0]
        msruns_stat = DBSession.query(func.count(MsRun.ms_run_id.distinct())).all()[0][0]
        peptide_stat = DBSession.query(func.count(PeptideRun.sequence.distinct())).all()[0][0]
        spectra_stat = DBSession.query(func.count(SpectrumHit.spectrum_hit_id)).all()[0][0]

        return dict(source_stat=source_stat, tissue_stat=tissue_stat, sample_stat=sample_stat, msruns_stat=msruns_stat,
                    peptide_stat=peptide_stat, spectra_stat=spectra_stat)

    except:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)


# faq view
@view_config(route_name='db_stats', renderer='../templates/db_stats.pt')
def db_stats(request):
    source_stat = DBSession.query(func.count(Source.patient_id.distinct())).all()[0][0]
    tissue_stat = DBSession.query(func.count(Source.organ.distinct())).all()[0][0]
    sample_stat = DBSession.query(func.count(Source.source_id.distinct())).all()[0][0]
    msruns_stat = DBSession.query(func.count(MsRun.ms_run_id.distinct())).all()[0][0]
    peptide_stat = DBSession.query(func.count(PeptideRun.sequence.distinct())).all()[0][0]

    # Peptide distribution
    query = DBSession.query(DB_statistics.length.label("length"),
                            DB_statistics.count.label("count"))
    query = query.filter(DB_statistics.hla_class == 1)
    classI_distribution = json.dumps(query.all())

    query = DBSession.query(DB_statistics.length.label("length"),
                            DB_statistics.count.label("count"))
    query = query.filter(DB_statistics.hla_class == 2)
    classII_distribution = json.dumps(query.all())

    return {"source_stat" : source_stat,
            "tissue_stat" : tissue_stat,
            "sample_stat" : sample_stat,
            "msruns_stat" : msruns_stat,
            "peptide_stat" : peptide_stat,
            "classI_distribution" : classI_distribution,
            "classII_distribution": classII_distribution

            }

# faq view
@view_config(route_name='faq', renderer='../templates/faq.pt')
def faq(request):
    return dict()


# information view
@view_config(route_name='background', renderer='../templates/background.pt')
def background(request):
    return dict()

# download view
@view_config(route_name='download', renderer='../templates/download.pt')
def download(request):
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
    return dict()

@view_config(route_name='tissue_table', renderer='../templates/tissue_table.pt')
def tissue_table(request):
    query = DBSession.query(Source.organ.label('tissue'), func.count(Source.source_id.distinct()).label('tissue_count'))
    query = query.group_by(Source.organ)
    organs =  json.dumps(query.all())
    return {'tissues' : organs}


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
