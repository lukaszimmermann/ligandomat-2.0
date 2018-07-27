# coding: utf-8
from sqlalchemy import Column, Date, Enum, Float, ForeignKey, Integer, SmallInteger, String, Table, Text, text, \
    UniqueConstraint
from sqlalchemy.dialects.mysql.base import BIT, TINYINT
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    relationship)

from zope.sqlalchemy import ZopeTransactionExtension

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()
metadata = Base.metadata

t_hla_map = Table(
    'hla_map', metadata,
    Column('fk_hla_type_id', ForeignKey(u'hla_type.hla_type_id'), nullable=False, index=True),
    Column('fk_source_id', ForeignKey(u'source.source_id'), nullable=False, index=True)
)


class HlaType(Base):
    __tablename__ = 'hla_type'

    hla_type_id = Column(Integer, primary_key=True, unique=True)
    hla_string = Column(String(255), nullable=False)
    digits = Column(Integer)

    fk_sources = relationship(u'Source', secondary='hla_map', backref='hlatypes')


class InternDatum(Base):
    __tablename__ = 'intern_data'

    id = Column(Integer, primary_key=True)
    timestamp = Column(String(255))
    seq = Column(String(15))
    run = Column(String(255))
    rest = Column(Text)
    source_id = Column(Integer)
    hla_typing = Column(String(255))
    prep_id = Column(Integer)
    mass_spec_id = Column(Integer)


class LogFile(Base):
    __tablename__ = 'log_file'

    log_file_id = Column(Integer, primary_key=True)
    tmp_name = Column(String(255), nullable=False)
    action = Column(Enum(u'upload'), nullable=False, server_default=text("'upload'"))
    users_users_id = Column(ForeignKey(u'users.id'), nullable=False, index=True)
    successful = Column(BIT(1), nullable=False)
    message = Column(Text)

    users_users = relationship(u'User')


class MsRun(Base):
    __tablename__ = 'ms_run'

    ms_run_id = Column(Integer, primary_key=True)
    filename = Column(String(255, u'latin1_german1_ci'), nullable=False, unique=True)
    ms_run_date = Column(Date)
    used_share = Column(Float(asdecimal=True))
    comment = Column(Text(collation=u'latin1_german1_ci'))
    source_source_id = Column(ForeignKey(u'source.source_id'), index=True)
    method_file = Column(String(255, u'latin1_german1_ci'))
    sample_mass = Column(Float(asdecimal=True))
    antibody_set = Column(String(7, u'latin1_german1_ci'), nullable=False)
    antibody_mass = Column(Float(asdecimal=True))
    sample_volume = Column(Float(asdecimal=True))
    replicate = Column(String(15, u'latin1_german1_ci'))
    flag_mzml = Column(Integer, nullable=False, server_default=text("'0'"))
    flag_msgf_sph130927 = Column(Integer, nullable=False, server_default=text("'0'"))
    flag_masc_sph130927 = Column(Integer, nullable=False, server_default=text("'0'"))
    flag_xtan_sph130927 = Column(Integer, nullable=False, server_default=text("'0'"))
    flag_omss_sph130927 = Column(Integer, nullable=False, server_default=text("'0'"))
    flag_fefi = Column(Integer, nullable=False, server_default=text("'0'"))
    flag_trash = Column(Integer, nullable=False, server_default=text("'0'"))
    trash_reason = Column(String(200, u'latin1_german1_ci'))

    source_source = relationship(u'Source')


t_peptide_protein_map = Table(
    'peptide_protein_map', metadata,
    Column('peptide_run_peptide_run_id', ForeignKey(u'peptide_run.peptide_run_id'), nullable=False, index=True),
    Column('protein_protein_id', ForeignKey(u'protein.protein_id'), nullable=False, index=True)
)


