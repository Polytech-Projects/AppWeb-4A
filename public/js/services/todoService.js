routingApp.factory('todoService', ['$http', '$state', 'userService', function($http, $state, userService) {

    var serv = {};

    serv.addTask = function (taskName, cb) {
        var req = {
          name: taskName
        };

        $http.post('/addTask',req).then(function (resp) {
            cb(resp);
        });

    };

    serv.getTaskSet = function (cb) {
        $http.post('/getTaskSet')
            .then(function (resp) {
                if(!resp.data.success) {
                    if (resp.data.errorSet[0] == ["Failed to authenticate token."]) {
                        userService.logout();
                        $state.go('login');
                    }
                }
                cb(resp.data.taskSet);
            });

    };

    serv.updateTask = function(task, cb){
        var req = {
            id:task._id,
            name:task.name,
            done:task.done
        };
        $http.post('/updateTask', req)
            .then(function(res){
                cb(res);
            });
    };

    serv.deleteTask = function(id, cb){
        var req = {id: id};
        $http.post('/deleteTask', req)
            .then(function(res){
                cb(res);
            });
    };

    return serv;

}]);