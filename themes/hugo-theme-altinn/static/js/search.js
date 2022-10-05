var lunrIndex, pagesIndex;

// Setup elastic client
var client = window.ElasticAppSearch.createClient({
    searchKey: "search-o7k5ywfvib73vbrih8ay6rxu",
    endpointBase: "https://altinn-studio-docs-elastic.ent.westeurope.azure.elastic-cloud.com",
    engineName: "docs-altinn-studio"
});


//Define elastic search options
var searchOptions = {
    search_fields: { title: {}, meta_description: {}, meta_keywords: {}, headings: {}, body_content: {} },
    result_fields: { id: { raw: {} }, title: { raw: {} }, meta_description: { raw: {} }, url: { raw: {} }, url_path: { raw: {} } },
    analytics: {
        tags: ["docs-altinn-studio-search"]
    }
}

// Define timeout used to wait for user to be done typing
var timeout = null;

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// Trigger search agaist elastic app engine
function search(query, done) {
    done([{ title: { raw: "Searching...." }, url_path: { raw: "" }, dummy: true }]);
    client.search(query, searchOptions)
        .then(resultList => {
            result = resultList.rawResults
                .filter(res => {
                    if (language == "nb") {
                        return res._meta.engine == "docs-altinn-studio-nb"
                    } else {
                        return res._meta.engine == "docs-altinn-studio-en"
                    }
                }).map(res => {
                    res.requestId = resultList.info.meta.request_id;
                    res.query = query;
                    return res;
                })
            done(result);
        })
        .catch(error => {
            console.log(`search error: : ${error}`);
        });
}

// Setup horsey
$(document).ready(function () {
    var horseyList = horsey($("#search-by").get(0), {
        suggestions: function (value, done) {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                var query = $("#search-by").val();
                if (query.length > 2) {
                    search(query, done);
                }
            }, 500);
        },
        filter: function (q, suggestion) {
            return true;
        },
        set: function (value) {
            if (value.dummy) {
                return;
            }
            client.click({
                query: value.query,
                documentId: value.id.raw,
                requestId: value.requestId,
                tags: ["docs-altinn-studio-search"]
            }).then(r => {
                location.href = value.href;
            })
            .catch(error => {
                console.log(`click reg error: ${error}`)
                location.href = value.href;
            })
            
        },
        render: function (li, suggestion) {
            var uri = suggestion.url_path.raw.substring(1, suggestion.url_path.raw.length);

            suggestion.href = baseurl + uri;

            var text = "";
            if (suggestion.meta_description) {
                text = suggestion.meta_description.raw;
            }
            var image = '<div>' + '» ' + suggestion.title.raw + '</div><div style="font-size:12px">' + (text) + '</div>';
            li.innerHTML = image;
        },
        limit: 10
    });
    horseyList.refreshPosition();
});
