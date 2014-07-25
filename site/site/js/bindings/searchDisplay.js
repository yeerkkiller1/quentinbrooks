define(["require", "exports", "./koControl"], function(require, exports, koControl) {
    var searchDisplayParams = (function () {
        function searchDisplayParams() {
        }
        return searchDisplayParams;
    })();

    var searchDisplay = (function () {
        function searchDisplay(element, params) {
            for (var key in searchDisplay) {
                this[key] = this[key].bind(this);
            }

            var result = params.data;
            this.result = result;
            this.data = result.item;
            this.titleOnly = params.titleOnly;

            this.query = params.query;

            var html = JSON.stringify(this.data, null, '    ');

            this.highlightedHTML = html;
        }
        searchDisplay.prototype.highlightHTML = function (html) {
            _.forEach(this.query.matchTerms, function (term) {
                html = html.replace(new RegExp(term, "gi"), "<span class='termMatch'>" + term + "</span>");
            });

            return html;
        };
        return searchDisplay;
    })();

    koControl(searchDisplay);
});
