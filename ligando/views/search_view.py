from pyramid.view import view_config
import simplejson as json

from ligando.models import (
    DBSession,
    Source,
    MsRun,
    Protein,
    HlaType,
    PeptideRun)


@view_config(route_name='search', renderer='../templates/search_result.pt', request_method="POST")
def search_result(request):
    # try:
    result = dict()
    # Search SpectrumHit Sequence
    result["peptide"] = json.dumps(DBSession.query(PeptideRun.sequence.distinct().label('peptide')).join(MsRun).filter(
        PeptideRun.sequence.like("%" + request.params["search_all"].upper() + "%")
                                  ).filter(MsRun.flag_trash==0).filter(PeptideRun.source_source_id != None).all())
    test = request.params["search_all"].upper()
    # Search organ columns
    result["organ"] = json.dumps(DBSession.query(Source.organ.distinct().label('organ')).filter(
        Source.organ == request.params["search_all"]).all())

    # Search HLA
    # TODO: Wildcard search allow!
    result["hla"] = json.dumps(DBSession.query(HlaType.hla_string.distinct().label('hla')).filter(
        HlaType.hla_string == request.params["search_all"]).all())
    # Search Protein
    result["protein"] = json.dumps(DBSession.query(Protein.name.distinct().label('protein')).filter(
        Protein.name == request.params["search_all"]).all())
    # Search Protein with gene name
    if result["protein"] == "[]":
        result["protein"] = json.dumps(DBSession.query(Protein.name.distinct().label('protein')).filter(
            Protein.gene_name == request.params["search_all"]).all())

        # except:
        # return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return result
