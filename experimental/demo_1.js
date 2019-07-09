const fs = require("fs");
const HTMLParser = require('node-html-parser');
const stringSimilarity = require('string-similarity');
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

function select_cell(cell) {
    cell["classNames"].push("selected")
    cell["rawAttrs"] = cell["rawAttrs"] + " class='selected'"
}

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

fs.readFile("data/msft-10q_20190331.htm", "utf8", function(err, form1_str) {
    if (err) throw err;
    fs.readFile("data/msft-10q_20181231.htm", "utf8", function(err, form2_str) {
        if(err) throw err;

        var form1_root = HTMLParser.parse(form1_str)
        var form2_root = HTMLParser.parse(form2_str);

        var new_val = "";
        var selected_vals = []
        rl.question('Enter values to select, separated by +\n', (values) => {
            selected_vals = values.split("+")

            var form1_cells = form1_root.querySelectorAll("td")
            for (c in form1_cells) {
                if (selected_vals.includes(form1_cells[c].removeWhitespace().rawText)) {
                    select_cell(form1_cells[c])
                    console.log("selecting " + c)
                }
            }

            var form1_tables = form1_root.querySelectorAll("table")
            var form2_tables = form2_root.querySelectorAll("table")
            var form1_selected_tables = []
            for (t in form1_tables) {
                if (form1_tables[t].querySelectorAll(".selected").length > 0) {
                    form1_selected_tables.push(form1_tables[t])
                }
            }

            for (t in form1_tables) {
                var matches = stringSimilarity.findBestMatch(form1_tables[t].toString(),form2_tables.map(function(e){return e.toString()}))
                var matching_table = form2_tables[matches['bestMatchIndex']]
                match_selected_cells(form1_tables[t],matching_table)
            }

            fs.writeFile("form1_selected.html", form1_root.toString(), function(err){});
            fs.writeFile("form2_selected.html", form2_root.toString(), function(err){});

            rl.close();
        });

    });
});