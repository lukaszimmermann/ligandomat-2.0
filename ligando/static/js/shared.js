/**
 * Created by Backert on 05/02/15.
 */

// POST forward to a page with parameters
function post(path, params, count, method) {
    // warn if too many peptides
    if(count >5000){
        if(!confirm("This query will probably take some time. Are you sure you want to get the whole list?")){
            return;
        }
    }
    method = method || "post"; // Set method to post by default if not specified.

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

// return separated links
function get_separate_links(path_link, input){
    var link = input.split(',');
    var link_string = "";
    for(var i = 0; i< link.length; i++){
        var t = link[i].trim();
        link_string += "<a class='nostylelink'  href= '/"+ path_link+ "/"+t + "'>"+t + "</a>, ";
    }
    return link_string.slice(0,-2);
}