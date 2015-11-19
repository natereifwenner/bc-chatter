'use strict';

angular.module('brightcoveRequesterApp')
  .controller('SearchCtrl', function (searchService) {
    var search, vm;
    vm = this;
    vm.results = {
      'done' : false
    };
    vm.searchOptApi = {};
    vm.noResults = false;
  	vm.request = {
  		api: [{ name: "Video", placeholder: "Search by keyword - Example: \"Forman Law\""}
            /*,{ name:"Video ID", placeholder: "Search by Video ID - Example: 012134123"}, 
            { name: "Ref ID", placeholder: "Search by Reference ID - Example: 1355062_01_C"}*/]
  	};
  	
    vm.searchKey = function(api,q){
    	searchService.searchAll(api,q).then(function(resp){
        vm.results = resp;
        vm.results.done = true;
      });
    }

    vm.searchPage = function(q, page){
        vm.results.done = false;
    	searchService.searchNextPage(q, page).then(function(resp){
        vm.results = resp;
        vm.results.done = true;
    	});
    }

  });
