(function(exports) {
    var defaultDebug = require("./defaultDebug.js");

    //Will crash in debug, for only put an error message in release
    exports.fail = function(errorMessage) {
        if (DFlag.debug) {
            debugger;
            throw errorMessage ? errorMessage : "error";
        } else {
            console.log(errorMessage);
        }
    }
    //Get exports, YOU MUST SET THE VALUE INSIDE this['...'] TO THE NAME OF THE FILE.
}) (typeof exports === 'undefined' ? this['fail'] = {} : exports);