class PeptideRun(Base):
    __tablename__ = 'peptide_run'

    peptide_run_id = Column(Integer, primary_key=True)
    sequence = Column(String(100), nullable=False, index=True)
    length = Column(Integer, nullable=False, index=True)
    ms_run_ms_run_id = Column(ForeignKey(u'ms_run.ms_run_id'), nullable=False, index=True)
    source_source_id = Column(ForeignKey(u'source.source_id'), index=True)
    maxRT = Column(Float(asdecimal=True))
    minRT = Column(Float(asdecimal=True))
    maxMZ = Column(Float(asdecimal=True))
    minMZ = Column(Float(asdecimal=True))
    maxScore = Column(SmallInteger)
    minScore = Column(SmallInteger, index=True)
    maxE = Column(Float(asdecimal=True))
    minE = Column(Float(asdecimal=True))
    maxQ = Column(Float(asdecimal=True))
    minQ = Column(Float(asdecimal=True))
    PSM = Column(Integer)

    ms_run_ms_run = relationship(u'MsRun')
    source_source = relationship(u'Source')
    pm_sh_map_spectrum_hit_spectrum_hits = relationship(u'SpectrumHit', secondary='peptide_run_spectrum_hit_map')
    protein_proteins = relationship(u'Protein', secondary='peptide_protein_map')


t_peptide_run_spectrum_hit_map = Table(
    'peptide_run_spectrum_hit_map', metadata,
    Column('pm_sh_map_peptide_run_peptide_run_id', ForeignKey(u'peptide_run.peptide_run_id'), nullable=False, index=True),
    Column('pm_sh_map_spectrum_hit_spectrum_hit_id', ForeignKey(u'spectrum_hit.spectrum_hit_id'), nullable=False, index=True)
)


class Protein(Base):
    __tablename__ = 'protein'

    protein_id = Column(Integer, primary_key=True)
    name = Column(String(12), nullable=False, unique=True)
    description = Column(Text)
    sequence = Column(Text, nullable=False)
    organism = Column(String(45))
    gene_name = Column(String(45))

    spectrum_hit_spectrum_hits = relationship(u'SpectrumHit', secondary='spectrum_protein_map')


class Source(Base):
    __tablename__ = 'source'

    source_id = Column(Integer, primary_key=True)
    sample_id = Column(String(200, u'latin1_german1_ci'), nullable=False, unique=True)
    comment = Column(String(200, u'latin1_german1_ci'))
    organ = Column(String(45, u'latin1_german1_ci'), nullable=False, index=True)
    organism = Column(String(45, u'latin1_german1_ci'), nullable=False)
    histology = Column(String(45, u'latin1_german1_ci'), nullable=False, index=True)
    dignity = Column(String(45, u'latin1_german1_ci'), nullable=False, index=True)
    celltype = Column(String(45, u'latin1_german1_ci'), index=True, server_default=text("'None'"))
    person = Column(String(90, u'latin1_german1_ci'))
    location = Column(String(45, u'latin1_german1_ci'), server_default=text("'NA'"))
    metastatis = Column(Integer, server_default=text("'0'"))
    patient_id = Column(String(45, u'latin1_german1_ci'), nullable=False, index=True)
    treatment = Column(String(45, u'latin1_german1_ci'))
    prep_date = Column(Date, index=True)


class SpectrumHit(Base):
    __tablename__ = 'spectrum_hit'

    spectrum_hit_id = Column(Integer, primary_key=True)
    RT = Column(Float(asdecimal=True))
    MZ = Column(Float(asdecimal=True))
    charge = Column(Integer, index=True)
    search_engine_score = Column(Float(asdecimal=True))
    e_value = Column(Float(asdecimal=True))
    PEP = Column(Float(asdecimal=True))
    q_value = Column(Float(asdecimal=True))
    ms_run_ms_run_id = Column(ForeignKey(u'ms_run.ms_run_id'), nullable=False, index=True)
    precursorarea = Column(Float(asdecimal=True))
    injectiontime = Column(Float(asdecimal=True))
    first_scan = Column(Integer, nullable=False)
    last_scan = Column(Integer, nullable=False)
    MH = Column(Float(asdecimal=True))
    delta_m = Column(Float(asdecimal=True))
    ions_matched_1 = Column(SmallInteger)
    ions_matched_2 = Column(SmallInteger)
    isolation_interference = Column(Integer)
    rank = Column(Integer)
    search_engine_rank = Column(Integer)
    delta_score = Column(Float(asdecimal=True))
    delta_cn = Column(Float(asdecimal=True))
    source_source_id = Column(ForeignKey(u'source.source_id'), index=True)
    modifications = Column(String(60, u'latin1_german1_ci'))
    sequence = Column(String(100, u'latin1_german1_ci'), index=True)
    mzML_id = Column(Integer)

    ms_run_ms_run = relationship(u'MsRun')
    source_source = relationship(u'Source')


