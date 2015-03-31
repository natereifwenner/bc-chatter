'use strict';

angular.module('brightcoveRequesterApp')
  .controller('SearchCtrl', function ($scope, searchService) {
  	$scope.search = {
  		api: ["Video", "Playlist"],
  		field: ["Video ID", "Ref ID"]
  	}
  	$scope.results = {
  		'loading' : false,
  		'total' : '',
  		'searchTerm' : '',
  		'done' : false,
  		'many' : false,
  		'manyMsg' : '',
  		'items' : [],
  		'pagination' : false,
  		'totalPage' : 0,
  		'page' : 0
  	}

    $scope.searchKey = function(api,q){
    	$scope.results = {
	  		'loading' : true,
	  		'total' : '',
	  		'searchTerm' : '',
	  		'done' : false,
	  		'many' : false,
	  		'manyMsg' : '',
	  		'items' : [],
	  		'pagination' : false,
	  		'totalPage' : 0,
	  		'page' : 0
	  	}
    	searchService.searchAll(api,q).then(function(resp){
        console.log(resp);
    		if(resp.page_size <= resp.total_count){
    			var range = resp.items.length;
    			$scope.results.many = true;
    			$scope.results.manyMsg = 'Viewing ' + range + ' out of ' +resp.total_count;
    		}
    		$scope.results.done = true;
    		$scope.results.searchTerm = q;
    		$scope.results.page = resp.page_number;
    		$scope.results.total = resp.total_count;
    		$scope.results.items = resp.items;
    		$scope.results.loading = false;
    		$scope.results.totalPage = resp.total_count / 20;
    	});
    }

    $scope.searchPage = function(q, page){
    	$scope.results = {
	  		'loading' : true,
	  		'total' : '',
	  		'searchTerm' : '',
	  		'done' : false,
	  		'many' : false,
	  		'manyMsg' : '',
	  		'items' : [],
	  		'pagination' : false,
	  		'totalPage' : 0,
	  		'page' : 0
	  	}
    	searchService.searchNextPage(q, page).then(function(resp){
    		
    		$scope.results.done = true;
    		$scope.results.searchTerm = q;
    		$scope.results.page = resp.page_number;
    		$scope.results.total = resp.total_count;
    		$scope.results.items = resp.items;
    		$scope.results.loading = false;
    		$scope.results.pagination = true;
    		$scope.results.totalPage = createArray(resp.total_count / 20);
    		$scope.results.page = resp.page_number
    	});
    }

    //TODO: figure out way to limit pagination
    var createArray = function(pages){
    	var x = [];
		for (var i=1;i<=pages + 1;i++) {
		  x.push(i);
		}
		return x;
    }

  });
