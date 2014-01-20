import ko = require("knockout");

import loadAndBind = require("./loadAndBind");

import ajax = require("./ajaxCache");

(<any>ko.bindingHandlers).remoteTemplate = {
    init: (element: HTMLElement, valueAccessor) => {
        loadAndBind(element, valueAccessor(), {});

        return { controlsDescendantBindings: true };
    }
};