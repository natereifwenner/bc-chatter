'use strict';

angular.module('brightcoveRequesterApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('main.search',{
      	templateUrl: 'app/search/main.search.html',
      	control: 'SearchCtrl'
      });
      
  });

