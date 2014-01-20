define(["require", "exports", "jquery", "knockout", "./koControl"], function(require, exports, $, ko, koControl) {
    var jobmineParams = (function () {
        function jobmineParams() {
        }
        return jobmineParams;
    })();

    var jobmineData = (function () {
        function jobmineData(element, params) {
            var _this = this;
            this.data = ko.observable("{}");
            this.obj = ko.observable({});
            this.array = ko.observableArray();
            $.ajax(params.url).done(function (data) {
                _this.data(data);
                var obj = JSON.parse(data);
                _this.obj(obj);

                var array = [];

                for (var key in obj) {
                    array.push(obj[key]);
                }

                _this.array(array);
            });
        }
        return jobmineData;
    })();

    koControl(jobmineData);
});
