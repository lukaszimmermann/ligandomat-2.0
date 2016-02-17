import sqlalchemy
import transaction

__author__ = 'Linus Backert'

import os
from paste.deploy import appconfig
from sqlalchemy.sql import text
from sqlalchemy import engine_from_config, func, String
from models import DBSession, Base, User, Source, Tissue_protein_count, metadata, Protein, SpectrumHit, \
    t_spectrum_protein_map, MsRun, Tissue_specific_peptides, HLA_statistics, HlaType, t_hla_map, Binding_prediction, \
    PeptideRun, t_peptide_run_spectrum_hit_map, Tissue_hla_specific_peptides, Tissue_hla_protein_count
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
    print "Calculating Tissues specific proteins"
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
                            Protein.protein_id.label("protein_protein_id"),
                            func.group_concat(MsRun.antibody_set.distinct()).label("antibody"))
    query = query.join(MsRun)
    query = query.join(PeptideRun)
    query = query.join(t_peptide_run_spectrum_hit_map)
    query = query.join(SpectrumHit)
    query = query.join(t_spectrum_protein_map)
    query = query.join(Protein)
    query = query.filter(MsRun.antibody_set == "W6/32")

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
                query = query.join(PeptideRun)
                query = query.join(t_peptide_run_spectrum_hit_map)
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
                            Protein.protein_id.label("protein_protein_id"), func.group_concat(MsRun.antibody_set.distinct()).label("antibody"))
    query = query.join(MsRun)
    query = query.join(PeptideRun)
    query = query.join(t_peptide_run_spectrum_hit_map)
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
                query = query.join(PeptideRun)
                query = query.join(t_peptide_run_spectrum_hit_map)
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
    if len(result)>0:
        Tissue_protein_count.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_protein_count class II"

    ############
    # Combined #
    ############

    # calculate for each protein on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            Protein.protein_id.label("protein_protein_id"), func.group_concat(MsRun.antibody_set.distinct()).label("antibody"))
    query = query.join(MsRun)
    query = query.join(PeptideRun)
    query = query.join(t_peptide_run_spectrum_hit_map)
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
                query = query.join(PeptideRun)
                query = query.join(t_peptide_run_spectrum_hit_map)
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

    print str(len(result)) + " rows added into Tissue_protein_count combined"
    print "Calculated Tissues specific proteins"


########################
# Tissue__HLA_protein_count #
########################
def tissue_hla_protein_count_creater():
    print "Calculating Tissues and HLA specific proteins"
    # Drop the table
    Tissue_hla_protein_count.__table__.drop(checkfirst=True)
    # Create the table
    Tissue_hla_protein_count.__table__.create(checkfirst=True)

    # collect all sources
    tissues = DBSession.query(Source.organ.distinct()).all()

    # collect all hlas
    hlas = DBSession.query(HlaType.hla_string).all()

    # calculate for each protein on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            Protein.protein_id.label("protein_protein_id"),
                            func.group_concat(HlaType.hla_string.distinct()).label("hlas"))
    query = query.join(MsRun)
    query = query.join(PeptideRun)
    query = query.join(t_peptide_run_spectrum_hit_map)
    query = query.join(SpectrumHit)
    query = query.join(t_spectrum_protein_map)
    query = query.join(Protein)
    query = query.join(t_hla_map)
    query = query.join(HlaType)
    query = query.join(Binding_prediction, PeptideRun.sequence == Binding_prediction.sequence)
    query = query.filter(Binding_prediction.hla_type_hla_type_id == HlaType.hla_type_id)
    query = query.filter(Binding_prediction.binder == 1)
    query = query.group_by(Protein.protein_id)
    protein_tissue_group_concat = query.all()

    # query the insert
    result = list()
    for tissue in tissues:
        for prot in protein_tissue_group_concat:
            for hla in hlas:
                # if the protein occured only in this tissue and this hla
                if prot[0] == tissue[0] and prot[2] == hla[0]:
                    hla_id = DBSession.query(HlaType.hla_type_id).filter(HlaType.hla_string == hla[0]).one()[0]
                    query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                            Protein.protein_id.label("protein_protein_id"),
                                            # static tissue name
                                            sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"),
                                            # static hla class integer
                                            sqlalchemy.sql.expression.literal(hla_id, type_=String).label(
                                                "hla_type_hla_type_id")
                                            )
                    query = query.join(MsRun)
                    query = query.join(PeptideRun)
                    query = query.join(t_peptide_run_spectrum_hit_map)
                    query = query.join(SpectrumHit)
                    query = query.join(t_spectrum_protein_map)
                    query = query.join(Protein)
                    query = query.join(t_hla_map)
                    query = query.join(HlaType)
                    query = query.filter(Protein.protein_id == prot[1])
                    query = query.filter(HlaType.hla_type_id == hla_id)
                    query = query.group_by(Protein.protein_id)
                    insert = query.all()
                    for row in insert:
                        result.append(dict(zip(['source_count', 'protein_protein_id', 'tissue', "hla_type_hla_type_id"], row)))


    # inserting
    Tissue_hla_protein_count.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_hla_protein_count"
    print "Calculated Tissues and HLA specific proteins"




