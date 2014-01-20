import $ = require("jquery");
import ko = require("knockout");

import ajax = require("./ajaxCache");

function loadAndBind<T>(element: HTMLElement, url: string, data: T): KnockoutObservable<HTMLElement[]> {
    var loadedElems = ko.observable<HTMLElement[]>();
    $(element).data("model", data);
    ajax({
        url: url,
        type: "GET"
    }).done(html => {
        var loaderElem = document.createElement("div");
        loaderElem.innerHTML = html;

        var elems = $(loaderElem).children().toArray();

        loadedElems(elems);

        elems.forEach(elem => {
            element.appendChild(elem);
            ko.applyBindings(data, elem);
        });

        if (typeof (<any>data).htmlBound === 'function') {
            (<any>data).htmlBound(true);
        }

        if (typeof (<any>window).prettyPrint === 'function') {
            (<any>window).prettyPrint();
        }
    });
    return loadedElems;
}

export = loadAndBind;