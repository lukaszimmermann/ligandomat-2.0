import sqlalchemy

__author__ = 'Linus Backert'

import os
from paste.deploy import appconfig
from sqlalchemy import engine_from_config, func, String
from models import DBSession, Base, User, Source, Tissue_protein_count, metadata, Protein, SpectrumHit, \
    t_spectrum_protein_map
from sqlalchemy.orm import sessionmaker

here = os.path.dirname(__file__)
settings = appconfig('config:' + os.path.join(here, '../', 'development.ini'))

engine = engine_from_config(settings, 'sqlalchemy.')
DBSession.configure(bind=engine)
Base.metadata.bind = engine


########################
# Tissue_protein_count #
########################
def tissue_protein_count_creater():
    # Drop the table
    Tissue_protein_count.__table__.drop(checkfirst=False)
    # Create the table
    Tissue_protein_count.__table__.create(checkfirst=True)

    # collect all sources
    tissues = DBSession.query(Source.organ.distinct()).all()

    # query the insert
    result = list()
    for tissue in tissues:

        query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                Protein.protein_id.label("protein_protein_id"),
                                # static tissue name
                                sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"))
        query = query.join(SpectrumHit)
        query = query.join(t_spectrum_protein_map)
        query = query.join(Protein)
        query = query.filter(Source.organ == tissue[0])
        query = query.group_by(Protein.protein_id)
        insert = query.all()
        for row in insert:
            result.append(dict(zip(['source_count', 'protein_protein_id', 'tissue'], row)))
    # inserting
    Tissue_protein_count.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_protein_count"
