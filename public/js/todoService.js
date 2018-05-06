routingApp.factory('todoService', ['$http', function($http) {

    var serv = {};

    serv.addTask = function (taskName, cb) {
        var req = {
          name: taskName
        };

        $http.post('/addTask',req).then(function (resp) {
                //console.log(resp);
                cb(resp);
            });

    };

    serv.getTaskSet = function (cb) {
        $http.post('/getTaskSet')
            .then(function (resp) {
                console.log(resp);
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