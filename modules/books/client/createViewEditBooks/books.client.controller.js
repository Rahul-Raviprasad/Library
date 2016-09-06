(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksController', BooksController);

  BooksController.$inject = ['$scope', '$state', 'BooksService', '$window', 'Authentication', '$stateParams'];

  function BooksController($scope, $state, BooksService, $window, Authentication, $stateParams) {
    var vm = this;

    // vm.book = book;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.edit = false;

    if ($stateParams.bookId) {
      BooksService.getBookDetails($stateParams.bookId).then(successfullFetchingBookDetails);
    }

    function successfullFetchingBookDetails(data) {
      vm.book = data;
      console.log(data._id);
    }
    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.book.$remove($state.go('books.list'));
      }
    }


    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookForm');
        return false;
      }
      BooksService.createBook(vm.book).then(successfullCreateBook, failureCreatingBook);

      function successfullCreateBook(data) {
        vm.book = data;
        $state.go('books.view', {
          bookId: data._id
        });
      }
      function failureCreatingBook(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
