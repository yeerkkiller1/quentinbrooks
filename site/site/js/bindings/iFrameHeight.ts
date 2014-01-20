import ko = require("knockout");

(<any>ko.bindingHandlers).iFrameHeight = {
    init: (element: HTMLIFrameElement) => {
        var id = setInterval(() => {
            var clientRect = element.contentDocument.body.getBoundingClientRect();
            element.style.height = clientRect.height + 'px';
        }, 500);

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            clearInterval(id);
        });
    }
};