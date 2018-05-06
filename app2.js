var http = require('express');

var app = express();
var port = 8090;

app.get('/', function(req, res){
	res.setHeader('Content-Type', 'text/plain');
	res.send('Hello world express !');
});

app.post('/getData', function(req, res){
	var obj = {
		success: true,
			userSet: [
			{
				firstName: 'Maurice',
				lastName: 'Topalof'
			},
			{
				firstName: 'Steeven',
				lastName: 'Seagle'
			},
			{
				firstName: 'Karine',
				lastName: 'Bolt'
			}
		]
	}
	res.send(obj);
});

console.log('server started port : ' + port);

server.listen(port);