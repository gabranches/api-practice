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
// CONTROLLERS

angular.module('app').controller('guideController', guideController);

guideController.$inject = ['$scope', '$sce', '$routeParams', 'helpers', 'twitchAPI', 'guide'];

function guideController ($scope, $sce, $routeParams, helpers, twitchAPI, guide) {
	
	$scope.encodeURI = helpers.encodeURI;
	$scope.guide = guide;
	$scope.setLiveStream = setLiveStream;
	$scope.trustSrc = trustSrc;

	$scope.$watch('$routeParams', function() {
		
	});

	activate();

    /////////////////////////////////////////////////////

    function activate() {
    	if (guide.selection.name === "") {
    		guide.selection.name = guide.pickRandomStream(guide.selection.list);
    	}

    	if($routeParams.gameName) {

			name = $routeParams.gameName.replace('&', '%26');
			twitchAPI.getGame(name).then(function(data) {
				guide.selection.list = data;
			});

		} else {

			twitchAPI.getFrontPage().then(function(data) {
				guide.selection.list = data;
			});
			
		}

    }

	function setLiveStream(name) {
		guide.selection.name = name;
	}

    function trustSrc(src) {
    	return $sce.trustAsResourceUrl(src);
	}

}

// DIRECTIVES

angular.module('app').directive('chatEmbed', function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: '../templates/chat-embed.html'
	};
});

angular.module('app').directive('videoEmbed', function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: '../templates/video-embed.html'
	};
});


angular.module('app').directive('channelRow', function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: '../templates/channel-row.html'
	};
});

// SERVICES

angular.module('app').factory('guide', guide);

function guide() {
    
    var selection = {
        name: "forsenlol",
        list: stream_data.streams
    };

    return {
        pickRandomStream: pickRandomStream,
        selection: selection,
        videoEmbed: videoEmbed,
        chatEmbed: chatEmbed
    };

    /////////////////////////////////////////////////////

    function videoEmbed() {
        return 'http://player.twitch.tv/?channel={CHANNEL}'
            .replace('{CHANNEL}', selection.name);
    }

    function chatEmbed() {
        return 'http://twitch.tv/chat/embed?channel={CHANNEL}&amp;popout_chat=true'
            .replace('{CHANNEL}', selection.name);
    }

    function pickRandomStream(streams) {
        var index = Math.floor(Math.random() * (streams.length));
        return streams[index].channel.name;        
    }

}



angular.module('app').factory('twitchAPI', twitchAPI);

twitchAPI.$inject = ['$http', 'helpers'];

function twitchAPI($http, helpers) {


    return {
        getGame: getGame,
        getFrontPage: getFrontPage
    };

    /////////////////////////////////////////////////////

    function getGame(game) {

        var url = 'https://api.twitch.tv/kraken/streams?game=' + helpers.encodeURI(game);

        return $http.get(url)
            .then(getGameSuccess)
            .catch(getGameFailed);

        function getGameSuccess(response) {
            return response.data.streams;
        }

        function getGameFailed(error) {
            console.log('getGame failed' + error.data);
        }
    }

    function getFrontPage() {

        var url = 'https://api.twitch.tv/kraken/streams';

        return $http.get(url)
            .then(getFrontPageSuccess)
            .catch(getFrontPageFailed);

        function getFrontPageSuccess(response) {
            return response.data.streams;
        }

        function getFrontPageFailed(error) {
            console.log('getFrontPage failed' + error.data);
        }
    }

}



angular.module('app').factory('helpers', helpers);

function helpers() {

    return {
        encodeURI: encodeURI,
        goBack: goBack        
    };


    function encodeURI(text) {
        return encodeURIComponent(text);
    }

    function goBack() {
        if(window.history.length === 0) {
            // Do nothing
        } else {
            window.history.back();
        }
    }
}


