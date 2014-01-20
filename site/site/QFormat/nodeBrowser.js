//Only include this file in the browser, node.js already has this!

//Doesn't do everything require does... but its okay.
//*Can only get something which you already included in a script!
function require(name) {
    //if(name.match(/^\.\//).length > 0) {
    //Local file
    //For now we just handle a single level of indirection, in the future we should handle multiple

    var realName = name.match(/([^\\./]*)(.js)?$/)[1];
    if (this[realName]) {
        return this[realName];
    } else if (self[realName]) {
        return this[realName];
    } else if (realName == "underscore") {
        //Strange stuff for underscore, not done for jQuery as that is currently only for the browser,
        //while underscore may also be used in node.js
        return this["_"];
    } else {
        debugger;
        throw "Cannot handle a require for '" + name + "' (as I cannot find it).";
    }
    //} else {
    //    //Nodejs file... we can't support this
    //    debugger;
    //    throw "Cannot handle a require for '" + name + "' .";
    //}
}