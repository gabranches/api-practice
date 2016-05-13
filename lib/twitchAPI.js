var http = require('http');
var helpers = require('./helpers');

module.exports = {

    getCurStreamsSumm: function (callback) {
        var url = 'http://api.twitch.tv/kraken/streams/summary';
        helpers.httpRequest(url, callback);     
    },

    streams: function(callback) {
    	var url = 'https://api.twitch.tv/kraken/streams';
    	helpers.httpRequest(url, callback);
    }
    
};