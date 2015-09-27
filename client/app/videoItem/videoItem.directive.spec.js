'use strict';

describe('Directive: videoRow', function () {

  // load the directive's module and view
  beforeEach(module('directiveApp'));
  beforeEach(module('app/videoRow/videoRow.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<video-row></video-row>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the videoRow directive');
  }));
});