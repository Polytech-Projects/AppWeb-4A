routingApp.controller('Page6Ctrl', ['$scope', '$http', 'todoService', function($scope, $http, todoService) {
	
    $scope.taskList = [];

    $scope.howManyDone = function(){
        count = 0;
        $scope.taskList.forEach(element => {
            if(element.done){
                count++
            }
        });
        return count;
    };

    $scope.howManyNotDone = function(){
        return $scope.taskList.length
            -$scope.howManyDone();
    };

    $scope.addTask = function(){

        todoService.addTask($scope.taskInputName, function(res){
            if(res){
                $scope.load();
            }
        });
        $scope.taskInputName = "";
    };

    $scope.update = function(task){
        todoService.updateTask(task, function(res){
            console.log(res);
            $scope.load();
        });
    }

    $scope.delete = function(task){
        var index = $scope.taskList.indexOf(task);
        // On vire direct la tache sans attendre de retour serveur
        $scope.taskList.splice(index,1);
        // TODO : implémenter la fonction dans todoService
        todoService.deleteTask(task._id, function(res){
            $scope.load();
        });
    };

    $scope.load = function(){
        todoService.getTaskSet(function(res){
            $scope.taskList = res;
        });
    };

    $scope.load();

}]);