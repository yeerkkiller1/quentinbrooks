(function(exports) {

    var acorn = require("./acorn/acorn.js");
    var type = require("./type.js");

    var AST = require("./AST.js");

    var ASTText = require("./ASTToText.js");
    var ASTRebrace = require("./ASTRebrace.js");
    var ASTReindent = require("./ASTReindent.js");

    var common = require("./common.js");

    var DFlag = require("./debug.js").DFlag;

    exports.reformat = function(text) {
        //We wrap everything a bit more... as acorn excludes some extra characters before
        //and after the main code.
        function makeParseTree(text) {
            var acornParseTree = acorn.parse(text);
            var file = {};
            file.start = 0;
            file.end = text.length;
            file.program = acornParseTree;

            return new AST.ASTTree(acornParseTree, text);
        }

        function makeText(parseTree) {
            return common.trimEndLines(parseTree.convertToText(parseTree));
        }


        var parseTree = makeParseTree(text);

        if (DFlag.outputParseTree) {
            AST.outputASTNode(parseTree);
        }

        parseTree.coalesceBraces(parseTree);

        //This adds a buffer, as sometimes braces and indentation mess each other up (very rare, but it happens).
        text = makeText(parseTree);
        parseTree = makeParseTree(text);

        parseTree.coalesceIndentation(parseTree);

        if (DFlag.outputParseTree) {
            AST.outputASTNode(parseTree);
        }

        return makeText(parseTree);
    };

    //Get exports, YOU MUST SET THE VALUE INSIDE this['...'] TO THE NAME OF THE FILE.
}) (typeof exports === 'undefined' ? this['formatter'] = {} : exports);