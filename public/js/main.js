$(function(){});var app=angular.module("app",[]);app.controller("frontPageController",["$scope","$sce","$http","helpers",function(e,t,n,r){e.streams=stream_data.streams,e.live={selection:"",menu:"top-streams",stream:{src:function(e){return e.stream.url+e.selection},url:"http://player.twitch.tv/?channel="},chat:{src:function(e){return e.chat.url.replace("{CHANNEL}",e.selection)},url:"http://twitch.tv/chat/embed?channel={CHANNEL}&amp;popout_chat=true"}},e.getGameStreams=function(t){t=encodeURIComponent(t.trim()),n({method:"GET",url:"https://api.twitch.tv/kraken/streams?game="+t}).then(function(t){e.streams=t.data.streams},function(e){console.log(e)})},e.setLiveStream=function(t){e.live.selection=t,console.log(t)},angular.element(window).on("resize",function(){e.$apply()}),e.trustSrc=function(e){return t.trustAsResourceUrl(e)},pickRandomStream=function(){var t=Math.floor(Math.random()*e.streams.length);e.live.selection=e.streams[t].channel.name},pickRandomStream()}]),app.directive("chatEmbed",function(){return{restrict:"AE",replace:!0,templateUrl:"../templates/chat-embed.html"}}),app.directive("videoEmbed",function(){return{restrict:"AE",replace:!0,templateUrl:"../templates/video-embed.html"}}),app.directive("channelRow",function(){return{restrict:"AE",replace:!0,templateUrl:"../templates/channel-row.html"}}),app.service("helpers",function(){return{encodeURI:function(e){return encodeURIComponent(e)},replaceNewlines:function(e){return console.log(e),e},goBack:function(e){0===window.history.length||window.history.back()}}});