(function(exports) {
    //Set DFlag.flagName to set debug flags.
    //Try to only do this in debug.js
    DFlag = {};
    exports.DFlag = DFlag;

    DFlag.debug = false;

    DFlag.outputParseTree = false;

    //Get exports, YOU MUST SET THE VALUE INSIDE this['...'] TO THE NAME OF THE FILE.
}) (typeof exports === 'undefined' ? this['defaultDebug'] = {} : exports);