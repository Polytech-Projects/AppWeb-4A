routingApp.controller('Page2Ctrl', ['$scope', 'ComputeService', function($scope, ComputeService) {
	$scope.comp = function() {
		$scope.resPage2 = ComputeService.addNumber($scope.paramA, $scope.paramB);
	};
}]);