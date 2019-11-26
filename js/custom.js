// Set class on body

$(document).ready(function() {
    if(window.location.href.match('/design/')){
        $("body").addClass("adocs-design");
    }
    if(window.location.href.match('/teknologi/')){
        $("body").addClass("adocs-teknologi");
    }
    if(window.location.href.match('/innhold/')){
        $("body").addClass("adocs-innhold");
    }
});