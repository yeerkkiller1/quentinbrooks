/// <amd-dependency path="koExtends/persist">
define(["require", "exports", "jquery", "knockout", "underscore", "./koControl", "koExtends/persist"], function(require, exports, $, ko, _, koControl) {
    var searchParams = (function () {
        function searchParams() {
        }
        return searchParams;
    })();

    function extract(term, regex, results) {
        while (term.match(regex)) {
            results.push(term.match(regex)[0]);
            term = term.replace(regex, "");
        }

        return term;
    }

    var searchResult = (function () {
        function searchResult() {
        }
        return searchResult;
    })();
    exports.searchResult = searchResult;

    var SearchQuery = (function () {
        function SearchQuery() {
            this.matchTerms = [];
            this.antiMatchTerms = [];
        }
        return SearchQuery;
    })();
    exports.SearchQuery = SearchQuery;

    var search = (function () {
        function search(element, params) {
            this.searchQuery = ko.observable("").extend({ persist: 'searchQuery' });
            this.searchData = params.array;

            this.setupSearchQuery();

            this.setupResults();
        }
        search.prototype.setupSearchQuery = function () {
            var _this = this;
            this.searchQueryObj = ko.computed(function () {
                var searchQuery = _this.searchQuery().toLowerCase();

                var verbatim = new RegExp("['\"][^'\"]+['\"]");

                var terms = [];

                searchQuery = extract(searchQuery, verbatim, terms);
                terms = _.map(terms, function (term) {
                    return term.substr(1, term.length - 2);
                });

                terms = terms.concat(searchQuery.split(new RegExp("\\s+")));
                terms = _.filter(terms, function (term) {
                    return term.length > 0;
                });

                var matchTerms = _.filter(terms, function (term) {
                    return term.indexOf("-") !== 0;
                });
                var antiMatchTerms = _.filter(terms, function (term) {
                    return term.indexOf("-") === 0;
                });
                antiMatchTerms = _.map(antiMatchTerms, function (term) {
                    return term.substr(1);
                });

                var searchObj = new SearchQuery();
                searchObj.matchTerms = matchTerms;
                searchObj.antiMatchTerms = antiMatchTerms;

                return searchObj;
            });
        };

        search.prototype.setupResults = function () {
            var _this = this;
            this.results = ko.computed(function () {
                var searchObj = _this.searchQueryObj();
                var matchTerms = searchObj.matchTerms;
                var antiMatchTerms = searchObj.antiMatchTerms;

                var matches = [];

                //With a lookup table this could become much much faster...
                _.forEach(_this.searchData(), function (item) {
                    var match = 0;
                    var antiMatch = 0;

                    var rawText = JSON.stringify(item).toLowerCase();

                    _.forEach(matchTerms, function (term) {
                        if (rawText.indexOf(term) >= 0) {
                            match++;
                        }
                    });

                    _.forEach(antiMatchTerms, function (term) {
                        if (rawText.indexOf(term) >= 0) {
                            antiMatch++;
                        }
                    });

                    if (match > 0) {
                        matches.push({ match: match, antiMatch: antiMatch, item: item });
                    }
                });

                matches.sort(function (a, b) {
                    return (b.match - b.antiMatch) - (a.match - a.antiMatch);
                });

                return matches;
            });
        };

        search.prototype.getResults = function (maxCount) {
            var _this = this;
            return ko.computed(function () {
                var results = _this.results();
                var count = Math.min(results.length, maxCount);

                var culledResults = [];
                for (var ix = 0; ix < count; ix++) {
                    culledResults.push(results[ix]);
                }
                return culledResults;
            });
        };
        return search;
    })();

    koControl(search);
});
