'use strict';

describe('SearchCtrl', function () {
      var vm, scope, searchService;

  // load the controller's module
/*  beforeEach(module('brightcoveRequesterApp'));
*/
  beforeEach(function(){
    var mockSearchService = {};
    module('brightcoveRequesterApp', function($provide){
        $provide.value('searchService', mockSearchService);
    });
    inject(function($q){

        mockSearchService.data = {
            'items':[
              {
                  'id': 123456,
                  'name': 'test video 1',
                  'shortDescription' : 'description',
                  'videoStillURL': 'http://something.com/video.mp4',
                  'thumbnailURL': 'http://something.com/image.jpg'
              },
              {
                  'id': 7891011,
                  'name': 'test video 2',
                  'shortDescription' : 'description2',
                  'videoStillURL': 'http://something2.com/video.mp4',
                  'thumbnailURL': 'http://something2.com/image.jpg'
              }
            ],
            'page_number':0,
            'page_size':20,
            'total_count':145

        };
      mockSearchService.searchAll = function(api, q){
          var defer = $q.defer();
          defer.resolve(this.data);
          return defer.promise;
      }
      mockSearchService.searchNextPage = function(q, page){
          var defer = $q.defer();
          defer.resolve(this.data);
          return defer.promise;
      }
    })
});
  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$rootScope_, _searchService_) {
    scope = _$rootScope_.$new();
    searchService = _searchService_;
    vm = _$controller_("SearchCtrl", { $scope: scope, searchService: searchService });
    scope.$digest();
  }));

  it('should start in a neutral state', function () {
    expect(vm.state.done).toBe(false);
    expect(vm.state.many).toBe(false);
    expect(vm.state.currentRange).toBe('');
    expect(vm.state.pagination).toBe(false);
  });
  
/*  it('should stop loading', function(){
    vm.searchKey();
    scope.$digest();
  });*/

  it('should get video data', function() {
    vm.searchKey();
    scope.$digest();
    expect(vm.search.items).toEqual([
              {
                  'id': 123456,
                  'name': 'test video 1',
                  'shortDescription' : 'description',
                  'videoStillURL': 'http://something.com/video.mp4',
                  'thumbnailURL': 'http://something.com/image.jpg'
              },
              {
                  'id': 7891011,
                  'name': 'test video 2',
                  'shortDescription' : 'description2',
                  'videoStillURL': 'http://something2.com/video.mp4',
                  'thumbnailURL': 'http://something2.com/image.jpg'
              }
            ]);
  });

  it('should have multiple pages', function(){
    vm.searchKey();
    scope.$digest();
    expect(vm.state.many).toBe(true);
  });

  it('should ')


});