########################
# tissue_specific_peptides #
########################
def tissue_specific_peptides_creater():
    print "Calculating Tissues specific peptides"
    # Drop the table
    Tissue_specific_peptides.__table__.drop(checkfirst=False)
    # Create the table
    Tissue_specific_peptides.__table__.create(checkfirst=True)

    # collect all sources
    tissues = DBSession.query(Source.organ.distinct()).all()

    # log file
    f = open("logs/tissue_specific_peptides_creater.log", "w")
    f2 = open("logs/tissue_specific_peptides_creater_insert.log", "w")



    ###########
    # CLASS I #
    ###########

    # calculate for each peptide on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            PeptideRun.sequence.label("peptide_run_sequence"), func.group_concat(MsRun.antibody_set.distinct()).label("antibody"))
    query = query.join(MsRun)
    query = query.join(PeptideRun)
    query = query.filter(func.find_in_set("W6/32", MsRun.antibody_set))

    # TODO: What about multiple spectrum hits on the same source. Are they ignored?
    query = query.group_by(PeptideRun.sequence)
    peptide_tissue_group_concat = query.all()

    # query the insert
    result = list()
    for tissue in tissues:
        for pep in peptide_tissue_group_concat:
            # if the protein occured only in this tissue
            if pep[0] == tissue[0]:
                query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                        PeptideRun.sequence.label("peptide_run_sequence"),
                                        # static tissue name
                                        sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"),
                                        # static hla class integer
                                        sqlalchemy.sql.expression.literal(1).label("hla_class")
                                        )
                query = query.join(MsRun)
                query = query.join(PeptideRun)
                query = query.filter(PeptideRun.sequence == pep[1])
                query = query.filter(func.find_in_set("W6/32", MsRun.antibody_set))
                query = query.group_by(PeptideRun.sequence)
                insert = query.all()
                for row in insert:
                    #f.write(str(row) + "\n")
                    result.append(dict(zip(['source_count', 'peptide_run_sequence', 'tissue', "hla_class"], row)))
    # logging
    #for insert in result:
    #    f2.write(str(result)+"\n")
    Tissue_specific_peptides.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_peptide_count class I"

    ############
    # CLASS II #
    ############

    # calculate for each peptide on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            PeptideRun.sequence.label("peptide_run_sequence"), func.group_concat(MsRun.antibody_set.distinct()).label("antibody"))
    query = query.join(MsRun)
    query = query.join(PeptideRun)
    query = query.filter(func.find_in_set("Tue39", MsRun.antibody_set))
    query = query.filter(func.find_in_set("L243", MsRun.antibody_set))

    # TODO: What about multiple spectrum hits on the same source. Are they ignored?
    query = query.group_by(PeptideRun.sequence)
    peptide_tissue_group_concat = query.all()

    # query the insert
    result = list()
    for tissue in tissues:
        for pep in peptide_tissue_group_concat:
            # if the protein occured only in this tissue
            if pep[0] == tissue[0]:
                query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                        PeptideRun.sequence.label("peptide_run_sequence"),
                                        # static tissue name
                                        sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"),
                                        # static hla class integer
                                        sqlalchemy.sql.expression.literal(2).label("hla_class")
                                        )
                query = query.join(MsRun)
                query = query.join(PeptideRun)
                query = query.filter(PeptideRun.sequence == pep[1])
                query = query.filter(func.find_in_set("Tue39", MsRun.antibody_set))
                query = query.filter(func.find_in_set("L243", MsRun.antibody_set))
                query = query.group_by(PeptideRun.sequence)
                insert = query.all()
                for row in insert:
                    #f.write(str(row) + "\n")
                    result.append(dict(zip(['source_count', 'peptide_run_sequence', 'tissue', "hla_class"], row)))
                    # logging
                    #f2.write(str(dict(zip(['source_count', 'spectrum_hit_sequence', 'tissue', "hla_class"], row))) + "\n")



    # inserting
    if len(result)>0:
        Tissue_specific_peptides.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_peptide_count class II"
    print "Calculated Tissues specific peptides"


