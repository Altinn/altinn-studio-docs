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

    /* handles doc versions */
    const contentVersionSelectorId = "content-version-selector";
    const contentVersionContainerId = "content-version-container"
    const contentVersionLabel = "content-version-label"

    var containerCounter = 0

    $('*[class*='+contentVersionContainerId+']').each(function() {
        $(this).css('display', 'none')

        let id = "version-container-" + containerCounter;
        $(this).attr('id', id);

        $('#'+contentVersionSelectorId+'').append('<li id='+id+'>' 
            + $(this).find('.'+contentVersionLabel).text() + '</li>');

        containerCounter++;
    });

    $('*[class*='+contentVersionContainerId+']:last').css('display', 'block')
    $('#'+contentVersionSelectorId+' li:last').addClass('active')

    $('#'+contentVersionSelectorId+' li').click(function(e) { 
        let idToShow = $(this).attr('id');

        $('*[class*='+contentVersionContainerId+']').each(function() {
            $(this).css('display', 'none')
        });

        $('#'+contentVersionSelectorId+' li').each(function() {
            $(this).removeClass('active')
        });

        $("*[id*="+idToShow+"]").css('display', 'inline-block')
        $('li[id*='+idToShow+']').addClass('active')
    });
    /* end */
});
