'use strict';

angular.module('brightcoveRequesterApp')
  .controller('MainCtrl', function ($scope, $state, $http) {
    $state.transitionTo('main.search');
  });
