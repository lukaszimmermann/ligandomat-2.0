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
    config.set_default_permission('view')
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
    config.add_route('run_overview', '/runs')
    # DB query
    config.add_route('peptide_query', '/peptide_query')

    # base pages
    config.add_route('peptide', '/peptide/{peptide}')
    config.add_route('peptide_spectra', '/peptide_spectra/{peptide}')
    config.add_route('peptide_ajax', '/peptide_ajax/{spectrum_hit_id}')
    config.add_route('source', '/source/{source}')
    config.add_route('source_id', '/source_id/{source_id}')
    config.add_route('hla', '/hla/{hla}')
    config.add_route('msrun', '/msrun/{msrun}')
    config.add_route('protein', '/protein/{protein}${type}')
    config.add_route('organ', '/organ/{organ}')
    config.add_route('organ_hla', '/organ_hla/{organ}${hla}')
    # Database analysis
    config.add_route('venn_analysis', '/venn_analysis')

    # About Pages
    config.add_route('faq', '/faq')
    config.add_route('background', '/background')
    config.add_route('download', '/download')
    config.add_route('contact', '/contact')
    # News Page
    config.add_route('news', '/news')
    # HLA atlas
    config.add_route('hla_atlas', '/hla_atlas')
    config.add_route('hla_atlas_classII', '/hla_atlas_classII')
    # Tissue atlas
    config.add_route('tissue_browser', '/tissue_browser')
    # Tissue list
    config.add_route('tissue_table', '/tissue_table')
    # Database statistics
    config.add_route('db_stats', '/db_stats')

    # scan for views in whole project
    config.scan()
    return config
