(function() {
  describe('View-Edit-Book-Suite', viewEditBookSuite);

  function viewEditBookSuite() {
    var $scope;
    var BooksController;

    beforeEach(module('books'));
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(inject(function(_rootScope_, _$state_) {
      $scope = _rootScope_.$new();
    }));
  }
}());
