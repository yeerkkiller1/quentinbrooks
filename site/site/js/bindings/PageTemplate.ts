/// <amd-dependency path="./remoteTemplate">

import ko = require("knockout");

import koControl = require("./koControl");

class Page {
    public name: string;
    public url: string;
}

class PageParams {
    pages: Page[];
}

class PageTemplate {
    pages: Page[];

    curPage: KnockoutComputed<Page>;
    curPageName = ko.observable("");

    constructor(element: HTMLElement, params: PageParams) {
        this.pages = params.pages;

        this.curPageName(this.pages[0].name);

        this.curPage = ko.computed(() => {
            var pageName = this.curPageName();
            for (var ix = 0; ix < this.pages.length; ix++) {
                var page = this.pages[ix];
                if (page.name === pageName) return page;
            }
            return null;
        });
    }
}

koControl(PageTemplate);