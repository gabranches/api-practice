var http = require('http');
var helpers = require('./helpers');

module.exports = {

    getCurStreamsSumm: function (callback) {
        var url = 'http://api.twitch.tv/kraken/streams/summary';
        helpers.httpRequest(url, callback);     
    }
    
};