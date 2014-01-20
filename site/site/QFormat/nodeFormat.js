//Just an example file, not needed
var acorn = require("./acorn/acorn.js");

var parseTree = acorn.parse("function test(a, b) {return a + b;}");

var async = require("./async/lib/async.js");

var fs = require('fs');
var _ = require("./underscore/underscore.js");

var originalText;
var transformedText;

var nodeCommon = require("./nodeCommon.js");

var formatter = require('./formatter.js');

//nodeCommon.deleteDirectory("testDir3");
//nodeCommon.copyDirectory("testDir2", "testDir3", false);


nodeCommon.runOnDirectory(formatter.reformat,
    "C:\\Users\\QuentinBrooks\\Dropbox\\HTML Games\\game-off-2012\\game-off-2012", true, /\.js$/,
    "C:\\Users\\QuentinBrooks\\Dropbox\\HTML Games\\game-off-2012\\game-off-2012",
    "C:\\Users\\QuentinBrooks\\Dropbox\\HTML Games\\game-off-2012\\game-off-2012 (Backup)");


/*
nodeCommon.runOnDirectory(formatter.reformat,
    "C:\\Users\\QuentinBrooks\\Dropbox\\HTML Games\\Quentin Analyzer", false, /\.js$/,
    "C:\\Users\\QuentinBrooks\\Dropbox\\HTML Games\\Quentin Analyzer",
    "C:\\Users\\QuentinBrooks\\Dropbox\\HTML Games\\Quentin Analyzer (Backup)");
*/