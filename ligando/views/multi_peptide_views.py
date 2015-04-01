__author__ = 'Linus Backert'
from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import func
from sqlalchemy.exc import DBAPIError
import simplejson as json
from sqlalchemy import or_

from ligando.models import (
    DBSession,
    Source,
    MsRun,
    PeptideRun,
    Protein,
    HlaType,
    t_hla_map,
    t_peptide_protein_map,
    SpectrumHit,
    t_spectrum_protein_map)
from ligando.views.view_helper import conn_err_msg, create_filter


# DOES NOT WORK YET!

@view_config(route_name='multi_peptide', renderer='../templates/multi_peptide.pt', request_method="GET")
def multi_peptide(request):
    return dict()


@view_config(route_name='multi_peptide', renderer='../templates/multi_peptide.pt', request_method="POST")
def multi_peptide_result(request):
    # TODO: remove empty peptide at end
    if request.params["peptide_input"] != '':
        split_peptides = request.params["peptide_input"].split("\r\n")

        query = DBSession.query(func.count(MsRun.ms_run_id).label("source_count"), HlaType.hla_string)
        # query = DBSession.query(func.count(Source.source_id).label("source_count"), HlaType.hla_string)
        query = query.join(Source)
        query = query.join(HlaLookup)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.group_by(HlaType.hla_string)
        source_count = query.all()
        hla_dict_count = dict()
        for s in source_count:
            hla_dict_count[s[1]] = s[0]


        # per peptide
        query = DBSession.query(SpectrumHit.sequence,
                                Source.name.label("name"),
                                HlaType.hla_string, func.count(HlaType.hla_string))
        # func.group_concat(HlaType.hla_string).label("hla"))
        query = query.join(Source)
        query = query.join(HlaLookup)
        query = query.join(t_hla_map)
        query = query.join(HlaType)
        query = query.filter(or_(*[(SpectrumHit.sequence == pep) for pep in split_peptides]))
        query = query.group_by(SpectrumHit.sequence, HlaType.hla_string)
        result = query.all()
        # iterate over result and count each HLA
        # TODO: maybe query first only the hla and then get also the source name and a distinct hla for each peptide
        sources = set()
        for r in result:
            sources.add(r[1])

        hla_dict = dict()
        for r in result:
            if r[2] in hla_dict:
                hla_dict[r[2]] += r[3]
            else:
                hla_dict[r[2]] = r[3]

        hla_dict_normalized = dict()
        for k, v in hla_dict.iteritems():
            hla_dict_normalized[k] = (float(v) / len(sources)) / hla_dict_count[k]

        for k, v in hla_dict_normalized.iteritems():
            print str(k) + "\t" + str(v)


            # # per source
            # query = DBSession.query(SpectrumHit.sequence,
            # Source.name.label("name"),
            # HlaType.hla_string)
            # # func.group_concat(HlaType.hla_string).label("hla"))
            # query = query.join(Source)
            # query = query.join(HlaLookup)
            # query = query.join(t_hla_map)
            # query = query.join(HlaType)
            # query = query.filter(or_(*[(SpectrumHit.sequence == pep) for pep in split_peptides]))
            # result = query.all()
            # # iterate over result and count each HLA
            # # TODO: maybe query first only the hla and then get also the source name and a distinct hla for each peptide
            # sources = set()
            # for r in result:
            # sources.add(r[1])
            #
            # hla_dict = dict()
            # for r in result:
            #     if r[2] in hla_dict:
            #         hla_dict[r[2]] += 1
            #     else:
            #         hla_dict[r[2]] = 1
            #
            # hla_dict_normalized = dict()
            # for k, v in hla_dict.iteritems():
            #     hla_dict_normalized[k] = (float(v) / len(sources)) / hla_dict_count[k]
            #
            # for k, v in hla_dict_normalized.iteritems():
            #     print str(k) + "\t" + str(v)

            # # per Spectrum hit
            # query = DBSession.query(SpectrumHit.spectrum_hit_id ,SpectrumHit.sequence,
            #                         Source.name.label("name"),
            #                         HlaType.hla_string)
            #                         #func.group_concat(HlaType.hla_string).label("hla"))
            # query = query.join(Source)
            # query = query.join(HlaLookup)
            # query = query.join(t_hla_map)
            # query = query.join(HlaType)
            # query = query.filter(or_(*[(SpectrumHit.sequence == pep) for pep in split_peptides]))
            # result = query.all()
            # # iterate over result and count each HLA
            # # TODO: maybe query first only the hla and then get also the source name and a distinct hla for each peptide
            # sources = set()
            # spectra = set()
            # for r in result:
            #     sources.add(r[2])
            #     spectra.add(r[0])
            #
            # hla_dict = dict()
            # for r in result:
            #     if r[3] in hla_dict:
            #         hla_dict[r[3]] += 1
            #     else:
            #         hla_dict[r[3]] = 1
            #
            # hla_dict_normalized = dict()
            # for k, v in hla_dict.iteritems():
            #     hla_dict_normalized[k] = (float(v)/len(spectra))/hla_dict_count[k]
            #
            # for k,v in hla_dict_normalized.iteritems():
            #     print str(k) + "\t" + str(v)
    return dict()

