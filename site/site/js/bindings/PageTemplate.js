/// <amd-dependency path="./remoteTemplate">
define(["require", "exports", "knockout", "./koControl", "./remoteTemplate"], function(require, exports, ko, koControl) {
    var Page = (function () {
        function Page() {
        }
        return Page;
    })();

    var PageParams = (function () {
        function PageParams() {
        }
        return PageParams;
    })();

    var PageTemplate = (function () {
        function PageTemplate(element, params) {
            var _this = this;
            this.curPageName = ko.observable("");
            this.pages = params.pages;

            this.curPageName(this.pages[0].name);

            this.curPage = ko.computed(function () {
                var pageName = _this.curPageName();
                for (var ix = 0; ix < _this.pages.length; ix++) {
                    var page = _this.pages[ix];
                    if (page.name === pageName)
                        return page;
                }
                return null;
            });
        }
        return PageTemplate;
    })();

    koControl(PageTemplate);
});
