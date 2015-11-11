'use strict';

angular.module('brightcoveRequesterApp')
  .controller('SearchCtrl', function (searchService) {
    var search, vm;
    vm = this;
    vm.search = {
      'total' : '',
      'searchTerm' : '',
      'items' : [],
      'totalPage' : 0,
      'page' : 0,
      'playlist' : { id: null }
    };
    vm.state = {
      'done' : false,
      'many' : false,
      'currentRange' : '',
      'pagination' : false,
    }
    vm.searchOptApi = {};
    vm.noResults = false;
  	vm.request = {
  		api: [{ name: "Video", placeholder: "Search by keyword - Example: \"Forman Law\""}
            /*,{ name:"Video ID", placeholder: "Search by Video ID - Example: 012134123"}, 
            { name: "Ref ID", placeholder: "Search by Reference ID - Example: 1355062_01_C"}*/]
  	};
  	
    vm.searchKey = function(api,q){
      //reset state
      vm.noResults = false;
      vm.state = {
        'done' : false,
        'many' : false,
        'currentRange' : '',
        'pagination' : false,
      }

    	searchService.searchAll(api,q).then(function(resp){
    		if(resp.page_size <= resp.total_count){
    			var range = resp.items.length;
    			vm.state.many = true;
    			vm.state.currentRange = 'Viewing ' + range + ' out of ' +resp.total_count;
    		}else if(resp.total_count === 0){
          vm.noResults = true;
        }

    		vm.search.searchTerm = q;
    		vm.search.page = resp.page_number;
    		vm.search.total = resp.total_count;
    		vm.search.items = resp.items;
        vm.search.totalPage = resp.total_count / 20;

        vm.state.done = true;

        
    	});
    }

    vm.searchPage = function(q, page){
    	//reset state
      vm.noResults = false;
      vm.state = {
        'done' : false,
        'many' : false,
        'currentRange' : '',
        'pagination' : false,
      }
    	searchService.searchNextPage(q, page).then(function(resp){
    		
    		vm.search.searchTerm = q;
    		vm.search.page = resp.page_number;
    		vm.search.total = resp.total_count;
    		vm.search.items = resp.items;
    		vm.search.totalPage = createArray(resp.total_count / 20);
    		vm.search.page = resp.page_number

        vm.state.done = true;
        vm.state.pagination = true;

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
