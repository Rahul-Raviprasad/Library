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

  BookDetailsEditCtrl.inject = [];

  function BookDetailsEditCtrl() {

    this.save = function(book) {
      if (this.book._id) {
        this.book.$update(successCallback, errorCallback);
        this.edit = false;
      } else {
        this.book.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        console.log(res);
      }

      function errorCallback(res) {
        console.log(res);
      }
    };
  }

}());
