routingApp.controller('LoginCtrl', ['$scope', '$http', '$state', 'userService', function($scope, $http, $state, userService) {

    $scope.login = function(){
        if (!$scope.email || !$scope.password) return;
        
        userService.login($scope.email, $scope.password, function(res){
            if (res) {
                $state.go('home');
            }
        });
    }

    $scope.logout = function(){
        userService.logout();
        $state.go('home');
    }

}]);