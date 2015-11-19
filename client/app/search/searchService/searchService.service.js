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
                if(result.data.page_size <= result.data.total_count){
                  var range = result.data.items.length;
                  result.data.many = true;
                  result.data.currentRange = 'Viewing ' + range + ' out of ' +result.data.total_count;
                }else if(result.data.total_count === 0){
                  result.data.noResults = true;
                }

                result.data.searchTerm = q;
                result.data.totalPage = result.data.total_count / 20;
  							return result.data;
  						})
      }
		},
    service.searchNextPage = function(q, page){
      return $http.get('/api/search/video?q=' + q + '&page=' + page)
            .then(function(result){
                result.data.searchTerm = q;
                result.data.page = result.data.page_number;
                result.data.total = result.data.total_count;
                result.data.items = result.data.items;
                result.data.totalPage = createArray(result.data.total_count / 20);
                result.data.page = result.data.page_number
                result.data.pagination = true;
                return result.data;
            })
    },
    service.getPlaylist = function(id){
        return $http.get('/api/search/playlist?id=' + id)
            .then(function(result){
                return result.data;
            })
    }


    //TODO: figure out way to limit pagination
    function createArray(pages){
      var x = [];
    for (var i=1;i<=pages + 1;i++) {
      x.push(i);
    }
    return x;
    }
  	
    return service;
  });
