define(["require", "exports", "jquery"], function(require, exports, $) {
    var cacheCallbacks = {};

    function ajax(settings) {
        var url = settings.url;

        if (cacheCallbacks[url])
            return cacheCallbacks[url];

        cacheCallbacks[url] = $.ajax(settings);

        return cacheCallbacks[url];
    }

    
    return ajax;
});
