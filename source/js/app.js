$(function() {

});

var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		
		$routeProvider

			.when('/', {
                templateUrl : 'templates/left-frame.html',
                controller  : 'frontPageController'
            })

			.when('/game/:gameName', {
				templateUrl: 'templates/left-frame.html',
				controller: 'frontPageController'
			});

		// $locationProvider.html5Mode({
		// 	enabled: true,
		// 	requireBase: false
		// });
	}
]);