########################
# tissue_hla_specific_peptides #
########################
def tissue_hla_specific_peptides_creater():
    print "Calculating Tissue and HLA specific peptides"
    # Drop the table
    Tissue_hla_specific_peptides.__table__.drop(checkfirst=True)
    # Create the table
    Tissue_hla_specific_peptides.__table__.create(checkfirst=True)

    # collect all sources
    tissues = DBSession.query(Source.organ.distinct()).all()
    # collect all hlas
    hlas = DBSession.query(HlaType.hla_string.distinct()).all()

    # log file
    f = open("logs/tissue_hla_specific_peptides_creater.log", "w")
    f2 = open("logs/tissue_hla_specific_peptides_creater_insert.log", "w")




    # calculate for each peptide on which tissue they occure
    query = DBSession.query(func.group_concat(Source.organ.distinct()).label('sources'),
                            PeptideRun.sequence.label("peptide_run_sequence"), func.group_concat(HlaType.hla_string.distinct()).label("hla_string"))
    query = query.join(MsRun)
    query = query.join(PeptideRun)
    query = query.join(t_hla_map)
    query = query.join(HlaType)
    query = query.join(Binding_prediction, PeptideRun.sequence == Binding_prediction.sequence)
    query = query.filter(Binding_prediction.hla_type_hla_type_id == HlaType.hla_type_id)
    query = query.filter(Binding_prediction.binder ==1)

    # TODO: What about multiple spectrum hits on the same source. Are they ignored?
    query = query.group_by(PeptideRun.sequence)
    peptide_tissue_group_concat = query.all()

    # query the insert
    result = list()
    for tissue in tissues:
        for hla in hlas:
            for pep in peptide_tissue_group_concat:
                # if the protein occured only in this tissue
                if pep[0] == tissue[0] and pep[2] == hla[0]:
                    hla_id = DBSession.query(HlaType.hla_type_id).filter(HlaType.hla_string == hla[0]).one()[0]

                    query = DBSession.query(func.count(Source.source_id.distinct()).label("source_count"),
                                            PeptideRun.sequence.label("peptide_run_sequence"),
                                            # static tissue name
                                            sqlalchemy.sql.expression.literal(tissue[0], type_=String).label("tissue"),
                                            # static hla type
                                            sqlalchemy.sql.expression.literal(hla_id, type_=String).label("hla_type_hla_type_id")
                                            )
                    query = query.join(MsRun)
                    query = query.join(PeptideRun)
                    query = query.join(t_hla_map)
                    query = query.join(HlaType)
                    query = query.filter(PeptideRun.sequence == pep[1])
                    query = query.filter(HlaType.hla_type_id == hla_id)
                    query = query.group_by(PeptideRun.sequence)
                    insert = query.all()
                    for row in insert:
                        #f.write(str(row) + "\n")
                        result.append(dict(zip(['source_count', 'peptide_run_sequence', 'tissue', "hla_type_hla_type_id"], row)))
    # logging
    #for insert in result:
    #    f2.write(str(result)+"\n")
    Tissue_hla_specific_peptides.__table__.insert().execute(result)

    print str(len(result)) + " rows added into Tissue_hla_peptide_count"


    print "Calculated Tissues and HLA specific peptides"



def HLA_statistics_creater():
    print "Calculating HLA statistics"
    # Drop the table
    HLA_statistics.__table__.drop(checkfirst=True)
    # Create the table
    HLA_statistics.__table__.create(checkfirst=True)


    hlas = DBSession.query(HlaType.hla_type_id).all()

    to_add = []
    for hla in hlas:
        print hla[0]
        # TODO: Maybe peptiderun should be used instead of Spectrum_hit
        # TODO: query actual binding peptide count
        query = DBSession.query(
                HlaType.hla_type_id.label("hla_type_hla_type_id"),
        func.count(Source.source_id.distinct()).label("sample_count"),
                                func.count(PeptideRun.sequence.distinct()).label("binding_peptide_count"),

        )

        query = query.join(t_hla_map)
        query = query.join(Source)
        query = query.join(PeptideRun)
        query = query.join(Binding_prediction, Binding_prediction.sequence == PeptideRun.sequence)
        query = query.filter(Binding_prediction.hla_type_hla_type_id == HlaType.hla_type_id)
        query = query.filter(Binding_prediction.binder == 1)
        query = query.filter(HlaType.hla_type_id == hla[0])
        query = query.group_by(HlaType.hla_type_id)
        result = query.all()

        for allele in result:
            to_add.append(dict(zip(['hla_type_hla_type_id', 'sample_count', "binding_peptide_count"], allele)))
    HLA_statistics.__table__.insert().execute(to_add)
    print "Calculated HLA statistics"



