// SERVICES

angular.module('app').factory('guide', guide);

function guide() {
    
    var selection = {
        name: "",
        list: stream_data.streams
    };

    return {
        pickRandomStream: pickRandomStream,
        selection: selection,
        videoEmbed: videoEmbed,
        chatEmbed: chatEmbed
    };

    /////////////////////////////////////////////////////

    function videoEmbed() {
        return 'http://player.twitch.tv/?channel={CHANNEL}'
            .replace('{CHANNEL}', selection.name);
    }

    function chatEmbed() {
        return 'http://twitch.tv/chat/embed?channel={CHANNEL}&amp;popout_chat=true'
            .replace('{CHANNEL}', selection.name);
    }

    function pickRandomStream(streams) {
        var index = Math.floor(Math.random() * (streams.length));
        return streams[index].channel.name;        
    }

}



angular.module('app').factory('twitchAPI', twitchAPI);

twitchAPI.$inject = ['$http', 'helpers'];

function twitchAPI($http, helpers) {


    return {
        getGame: getGame,
        getFrontPage: getFrontPage
    };

    /////////////////////////////////////////////////////

    function getGame(game) {

        var url = 'https://api.twitch.tv/kraken/streams?game=' + helpers.encodeURI(game);

        return $http.get(url)
            .then(getGameSuccess)
            .catch(getGameFailed);

        function getGameSuccess(response) {
            return response.data.streams;
        }

        function getGameFailed(error) {
            console.log('getGame failed' + error.data);
        }
    }

    function getFrontPage() {

        var url = 'https://api.twitch.tv/kraken/streams';

        return $http.get(url)
            .then(getFrontPageSuccess)
            .catch(getFrontPageFailed);

        function getFrontPageSuccess(response) {
            return response.data.streams;
        }

        function getFrontPageFailed(error) {
            console.log('getFrontPage failed' + error.data);
        }
    }

}



angular.module('app').factory('helpers', helpers);

function helpers() {

    return {
        encodeURI: encodeURI,
        goBack: goBack        
    };


    function encodeURI(text) {
        return encodeURIComponent(text);
    }

    function goBack() {
        if(window.history.length === 0) {
            // Do nothing
        } else {
            window.history.back();
        }
    }
}