t_spectrum_protein_map = Table(
    'spectrum_protein_map', metadata,
    Column('spectrum_hit_spectrum_hit_id', ForeignKey(u'spectrum_hit.spectrum_hit_id'), nullable=False, index=True),
    Column('protein_protein_id', ForeignKey(u'protein.protein_id'), nullable=False, index=True)
)


class Tissue_protein_count(Base):
    __tablename__ = 'tissue_protein_count'

    tissue_protein_count_id = Column(Integer, primary_key=True)
    tissue = Column(String(45, u'latin1_german1_ci'), index=True)
    protein_protein_id = Column(Integer, ForeignKey(u'protein.protein_id'), nullable=False, index=True)
    source_count = Column(Integer, nullable=False)
    hla_class = Column(Integer, index=True)

    protein_protein = relationship(u'Protein')

class Tissue_hla_protein_count(Base):
    __tablename__ = 'tissue_hla_protein_count'

    tissue_hla_protein_count_id = Column(Integer, primary_key=True)
    tissue = Column(String(45, u'latin1_german1_ci'), index=True)
    protein_protein_id = Column(Integer, ForeignKey(u'protein.protein_id'), nullable=False, index=True)
    source_count = Column(Integer, nullable=False)
    hla_type_hla_type_id = Column(Integer, ForeignKey(u'hla_type.hla_type_id'),
                                  nullable=False, index=True)

    protein_protein = relationship(u'Protein')
    hla_type_hla_type = relationship(u'HlaType')

    UniqueConstraint('tissue', 'hla_type_hla_type_id', 'method', name='tissue_hla_protein')


class Tissue_specific_peptides(Base):
    __tablename__ = 'tissue_specific_peptides'

    tissue_specific_peptides_id = Column(Integer, primary_key=True)
    tissue = Column(String(45, u'latin1_german1_ci'), index=True)
    peptide_run_sequence = Column(String(100, u'latin1_german1_ci'), ForeignKey(u'spectrum_hit.sequence'),
                                   nullable=False, index=True)
    source_count = Column(Integer, nullable=False)
    hla_class = Column(Integer, index=True)

    spectrum_hit_spectrum_hit = relationship(u'SpectrumHit')

class Tissue_hla_specific_peptides(Base):
    __tablename__ = 'tissue_hla_specific_peptides'

    tissue_specific_peptides_id = Column(Integer, primary_key=True)
    tissue = Column(String(45, u'latin1_german1_ci'), index=True)
    peptide_run_sequence = Column(String(100, u'latin1_german1_ci'), ForeignKey(u'spectrum_hit.sequence'),
                                   nullable=False, index=True)
    source_count = Column(Integer, nullable=False)
    hla_type_hla_type_id = Column(Integer, ForeignKey(u'hla_type.hla_type_id'),
                                  nullable=False, index=True)

    spectrum_hit_spectrum_hit = relationship(u'SpectrumHit')
    hla_type_hla_type = relationship(u'HlaType')

    UniqueConstraint('tissue', 'hla_type_hla_type_id', 'method', name='tissue_hla')


class Tissue_HLA_peptide_count(Base):
    __tablename__ = 'tissue_HLA_peptide_count'
    tissue_HLA_peptide_count_id = Column(Integer, primary_key=True)
    tissue = Column(String(45, u'latin1_german1_ci'), index=True)
    hla_type_hla_types_id = Column(ForeignKey(u'hla_type.hla_type_id'), nullable=False, index=True)
    peptide_count = Column(Integer, nullable=False)

    hla_types_hla_types = relationship(u'HlaType')


