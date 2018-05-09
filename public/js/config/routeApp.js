var routingApp = angular.module('routeApp', ['ui.router']);

routingApp.config(function ($stateProvider, $urlRouterProvider) {
	
	var homeState = {
		name: 'home',
		url: '/home',
		template: '<h3>Page d\'acceuil</h3>'
	};
	
	var todoListState = {
		name: 'todoList',
		url: '/todoList',
		templateUrl: 'vue_todoList.html',
		controller: 'todoListCtrl'
	};

	var loginState = {
		name: 'login',
		url: '/login',
		templateUrl: 'vue_login.html',
		controller: 'LoginCtrl'
	};

	var registerState = {
		name: 'register',
		url: '/register',
		templateUrl: 'vue_register.html',
		controller: 'registerCtrl'
	};

	$stateProvider.state(homeState);
	$stateProvider.state(todoListState);
	$stateProvider.state(loginState);
	$stateProvider.state(registerState);

	$urlRouterProvider.otherwise('/');
});


routingApp.run(['$rootScope', 'userService', function($rootScope, userService) {
	userService.init();
	$rootScope.isLogged = false;
}]);