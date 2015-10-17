var express = require('express');
var app = express();
var twitchAPI = require('./lib/twitchAPI');
var helpers = require('./lib/helpers');
var server = app.listen(process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Routes

app.get('/', function (req, res) {

    twitchAPI.getCurStreamsSumm(function(data) {
        console.log(data);
    });
    
    res.render('pages/index');
});


app.listen(app.get('port'), function () {
    helpers.logEvent('Node app is running.');
});
