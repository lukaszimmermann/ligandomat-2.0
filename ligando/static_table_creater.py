import sqlalchemy

__author__ = 'Linus Backert'

import os
from paste.deploy import appconfig
from sqlalchemy import engine_from_config, func, String
from models import DBSession, Base, User, Source, Tissue_protein_count, metadata, Protein, SpectrumHit, \
    t_spectrum_protein_map, MsRun, Tissue_specific_peptides
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
    ###########
    # CLASS I #
    ###########

    # calculate for each protein on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            Protein.protein_id.label("protein_protein_id"), MsRun.antibody_set.label("antibody"))
    query = query.join(MsRun)
    query = query.join(SpectrumHit)
    query = query.join(t_spectrum_protein_map)
    query = query.join(Protein)
    query = query.filter(func.find_in_set("W6/32", MsRun.antibody_set))

    query = query.group_by(Protein.protein_id)
    protein_tissue_group_concat = query.all()

    # query the insert
    result = list()
    for tissue in tissues:
        for prot in protein_tissue_group_concat:
            # if the protein occured only in this tissue
            if prot[0] == tissue[0]:
                query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                        Protein.protein_id.label("protein_protein_id"),
                                        # static tissue name
                                        sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"),
                                        # static hla class integer
                                        sqlalchemy.sql.expression.literal(1).label("hla_class")
                                        )
                query = query.join(MsRun)
                query = query.join(SpectrumHit)
                query = query.join(t_spectrum_protein_map)
                query = query.join(Protein)
                query = query.filter(Protein.protein_id == prot[1])
                query = query.filter(func.find_in_set("W6/32", MsRun.antibody_set))
                query = query.group_by(Protein.protein_id)
                insert = query.all()
                for row in insert:
                    result.append(dict(zip(['source_count', 'protein_protein_id', 'tissue', "hla_class"], row)))
    # inserting
    Tissue_protein_count.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_protein_count class I"

    ############
    # CLASS II #
    ############

    # calculate for each protein on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            Protein.protein_id.label("protein_protein_id"), MsRun.antibody_set.label("antibody"))
    query = query.join(MsRun)
    query = query.join(SpectrumHit)
    query = query.join(t_spectrum_protein_map)
    query = query.join(Protein)
    query = query.filter(func.find_in_set("Tue39", MsRun.antibody_set))
    query = query.filter(func.find_in_set("L243", MsRun.antibody_set))

    query = query.group_by(Protein.protein_id)
    protein_tissue_group_concat = query.all()

    # query the insert
    result = list()
    for tissue in tissues:
        for prot in protein_tissue_group_concat:
            # if the protein occured only in this tissue
            if prot[0] == tissue[0]:
                query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                        Protein.protein_id.label("protein_protein_id"),
                                        # static tissue name
                                        sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"),
                                        # static hla class integer
                                        sqlalchemy.sql.expression.literal(2).label("hla_class")
                                        )
                query = query.join(MsRun)
                query = query.join(SpectrumHit)
                query = query.join(t_spectrum_protein_map)
                query = query.join(Protein)
                query = query.filter(Protein.protein_id == prot[1])
                query = query.filter(func.find_in_set("Tue39", MsRun.antibody_set))
                query = query.filter(func.find_in_set("L243", MsRun.antibody_set))
                query = query.group_by(Protein.protein_id)
                insert = query.all()
                for row in insert:
                    result.append(dict(zip(['source_count', 'protein_protein_id', 'tissue', "hla_class"], row)))
    # inserting
    Tissue_protein_count.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_protein_count class II"

    ############
    # Combined #
    ############

    # calculate for each protein on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            Protein.protein_id.label("protein_protein_id"), MsRun.antibody_set.label("antibody"))
    query = query.join(MsRun)
    query = query.join(SpectrumHit)
    query = query.join(t_spectrum_protein_map)
    query = query.join(Protein)

    query = query.group_by(Protein.protein_id)
    protein_tissue_group_concat = query.all()

    # query the insert
    result = list()
    for tissue in tissues:
        for prot in protein_tissue_group_concat:
            # if the protein occured only in this tissue
            if prot[0] == tissue[0]:
                query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                        Protein.protein_id.label("protein_protein_id"),
                                        # static tissue name
                                        sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"),
                                        # static hla class integer
                                        sqlalchemy.sql.expression.literal(0).label("hla_class")
                                        )
                query = query.join(SpectrumHit)
                query = query.join(t_spectrum_protein_map)
                query = query.join(Protein)
                query = query.filter(Protein.protein_id == prot[1])
                query = query.group_by(Protein.protein_id)
                insert = query.all()
                for row in insert:
                    result.append(dict(zip(['source_count', 'protein_protein_id', 'tissue', "hla_class"], row)))
    # inserting
    Tissue_protein_count.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_protein_count class II"


