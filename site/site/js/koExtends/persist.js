define(["require", "exports", "knockout"], function(require, exports, ko) {
    ko.extenders.persist = function (target, option) {
        var storageKey = "koPersist_" + option;
        if (localStorage.getItem(storageKey)) {
            target(localStorage.getItem(storageKey));
        }

        target.subscribe(function (value) {
            localStorage.setItem(storageKey, value);
        });

        return target;
    };
});
