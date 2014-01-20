//Example server code... probably won't be used.

    //Everything here is basically from http://www.html5rocks.com/en/tutorials/file/filesystem/

    function errorHandler(e) {
        var msg = '';

        switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };

        console.log('Error: ' + msg);
    }

    function toArray(list) {
        return Array.prototype.slice.call(list || [], 0);
    }

    function listResults(entries) {
        entries.forEach(function(entry, i) {
    console.log((entry.isDirectory ? "Directory" : "File") + ": " + entry.name);
});
    }

    function gotFileSystem(fileSystem) {
        console.log(fileSystem.root);
        fileSystem.root.getFile("C:\\test3.txt", {create: true},
            function(fileEntry) {
                console.log("got file");
                fileEntry.createWriter(
                    function(fileWriter) {
                        console.log("got writer");
                        var blob = new Blob(['Just some test text'], {type: 'text/plain'});
                        fileWriter.write(blob);
                    }, errorHandler
                );
            }, errorHandler
        );

        var dirReader = fileSystem.root.createReader();
        var entries = [];
        console.log("starting directory read");
        // Call the reader.readEntries() until no more results are returned.
        var readEntries = function () {
            dirReader.readEntries (function(results) {
    console.log("got entries");
    if (!results.length) {
        listResults(entries.sort());
    } else {
        entries = entries.concat(toArray(results));
        readEntries();
    }
}, errorHandler);
        };

        readEntries();
    }

    var fs = require('fs');

    fs.writeFile('C:\\test.txt', 'Better work...', function(err) {
    console.log('Call back?');
    if (err) throw err;
    console.log('It\'s saved!');
});

    /*
    var http = require('http');

    var server = http.createServer(
        function (request, response) {
            response.writeHead(200, {'Content-Type': 'text/plain'});

            response.write("test");




            response.end();
        }
    );

    server.listen(8080);
    */

/*
    window.webkitStorageInfo.requestQuota(window.PERSISTENT, 1024 * 1024,
            function(grantedBytes) {
                window.requestFileSystem(window.PERSISTENT, grantedBytes, gotFileSystem, errorHandler);
            }, errorHandler
    );
*/