def sequence_extractor():
    print "Extracting class I sequences"
    query = DBSession.query(Source.patient_id.label("patient_id"), Source.source_id.label("source_id"))
    patients = query.all()
    for p in patients:
        patient = p[0]
        source_id = p[1]
        query= DBSession.query(SpectrumHit.sequence.distinct())
        query =  query.join(MsRun)
        query = query.filter(MsRun.antibody_set == "W6/32")
        query = query.group_by(SpectrumHit.sequence)
        query = query.filter(SpectrumHit.source_source_id == source_id)
        result = query.all()

        if os.path.isfile("export/"+patient+"_classI.txt"):
            f = open("export/"+patient+"_classI.txt", "a")
        else:
            f = open("export/"+patient + "_classI.txt", "w")
        for pep in result:
            f.write(str(pep[0]) + "\n")
        f.close()

    print "Extracted class I sequences"

    print "Extracting class II sequences"

    for p in patients:
        patient = p[0]
        source_id = p[1]
        query = DBSession.query(SpectrumHit.sequence.distinct())
        query = query.join(MsRun)
        # assumption: all class II have been at least filtered with Tue39
        query = query.filter(MsRun.antibody_set.like("%Tue39%"))
        query = query.group_by(SpectrumHit.sequence)
        query = query.filter(SpectrumHit.source_source_id == source_id)
        result = query.all()

        if os.path.isfile(patient + "_classI.txt"):
            f = open("export/"+patient + "_classII.txt", "a")
        else:
            f = open("export/"+patient + "_classII.txt", "w")
        for pep in result:
            f.write(str(pep[0]) + "\n")
        f.close()

    print "Extracted class II sequences"

    print "Extracting Typings"
    # writing typing file
    query = DBSession.query(Source.patient_id, func.group_concat(HlaType.hla_string.distinct().op('order by')(HlaType.hla_string)))
    query = query.group_by(Source.patient_id)
    query = query.join(t_hla_map)
    query = query.join(HlaType)
    typings = query.all()
    f = open("export/"+"typings.txt", "w")
    for typing in typings:
        f.write(typing[0]+"\t"+ typing[1]+"\n")
    f.close()
    print "Extracted Typings"


