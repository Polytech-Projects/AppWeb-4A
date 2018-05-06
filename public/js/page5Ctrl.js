routingApp.controller('Page5Ctrl', ['$scope', '$http', function($scope, $http) {
	$scope.loadCounter = function() {
		$http.post('/getCounter').then(function (data) {
			console.log(data);
			$scope.counter = data.data.counter;
		});
	};

	$scope.addCounter = function() {
		$http.post('/addCounter').then(function (data) {
			console.log(data);
			$scope.counter = data.data.counter;
		});
	};

	$scope.loadCounter();
}]);