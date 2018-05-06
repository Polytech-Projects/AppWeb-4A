var http = require('http');

var port = 8090;

var server = http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('Hello world');
});

server.listen(port);

console.log('server started port : ' + port);