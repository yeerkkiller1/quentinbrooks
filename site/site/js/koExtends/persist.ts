import ko = require("knockout");

(<any>ko.extenders).persist = (target, option) => {
    var storageKey = "koPersist_" + option;
    if (localStorage.getItem(storageKey)) {
        target(localStorage.getItem(storageKey));
    }

    target.subscribe(value => {
        localStorage.setItem(storageKey, value);
    });

    return target;
};