/// <amd-dependency path="koExtends/persist">

import $ = require("jquery");
import ko = require("knockout");
import _ = require("underscore");

import koControl = require("./koControl");

class searchParams {
    array: KnockoutObservableArray<any>;
}

function extract(term: string, regex: RegExp, results: string[]): string {
    while (term.match(regex)) {
        results.push(term.match(regex)[0]);
        term = term.replace(regex, "");
    }

    return term;
}

export class searchResult {
    match: number;
    antiMatch: number;
    item: any;
}

export class SearchQuery {
    matchTerms: string[] = [];
    antiMatchTerms: string[] = [];
}

class search {
    public searchQuery = ko.observable("").extend({persist: 'searchQuery'});
    public results: KnockoutComputed<any[]>;

    searchData: KnockoutObservableArray<any>;

    public searchQueryObj: KnockoutComputed<SearchQuery>;

    constructor(element: HTMLElement, params: searchParams) {
        this.searchData = params.array;

        this.setupSearchQuery();

        this.setupResults();
    }

    setupSearchQuery() {
        this.searchQueryObj = ko.computed(() => {
            var searchQuery = this.searchQuery().toLowerCase();

            var verbatim = new RegExp("['\"][^'\"]+['\"]");

            var terms: string[] = [];

            searchQuery = extract(searchQuery, verbatim, terms);
            terms = _.map(terms, term => term.substr(1, term.length - 2));

            terms = terms.concat(searchQuery.split(new RegExp("\\s+")));
            terms = _.filter(terms, term => term.length > 0);

            var matchTerms = _.filter(terms, term => term.indexOf("-") !== 0);
            var antiMatchTerms = _.filter(terms, term => term.indexOf("-") === 0);
            antiMatchTerms = _.map(antiMatchTerms, term => term.substr(1));

            var searchObj = new SearchQuery();
            searchObj.matchTerms = matchTerms;
            searchObj.antiMatchTerms = antiMatchTerms;

            return searchObj;
        });
    }

    setupResults() {
        this.results = ko.computed(() => {
            var searchObj = this.searchQueryObj();
            var matchTerms = searchObj.matchTerms;
            var antiMatchTerms = searchObj.antiMatchTerms;

            var matches: searchResult[] = [];

            //With a lookup table this could become much much faster...
            _.forEach(this.searchData(), item => {
                var match = 0;
                var antiMatch = 0;

                var rawText = JSON.stringify(item).toLowerCase();

                _.forEach(matchTerms, term => {
                    if (rawText.indexOf(term) >= 0) {
                        match++;
                    }
                });

                _.forEach(antiMatchTerms, term => {
                    if (rawText.indexOf(term) >= 0) {
                        antiMatch++;
                    }
                });

                if (match > 0) {
                    matches.push({ match: match, antiMatch: antiMatch, item: item });
                }
            });

            return matches;
        });
    }

    getResults(maxCount: number): KnockoutComputed<any[]> {
        return ko.computed(() => {
            var results = this.results();
            var count = Math.min(results.length, maxCount);

            var culledResults = [];
            for (var ix = 0; ix < count; ix++) {
                culledResults.push(results[ix]);
            }
            return culledResults;
        });
    }
}

koControl(search);