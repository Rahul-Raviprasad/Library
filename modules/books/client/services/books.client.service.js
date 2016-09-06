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

    return svc;

    // ///----/////
    function getBooks() {
      return $http.get('api/books').then(function successHandler(response) {
        return response.data;
      });
    }
    function createBook(book) {
      return $http.post('api/books', book).then(function successHandler(response) {
        return response.data;
      });
    }
    function getBookDetails(bookId) {
      return $http.get('api/books/' + bookId).then(function successHandler(response) {
        return response.data;
      });
    }
  }
}());
