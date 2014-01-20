define(["require", "exports", "jquery", "knockout", "./loadAndBind"], function(require, exports, $, ko, loadAndBind) {
    function koControl(ctor, update) {
        var name = ctor.name;
        var url = "/html/koControls/" + name + ".html";

        ko.bindingHandlers[name] = {
            init: function (element, valueAccessor) {
                //QTODO: Consider delaying the constructor to after the html is loaded
                //  (if this is done a dynamic dependency system will also likely have to be added).
                var viewModel = new ctor(element, valueAccessor());
                loadAndBind(element, url, viewModel);

                return { controlsDescendantBindings: true };
            }, update: update
        };
    }

    
    return koControl;
});
