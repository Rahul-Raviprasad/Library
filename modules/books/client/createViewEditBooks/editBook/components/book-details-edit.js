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

  BookDetailsEditCtrl.inject = ['BooksService', 'BookHistoryService'];

  function BookDetailsEditCtrl(BooksService, BookHistoryService) {
    var vm = this;
    vm.save = function() {
      if (vm.book._id) {
        BooksService.updateBookDetails(vm.book._id, vm.book).then(successCallback, errorCallback);
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
