(function(exports) {

    var type = require("./type.js");

    var _ = require("./underscore/underscore.js");

    exports.hereDoc = function(f) {
        return f.toString().
                replace(/^[^\/]+\/\*!?/, '').
                replace(/\*\/[^\/]+$/, '');
    };

    exports.forceIndent = function(text, indentQuantity) {
        if (!type.assertDefined(text, indentQuantity))
            return;

        var lines = text.split("\n");
        var whitespace = "";

        //return text; //No indents for now

        if (lines.length <= 1)
            return text;

        while (indentQuantity-- > 0)
            whitespace += " ";

        for (var i = 1; i < lines.length; i++) {
            lines[i] = whitespace + lines[i].replace(/^\s+/,'');
        }

        return lines.join("\n");
    };

    exports.trimEnd = function(text) {
        var trailingWhitespace = text.match(/(\s*)$/)[0];
        return text.substring(0, text.length - trailingWhitespace.length);
    }

    exports.trimEndLines = function(text) {
        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++)
            lines[i] = exports.trimEnd(lines[i]);
        return lines.join("\n");
    }

    var curIndent = "";
    var indentCount = 2;

    exports.indent = function () {
        for (var i = 0; i < indentCount; i++)
            curIndent += " ";
    };
    exports.unindent = function () {
        curIndent = curIndent.substring(0, curIndent.length - indentCount);
    };
    exports.log = function(text) {
        console.log(curIndent + text);
    };

    exports.setIfMore = function(object, propertyName, newValue) {
        if (!type.defined(object[propertyName]) || newValue > object[propertyName])
            object[propertyName] = newValue;
    }

    //Non-recursive, fixes object by deleting parts of it that are null,
    //which by my definition and in all of my code should be the same as
    //those parts being not defined (and I cannot think of any cases when
    //there would need to be a difference, yet there are many cases when
    //null just messes things up, such as looping through an object and checking
    //properties).
    //NOT RECURSIVE! (on purpose)
    exports.fixObject = function(obj) {
        var partsToDelete = [];
        for (var key in obj)
            if (!type.defined(obj[key]))
                partsToDelete.push(key);

        for (var key in partsToDelete) {
            delete obj[partsToDelete[key]];
        }
    };

    //Flattens arrays by taking the arrays and turning them into members.
    //Means objects in an array are only indirected once rather than twice,
    //which makes tree algorithms much easier to implement.
    //NOT RECURSIVE! (on purpose)
    exports.flattenArrays = function(obj) {
        var arraysToBeDeleted = [];
        for (var key in obj) {
            var node = obj[key];
            if (_.isArray(node)) {
                arraysToBeDeleted.push(key);
                for (var indice in node) {
                    obj[key + indice] = node[indice];
                }
            }
        }
        for (var key in arraysToBeDeleted)
            delete obj[arraysToBeDeleted[key]];

        return obj;
    }

    exports.forceArray

}) (typeof exports === 'undefined' ? this['common'] = {} : exports);