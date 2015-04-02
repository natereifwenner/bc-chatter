'use strict';

angular.module('brightcoveRequesterApp')
  .directive('ngPlaceholder', function () {
    return {
	    restrict: 'A',
	    scope: {
	      placeholder: '=ngPlaceholder'
	    },
	    link: function(scope, elem, attr) {
	    	console.log(elem);
	      scope.$watch('placeholder',function() {
	        elem[0].placeholder = scope.placeholder;
	      });
	    }
	  }
  });