def peptide_run_creater():
    #`peptide_run_id`,
    #  `sequence`,
    #  `length`,
    #  `ms_run_ms_run_id`,
    #  `source_source_id`,
    # `maxRT`, `minRT`,
    #  `maxMZ`, `minMZ`,
    #  `maxScore`, `minScore`,
    #  `maxE`, `minE`, `maxQ`, `minQ`, `PSM`
    # get all ms runs
    # class I
    query = DBSession.query(MsRun.ms_run_id, MsRun.antibody_set)

    #query = query.filter(HlaType.hla_string.notlike("D"))
    query = query.filter(func.find_in_set("W6/32", MsRun.antibody_set))
    ms_runs = query.all()
    count = 1
    for run in ms_runs:
        print str(count)+"/"+ str(len(ms_runs))
        run_id = run[0]
        antibody_set = run[1]
        query = DBSession.query(SpectrumHit.sequence.distinct(),
                                func.length(SpectrumHit.sequence),
                                MsRun.ms_run_id,
                                Source.source_id,
                                func.max(SpectrumHit.RT),
                                func.min(SpectrumHit.RT),
                                func.max(SpectrumHit.MZ),
                                func.min(SpectrumHit.MZ),
                                func.max(SpectrumHit.search_engine_score),
                                func.min(SpectrumHit.search_engine_score),
                                func.max(SpectrumHit.e_value),
                                func.min(SpectrumHit.e_value),
                                func.max(SpectrumHit.q_value),
                                func.min(SpectrumHit.q_value),
                                func.count(SpectrumHit.spectrum_hit_id)
                                )
        query = query.join(MsRun)
        query = query.join(Source)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.join(Binding_prediction)
        #query = query.filter(HlaType.hla_string.notlike("D"))
        query = query.filter(MsRun.ms_run_id == run_id)
        query = query.filter(sqlalchemy.not_(HlaType.hla_string.like("D%")))
        query = query.filter(Binding_prediction.binder==1)
        query = query.filter(SpectrumHit.sequence == Binding_prediction.sequence)
        query = query.group_by(SpectrumHit.sequence)
        filtered_sequences = query.all()
        for item in filtered_sequences:
            peptide_run = PeptideRun(sequence= item[0],
            length = item[1],
            ms_run_ms_run_id = item[2],
            source_source_id = item[3],
            maxRT = item[4],
            minRT = item[5],
            maxMZ = item[6],
            minMZ = item[7],
            maxScore = item[8],
            minScore = item[9],
            maxE = item[10],
            minE = item[11],
            maxQ = item[12],
            minQ = item[13],
            PSM = item[14])
            # spectrum hit relationship
            query = DBSession.query(SpectrumHit)
            query = query.filter(SpectrumHit.sequence == item[0])
            query = query.filter(SpectrumHit.ms_run_ms_run_id == item[2])
            query = query.all()
            for spectrum in query:
                peptide_run.pm_sh_map_spectrum_hit_spectrum_hits.append(spectrum)

            # Protein relationship (could maybe be merged)
            query = DBSession.query(Protein)
            query = query.join(t_spectrum_protein_map)
            query = query.join(SpectrumHit)
            query = query.filter(SpectrumHit.sequence ==item[0])
            query = query.all()
            for protein in query:
                peptide_run.protein_proteins.append(protein)
            DBSession.add(peptide_run)

        transaction.commit()
        count += 1





    # class II
    query = DBSession.query(MsRun.ms_run_id, MsRun.antibody_set)

    # query = query.filter(HlaType.hla_string.notlike("D"))
    query = query.filter(func.find_in_set("Tue39", MsRun.antibody_set))
    ms_runs = query.all()
    count = 1
    for run in ms_runs:
        print str(count) + "/" + str(len(ms_runs))
        run_id = run[0]
        antibody_set = run[1]
        query = DBSession.query(SpectrumHit.sequence.distinct(),
                                func.length(SpectrumHit.sequence),
                                MsRun.ms_run_id,
                                Source.source_id,
                                func.max(SpectrumHit.RT),
                                func.min(SpectrumHit.RT),
                                func.max(SpectrumHit.MZ),
                                func.min(SpectrumHit.MZ),
                                func.max(SpectrumHit.search_engine_score),
                                func.min(SpectrumHit.search_engine_score),
                                func.max(SpectrumHit.e_value),
                                func.min(SpectrumHit.e_value),
                                func.max(SpectrumHit.q_value),
                                func.min(SpectrumHit.q_value),
                                func.count(SpectrumHit.spectrum_hit_id)
                                )
        query = query.join(MsRun)
        query = query.join(Source)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.join(Binding_prediction)
        # query = query.filter(HlaType.hla_string.notlike("D"))
        query = query.filter(MsRun.ms_run_id == run_id)
        query = query.filter(HlaType.hla_string.like("D%"))

        query = query.filter(Binding_prediction.binder == 1)
        query = query.filter(SpectrumHit.sequence == Binding_prediction.sequence)
        query = query.group_by(SpectrumHit.sequence)
        filtered_sequences = query.all()
        for item in filtered_sequences:
            peptide_run = PeptideRun(sequence=item[0],
                                     length=item[1],
                                     ms_run_ms_run_id=item[2],
                                     source_source_id=item[3],
                                     maxRT=item[4],
                                     minRT=item[5],
                                     maxMZ=item[6],
                                     minMZ=item[7],
                                     maxScore=item[8],
                                     minScore=item[9],
                                     maxE=item[10],
                                     minE=item[11],
                                     maxQ=item[12],
                                     minQ=item[13],
                                     PSM=item[14])
            # spectrum hit relationship
            query = DBSession.query(SpectrumHit)
            query = query.filter(SpectrumHit.sequence == item[0])
            query = query.filter(SpectrumHit.ms_run_ms_run_id == item[2])
            query = query.all()
            for spectrum in query:
                peptide_run.pm_sh_map_spectrum_hit_spectrum_hits.append(spectrum)

            # Protein relationship (could maybe be merged)
            query = DBSession.query(Protein)
            query = query.join(t_spectrum_protein_map)
            query = query.join(SpectrumHit)
            query = query.filter(SpectrumHit.sequence == item[0])
            query = query.all()
            for protein in query:
                peptide_run.protein_proteins.append(protein)
            DBSession.add(peptide_run)

        transaction.commit()
        count += 1

    return None

#peptide_run_creater()
#sequence_extractor()

#HLA_statistics_creater()

#tissue_specific_peptides_creater()
#tissue_protein_count_creater()
#tissue_hla_specific_peptides_creater()
#tissue_hla_protein_count_creater()
