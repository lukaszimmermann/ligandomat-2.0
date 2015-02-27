from pyramid.response import Response
from pyramid.view import view_config
import simplejson as json

from ligando.models import (
    DBSession,
    Source,
    MsRun,
    Protein,
    SpectrumHit,
    t_spectrum_protein_map)
from ligando.views.view_helper import conn_err_msg, js_list_creator, js_list_creator_dataTables


# Venn analyis GET
@view_config(route_name='venn_analysis', renderer='../templates/venn_analysis.pt', request_method="GET")
def venn_analysis(request):
    # try:
    # getting source names for autocomplete
    query = DBSession.query(Source.name)
    sources = js_list_creator(query.all())
    # getting ms_runs for autocomplete
    query = DBSession.query(MsRun.filename)
    ms_runs = js_list_creator(query.all())
    # Antibody for autocomplete
    query = DBSession.query(MsRun.antibody_set.distinct()).order_by(MsRun.antibody_set)
    antibody = js_list_creator(query.all())

    # except:
    # return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {"sources": sources, "ms_runs": ms_runs, "antibody": antibody}


# Venn analyis POST
@view_config(route_name='venn_analysis', renderer='../templates/venn_analysis_result.pt', request_method="POST")
def venn_analysis_result(request):
    # TODO: exchange ms run names. Because they are to long for a nice picture
    # Check if MS runs or Sources are selected
    ms_run_search = False
    for i in range(1, 7):
        if request.params["ms_run_" + str(i)] != "":
            ms_run_search = True

    # query for the ms runs
    if ms_run_search:
        ms_runs = dict()
        # find the peptides
        if request.params["prot_pep"] == "Peptide":
            for i in range(1, 7):
                if request.params["ms_run_" + str(i)] != "":
                    query = DBSession.query(SpectrumHit.sequence.distinct())
                    query = query.join(MsRun)
                    query = query.filter(MsRun.filename == request.params["ms_run_" + str(i)])
                    temp = query.all()
                    ms_runs[i] = [(j[0]) for j in temp]
                else:
                    ms_runs[i] = ""

        # find the proteins
        else:
            for i in range(1, 7):
                if request.params["ms_run_" + str(i)] != "":
                    query = DBSession.query(Protein.name.distinct())
                    query = query.join(t_spectrum_protein_map)
                    query = query.join(SpectrumHit)
                    query = query.join(MsRun)
                    query = query.filter(MsRun.filename == request.params["ms_run_" + str(i)])
                    temp = query.all()
                    ms_runs[i] = [(j[0]) for j in temp]
                else:
                    ms_runs[i] = ""
        # create result dictionary
        result = dict()
        result["result"] = json.dumps(ms_runs)
        temp = dict()
        alias = dict()
        for i in range(1, 7):
            alias[i] = "Run " + str(i)
            temp[i] = request.params["ms_run_" + str(i)]
        result["names"] = json.dumps(alias)
        result["real_names"] = json.dumps(temp)

    # query for the source
    else:
        sources = dict()
        # find the peptides
        if request.params["prot_pep"] == "Peptide":
            for i in range(1, 7):
                if request.params["source_" + str(i)] != "":
                    query = DBSession.query(SpectrumHit.sequence.distinct())
                    query = query.join(Source)
                    query = query.filter(Source.name == request.params["source_" + str(i)])
                    if not (request.params["antibody"] == "all" or request.params["antibody"] == ""):
                        query = query.join(MsRun)
                        query = query.filter(MsRun.antibody_set == request.params["antibody"])
                    temp = query.all()
                    sources[i] = [(j[0]) for j in temp]
                else:
                    sources[i] = ""
        # find the proteins
        else:
            for i in range(1, 7):
                if request.params["source_" + str(i)] != "":
                    query = DBSession.query(Protein.name.distinct())
                    query = query.join(t_spectrum_protein_map)
                    query = query.join(SpectrumHit)
                    query = query.join(Source)
                    query = query.filter(Source.name == request.params["source_" + str(i)])
                    if not (request.params["antibody"] == "all" or len(request.params["antibody"]) == 0):
                        query = query.join(MsRun)
                        query = query.filter(MsRun.antibody_set == request.params["antibody"])
                    temp = query.all()
                    sources[i] = [(j[0]) for j in temp]
                else:
                    sources[i] = ""
        # create result dictionary
        result = dict()
        result["result"] = json.dumps(sources)
        temp = dict()
        for i in range(1, 7):
            temp[i] = request.params["source_" + str(i)]
        result["names"] = json.dumps(temp)
        # Not setting or setting to None did not work...
        result["real_names"] = 0

    return result


