from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from .models import DBSession, Base


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config = route_adder(config)
    return config.make_wsgi_app()


def route_adder(config):
    # register static files in the static folder
    config.add_static_view('static', 'static', cache_max_age=3600)
    # home
    config.add_route('home', '/')
    # home search
    config.add_route('search', '/search')
    # overview
    # TODO: Remove if not necessary
    config.add_route('source_overview', '/sources')
    config.add_route('run_overview', '/runs')
    # DB query
    config.add_route('peptide_query', '/peptide_query')

    # base pages
    config.add_route('peptide', '/peptide/{peptide}')
    config.add_route('source', '/source/{source}')
    config.add_route('source_id', '/source_id/{source_id}')
    config.add_route('hla', '/hla/{hla}')
    config.add_route('msrun', '/msrun/{msrun}')
    config.add_route('protein', '/protein/{protein}${type}')
    config.add_route('organ', '/organ/{organ}')
    # Database analysis
    config.add_route('venn_analysis', '/venn_analysis')

    # About Pages
    config.add_route('faq', '/faq')
    config.add_route('info', '/info')
    config.add_route('contact', '/contact')
    # News Page
    config.add_route('news', '/news')
    # HLA atlas
    config.add_route('hla_atlas', '/hla_atlas')
    config.add_route('hla_atlas_classII', '/hla_atlas_classII')

    # test view TODO: remove before publishing
    config.add_route('test_view', '/test_view')
    # scan for views in whole project
    config.scan()
    return config