class HLA_statistics(Base):
    __tablename__ = 'HLA_statistics'
    HLA_statistics_id = Column(Integer, primary_key=True)
    sample_count = Column(Integer)
    peptide_count = Column(Integer)
    binding_peptide_count = Column(Integer)
    hla_type_hla_type_id = Column(ForeignKey(u'hla_type.hla_type_id'), nullable=False, index=True)

    hla_types_hla_type = relationship(u'HlaType')

class Binding_prediction(Base):
    __tablename__ = 'binding_prediction'
    binding_prediction_id = Column(Integer, primary_key=True)
    sequence = Column(String(100, u'latin1_german1_ci'), index=True)
    method = Column(String(45), index=True)
    binding_score = Column(Float)
    rank = Column(Float)
    binder = Column(TINYINT, index=True)
    hla_type_hla_type_id = Column(ForeignKey(u'hla_type.hla_type_id'), nullable=False, index=True)

    hla_types_hla_type = relationship(u'HlaType')
    UniqueConstraint('sequence','hla_type_hla_type_id', 'method', name='sequence_hla_method')

class Peptide_query(Base):
    __tablename__ = 'peptide_query'
    peptide_query_id = Column(Integer, primary_key=True)
    sequence = Column(String(100, u'latin1_german1_ci'), index=True)
    proteins = Column(Text)
    gene_names = Column(Text)
    tissues = Column(Text)
    hla_types = Column(Text)

class DB_statistics(Base):
    __tablename__ = "db_statistics"
    db_statistics_id = Column(Integer, primary_key=True)
    length = Column(Integer)
    count = Column(Integer)
    hla_class =  Column(Integer)



class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(255))
    password = Column(String(255))
    in_group = Column(String(255))
    person_person_id = Column(Integer)


