
console.log("test")

var Browser = require("zombie");

var jsdom = require("jsdom");
var fs = require('fs');

var count = 100;
var read = 0;
var startTime = (new Date()).getTime();

var cheerio = require('cheerio');


var dataTemplate = {
	disciplines1: "UW_CO_JOBDTL_DW_UW_CO_DESCR",
	disciplines2: "UW_CO_JOBDTL_DW_UW_CO_DESCR100",
	employer: "UW_CO_JOBDTL_DW_UW_CO_EMPUNITDIV",
	hiringProcessSupport: "UW_CO_OD_DV2_UW_CO_NAME",
	jobDesc: "UW_CO_JOBDTL_VW_UW_CO_JOB_DESCR",
	jobID: "UW_CO_JOBDTL_VW_UW_CO_JOB_ID",
	jobTitle: "UW_CO_JOBDTL_VW_UW_CO_JOB_TITLE",
	lastDayToApply: "UW_CO_JOBDTL_VW_UW_CO_CHAR_DATE",
	levels: "UW_CO_JOBDTL_DW_UW_CO_DESCR_100",
	openDate: "UW_CO_JOBDTL_VW_UW_CO_CHAR_EDATE",
	openings: "UW_CO_JOBDTL_VW_UW_CO_AVAIL_OPENGS",
	workLocation: "UW_CO_JOBDTL_VW_UW_CO_WORK_LOCATN",
	workTermSupport: "UW_CO_OD_DV2_UW_CO_NAME2"
};

function parseData($) {
	var data = {};
	for(var key in dataTemplate) {
		var id = dataTemplate[key];
		data[key] = $("#" + id).text();
	}
	return data;
}

fs.readdir('./', function (err, files) { if (err) throw err;
	files = files.filter(function(x){return x.indexOf(".html") >= 0 && x.length == 13});
	//files = files.slice(0, count);
	count = files.length;

	var allData = {};

	files.forEach( function (file) {
		//jsdom.env(
			//file,

		fs.readFile(file, "utf8", function(err, data) {
			var $ = cheerio.load(data);

			//console.log(file);
			read++;
			if(err) {
				console.log(err);
				return;
			}
	
			var data = parseData($);
			allData[data.jobID] = data;
			if(count - read < 100) {
				console.log(read);
			} else if(read % 10 == 0) {
				console.log(read);
			}

			if(read == count) {
				var endTime = (new Date()).getTime();
				var time = (endTime - startTime);
				console.log("done " + time + "ms, " + time/count + "ms per file");

				fs.writeFile("jobmine.html", JSON.stringify(allData));
			}
		});
	});
});