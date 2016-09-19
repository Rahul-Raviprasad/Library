(function () {
  'use strict';

  angular
    .module('books.component')
    .component('bookDetailsView', {
      bindings: {
        book: '='
      },
      controller: function () {
      },
      controllerAs: 'vm',
      templateUrl: 'modules/books/client/createViewEditBooks/viewBookDesc/components/book-details-view.html'

    });
}());
