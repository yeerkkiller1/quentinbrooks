import $ = require("jquery");
import ko = require("knockout");
import loadAndBind = require("./loadAndBind");

function koControl<PARAMS, T>(
    ctor: new (element: HTMLElement, params: PARAMS) => T,
    update?: (element:HTMLElement, valueAccessor: () => PARAMS, allBindings?, viewModel?: T, bindingContext?) => void
) {
    var name = (<any>ctor).name;
    var url = "/html/koControls/" + name + ".html";

    (<any>ko.bindingHandlers)[name] = {
        init: (element: HTMLElement, valueAccessor: () => PARAMS) => {
            //QTODO: Consider delaying the constructor to after the html is loaded
            //  (if this is done a dynamic dependency system will also likely have to be added).
            var viewModel = new ctor(element, valueAccessor());
            loadAndBind(element, url, viewModel);

            return { controlsDescendantBindings: true };
        }, update: update
    };
}

export = koControl;