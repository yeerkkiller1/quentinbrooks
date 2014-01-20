import $ = require("jquery");

var cacheCallbacks: { [url: string]: JQueryXHR } = {};

function ajax(settings: JQueryAjaxSettings): JQueryXHR {
    var url = settings.url;

    if (cacheCallbacks[url]) return cacheCallbacks[url];

    cacheCallbacks[url] = $.ajax(settings);

    return cacheCallbacks[url];
}

export = ajax;