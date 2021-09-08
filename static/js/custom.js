// Set class on body

$(document).ready(function() {
    if(window.location.href.match('/app/')){
        $("body").addClass("adocs-apps");
    }
    if(window.location.href.match('/api/')){
        $("body").addClass("adocs-apis");
    }
    if(window.location.href.match('/community/')){
        $("body").addClass("adocs-comm");
    }
    if(window.location.href.match('/technology/')){
        $("body").addClass("adocs-tech");
    }
});
