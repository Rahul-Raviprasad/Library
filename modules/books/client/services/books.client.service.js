(function () {
  'use strict';

  angular
    .module('books.services')
    .factory('BooksService', BooksService);

  BooksService.$inject = ['$http'];

  function BooksService($http) {
    var svc = {};
    svc.getBooks = getBooks;
    svc.createBook = createBook;
    svc.getBookDetails = getBookDetails;
    svc.updateBookDetails = updateBookDetails;
    svc.deleteBook = deleteBook;
    svc.getUnavialableBooks = getUnavialableBooks;

    return svc;

    // ---------------------------------------------------------------------
    function getBooks() {
      return $http.get('api/books').then(successHandler);
    }
    function createBook(book) {
      return $http.post('api/books', book).then(successHandler);
    }
    function getBookDetails(bookId) {
      return $http.get('api/books/' + bookId).then(successHandler);
    }
    function updateBookDetails(bookId, book) {
      return $http.put('api/books/' + bookId, book).then(successHandler);
    }
    function deleteBook(bookId) {
      return $http.delete('api/books/' + bookId).then(successHandler);
    }
    function getUnavialableBooks() {
      return $http.get('api/unavailableBooks').then(successHandler);
    }

    function successHandler(response) {
      return response.data;
    }
  }
}());
