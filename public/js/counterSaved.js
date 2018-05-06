var counterApp = angular.module('counterApp', ['ui.router']);

counterApp.controller('CounterSavedCtrl', ['$scope', function ($scope){
	$scope.load = function () {
		$scope.counter = localStorage.getItem("counter");
		if ($scope.counter == null)
			$scope.counter = 0;
	};

	$scope.increment = function() {
		$scope.counter++;
		localStorage.setItem("counter", $scope.counter);
	};

	$scope.load();
}]);

counterApp.config(function ($stateProvider) {
	
	var homeState = {
		name: 'home',
		url: '/',
		templateUrl: 'boutonIncrementer.html'
	};

	var testPassageCounterLocal = {
		name: 'testPassageCounterLocal',
		url: '/testPassageCounterLocal',
		templateUrl: 'testPassageCounter.html'
	};

	$stateProvider.state(homeState);
	$stateProvider.state(testPassageCounterLocal);
});