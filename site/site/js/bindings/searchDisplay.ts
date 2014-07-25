import $ = require("jquery");
import ko = require("knockout");

import koControl = require("./koControl");

import se = require("./search");

class searchDisplayParams {
    data: se.searchResult;
    query: se.SearchQuery;
    titleOnly: boolean;
}

class searchDisplay {
    public result: se.searchResult;
    public data: any;
    public highlightedHTML: string;
    public titleOnly: boolean;

    query: se.SearchQuery;

    constructor(element: HTMLElement, params: searchDisplayParams) {
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

    highlightHTML(html) {
        _.forEach(this.query.matchTerms, term => {
            html = html.replace(new RegExp(term, "gi"), "<span class='termMatch'>" + term + "</span>");
        });

        return html;
    }
}

koControl(searchDisplay);