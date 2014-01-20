(function(exports) {
    var fail = require("./fail.js");

    exports.assertDefined = function(functionName) {
        var allDefined = true;

        for (var i = 0; i < arguments.length; i++) {
            if (exports.nullOrUndefined(arguments[i]) || exports.realIsNan(arguments[i])) {
                fail.fail("Variable is required but is undefined in " + functionName);
                allDefined = false;
            }
        }

        return allDefined;
    };

    exports.defined = function () {
        for (var i = 0; i < arguments.length; i++) {
            //if (typeof arguments[i] === "undefined") {
            if (exports.nullOrUndefined(arguments[i]) || exports.realIsNan(arguments[i])) {
                return false;
            }
        }
        return true;
    };

    //Well this looks kinda expensive, so try not to use it?
    exports.getRealType = function(object) {
        //This nan check shouldn't be needed, but sometimes things (like attributes)
        //go to NaN and I can't figure out why.
        if (!exports.realIsNan(object) && !exports.assertDefined(object))
            return "undefined";

        //http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((object).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };

    exports.nullOrUndefined = function(object) {
        return typeof object === "undefined" || object === null;
    };

    exports.realIsNan = function(object) {
        return typeof object == "number" && isNaN(object);
    };
    //Get exports, YOU MUST SET THE VALUE INSIDE this['...'] TO THE NAME OF THE FILE.
}) (typeof exports === 'undefined' ? this['type'] = {} : exports);