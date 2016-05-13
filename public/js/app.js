var app = angular.module('app', []);


app.controller('frontPageController', ['$scope', function($scope) {

	$scope.streams = stream_data.streams;

	$scope.live = {
		selection: 'nl_kripp',

		chat: {

		}
	}

	angular.element(window).on("resize", function() {
        $scope.$apply();
    });



}]);