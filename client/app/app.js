'use strict';

angular.module('brightcoveRequesterApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');
    $httpProvider.interceptors.push('LoadingInterceptor');
    $locationProvider.html5Mode(true);
  });