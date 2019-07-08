var HTMLParser = require('node-html-parser');
var sys = require("sys");
var fs = require("fs");

fs.readFile("data/msft-test.htm", "utf8", function(err, data) {
    if (err) throw err;
    const root = HTMLParser.parse(data);
    console.log(root);
});

