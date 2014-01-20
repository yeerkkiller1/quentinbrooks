//All the documentation is probably wrong, this was all asynchronous but is now synchronous...

(function(exports) {
    var type = require("./type.js");
    var _ = require("./underscore/underscore.js");

    var common = require("./common.js");

    //Runs fnc which takes a text input and gives a text output.
    //Gets the text input from filePath.
    //The result is written to writeToFile.
    //If backupFile is set, it backs up the original file to backupFile.
    exports.runOnFile = function(fnc, filePath, writeToFile, backupFile) {
        var fs = require('fs');

        if (backupFile) //Backup is separate... if this fails we don't do anything
            exports.copyFile(filePath, backupFile);

        var text = fs.readFileSync(filePath, 'utf8');
        text = fnc(text);
        fs.writeFileSync(writeToFile, text);
    };


    //Basically runOnFile but on a directory.
    //writeDirectory: If the same as directoryPath (EXACTLY THE SAME, not just equivalent directories), then it replaces the files.
    //backupDirectory: (optional) backups original files
    exports.runOnDirectory = function(fnc, directoryPath, recursive, fileRegex, writeDirectory, backupDirectory) {
        //Force everything to be synchronous, that way any errors won't cause any loss of data.
        var fs = require('fs');

        var runFunctions = {};

        if (backupDirectory) {
            if (!fs.existsSync(backupDirectory)) {
                fs.mkdirSync(backupDirectory);
            }
        }

        //exports.deleteDirectory(writeDirectory);
        if (!fs.existsSync(writeDirectory)) {
            fs.mkdirSync(writeDirectory);
        }
        fs.readdirSync(directoryPath);

        var files = fs.readdirSync(directoryPath);

        for (var key in files) {
            var file = files[key];
            var stats = fs.statSync(directoryPath + "/" + file);
            var backupFile = !backupDirectory ? null : (backupDirectory + "/" + file);
            if (stats.isDirectory()) {
                if (recursive && file[file.length - 1] != '.') {
                    exports.runOnDirectory(
                        fnc, directoryPath + "/" + file, recursive, fileRegex,
                        writeDirectory + "/" + file,
                        backupFile);
                }
            } else {
                if (file.match(fileRegex)) {
                    exports.runOnFile(
                        fnc, directoryPath + "/" + file,
                        writeDirectory + "/" + file,
                        backupFile);
                }
            }
        }
    };


    //Proper recursive directory delete
    exports.deleteDirectory = function(directory) {
        var fs = require('fs');

        var runFunctions = {};

        if (fs.existsSync(directory)) {
            var files = fs.readdirSync(directory);

            for (var key in files) {
                var file = files[key];

                var stats = fs.statSync(directory + "/" + file);
                if (stats.isDirectory()) {
                    exports.deleteDirectory(directory + "/" + file);
                } else {
                    //unlink deletes the file.
                    fs.unlinkSync(directory + "/" + file);
                }
            }

            fs.rmdirSync(directory);
        }
    };

    //Any existing dest directory will be entirely deleted (we don't merge), and so this
    //function call has the potential (due to error) of just deleting the dest directory and nothing else.
    //If directorySource and directoryDest are the same we will just delete the directory!
    exports.copyDirectory = function(directorySource, directoryDest, recursive) {
        var fs = require('fs');

        var runFunctions = {};

        exports.deleteDirectory(directoryDest);
        fs.mkdirSync(directoryDest);
        var files = fs.readdirSync(directorySource);

        for (var key in files) {
            var file = files[key];

            var stats = fs.statSync(directorySource + "/" + file);
            if (stats.isDirectory()) {
                if (recursive) {
                    exports.copyDirectory(
                        directorySource + "/" + file,
                        directoryDest + "/" + file, true);
                }
            } else {
                exports.copyFile(
                    directorySource + "/" + file,
                    directoryDest + "/" + file);
            }
        }
    };

    exports.copyFile = function(fileSource, fileDest) {
        var fs = require('fs');

        fs.createReadStream(fileSource).pipe(fs.createWriteStream(fileDest));
    }

    //Get exports, YOU MUST SET THE VALUE INSIDE this['...'] TO THE NAME OF THE FILE.
}) (typeof exports === 'undefined' ? this['nodeCommon'] = {} : exports);