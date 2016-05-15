// CONTROLLERS

app.controller('frontPageController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {

	$scope.streams = stream_data.streams;

	$scope.live = {

		selection: "",

		menu: 'top-streams',

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

	$scope.getGameStreams = function(game) {
		game = encodeURIComponent(game.trim());
		$http({
			method: 'GET',
			url: 'https://api.twitch.tv/kraken/streams?game=' + game
		}).then(function successCallback(response) {
		    $scope.streams = response.data.streams;
		}, function errorCallback(response) {
			console.log(response);
		});
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

	pickRandomStream = function() {
		// Pick a random stream from the initial stream list
		var index = Math.floor(Math.random() * ($scope.streams.length));
		$scope.live.selection = $scope.streams[index].channel.name;
	}

	pickRandomStream();

}]);