// SERVICES

app.service('helpers', function() {
    return {

    	encodeURI: function(text) {
	        return encodeURIComponent(text);
	    },

	    replaceNewlines: function(text) {
	    	console.log(text);
	    	return text;
	    },

        goBack: function(link) {
            if(window.history.length === 0) {
                // Do nothing
            } else {
                window.history.back();
            }

        },

        pickRandomStream: function(streams) {
        // Pick a random stream from the initial stream list
            var index = Math.floor(Math.random() * (streams.length));
            return streams[index].channel.name;
        }
	};
});

app.service('twitch', function() {
    return {

    };
});