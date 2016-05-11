var http = require('http');

module.exports = {

    httpRequest: function (url, callback) {
        var body = '';

        http.get(url, function(res) {
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                body += chunk
            });

            res.on('end', function() {
                callback(body)
            });

        }).on ('error', function(err) {
            console.error('Error with the request:', err.message);
            callback(err);
        });
    },

    logEvent: function (msg) {
        var now = new Date();
        console.log('(' + now.toISOString() + ') ' + msg);
    }

};