# from sqlalchemy import (
#     Column, Date, Enum, Float, ForeignKey, Integer, SmallInteger, String, Table, Text, text
# )
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.dialects.mysql.base import BIT
#
# from sqlalchemy.orm import (
#     scoped_session,
#     sessionmaker,
#     relationship,
#     backref)
#
# from zope.sqlalchemy import ZopeTransactionExtension
#
# DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
# Base = declarative_base()
# metadata = Base.metadata
#
#
#
#
#
# class HlaTypes(Base):
#     __tablename__ = 'hla_types'
#
#     hla_types_id = Column(Integer, primary_key=True, unique=True)
#     hla_string = Column(String(255), nullable=False)
#     digits = Column(Integer)
#     #source_source = relationship(u'Source', secondary='hla_map')
#
#
# class MsRun(Base):
#     __tablename__ = 'ms_run'
#
#     ms_run_id = Column(Integer, primary_key=True)
#     filename = Column(String(255, u'latin1_german1_ci'), unique=True)
#     ms_run_date = Column(Date)
#     used_share = Column(Float(asdecimal=True))
#     comment = Column(Text(collation=u'latin1_german1_ci'))
#     source_source_id = Column(ForeignKey(u'source.source_id'), index=True, nullable=True)
#     method_file = Column(String(255, u'latin1_german1_ci'))
#     sample_mass = Column(Float(asdecimal=True))
#     antibody_set = Column(String(7, u'latin1_german1_ci'), nullable=False)
#     antibody_mass = Column(Float(asdecimal=True))
#     sample_volume = Column(Float(asdecimal=True))
#     replicate = Column(String(15))
#     flag_mzml = Column(Integer(),nullable=False)
#     flag_masc_sph130927 = Column(Integer(),nullable=False)
#     flag_xtan_sph130927 = Column(Integer(),nullable=False)
#     flag_omss_sph130927 = Column(Integer(),nullable=False)
#     flag_fefi = Column(Integer(),nullable=False)
#     flag_trash = Column(Integer(), nullable=False)
#     trash_reason = Column(String(200))
#     source_source = relationship(u'Source')
#
# peptide protein map table
# t_peptide_protein_map = Table(
#     'peptide_protein_map', metadata,
#     Column('peptide_run_peptide_run_id', ForeignKey(u'peptide_run.peptide_run_id'), nullable=False, index=True),
#     Column('protein_protein_id', ForeignKey(u'protein.protein_id'), nullable=False, index=True)
# )
#
#
# class PeptideRun(Base):
#     __tablename__ = 'peptide_run'
#
#     peptide_run_id = Column(Integer, primary_key=True)
#     sequence = Column(String(60), nullable=False, index=True)
#     length = Column(Integer, nullable=False, index=True)
#     ms_run_ms_run_id = Column(ForeignKey(u'ms_run.ms_run_id'), nullable=False, index=True)
#     source_source_id = Column(ForeignKey(u'source.source_id'), nullable=False, index=True)
#     maxRT = Column(Float(asdecimal=True))
#     minRT = Column(Float(asdecimal=True))
#     maxMZ = Column(Float(asdecimal=True))
#     minMZ = Column(Float(asdecimal=True))
#     maxScore = Column(SmallInteger)
#     minScore = Column(SmallInteger, index=True)
#     maxE = Column(Float(asdecimal=True))
#     minE = Column(Float(asdecimal=True))
#     maxQ = Column(Float(asdecimal=True))
#     minQ = Column(Float(asdecimal=True))
#     PSM = Column(Integer)
#
#     ms_run_ms_run = relationship(u'MsRun')
#     source_source = relationship(u'Source')
#     pm_sh_map_spectrum_hit_spectrum_hits = relationship(u'SpectrumHit', secondary='peptide_run_spectrum_hit_map')
#     protein_proteins = relationship(u'Protein', secondary='peptide_protein_map')
#
#
# # peptide run spectrum hit map table
# t_peptide_run_spectrum_hit_map = Table(
#     'peptide_run_spectrum_hit_map', metadata,
#     Column('pm_sh_map_peptide_run_peptide_run_id', ForeignKey(u'peptide_run.peptide_run_id'), nullable=False,
#            index=True),
#     Column('pm_sh_map_spectrum_hit_spectrum_hit_id', ForeignKey(u'spectrum_hit.spectrum_hit_id'), nullable=False,
#            index=True)
# )

