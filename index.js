#!/usr/local/bin/node

var port;
if (process.argv.length < 3) {
	port = 8080;
}
else {
	port = process.argv[2];
}

var connect = require('connect');
var server = connect.createServer(
    connect.static(__dirname) ).listen(port);

server.on ('request', function (req, res) {
    console.log ('There is a request for' + req.url);
})
