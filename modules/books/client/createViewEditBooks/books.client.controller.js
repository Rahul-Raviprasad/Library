(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksController', BooksController);

  BooksController.$inject = ['$scope', '$state', 'BooksService', '$window', 'Authentication', '$stateParams', 'ReviewsService'];

  function BooksController($scope, $state, BooksService, $window, Authentication, $stateParams, ReviewsService) {
    var vm = this;

    // vm.book = book;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.edit = false;
    vm.deleteBook = deleteBook;
    vm.createReview = createReview;

    if ($stateParams.bookId) {
      BooksService.getBookDetails($stateParams.bookId).then(successfullFetchingBookDetails);
      ReviewsService.getReviewsForBook($stateParams.bookId).then(successfullFetchingReviews);
    }

    function successfullFetchingBookDetails(data) {
      vm.book = data;
    }

    function successfullFetchingReviews(data) {
      vm.allReviews = data[0].reviews;
    }

    function createReview(newReview, book) {
      ReviewsService.pushReviewToList(newReview, book).then(successfullBookReview, errorBookReview);
      function successfullBookReview(data) {
        alert('Thanks for your valuable review !');
      }
      function errorBookReview(data) {
        alert('Could not add your review, kindly try after sometime.');
        // ReviewsService.createReview(newReview, book);
      }
      // ReviewsService.createReview(newReview, book);
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
