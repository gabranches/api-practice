$(function() {

});

angular.module('app', ['ngRoute', 'ngCookies']);


angular.module('app').config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
		
		$routeProvider

			.when('/', {
                templateUrl : 'templates/left-frame.html',
                controller  : 'guideController'
            })

			.when('/game/:gameName', {
				templateUrl: 'templates/left-frame.html',
				controller: 'guideController'
			});

		// $locationProvider.html5Mode({
		// 	enabled: true,
		// 	requireBase: false
		// });
	}