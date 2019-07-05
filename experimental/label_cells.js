var htmlparser = require("htmlparser");
var sys = require("sys");
var fs = require("fs");

var rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error)
        console.log(error)
    else
        console.log("parsing successful...")
});
var parser = new htmlparser.Parser(handler);
fs.readFile("data/msft-test.htm", "utf8", function(err, data) {
    if (err) throw err;
    parser.parseComplete(data);
    sys.puts(sys.inspect(handler.dom, false, null));
});