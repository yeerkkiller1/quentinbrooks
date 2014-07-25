define(["require", "exports", "knockout", "./loadAndBind"], function(require, exports, ko, loadAndBind) {
    ko.bindingHandlers.remoteTemplate = {
        init: function (element, valueAccessor) {
            loadAndBind(element, valueAccessor(), {});

            return { controlsDescendantBindings: true };
        }
    };
});
