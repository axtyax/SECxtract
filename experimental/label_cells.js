var HTMLParser = require('node-html-parser');
var fs = require("fs");

function label_valid_cells(root) {
    cells = root.querySelectorAll("td")
    let num_valid_cells = 0;
    for (cell in cells) {
        var ncell = cells[cell].removeWhitespace().rawText
        if (ncell != "&#160;" && ncell != "") {
            cells[cell]["id"] = "cell_" + num_valid_cells.toString()
            cells[cell]["rawAttrs"] = cells[cell]["rawAttrs"] + " id='cell_"+num_valid_cells.toString()+"'"
            num_valid_cells++;
        }
    }
    return num_valid_cells
}

function classify_cells(root,num_valid_cells) {
    for (let cell_num = 0; cell_num < num_valid_cells; cell_num++) {
        var cell = root.querySelector("#cell_"+cell_num.toString())
        if (!isNaN(cell.rawText.replace(/,/g, ''))) {
            cell["classNames"].push("numerical_cell")
            cell["rawAttrs"] = cell["rawAttrs"] + " class='numerical_cell'"
        }
    }
}

function generate_new_html(root) {
    var root_content = "";
    console.log(root)
}

fs.readFile("data/table2.htm", "utf8", function(err, data) {
    if (err) throw err;
    var root = HTMLParser.parse(data);
    let num_valid_cells = label_valid_cells(root);
    //console.log(num_valid_cells)
    classify_cells(root,num_valid_cells)
    console.log(root.querySelectorAll(".numerical_cell")[0])
    //var new_html = generate_new_html(root);
    fs.writeFile("data/table2-tagged.html", root.toString(), function(err){}); 
});

