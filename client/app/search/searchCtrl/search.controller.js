'use strict';

angular.module('brightcoveRequesterApp')
  .controller('SearchCtrl', function ($scope, searchService) {
    $scope.searchOptApi = {};
  	$scope.request = {
  		api: [{ name: "Video", placeholder: "Search by keyword - Example: \"Forman Law\""}
            /*,{ name:"Video ID", placeholder: "Search by Video ID - Example: 012134123"}, 
            { name: "Ref ID", placeholder: "Search by Reference ID - Example: 1355062_01_C"}*/]
  	};
  	$scope.search = {
  		'loading' : false,
  		'total' : '',
  		'searchTerm' : '',
  		'done' : false,
  		'many' : false,
  		'manyMsg' : '',
  		'items' : [],
  		'pagination' : false,
  		'totalPage' : 0,
  		'page' : 0,
      'playlist' : { id: null }
  	}

    $scope.searchKey = function(api,q){
    	$scope.search = {
	  		'loading' : true,
	  		'total' : '',
	  		'searchTerm' : '',
	  		'done' : false,
	  		'many' : false,
	  		'manyMsg' : '',
	  		'items' : [],
	  		'pagination' : false,
	  		'totalPage' : 0,
	  		'page' : 0,
        'playlist' : { id: null }
	  	}
    	searchService.searchAll(api,q).then(function(resp){
    		if(resp.page_size <= resp.total_count){
    			var range = resp.items.length;
    			$scope.search.many = true;
    			$scope.search.manyMsg = 'Viewing ' + range + ' out of ' +resp.total_count;
    		}
    		$scope.search.done = true;
    		$scope.search.searchTerm = q;
    		$scope.search.page = resp.page_number;
    		$scope.search.total = resp.total_count;
    		$scope.search.items = resp.items;
    		$scope.search.loading = false;
    		$scope.search.totalPage = resp.total_count / 20;
    	});
    }

    $scope.searchPage = function(q, page){
    	$scope.search = {
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
    		
    		$scope.search.done = true;
    		$scope.search.searchTerm = q;
    		$scope.search.page = resp.page_number;
    		$scope.search.total = resp.total_count;
    		$scope.search.items = resp.items;
    		$scope.search.loading = false;
    		$scope.search.pagination = true;
    		$scope.search.totalPage = createArray(resp.total_count / 20);
    		$scope.search.page = resp.page_number
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
