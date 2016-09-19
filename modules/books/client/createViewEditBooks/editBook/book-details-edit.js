(function () {
  'use strict';

  angular
    .module('books.component')
    .controller('BookDetailsEditCtrl', BookDetailsEditCtrl);
    // .component('bookDetailsEdit', {
    //   bindings: {
    //     // book: '=',
    //     edit: '='
    //   },
    //   controller: BookDetailsEditCtrl,
    //   // controllerAs: 'vm',
    //   templateUrl: 'modules/books/client/createViewEditBooks/editBook/components/book-details-edit.html'
    //
    // });

  BookDetailsEditCtrl.inject = ['BooksService', 'BookHistoryService', '$scope', '$stateParams', '$state'];

  function BookDetailsEditCtrl(BooksService, BookHistoryService, $scope, $stateParams, $state) {
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;

    if ($stateParams.bookId) {
      BooksService.getBookDetails($stateParams.bookId).then(successfullFetchingBookDetails);
    }

    function successfullFetchingBookDetails(data) {
      vm.book = data;
      vm.tempBook = vm.book;
    }

    function cancel() {
      // vm.book = vm.tempBook;
      $state.go('books.view', {
        bookId: vm.book._id
      });
    }

    function save(isValid) {
      if (isValid) {
        if (vm.book._id) {
          BooksService.updateBookDetails(vm.book._id, vm.book).then(successCallback, errorCallback);
        }
      } else {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookForm');
        return false;
      }

      function successCallback(res) {
        // vm.edit = false;
        var actionTaken = 'Book details got updated';
        var comments = 'NA';
        BookHistoryService.pushTransactionToList(actionTaken, comments, vm.book);
        alert('Changes has been saved successfully');
        $state.go('books.view', {
          bookId: vm.book._id
        });
      }

      function errorCallback(res) {
        alert('Sorry, your changes could not be saved for some reasons. Please try after sometime.');
      }
    }
  }

}());
