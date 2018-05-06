var express = require('express');
var path = require('path');

// needed for search method
// used to parse the request in param to get the param

var bodyParser = require('body-parser');

var app = express();
var port = 8090;

var counter = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authorise access to public directory to server html, css, js
// On crée un répertoire public dans le projet et on peut y accéder directement
// TODO : On met tout le projet dans ce répertoire
app.use(express.static(path.join(__dirname, 'public')));

// TRONCHE DU REPERTOIRE
/*

app3.js
public/tout_le_truc
node_modules/


*/

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

app.post('/getCounter', function (req, res) {
	var obj = {
		success: true,
		counter: counter
	};
	res.send(obj);
});

app.post('/addCounter', function(req, res) {
	counter++;
	var obj = {
		success: true,
		counter: counter
	};
	res.send(obj);
});

console.log('server started port : ' + port);

app.listen(port);