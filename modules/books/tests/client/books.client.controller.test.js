(function() {
  describe('View-Edit-Book-Suite', viewEditBookSuite);

  function viewEditBookSuite() {
    var $scope;
    var BooksController;
    var Authentication = {};
    var bookResolve = {};

    beforeEach(module('books'));
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function(_$rootScope_, _$state_, _$controller_, bookResolve, _$window_) {
      $scope = _$rootScope_.$new();
      BooksController = _$controller_('BooksController', {
        $scope: $scope,
        $state: _$state_,
        Authentication: Authentication,
        bookResolve: bookResolve,
        $window: _$window_
      });

    }));

    it('should have set correct defaults', function() {
      $scope.$digest();
      expect(BooksController.error).toBe(null);
    });
  }
}());
