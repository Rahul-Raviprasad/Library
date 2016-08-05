(function () {
  'use strict';

  angular
    .module('books.component')
    .component('bookDetailsView', {
      bindings: {
        book: '=',
        edit: '='
      },
      controller: function () {
      },
      controllerAs: 'vm',
      templateUrl: 'modules/books/client/components/book-details-view.html'

    });
}());
