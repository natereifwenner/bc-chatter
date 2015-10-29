'use strict';

angular.module('brightcoveRequesterApp')
  .factory('searchService', function ($http) {
    var service = {};

		service.searchAll = function(api, q){
      if(api === 'Playlist'){
        return $http.get('/api/search/playlist')
            .then(function(result){
              return result.data;
            })
      }
      else if(api === 'Video'){
  			return $http.get('/api/search/video?q=' + q)
  						.then(function(result){
  							return result.data;
  						})
      }
		},
    service.searchNextPage = function(q, page){
      return $http.get('/api/search/video?q=' + q + '&page=' + page)
            .then(function(result){
                return result.data;
            })
    },
    service.getPlaylist = function(id){
        return $http.get('/api/search/playlist?id=' + id)
            .then(function(result){
                console.log(result.data);
                return result.data;
            })
    }
  	
    return service;
  });
