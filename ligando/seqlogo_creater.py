__author__ = 'Linus Backert'


import os
from paste.deploy import appconfig
from sqlalchemy import engine_from_config
from .models import DBSession, Base, Source, \
    MsRun, HlaType, t_hla_map, Binding_prediction, \
    PeptideRun



here = os.path.dirname(__file__)
settings = appconfig('config:' + os.path.join(here, '../', 'development.ini'))

engine = engine_from_config(settings, 'sqlalchemy.')
DBSession.configure(bind=engine)
Base.metadata.bind = engine




# Location to save logos
# SET OUTPUT DIR
output_dir = here + "/static/seqlogo/test/"


# Method to create Peptide binding motif by a list of peptides and filename
# peptides need the same length
def seq2logo_by_peptide_list(peptides, file_name):
    # write list to file
    # Note: peptides have to be trimmed to same length if query not already done
    # change peptide to peptide[1:9]
    peptide_file = open('peptide.txt', 'w')
    for peptide in peptides:
        peptide_file.write("%s\n" % peptide)
    peptide_file.close()

    os.system("../seq2logo-2.0/Seq2Logo.py  -I 1 -H ends --format PNG -f peptide.txt -o " + output_dir + file_name)

    # delete peptide file and unnecessary output afterwards
    os.remove("peptide.txt")
    os.remove(output_dir + file_name + ".txt")
    os.remove(output_dir + file_name + ".eps")
    os.remove(output_dir + file_name + "_freq.mat")

    # correct filename as seq2logo names logos "-001.png"
    old_file_name = output_dir + file_name + "-001.png"
    new_file_name = output_dir + file_name.split("-")[0]+".png"
    os.rename(old_file_name, new_file_name)


if __name__ == '__main__':
    print "Started SeqLogo creation"

    hlas = DBSession.query(HlaType.hla_string).all()
    for i in range(8, 20, 1):
        print i
        for h in hlas:
            hla = h[0]
            print hla
            # Test query to get peptide list
            query = DBSession.query(PeptideRun.sequence.distinct())
            query = query.join(MsRun)
            query = query.join(Source)
            query = query.join(t_hla_map)
            query = query.join(HlaType)
            query = query.join(Binding_prediction, PeptideRun.sequence == Binding_prediction.sequence)
            query = query.filter(Binding_prediction.hla_type_hla_type_id == HlaType.hla_type_id)
            query = query.filter(Binding_prediction.binder == 1)
            query = query.filter(HlaType.hla_string == hla)
            query = query.filter(PeptideRun.length == i) # peptides must have same length

            # List of peptides for which one will create the Peptide binding motif-Logo
            peptide_list = query.all()
            filename = hla.replace("*", "_").replace(":", "")+"_" + str(i)

            print "Queried " + filename

            if len(peptide_list) >10:
                seq2logo_by_peptide_list(peptide_list, filename)
            else:
                print "No peptides found for "+ filename

    print "Completed SeqLogo creation"