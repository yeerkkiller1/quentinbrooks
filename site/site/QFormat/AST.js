(function(exports) {
    var fail = require("./fail.js");

    var common = require("./common.js");
    var type = require("./type.js");

    var _ = require("./underscore/underscore.js");

    exports.ASTTree = function(ASTBaseNode, ASTTextSource) {
        this.start = 0;
        this.end = ASTTextSource.length;

        this.baseNode = ASTBaseNode;
        this.sourceCode = ASTTextSource;

        this.getText = function(block) {
            if (!block)
                return null;
            return this.sourceCode.substring(block.start, block.end);
        }

        this.getTextBetween = function(blockOne, blockTwo) {
            return this.sourceCode.substring(blockOne.end, blockTwo.start);
        }

        this.getPrecedingSpaces = function(block) {
            var curPos = block.start - 1;
            while (curPos >= 0 && this.sourceCode.length - curPos >= 0 &&
                this.sourceCode[curPos] == " ")
                curPos--;
            if (this.sourceCode[curPos] == "\n" || curPos == -1)
                return block.start - curPos - 1;
            else
                return -1;
        }

        this.setCurrentIndentQuantity = function(block) {
            if (!block.indentQuantity)
                block.indentQuantity = this.getPrecedingSpaces(block);
            block.indentQuantity += 4;
        }
    };

    //Outputs any AST node in a visual pattern (like a C style class)
    exports.outputASTNode = function(parseTree) {
        if (!parseTree)
            return;
        common.log(type.getRealType(parseTree) == "Array" ? "[" : "{");
        common.indent();
        for (var key in parseTree) {
            if (_.isFunction(parseTree[key]))
                continue;

            if ((parseTree[key] + "").indexOf("[object Object]") != 0) {
                common.log(key + ": " + parseTree[key] + ",");
            } else if (typeof parseTree[key] == "object") {
                common.log(key + ": ");
                exports.outputASTNode(parseTree[key]);
            }
        }
        common.unindent();
        common.log(type.getRealType(parseTree) == "Array" ? "]" : "}");
    };

    //Get exports, YOU MUST SET THE VALUE INSIDE this['...'] TO THE NAME OF THE FILE.
}) (typeof exports === 'undefined' ? this['AST'] = {} : exports);