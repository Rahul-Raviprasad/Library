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
    vm.save = save;
    vm.edit = false;
    vm.deleteBook = deleteBook;

    if ($stateParams.bookId) {
      BooksService.getBookDetails($stateParams.bookId).then(successfullFetchingBookDetails);
    }

    function successfullFetchingBookDetails(data) {
      vm.book = data;
    }

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

    function deleteBook(book) {
      if (window.confirm('Are you sure you want to remove this book from shelf permanently ?')) {
        BooksService.deleteBook(book._id).then(successfullyDeleted, errorDeleting);
      }
      function successfullyDeleted(data) {
        alert('Book has been removed successfully from the shelf');
        $state.go('books.list');
      }
      function errorDeleting(data) {
        alert('Cannot delete this book, you may need it in future! ');
      }
    }
  }
}());
