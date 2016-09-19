(function () {
  'use strict';

  angular
    .module('books.component')
    .component('bookDetailsEdit', {
      bindings: {
        book: '=',
        edit: '='
      },
      controller: BookDetailsEditCtrl,
      controllerAs: 'vm',
      templateUrl: 'modules/books/client/createViewEditBooks/editBook/components/book-details-edit.html'

    });

  BookDetailsEditCtrl.inject = ['BooksService', 'BookHistoryService', '$scope'];

  function BookDetailsEditCtrl(BooksService, BookHistoryService, $scope) {
    var vm = this;
    // vm.tempBook = vm.book;
    vm.cancel = function() {
      vm.edit = false;
      // vm.book = vm.tempBook;
    };
    vm.save = function(isValid) {
      if (isValid) {
        if (vm.book._id) {
          BooksService.updateBookDetails(vm.book._id, vm.book).then(successCallback, errorCallback);
        }
      } else {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookForm');
        return false;
      }

      function successCallback(res) {
        vm.edit = false;
        var actionTaken = 'Book details got updated';
        var comments = 'NA';
        BookHistoryService.pushTransactionToList(actionTaken, comments, vm.book);
        alert('Changes has been saved successfully');
      }

      function errorCallback(res) {
        alert('Sorry, your changes could not be saved for some reasons. Please try after sometime.');
      }
    };
  }

}());
