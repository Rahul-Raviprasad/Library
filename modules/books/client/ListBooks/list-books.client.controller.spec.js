(function() {
  'use strict';

  describe('list-books-suite', listBooksSuite);

  function listBooksSuite() {
    var $scope;
    var BooksListController;
    var $state;
    var $rootScope;
    var fakeAuthentication = {
      user: {
        displayName: 'Rahul',
        email: 'rahul.raviprasad@fakeMail.com'
      }
    };

    beforeEach(module('books'));
    beforeEach(module(ApplicationConfiguration.applicationModuleName));
    beforeEach(module('mock.BookService'));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$state_) {
      $scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;
      $state = _$state_;
      BooksListController = _$controller_('BooksListController', {
        $scope: $scope,
        Authentication: fakeAuthentication
      });
    }));

    it('should have All selected by default', function() {
      $scope.$digest();
      console.log(BooksListController.selectedItem);
      expect(BooksListController.selectedItem).toBe('All');
    });
  }
}());
