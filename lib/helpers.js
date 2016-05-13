var request = require('request');

module.exports = {

    httpRequest: function (url, callback) {
        var body = '';

        request.get(url, function(err, res, body) {
            if (err) throw err;

            if (res.statusCode === 200) {
                callback(body)
            }
        });
    },

    logEvent: function (msg) {
        var now = new Date();
        console.log('(' + now.toISOString() + ') ' + msg);
    }

};