routingApp.controller('registerCtrl', ['$scope', '$state', 'userService', function($scope, $state, userService) {

    $scope.invalidPwd = false;

    $scope.validPassword = function(p1, p2) {
        return $scope.password.localeCompare($scope.passwordBis) == 0;
    }

    $scope.register = function(){
        if (!$scope.email || !$scope.password || !$scope.passwordBis || !$scope.name) return;

        if (!$scope.validPassword($scope.password, $scope.passwordBis)) {
            $scope.invalidPwd = true;
            return;
        }
        
        userService.register($scope.name, $scope.email, $scope.password, function(res){
            if (res) {
                $state.go('home');
            }
        });
    }

}]);