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
            if(window.history.length == 0) {
                // Do nothing
            } else {
                window.history.back();
            }

        }
	}
});