'use strict';

angular.module('brightcoveRequesterApp')
  .directive('videoItem', function () {
    return {
      templateUrl: 'app/videoItem/videoItem.html',
      restrict: 'EA',
       scope: {
	       video: '='
	     },
       controller: function($scope, $element, searchService){
         $scope.getPlaylist = function(id){
            $scope.playlist = {};
            console.log(id);
              searchService.getPlaylist(id).then(function(resp){
                  $scope.playlist.id = resp.playlists;
              })
          }
       }
    };
  });