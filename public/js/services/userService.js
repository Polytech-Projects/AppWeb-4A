routingApp.factory('userService', ['$http', '$rootScope', function($http, $rootScope) {

    var serv = {};

    serv.init = function() {
        if (localStorage.loginToken != null) {
            $http.defaults.headers.common.Authorization = localStorage.loginToken;
            $rootScope.isLogged = true;
        }
    }

    serv.login = function (email, password, cb) {
        var req = {
            _id: email,
            password: password
        };

        $http.post('/login',req).then(function (resp) {
            if (resp.data.success) {
                localStorage.loginToken = resp.data.token;
                $http.defaults.headers.common.Authorization = resp.data.token;
                console.log('Login successfull');
                $rootScope.isLogged = true;
            }
            cb(resp.data.success);
        });

    };

    serv.register = function (name, email, password, cb) {
        var req = {
            email: email,
            password: password,
            name: name
        };
        console.log('dans fonction register');
        $http.post('/user',req).then(function (resp) {
            console.log('dans post register');
            console.log(req);
            if (resp.data.success) {
                localStorage.loginToken = resp.data.token;
                $http.defaults.headers.common.Authorization = resp.data.token;
                console.log('Register successfull');
                $rootScope.isLogged = true;
            }
            cb(resp.data.success);
        });

    };

    serv.logout = function () {
        if (localStorage.loginToken != null) localStorage.loginToken = null;
        else console.log('Already logged out');
        $http.defaults.headers.common.Authorization = null;
        $rootScope.isLogged = false;
    };

    serv.getToken = function() {
        return localStorage.loginToken;
    }

    return serv;

}]);