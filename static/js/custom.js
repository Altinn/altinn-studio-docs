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

    const contentVersionTabsId = "content-version-tabs";
    const contentVersionContainerId = "content-version-container";
    const contentVersionLabelId = "content-version-label";

    var containerCounter = 0

    $('*[class*='+contentVersionContainerId+']').each(function() {
        $(this).css('display', 'none')

        let id = "version-container-" + containerCounter;
        $(this).attr('id', id);

        $(this).closest('.'+contentVersionSelectorId)
            .find('#'+contentVersionTabsId+'')
            .append('<li id='+id+'>' 
                + $(this).find('.'+contentVersionLabelId).text() + '</li>');

        containerCounter++;
    });

    $('*[class*='+contentVersionSelectorId+']').each(function() {
        $(this).find('*[class*='+contentVersionContainerId+']:first').css('display', 'block')
        $(this).find('#'+contentVersionTabsId+' li:first').addClass('active')
    });

    $('#'+contentVersionTabsId+' li').click(function(e) { 
        let idToShow = $(this).attr('id');

        $(this).closest('.'+contentVersionSelectorId)
            .find('*[class*='+contentVersionContainerId+']')
                .each(function() {
                    $(this).css('display', 'none')
                });

        $(this).closest('.'+contentVersionSelectorId)
            .find('#'+contentVersionTabsId+' li')
                .each(function() {
                    $(this).removeClass('active')
                });

        $("*[id*="+idToShow+"]").css('display', 'inline-block')
        $('li[id*='+idToShow+']').addClass('active')
    });
    /* end */

    /**
     * When clicking a link navigating directly to an 'expandlarge' shortcode section, automatically open it
     */
    function expandHashTarget() {
        const id = (window.location.hash || '#').substring(1);
        if (id != null && id.length > 0) {
            const potentialExpanders = [
                document.getElementById(id),
                document.getElementById(id + '-expander'),
                document.getElementById(id + '-expandable')
            ];
            
            for (const element of potentialExpanders) {
                if (!element || !element.classList.contains('adocs-expand')) {
                    continue;
                }

                $(element).find('a[aria-expanded="false"]').click();
                element.scrollIntoView();
                break;                
            }
        }
    }
    window.addEventListener('hashchange', expandHashTarget, false);
    expandHashTarget();
});
