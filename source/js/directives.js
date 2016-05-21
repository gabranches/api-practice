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
