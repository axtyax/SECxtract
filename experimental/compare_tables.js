var fs = require("fs");
var HTMLParser = require('node-html-parser');
var stringSimilarity = require('string-similarity');


fs.readFile("data/table_mer_1.htm", "utf8", function(err, table_str) {
    if (err) throw err;
    fs.readFile("data/ML-3.31.2013-10Q.htm", "utf8", function(err, form_str) {
        if(err) throw err;

        var table_root = HTMLParser.parse(table_str)
        var form_root = HTMLParser.parse(form_str);

        console.log(table_root)
        console.log(form_root)

        var table_html = table_root.outerHTML;
        var form_tables = form_root.querySelectorAll("table")
        var form_htmls = []

        for (t in form_tables) {
            form_htmls.push(form_tables[t].outerHTML)
            //var similarity = stringSimilarity.compareTwoStrings(form_tables,form_htmls)
        }

        var matches = stringSimilarity.findBestMatch(table_html,form_htmls)

        //console.log(matches)
        //console.log(form_htmls[matches['bestMatchIndex']])

        fs.writeFile("data/table_mer_2.htm", form_htmls[matches['bestMatchIndex']], function(err){}); 

        //console.log(matches)
        for (i in matches['ratings']) {
            console.log(matches['ratings'][i]['rating'] + " => " + i)
        }
        console.log("best rating: " + matches['bestMatchIndex'])

    });
});