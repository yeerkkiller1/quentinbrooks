define(["require", "exports", "knockout"], function(require, exports, ko) {
    ko.bindingHandlers.iFrameHeight = {
        init: function (element) {
            var id = setInterval(function () {
                var clientRect = element.contentDocument.body.getBoundingClientRect();
                element.style.height = clientRect.height + 'px';
            }, 500);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                clearInterval(id);
            });
        }
    };
});
