import $ = require("jquery");
import ko = require("knockout");

import koControl = require("./koControl");

class jobmineParams {
    url: string;
}

class jobmineData {
    public data = ko.observable("{}");
    public obj = ko.observable({});
    public array = ko.observableArray();

    constructor(element: HTMLElement, params: jobmineParams) {
        $.ajax(params.url).done(data => {
            this.data(data);
            var obj = JSON.parse(data);
            this.obj(obj);

            var array = [];
            
            for (var key in obj) {
                array.push(obj[key]);
            }

            this.array(array);
        });
    }
}

koControl(jobmineData);