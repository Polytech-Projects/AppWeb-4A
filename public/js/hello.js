routingApp.component('hello', {
	template: '<h3 ng-bind="$root.counter"></h3>' + '<button ng-click="$ctrl.addToCounter()">Compteur</button>',
	controller: function ($rootScope) {
		this.addToCounter = function() {
			if (!$rootScope.counter) { $rootScope.counter = 0; }
			$rootScope.counter++;
		}
	}
});