var fs = require("fs");
var HTMLParser = require('node-html-parser');
var stringSimilarity = require('string-similarity');

//match cells in two tables that are known to be similar

function match_selected_cells(table1,table2) {
    var cells_1 = table1.querySelectorAll("td")
    var cells_2 = table2.querySelectorAll("td")
    for (i in cells_1) {
        if (cells_1[i]["classNames"].includes("selected")) {
            cells_2[i]["classNames"].push("selected")
            cells_2[i]["rawAttrs"] = cells_2[i]["rawAttrs"] + " class='selected'"
        }
    } 
}

fs.readFile("data/table3.htm", "utf8", function(err, table1_str) {
    if (err) throw err;
    fs.readFile("data/table4.htm", "utf8", function(err, table2_str) {
        if(err) throw err;

        var table1_root = HTMLParser.parse(table1_str)
        var table2_root = HTMLParser.parse(table2_str);

        console.log(table1_root.querySelectorAll("td").length)
        console.log(table2_root.querySelectorAll("td").length)

        match_selected_cells(table1_root,table2_root)

        fs.writeFile("data/table4-selected.html", table2_root.toString(), function(err){}); 

    });
});