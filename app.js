var express = require('express');
var app = express();
var port = process.env.port || 3000;
var twitchAPI = require('./lib/twitchAPI');
var helpers = require('./lib/helpers');


app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Routes

app.get('/', function (req, res) {

    twitchAPI.streams(function(streamData) {

        res.render('pages/index', {
    		streams: streamData
        });

    });
    

});


app.listen(port, function() {
	helpers.logEvent('App is running.');
});
