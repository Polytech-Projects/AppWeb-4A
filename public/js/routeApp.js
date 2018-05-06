var routingApp = angular.module('routeApp', ['ui.router']);

routingApp.config(function ($stateProvider) {
	
	var homeState = {
		name: 'home',
		url: '/home',
		template: '<h3>Page d\'acceuil</h3>'
	};

	var page1State = {
		name: 'page1',
		url: '/page1',
		templateUrl: 'page1.html',
		controller: 'page1Ctrl'
	};

	var page2State = {
		name: 'page2',
		url: '/page2',
		templateUrl: 'page2.html',
		controller: 'Page2Ctrl'
	};

	var page3State = {
		name: 'page3',
		url: '/page3',
		templateUrl: 'page3.html',
		controller: 'Page3Ctrl'
	};

	var page4State = {
		name: 'page4',
		url: '/page4',
		templateUrl: 'page4.html',
		controller: 'Page4Ctrl'
	};

	var page5State = {
		name: 'page5',
		url: '/page5',
		templateUrl: 'page5.html',
		controller: 'Page5Ctrl'
	};

	var page6State = {
		name: 'page6',
		url: '/page6',
		templateUrl: 'page6.html',
		controller: 'Page6Ctrl'
	};

	var hello = {
		name: 'hello',
		url: '/hello',
		component: 'hello'
	};

	$stateProvider.state(homeState);
	$stateProvider.state(page1State);
	$stateProvider.state(page2State);
	$stateProvider.state(page3State);
	$stateProvider.state(page4State);
	$stateProvider.state(page5State);
	$stateProvider.state(page6State);
	$stateProvider.state(hello);
});