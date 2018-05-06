//var routingApp = angular.module('routeApp', []);

routingApp.factory('ComputeService', function() {
	var serv = {};
	serv.addNumber = function(a, b) {
		return parseInt(a) + parseInt(b);
	}
	return serv;
});