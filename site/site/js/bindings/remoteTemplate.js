define(["require", "exports", "knockout", "./loadAndBind", "./ajaxCache"], function(require, exports, ko, loadAndBind, ajax) {
    ko.bindingHandlers.remoteTemplate = {
        init: function (element, valueAccessor) {
            loadAndBind(element, valueAccessor(), {});

            return { controlsDescendantBindings: true };
        }
    };
});
