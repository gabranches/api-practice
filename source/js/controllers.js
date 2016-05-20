// CONTROLLERS

app.controller('frontPageController', ['$scope', '$sce', '$http', 'helpers', '$routeParams', '$cookies', 
	function($scope, $sce, $http, helpers, $routeParams, $cookies) {

	$scope.streams = stream_data.streams;

	$scope.encodeURI = helpers.encodeURI;


	$scope.live = {

		selection: function() {
			if ($cookies.get('stream')) {
				return $cookies.get('stream')
			} else {
				return helpers.pickRandomStream($scope.streams)
			}
		}(),

		menu: 'top-streams',

		stream: {
			src: function(self) {
				return self.stream.url + self.selection;
			},
			url: "http://player.twitch.tv/?channel=",

		},

		chat: {
			src: function(self) {
				return self.chat.url.replace('{CHANNEL}', self.selection);
			},
			url: "http://twitch.tv/chat/embed?channel={CHANNEL}&amp;popout_chat=true",

		}
	};

	$scope.getGameStreams = function(game) {
		$http({
			method: 'GET',
			url: 'https://api.twitch.tv/kraken/streams?game=' + helpers.encodeURI(game)
		}).then(function success(response) {
		    $scope.streams = response.data.streams;
		}, function error(response) {
			console.log(response);
		});
	};

	$scope.setLiveStream = function(name) {
		$cookies.put('stream', name);
		$scope.live.selection = name;
	};

	// angular.element(window).on("resize", function() {
 //        $scope.$apply();
 //    });

    $scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
	};

	$scope.$watch('$routeParams', function() {
		if($routeParams.gameName) {
			name = $routeParams.gameName.replace('&', '%26');
			$scope.getGameStreams(name);
		}
	});


}]);
