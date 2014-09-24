// ==UserScript==
// @name       Jobmine Scrap
// @namespace  quentinbrooks.com
// @version    0.1
// @description  enter something useful
// @match      https://jobmine.ccol.uwaterloo.ca/*
// @copyright  2012+, You
// ==/UserScript==

function run()
{
    var iFrameDoc = document.getElementById("ptifrmtgtframe").contentDocument;
    
    iFrameDoc.getElementById("UW_CO_JOBSRCHDW_UW_CO_DW_SRCHBTN");

    function getHeaderName(index)
    {
        var header = iFrameDoc.getElementById("UW_CO_JOBRES_VW$srt" + index + "$0");
        if(!header) return "header" + index;
    	return header.textContent;
    }
    
    for(var ix = 1; ix <= 2000; ix++)
    {
        var row = iFrameDoc.getElementById("trUW_CO_JOBRES_VW$0_row" + ix);
        if(!row) continue;
        var cells = row.children;
        var obj = {};
        var id = null;
        for(var iy = 0; iy < cells.length; iy++)
        {
            if(!cells[iy]) continue;
            var header = getHeaderName(iy);
            obj[header] = cells[iy].textContent;
            if(!id) id = obj[header];
        }
        localStorage[id] = JSON.stringify(obj);
        console.log(obj);
    }
}
unsafeWindow["run"] = run;

//

