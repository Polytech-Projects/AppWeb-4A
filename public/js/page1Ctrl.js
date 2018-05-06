routingApp.controller('page1Ctrl', ['$scope', function($scope) {
	$scope.content = function() {
		var dt = new Date();
		return "un peu de contenu dynamique: " + dt;
	};
}]);