#
# class Protein(Base):
#     __tablename__ = 'protein'
#
#     protein_id = Column(Integer, primary_key=True)
#     name = Column(String(12), nullable=False, unique=True)
#     description = Column(Text)
#     sequence = Column(Text)
#     organism = Column(String(45))
#     gene_name = Column(String(45))
#
#     spectrum_hit_spectrum_hits = relationship(u'SpectrumHit', secondary='spectrum_protein_map')
#
# # mapping table HLA map
# t_hla_map = Table(
#     'hla_map', metadata,
#     Column('fk_hla_types_id', ForeignKey(u'hla_types.hla_types_id'), nullable=False, index=True),
#     Column('fk_source_id', ForeignKey(u'source.source_id'), nullable=False, index=True)
# )
#
# class Source(Base):
#     __tablename__ = 'source'
#
#     source_id = Column(Integer, primary_key=True)
#     sample_id = Column(String(200, u'latin1_german1_ci'), nullable=False, unique=True)
#     comment = Column(String(45, u'latin1_german1_ci'))
#     organ = Column(String(45, u'latin1_german1_ci'))
#     organism = Column(String(45, u'latin1_german1_ci'))
#     histology = Column(String(45, u'latin1_german1_ci'))
#     dignity = Column(String(45, u'latin1_german1_ci'))
#     celltype = Column(String(45, u'latin1_german1_ci'))
#     person = Column(String(90, u'latin1_german1_ci'))
#     location = Column(String(45, u'latin1_german1_ci'))
#     metastatis = Column(Integer, server_default=text("'0'"))
#     patient_id = Column(String(45, u'latin1_german1_ci'), nullable=False)
#     treatment = Column(String(45, u'latin1_german1_ci'))
#     prep_date = Column(Date, nullable=False)
#
#     hla_type_hla_types = relationship('Hla_types', secondary='t_hla_map', backref="sources")
#
#
#
# class SpectrumHit(Base):
#     __tablename__ = 'spectrum_hit'
#
#     spectrum_hit_id = Column(Integer, primary_key=True)
#     RT = Column(Float(asdecimal=True))
#     MZ = Column(Float(asdecimal=True))
#     charge = Column(Integer, index=True)
#     ionscore = Column(SmallInteger)
#     e_value = Column(Float(asdecimal=True))
#     PEP = Column(Float(asdecimal=True))
#     q_value = Column(Float(asdecimal=True))
#     ms_run_ms_run_id = Column(ForeignKey(u'ms_run.ms_run_id'), nullable=False, index=True)
#     precursorarea = Column(Float(asdecimal=True))
#     injectiontime = Column(Float(asdecimal=True))
#     first_scan = Column(Integer, nullable=False)
#     last_scan = Column(Integer, nullable=False)
#     MH = Column(Float(asdecimal=True))
#     delta_m = Column(Float(asdecimal=True))
#     ions_matched_1 = Column(SmallInteger)
#     ions_matched_2 = Column(SmallInteger)
#     isolation_interference = Column(Integer)
#     rank = Column(Integer)
#     search_engine_rank = Column(Integer)
#     delta_score = Column(Float(asdecimal=True))
#     delta_cn = Column(Float(asdecimal=True))
#     source_source_id = Column(ForeignKey(u'source.source_id'), nullable=False, index=True)
#     modifications = Column(String(60, u'latin1_german1_ci'))
#     sequence = Column(String(60, u'latin1_german1_ci'), index=True)
#     flag_traffic_light = Column(Integer(),nullable=False)
#     length = Column(Integer)
#     # i have no idea where this comes from
#     #intern_ms_id = Column(Integer)
#
#
#     ms_run_ms_run = relationship(u'MsRun')
#     source_source = relationship(u'Source')
#     protein_proteins = relationship(u'Protein', secondary='spectrum_protein_map')
#     #fk_processing = relationship(u'Processing')
#
#
# # spectrum hit protein map table
# t_spectrum_protein_map = Table(
#     'spectrum_protein_map', metadata,
#     Column('spectrum_hit_spectrum_hit_id', ForeignKey(u'spectrum_hit.spectrum_hit_id'), nullable=False, index=True),
#     Column('protein_protein_id', ForeignKey(u'protein.protein_id'), nullable=False, index=True)
#
# )
#
#
#
# # #################################
# # # Intern data
# # class InternDatum(Base):
# #     __tablename__ = 'intern_data'
# #
# #     id = Column(Integer, primary_key=True)
# #     timestamp = Column(String(255))
# #     seq = Column(String(15))
# #     run = Column(String(255))
# #     rest = Column(Text)
# #     source_id = Column(Integer)
# #     hla_typing = Column(String(255))
# #     prep_id = Column(Integer)
# #     mass_spec_id = Column(Integer)
# #
# #
# # class LogFile(Base):
# #     __tablename__ = 'log_file'
# #
# #     log_file_id = Column(Integer, primary_key=True)
# #     tmp_name = Column(String(255), nullable=False)
# #     action = Column(Enum(u'upload'), nullable=False, server_default=text("'upload'"))
# #     users_users_id = Column(ForeignKey(u'users.id'), nullable=False, index=True)
# #     successful = Column(BIT(1), nullable=False)
# #     message = Column(Text)
# #
# #     users_users = relationship(u'User')
# #
# #
# # class User(Base):
# #     __tablename__ = 'users'
# #
# #     id = Column(Integer, primary_key=True)
# #     username = Column(String(255))
# #     password = Column(String(255))
# #     in_group = Column(String(255))
# #     person_person_id = Column(Integer)
# #
# #     # #################################