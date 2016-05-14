// CONTROLLERS

app.controller('frontPageController', ['$scope', '$sce', function($scope, $sce) {

	$scope.streams = stream_data.streams;

	$scope.live = {

		selection: (function() {
			// Pick a random stream from the initial stream list
			var index = Math.floor(Math.random() * ($scope.streams.length));
			return $scope.streams[index].channel.name;
		})(),

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

	$scope.setLiveStream = function(name) {
		$scope.live.selection = name;
		console.log(name);
	}

	angular.element(window).on("resize", function() {
        $scope.$apply();
    });

    $scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
	}

}]);