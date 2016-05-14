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


app.directive('channelRow', function() {
	return {
		restrict: 'AE',
		replace: true,
		templateUrl: '/templates/channel-row.html'
	}
});
