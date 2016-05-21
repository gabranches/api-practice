// CONTROLLERS

angular.module('app').controller('guideController', guideController);

guideController.$inject = ['$scope', '$sce', '$routeParams', 'helpers', 'twitchAPI', 'guide'];

function guideController ($scope, $sce, $routeParams, helpers, twitchAPI, guide) {
	
	$scope.encodeURI = helpers.encodeURI;
	$scope.guide = guide;
	$scope.setLiveStream = setLiveStream;
	$scope.trustSrc = trustSrc;

	$scope.$watch('$routeParams', function() {
		
	});

	activate();

    /////////////////////////////////////////////////////

    function activate() {
    	if (guide.selection.name === "") {
    		guide.selection.name = guide.pickRandomStream(guide.selection.list);
    	}

    	if($routeParams.gameName) {

			name = $routeParams.gameName.replace('&', '%26');
			twitchAPI.getGame(name).then(function(data) {
				guide.selection.list = data;
			});

		} else {

			twitchAPI.getFrontPage().then(function(data) {
				guide.selection.list = data;
			});
			
		}

    }

	function setLiveStream(name) {
		guide.selection.name = name;
	}

    function trustSrc(src) {
    	return $sce.trustAsResourceUrl(src);
	}

}
