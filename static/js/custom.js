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
    $('*[class*=v-container]').each(function() {
        $(this).css('display', 'none')

        var id = $(this).attr('id');
        $('#version-selector').append('<li id=li-'+id+'>' + id.replace(" ", ", ") + '</li>');
    });

    $('*[class*=v-container]:first').css('display', 'block')
    $('#version-selector li:first').addClass('active')

    $('#version-selector li').click(function(e) { 
        var idToShow = $(this).text().split(",")[0]

        $('*[class*=v-container]').each(function() {
            $(this).css('display', 'none')
        });

        $('#version-selector li').each(function() {
            $(this).removeClass('active')
        });

        $('*[id*='+idToShow+']').css('display', 'inline-block')
        $('li[id*='+idToShow+']').addClass('active')
    });
    /* end */
});
