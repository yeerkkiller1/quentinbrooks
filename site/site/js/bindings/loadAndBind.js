define(["require", "exports", "jquery", "knockout", "./ajaxCache"], function(require, exports, $, ko, ajax) {
    function loadAndBind(element, url, data) {
        var loadedElems = ko.observable();
        $(element).data("model", data);
        ajax({
            url: url,
            type: "GET"
        }).done(function (html) {
            var loaderElem = document.createElement("div");
            loaderElem.innerHTML = html;

            var elems = $(loaderElem).children().toArray();

            loadedElems(elems);

            elems.forEach(function (elem) {
                element.appendChild(elem);
                ko.applyBindings(data, elem);
            });

            if (typeof data.htmlBound === 'function') {
                data.htmlBound(true);
            }

            if (typeof window.prettyPrint === 'function') {
                window.prettyPrint();
            }
        });
        return loadedElems;
    }

    
    return loadAndBind;
});
