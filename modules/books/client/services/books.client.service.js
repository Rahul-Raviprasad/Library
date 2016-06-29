(function () {
  'use strict';

  angular
    .module('books.services')
    .factory('BooksService', BooksService);

  BooksService.$inject = ['$resource'];

  function BooksService($resource) {
    return $resource('api/books/:bookId', {
      bookId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
