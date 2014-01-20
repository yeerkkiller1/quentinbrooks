//Extends ASTTree to allow you to convert it back to text. How this is done can vary
//depending on the specific ASTTree... the tree we require has source information and
//additional indentation and source override information.
(function(exports) {

    var AST = require("./AST.js");
    var type = require("./type.js");

    var common = require("./common.js");

    AST.ASTTree.prototype.convertToText = function(parseTree) {
        if (!parseTree)
            return null;

        if (!type.defined(parseTree.start) || !type.defined(parseTree.end))
            return null;

        var resultantText = [];

        //Each {start: int, end: int, text: string}
        //specifies the text the position it represents in the source
        var textBlocks = [];

        //Flatten all arrays... because their extra level of indirection makes the
        //code much more complicated
        common.flattenArrays(parseTree);

        for (var key in parseTree) {
            var node = parseTree[key];
            var text = this.convertToText(node);
            //If text is null... then its not a node!
            if (type.defined(text)) {
                var curTextNode = {};
                curTextNode.start = node.start;
                curTextNode.end = node.end;
                curTextNode.text = text;
                textBlocks.push(curTextNode);
            }
        }

        if (textBlocks.length == 0) {
            //Leaf
            var ourText = type.defined(parseTree.forceText) ? parseTree.forceText : this.getText(parseTree);
            var curIndentQuantity = parseTree.indentQuantity
            if (curIndentQuantity && ourText.indexOf("\n") >= 0) {
                if (ourText.indexOf("}") >= 0) { //If the last part is a brace, then the last line is not indented
                    var lines = ourText.split("\n");
                    var lastLine = lines.splice(lines.length - 1, 1);
                    ourText = common.forceIndent(lines.join("\n"), curIndentQuantity) +
                        common.forceIndent("\n" + lastLine[0], curIndentQuantity - 4);
                } else {
                    ourText = common.forceIndent(ourText, curIndentQuantity);
                }
            }
            return ourText;
        }

        textBlocks.sort(function(one, two) { return one.start - two.start });
        var lastWrittenPos = parseTree.start;
        var curIndentQuantity = parseTree.indentQuantity;
        for (var key in textBlocks) {
            var curTextBlock = textBlocks[key];
            //Write text before
            if (curTextBlock.start > lastWrittenPos) {
                var beforeText = this.getText({start: lastWrittenPos, end: curTextBlock.start});
                if (curIndentQuantity && beforeText.indexOf("\n") >= 0)
                    beforeText = common.forceIndent(beforeText, curIndentQuantity);
                resultantText.push(beforeText);
            }
            resultantText.push(curTextBlock.text);
            lastWrittenPos = curTextBlock.end;
        }
        //Write text after
        if (parseTree.end > lastWrittenPos) {
            var afterText = this.getText({start: lastWrittenPos, end: parseTree.end});
            if (curIndentQuantity && afterText.indexOf("\n") >= 0) {
                if (afterText.indexOf("}") >= 0) { //If the last part is a brace, then the last line is not indented
                    var lines = afterText.split("\n");
                    var lastLine = lines.splice(lines.length - 1, 1);
                    afterText = common.forceIndent(lines.join("\n"), curIndentQuantity) +
                                common.forceIndent("\n" + lastLine[0], curIndentQuantity - 4);
                } else {
                    afterText = common.forceIndent(afterText, curIndentQuantity);
                }
            }
            resultantText.push(afterText);
        }

        return resultantText.join("");
    };

    //Get exports, YOU MUST SET THE VALUE INSIDE this['...'] TO THE NAME OF THE FILE.
}) (typeof exports === 'undefined' ? this['ASTToText'] = {} : exports);