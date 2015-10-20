from sqlalchemy import or_, func
import simplejson as json
from collections import Counter

__author__ = 'Linus Backert'

from sqlalchemy.orm import aliased

#colors for all different organs
colors={'blood':["#bf616a", "#cd848b"],
            'brain':["#5B90BF", "#7ea8cd"],
            'ovary':["#a3be8c", "#bed1ad"],
            'kidney':["#d08770", "#dda797"],
            'colon':["#ab7967", "#be9789"],
            'lung':["#ebcb8b", "#f2deb5"],
            'bladder':["#96b5b4", "#b4cac9"],
            'bone marrow':["#8fa1b3", "#adbac7"],
            'breast':["#b48ead","#c8acc3"],
            'liver':["#473550", "#63496e"],
            'cervix':["#65292f", "#8a3840"],
            'smooth muscle':["#284967", "#36648c"],
            'muscle':["#465b33", "#5f7c46"],
            'pancreas':["#6c3423","#92472f"],
            'skin':["#5c3e33","#7d5445"],
            'spleen':["#7a5815", "#a6781c"],
            'small intestine':["3b5453", "#507170"],
            'heart, small intestine':["#3a4755","#4e6173"],
            'myelon':["#361619", "#5b252a"],
            'stomach':["#152737", "#24425c"],
            'thyroid':["#26311c", "#3f522e"],
            'thymus':["#31211b", "#52372d"]}



# writes to log files
def log_writer(logfile, message):
    logs = {'source_metadata': 'source_metadata_log.txt',
            'source_metadata_complete': 'source_metadata_log_complete.txt',
            'source_update': 'source_update_log.txt',
            'source_update_complete': 'source_update_log_complete.txt',
            'ms_run_metadata': 'ms_run_metadata_log.txt',
            'ms_run_metadata_complete': 'ms_run_metadata_complete_log.txt',
            'ms_run_update': 'ms_run_update_log.txt',
            'ms_run_update_complete': 'ms_run_update_log_complete.txt',
            "blacklist": "blacklist_log.txt",
            "unblacklist": "unblacklist_log.txt",
    }
    with open("logs/"+logs[logfile], "a") as log:
        log.write(str(message)+'\n')
    log.close()


# Extracts the number of digits of the hla typing
def hla_digits_extractor(hla):
    try:
        asterisk_split = hla.split("*")
        digit_split = asterisk_split[1].split(":")
        return len(digit_split) * 2
    except:
        return None


# Create a json object from a list
def js_list_creator(input):
    result_string = '['
    for i in input:
        result_string += '"' + unicode(i[0]) + '",'
    result_string += ']'
    return result_string


# Create a json object from a list which is usable in DataTables
def js_list_creator_dataTables(input):
    result_string = '['
    for i in input:
        result_string += '["' + unicode(i[0]) + '"],'
    result_string += ']'
    return result_string


# Filter function:
# Parameter:
# query = DBSession.query object
# parameter = the parameter in der request for which you want to filter
# request = a dict with filter parameter
#   sqlobject = the sqlcollum you want to filter (as String!)
#   sqlparent = the sql table which contains the table
#   rule = the key for filter combination rule in the filter_dict
#   like = use like?
#   set = are you filter a set
#   fk = foreign key which you have to join first (used for protein an hla only yet)
def create_filter(query, parameter, request, sql_object, sql_parent, rule, like, set, fk=None):
    if parameter in request:
        if len(request[parameter]) is not 0:
            split = request[parameter].split(';')
            if len(split) > 1:
                if set:
                    if request[rule] == 'AND':
                        for s in split:
                            query = query.filter(func.find_in_set(s, getattr(sql_parent, sql_object)))
                    else:
                        query = query.filter(
                            or_(*[func.find_in_set(s, getattr(sql_parent, sql_object)) for s in split]))
                elif request[rule] == "AND":
                    for s in range(0, len(split)):
                        if s == 0:
                            if like:
                                query = query.filter(getattr(sql_parent, sql_object).like(split[s]))
                            else:
                                query = query.filter(getattr(sql_parent, sql_object) == split[s])
                        else:
                            a_alias = aliased(sql_parent)
                            if fk is not None:
                                query = query.join(a_alias, fk)
                            if like:
                                query = query.filter(getattr(a_alias, sql_object).like(split[s]))
                            else:
                                query = query.filter(getattr(a_alias, sql_object) == split[s])
                                # TODO: add second search to result (e.g. second Protein)
                else:
                    query = query.filter(or_(*[(getattr(sql_parent, sql_object).like(split[s])) for s in split]))
            else:
                if set:
                    query = query.filter(func.find_in_set(split[0], getattr(sql_parent, sql_object)))

                elif rule == ">" or rule == "<":
                    if rule == ">":
                        query = query.filter(getattr(sql_parent, sql_object) > split[0])
                    else:
                        query = query.filter(getattr(sql_parent, sql_object) < split[0])
                else:
                    if like:
                        query = query.filter(getattr(sql_parent, sql_object).like(split[0]))
                    else:
                        query = query.filter(getattr(sql_parent, sql_object) == split[0])

    return query

# Standard error message
conn_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to run the "initialize_ligando_db" script
    to initialize your database tables.  Check your virtual
    environment's "bin" directory for this script and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""

def get_chart_data(sources):
    organ = []
    organ_list =[]

    for source in sources:
        organ.append(source['organ'])

    organs = Counter(organ)


    for key,value in organs.iteritems():
        organ_json ={}
        organ_json['label']=key
        organ_json['value']=value
        organ_json['color']= colors[key][0]
        organ_json['highlight']= colors[key][1]
        organ_list.append(organ_json)
    organ_chart= json.dumps(organ_list)

    return organ_chart