########################
# Tissue_protein_count #
########################
def tissue_specific_peptides_creater():
    # Drop the table
    Tissue_specific_peptides.__table__.drop(checkfirst=False)
    # Create the table
    Tissue_specific_peptides.__table__.create(checkfirst=True)

    # collect all sources
    tissues = DBSession.query(Source.organ.distinct()).all()

    ###########
    # CLASS I #
    ###########

    # calculate for each peptide on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            SpectrumHit.sequence.label("spectrum_hit_sequence"), MsRun.antibody_set.label("antibody"))
    query = query.join(MsRun)
    query = query.join(SpectrumHit)
    query = query.filter(func.find_in_set("W6/32", MsRun.antibody_set))

    # TODO: What about multiple spectrum hits on the same source. Are they ignored?
    query = query.group_by(SpectrumHit.sequence)
    peptide_tissue_group_concat = query.all()

    # query the insert
    result = list()
    for tissue in tissues:
        for pep in peptide_tissue_group_concat:
            # if the protein occured only in this tissue
            if pep[0] == tissue[0]:
                query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                        SpectrumHit.sequence.label("spectrum_hit_sequence"),
                                        # static tissue name
                                        sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"),
                                        # static hla class integer
                                        sqlalchemy.sql.expression.literal(1).label("hla_class")
                                        )
                query = query.join(MsRun)
                query = query.join(SpectrumHit)
                query = query.filter(SpectrumHit.sequence == pep[1])
                query = query.filter(func.find_in_set("W6/32", MsRun.antibody_set))
                query = query.group_by(SpectrumHit.sequence)
                insert = query.all()
                for row in insert:
                    result.append(dict(zip(['source_count', 'spectrum_hit_sequence', 'tissue', "hla_class"], row)))
    # inserting
    Tissue_specific_peptides.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_peptide_count class I"

    ############
    # CLASS II #
    ############

    # calculate for each peptide on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            SpectrumHit.sequence.label("spectrum_hit_sequence"), MsRun.antibody_set.label("antibody"))
    query = query.join(MsRun)
    query = query.join(SpectrumHit)
    query = query.filter(func.find_in_set("Tue39", MsRun.antibody_set))
    query = query.filter(func.find_in_set("L243", MsRun.antibody_set))

    # TODO: What about multiple spectrum hits on the same source. Are they ignored?
    query = query.group_by(SpectrumHit.sequence)
    peptide_tissue_group_concat = query.all()

    # query the insert
    result = list()
    for tissue in tissues:
        for pep in peptide_tissue_group_concat:
            # if the protein occured only in this tissue
            if pep[0] == tissue[0]:
                query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                        SpectrumHit.sequence.label("spectrum_hit_sequence"),
                                        # static tissue name
                                        sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"),
                                        # static hla class integer
                                        sqlalchemy.sql.expression.literal(2).label("hla_class")
                                        )
                query = query.join(MsRun)
                query = query.join(SpectrumHit)
                query = query.filter(SpectrumHit.sequence == pep[1])
                query = query.filter(func.find_in_set("Tue39", MsRun.antibody_set))
                query = query.filter(func.find_in_set("L243", MsRun.antibody_set))
                query = query.group_by(SpectrumHit.sequence)
                insert = query.all()
                for row in insert:
                    result.append(dict(zip(['source_count', 'spectrum_hit_sequence', 'tissue', "hla_class"], row)))
    # inserting
    Tissue_specific_peptides.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_peptide_count class II"

# tissue_specific_peptides_creater()
# tissue_protein_count_creater()
