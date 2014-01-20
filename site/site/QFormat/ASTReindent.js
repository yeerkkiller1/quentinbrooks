//Extends ASTTree to allow you to convert it back to text. How this is done can vary
//depending on the specific ASTTree... the tree we require has source information and
//additional indentation and source override information.
(function(exports) {

    var AST = require("./AST.js");
    var type = require("./type.js");

    var common = require("./common.js");

    var fail = require("./fail.js");

    var _ = require("./underscore/underscore.js");

    //We keep track of the previous expression... as we may use it to format anonymous functions.
    var prevAssignExpr = null;
    AST.ASTTree.prototype.coalesceIndentation = function(parseTree) {
        if (!parseTree)
            return;

        common.fixObject(parseTree);


        function curSpaces(context, parseTree) {
            return Math.max(context.getPrecedingSpaces(parseTree), parseTree.indentQuantity || 0);
        }

        if (parseTree.type == "FunctionDeclaration" || parseTree.type == "FunctionExpression") {
            var id = parseTree.id;
            var params = parseTree.params; //Hopefully these are sorted
            var body = parseTree.body;

            var functionSpaces = curSpaces(this, parseTree);
            if (prevAssignExpr) {
                var indentsUs = false;
                if (prevAssignExpr.right == parseTree) {
                    indentsUs = true;
                } else if (prevAssignExpr.declarations) {
                    for (var key in prevAssignExpr.declarations) {
                        var dec = prevAssignExpr.declarations[key];
                        if (dec.init == parseTree) {
                            indentsUs = true;
                            break;
                        }
                    }
                }

                if (indentsUs) {
                    functionSpaces = curSpaces(this, prevAssignExpr);
                }
            }
            parseTree.indentQuantity = functionSpaces;
            body.indentQuantity = functionSpaces + 4;
        }

        if (parseTree.type == "WhileStatement") {
            var test = parseTree.test;
            var body = parseTree.body;

            var functionSpaces = curSpaces(this, parseTree);
            parseTree.indentQuantity = functionSpaces + 4;
            body.indentQuantity = functionSpaces + 4;
        }

        if (parseTree.type == "DoWhileStatement") {
            var body = parseTree.body;
            var test = parseTree.test;

            var functionSpaces = curSpaces(this, parseTree);
            parseTree.indentQuantity = functionSpaces + 4;
            body.indentQuantity = functionSpaces + 4;
        }

        if (parseTree.type == "ForStatement") {
            //For statements are monstrosities
            var init = parseTree.init;
            var test = parseTree.test;
            var update = parseTree.update;
            var body = parseTree.body;

            var functionSpaces = curSpaces(this, parseTree);
            parseTree.indentQuantity = functionSpaces + 4;
            body.indentQuantity = functionSpaces + 4;
        }

        if (parseTree.type == "ForInStatement") {
            var left = parseTree.left;
            var right = parseTree.right;
            var body = parseTree.body;

            var functionSpaces = curSpaces(this, parseTree);
            parseTree.indentQuantity = functionSpaces + 4;
            body.indentQuantity = functionSpaces + 4;
        }

        if (parseTree.type == "IfStatement") {
            var test = parseTree.test;
            var consequent = parseTree.consequent;
            var alternate = parseTree.alternate;

            var functionSpaces = curSpaces(this, parseTree);

            common.setIfMore(parseTree, "indentQuantity", functionSpaces + 4);
            common.setIfMore(consequent, "indentQuantity", functionSpaces + 4);
            if (alternate) {
                //This 'otherElse' prevents the extra else's from nesting one level too much,
                //this is only needed if there are no braces in our if statement

                //Not sure why I checked for this...
                //if (this.getText(consequent).indexOf("{") != 0)
                {
                var otherElse = {};
                otherElse.start = consequent.end;
                otherElse.end = alternate.start - 2; //I am not entirely sure what the minus 2 is for.
                otherElse.indentQuantity = functionSpaces;
                parseTree.otherElse = otherElse;
            }


                common.setIfMore(alternate, "indentQuantity", functionSpaces + 4);

                alternate.indentQuantity = functionSpaces + 4;

                //Even though nested if else are... nested, we don't indent them as such
                if (alternate.type == "IfStatement") {
                    alternate.indentQuantity -= 4;
                } else if (alternate.type != "block") {
                    var elseText = this.getText({start: consequent.end, end: alternate.end});
                    elseText = elseText.substring(elseText.indexOf("else"));
                    if (elseText.indexOf("\n") >= 0 && elseText.indexOf("{") == -1) {
                        //Such a big hack... but its needed
                        var forceTwoSpaces = {};
                        forceTwoSpaces.start = alternate.start - 1;
                        forceTwoSpaces.end = alternate.start - 1;
                        forceTwoSpaces.forceText = "  ";

                        parseTree.forceTwoSpaces = forceTwoSpaces;
                    }


                    //var alternateBlock = {};
                    //alternate.start = consequent.end;
                    //alternate.end = alternate.end;
                    //alternate.indentQuantity = functionSpaces;
                    //delete parseTree.otherElse;
                    //alternateBlock.forceText = "";
                    //parseTree.alternateBlock = alternateBlock;
                    //parseTree.alternate.start = consequent.end;
                    //delete parseTree.alternate;
                }
            }
        }


        if (parseTree.type == "SwitchCase") {
            var consequent = parseTree.consequent;

            var functionSpaces = curSpaces(this, parseTree);

            parseTree.indentQuantity = functionSpaces + 4;
            consequent.indentQuantity = functionSpaces + 4;
        }

        if (parseTree.type == "SwitchStatement") {
            var body = parseTree.body; //Body is something I introduced, it should mirror all other bodies
            var discriminant = parseTree.discriminant;

            var functionSpaces = curSpaces(this, parseTree);

            parseTree.indentQuantity = functionSpaces;

            if (body) {
                body.indentQuantity = functionSpaces + 4;
                body.cases.indentQuantity = functionSpaces + 4;
            }
        }

        //Pass on indent levels
        if (parseTree.type == "BlockStatement") {
            parseTree.body.indentQuantity = parseTree.indentQuantity;
        }

        //Pass on indentQuantity
        if (_.isArray(parseTree)) {
            var arr = parseTree;
            for (var i = 0; i < arr.length; i++) {
                arr[i].indentQuantity = arr.indentQuantity;
            }
        }

        if (parseTree.type == "AssignmentExpression") {
            prevAssignExpr = parseTree;
        } else if (parseTree.type == "VariableDeclaration") {
            prevAssignExpr = parseTree;
        } else if(_.isArray(parseTree) || parseTree.type == "VariableDeclarator" || parseTree.type == "Identifier"){
            //Nothing, just keep prevAssignExpr
        } else{
            prevAssignExpr = null;
        }

        for (var key in parseTree) {
            if (typeof parseTree[key] == "object") {
                this.coalesceIndentation(parseTree[key]);
            }
        }
    }

    //Get exports, YOU MUST SET THE VALUE INSIDE this['...'] TO THE NAME OF THE FILE.
}) (typeof exports === 'undefined' ? this['ASTReindent'] = {} : exports);