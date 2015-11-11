/*'use strict';

describe('Directive: ngPlaceholder', function () {

  // load the directive's module
  beforeEach(module('brightcoveRequesterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.placeholder = 'test';
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-placeholder></ng-placeholder>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngPlaceholder directive');
  }));
});*/