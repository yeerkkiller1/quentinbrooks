//Extends ASTTree to allow you to convert it back to text. How this is done can vary
//depending on the specific ASTTree... the tree we require has source information and
//additional indentation and source override information.
(function(exports) {

    var AST = require("./AST.js");
    var type = require("./type.js");

    var common = require("./common.js");

    var fail = require("./fail.js");

    var _ = require("./underscore/underscore.js");

    //Rebracing should just move the braces... but for now it sometimes clobbers comments also...
    AST.ASTTree.prototype.coalesceBraces = function(parseTree) {
        if (!parseTree)
            return;

        common.fixObject(parseTree);

        for (var key in parseTree) {
            if (typeof parseTree[key] == "object") {
                this.coalesceBraces(parseTree[key]);
            }
        }

        //Force all if statement to be the same
        if (parseTree.type == "IfStatement") {
            var test = parseTree.test;
            var consequent = parseTree.consequent;
            var alternate = parseTree.alternate;

            //Space between if and bracket
            if (test && consequent)
                parseTree.ifSpaceBracket = {start: parseTree.start, end: test.start, forceText: "if ("};

            //Brace on the same line as the if
            if (test && consequent) {
                var consequentText = this.getText(consequent);
                if (consequentText[0] == "{") {
                    parseTree.ifBraceSameLine = {start: test.end, end: consequent.start, forceText: ") "};
                }
            }

            //Else on same line as last bracket
            if (test && consequent && alternate) {
                //We need to find the else, or else we may mess up stuff with no brackets!
                var elseText = this.getTextBetween(consequent, alternate);
                var elseEnd = consequent.end + elseText.indexOf("else") + 4;

                var consequentText = this.getText(consequent);
                var elseText = this.getText(alternate);
                if (consequentText[consequentText.length - 1] == "}") //Else... we don't move the else
                    parseTree.elseSameLine = {start: consequent.end, end: elseEnd, forceText: " else"};
                else if (elseText[0] == "{")
                    parseTree.elseBraceSameLine = {start: elseEnd, end: alternate.start, forceText: " "};

            }

            //Special for else if... but not for while and stuff like that
            if (test && consequent && alternate && alternate.type == "IfStatement") {
                //We need to find the else, or else we may mess up stuff with no brackets!
                var elseText = this.getTextBetween(consequent, alternate);
                var elseEnd = consequent.end + elseText.indexOf("else") + 3;

                var consequent = this.getText(consequent);
                if (consequent[consequent.length - 1] == "}") //Else... we don't move the else
                    parseTree.ifElseSameLine = {start: elseEnd, end: alternate.start, forceText: " "};
            }
        }


        if (parseTree.type == "FunctionDeclaration" || parseTree.type == "FunctionExpression") {
            var id = parseTree.id;
            var params = parseTree.params; //Hopefully these are sorted
            var body = parseTree.body;

            var lastParam = params.length > 0 ? params[params.length - 1] : null;

            //No backwards, getTextBetween is for blocks
            var offsetStart = this.getTextBetween({end: parseTree.start}, {start: body.start}).indexOf("function") + 8;

            if (offsetStart < 0)
                fail.fail("What! No 'function' in function declaration?");

            //Brace same line
            if (lastParam) {
                //Brace on the same line as the params
                parseTree.funcBraceSameLine = {start: lastParam.end, end: body.start, forceText: ") "};
            } else if (id) {
                parseTree.funcBraceSameLine = {start: id.end, end: body.start, forceText: "() "};
            } else {
                //Anonymous function
                parseTree.funcBraceSameLine = {start: parseTree.start + offsetStart, end: body.start, forceText: " () "};
            }

            var firstParam = params[0];

            //Space between name and parameters
            if (id && firstParam) {
                parseTree.spaceBetweenNameAndParamters = {start: id.end, end: firstParam.start, forceText: "("};
            } else if (lastParam) { //The check above for the brace also sets the spaces sometimes...
                parseTree.spaceBetweenNameAndParamters = {start: parseTree.start + offsetStart, end: firstParam.start, forceText: "("};
            }
        }

        if (parseTree.type == "WhileStatement") {
            var test = parseTree.test;
            var body = parseTree.body;

            parseTree.whileSpace = {start: parseTree.start, end: body.start, forceText: "while ("};

            var bodyText = this.getText(body);
            if (bodyText[bodyText.length - 1] == "}") //Only force same line if there is a brace!
                parseTree.whileBraceSameLine = {start: test.end, end: body.start, forceText: ") "};
        }

        if (parseTree.type == "DoWhileStatement") {
            var body = parseTree.body;
            var test = parseTree.test;

            parseTree.doBraceSameLine = {start: parseTree.start, end: body.start, forceText: "do "};

            var bodyText = this.getText(body);
            if (bodyText[bodyText.length - 1] == "}") //Only force same line if there is a brace!
                parseTree.doTestBraceSameLine = {start: body.end, end: test.start, forceText: " while ("};
        }

        if (parseTree.type == "ForStatement") {
            //For statements are monstrosities
            var init = parseTree.init;
            var test = parseTree.test;
            var update = parseTree.update;
            var body = parseTree.body;

            if (init)
                parseTree.forSpace = {start: parseTree.start, end: init.start, forceText: "for ("};

            var bodyText = this.getText(body);
            if (bodyText[bodyText.length - 1] == "}") //Only force same line if there is a brace!
                if(update && body)
                    parseTree.forBraceSameLine = {start: update.end, end: body.start, forceText: ") "};
        }

        if (parseTree.type == "ForInStatement") {
            var left = parseTree.left;
            var right = parseTree.right;
            var body = parseTree.body;

            parseTree.forInSpace = {start: parseTree.start, end: left.start, forceText: "for ("};

            var bodyText = this.getText(body);
            if (bodyText[bodyText.length - 1] == "}") //Only force same line if there is a brace!
                parseTree.forInBraceSameLine = {start: right.end, end: body.start, forceText: ") "};
        }

        if (parseTree.type == "SwitchCase") {
            var consequent = parseTree.consequent;

        }

        if (parseTree.type == "SwitchStatement") {
            var cases = parseTree.cases;
            var discriminant = parseTree.discriminant;

            if (cases.length > 0) { //If they have no cases then screw it, im not formatting it.
                //We are not given a body (which we need to determine who owns
                //the braces), so we calculate it ourself.
                var bodyStart = -1;
                var bodyEnd = -1;

                var firstCase = cases[0];
                var lastCase = cases[cases.length - 1];

                //Looks kinda backwards... but its not, getTextBetween is for blocks, we just emulate the parts it uses.
                bodyStart = this.getTextBetween({end: parseTree.start}, {start: firstCase.start}).indexOf("{");
                bodyEnd = this.getTextBetween({end: lastCase.end}, {start: parseTree.end}).indexOf("}");

                if (bodyStart >= 0)
                    bodyStart += parseTree.start;

                if (bodyEnd >= 0)
                    bodyEnd += lastCase.end;

                //If it has no cases, then it MUST have braces, or else it wouldn't work?

                if (bodyStart == -1)
                    bodyStart = discriminant.end;

                if (bodyEnd == -1)
                    bodyEnd = parseTree.end;

                parseTree.body = {};
                parseTree.body.start = bodyStart;
                parseTree.body.end = bodyEnd;
                parseTree.body.forceText = "";

                parseTree.body.cases = parseTree.cases;
                delete parseTree.cases;
                //End of making the body

                parseTree.switchBraceSameLine = {start: discriminant.end, end: bodyStart, forceText: ") "};
                parseTree.switchSpace = {start: parseTree.start, end: discriminant.start, forceText: "switch ("};
            }
        }

    }

    //Get exports, YOU MUST SET THE VALUE INSIDE this['...'] TO THE NAME OF THE FILE.
}) (typeof exports === 'undefined' ? this['ASTRebrace'] = {} : exports);