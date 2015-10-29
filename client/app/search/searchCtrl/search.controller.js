'use strict';

angular.module('brightcoveRequesterApp')
  .controller('SearchCtrl', function (searchService) {
    var search, vm;
    vm = this;
    vm.search = {
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
    };
    vm.searchOptApi = {};
    vm.noResults = false;
  	vm.request = {
  		api: [{ name: "Video", placeholder: "Search by keyword - Example: \"Forman Law\""}
            /*,{ name:"Video ID", placeholder: "Search by Video ID - Example: 012134123"}, 
            { name: "Ref ID", placeholder: "Search by Reference ID - Example: 1355062_01_C"}*/]
  	};
  	

    vm.searchKey = function(api,q){
    	vm.search = {
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
        console.log(resp);
    		if(resp.page_size <= resp.total_count){
    			var range = resp.items.length;
    			vm.search.many = true;
    			vm.search.manyMsg = 'Viewing ' + range + ' out of ' +resp.total_count;
    		}else if(resp.total_count === 0){
          vm.noResults = true;
        }
    		vm.search.done = true;
    		vm.search.searchTerm = q;
    		vm.search.page = resp.page_number;
    		vm.search.total = resp.total_count;
    		vm.search.items = resp.items;
    		vm.search.loading = false;
    		vm.search.totalPage = resp.total_count / 20;
    	});
    }

    vm.searchPage = function(q, page){
    	search = {
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
    		
    		vm.search.done = true;
    		vm.search.searchTerm = q;
    		vm.search.page = resp.page_number;
    		vm.search.total = resp.total_count;
    		vm.search.items = resp.items;
    		vm.search.loading = false;
    		vm.search.pagination = true;
    		vm.search.totalPage = createArray(resp.total_count / 20);
    		vm.search.page = resp.page_number
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
