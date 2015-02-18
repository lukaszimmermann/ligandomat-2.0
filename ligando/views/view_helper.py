from sqlalchemy import or_

__author__ = 'Linus Backert'

from sqlalchemy.orm import aliased


def js_list_creator(input):
    result_string = '['
    for i in input:
        result_string += '"' + str(i[0]) + '",'
    result_string += ']'
    return result_string

def js_list_creator_dataTables(input):
    result_string = '['
    for i in input:
        result_string += '["' + str(i[0]) + '"],'
    result_string += ']'
    return result_string

def create_filter(query, parameter, request, sql_object, sql_parent, rule, like, fk=None):
    if len(request[parameter]) is not 0:
        split = request[parameter].split(';')
        if len(split) > 1:
            if request[rule] == "AND":
                for s in range(0, len(split)):
                    if s == 0:
                        if like:
                            query = query.filter(getattr(sql_parent, sql_object).like(split[s]))
                        else:
                            query = query.filter(getattr(sql_parent, sql_object) == split[s])
                    else:
                        a_alias = aliased(sql_parent)
                        query = query.join(a_alias, fk)
                        if like:
                            query = query.filter(getattr(a_alias, sql_object).like(split[s]))
                        else:
                            query = query.filter(getattr(a_alias, sql_object) == split[s])
                            # TODO: add second search to result (e.g. second Protein)
            else:
                # temp_code = "query = query.filter(or_("
                # for s in split:
                #     if like:
                #         temp_code += "getattr(sql_parent, sql_object).like(split[s])," % s
                #     else:
                #         temp_code += "getattr(sql_parent,sql_object) == '%s'," % s
                # temp_code = temp_code.strip(",")
                # temp_code += "))"
                # exec temp_code
                query = query.filter(or_(*[(getattr(sql_parent, sql_object).like(split[s])) for s in split]))
        else:
            if rule == ">" or rule == "<":
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
