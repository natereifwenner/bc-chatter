'use strict';

angular.module('brightcoveRequesterApp')
  .factory('searchService', function ($http) {
    // Service logic
    // ...
    return{
  		searchAll: function(api, q){
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
      searchNextPage: function(q, page){
        return $http.get('/api/search/video?q=' + q + '&page=' + page)
              .then(function(result){
                  return result.data;
              })
      }
  	}
  });
