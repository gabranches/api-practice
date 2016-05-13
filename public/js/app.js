$(function() {
	// $( "#top-frame" ).resizable({
	// 	handles:'n,s'
	// });

	// $( "#bottom-frame" ).resizable({
	// 	handles:'n,s',
	// 	maxHeight: 500
	// });
});

var app = angular.module('app', []);

// CONTROLLERS

app.controller('frontPageController', ['$scope', '$sce', function($scope, $sce) {

	$scope.streams = stream_data.streams;

	$scope.stream = 'nl_kripp';

	$scope.live = {

		selection: 'nl_kripp',

		stream: {
			src: function(self) {
				return self.stream.url + self.selection
			},
			url: "http://player.twitch.tv/?channel=",

		},

		chat: {
			src: function(self) {
				return self.chat.url.replace('{CHANNEL}', self.selection)
			},
			url: "http://twitch.tv/chat/embed?channel={CHANNEL}&amp;popout_chat=true",

		}
	}

	angular.element(window).on("resize", function() {
        $scope.$apply();
    });

    $scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
	}

}]);

// DIRECTIVES


app.directive('chatEmbed', function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: '/templates/chat-embed.html'
	}
});

app.directive('videoEmbed', function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: '/templates/video-embed.html'
	}
});