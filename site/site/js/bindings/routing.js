define(["require", "exports", "knockout"], function(require, exports, ko) {
    var curRouteData = null;

    ko.bindingHandlers.route = {
        init: function (element, valueAccessor, allBindings, viewModel) {
            if (curRouteData) {
                console.error("You cannot have a page with multiple routes, you already have " + curRouteData + " as your route, and tried to set the route to " + valueAccessor());
                return;
            }
            curRouteData = valueAccessor();

            var initialRoute = window.location.search;

            var paramRegex = new RegExp("[?&](\\w+)=([^&]*)($|&)");

            var initialData = {};

            while (initialRoute.match(paramRegex)) {
                var matches = initialRoute.match(paramRegex);
                var match = matches[0];

                var name = decodeURIComponent(matches[1]);
                var value = decodeURIComponent(matches[2]);

                initialData[name] = value;

                var index = initialRoute.indexOf(match);
                initialRoute = initialRoute.substr(0, index) + initialRoute.substr(index + match.length);
            }

            for (var initialName in initialData) {
                var data = initialData[initialName];
                curRouteData[initialName](data);
            }

            var interpolatedURL = ko.computed(function () {
                var url = "?";

                for (var name in curRouteData) {
                    var value = curRouteData[name]();
                    url += name + "=" + value + "&";
                }

                return url;
            });

            history.replaceState({}, "", interpolatedURL());

            interpolatedURL.subscribe(function (url) {
                history.pushState({}, "", url);
            });
        }
    };
});
