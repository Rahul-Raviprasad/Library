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
    var vm = this;
    vm.save = function() {
      if (vm.book._id) {
        vm.book.$update(successCallback, errorCallback);
        vm.edit = false;
      } else {
        vm.book.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        alert('Changes has been saved successfully');
      }

      function errorCallback(res) {
        alert('Sorry, your changes could not be saved for some reasons. Please try after sometime.');
      }
    };
  }

}());
