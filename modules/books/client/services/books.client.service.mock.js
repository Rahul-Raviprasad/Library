(function () {
  'use strict';
  angular
    .module('mock.BookService', [])
    .factory('BooksService', BooksService);

  BooksService.$inject = ['$q'];

  function BooksService($q) {
    var svc = {};
    var books = [
      {
        '_id': '578',
        '__v': 0,
        'loggedUserRequested': false,
        'queueList': [],
        'updatedOn': '2016-07-22T11:09:13.394Z',
        'updatedBy': '',
        'createdBy': '',
        'createdOn': '2016-07-22T11:09:13.394Z',
        'language': '',
        'keywords': '',
        'numberOfPages': null,
        'imageUrl': '',
        'reviewLink': '',
        'userEmail': 'rahul.raviprasad@fake.com',
        'userName': 'Rahul Raviprasad',
        'isActive': true,
        'contributedBy': 'Rahul',
        'location': '2nd floor',
        'condition': 'new',
        'numberOfCopies': 1,
        'isbn': '123',
        'possessor': 'admin',
        'status': 'issued',
        'category': 'Non Fiction',
        'publications': 'Rahul Publications',
        'author': 'Eric Gamma',
        'desc': 'solve already solved problems in a consistent manner.',
        'title': 'design patterns'
      },
      {
        '_id': '39',
        '__v': 0,
        'loggedUserRequested': false,
        'queueList': [],
        'updatedOn': '2016-07-22T11:11:15.838Z',
        'updatedBy': '',
        'createdBy': '',
        'createdOn': '2016-07-22T11:11:15.838Z',
        'language': '',
        'keywords': '',
        'numberOfPages': null,
        'imageUrl': 'abc@di.com',
        'reviewLink': 'ads',
        'userEmail': 'anoop@g.com',
        'userName': 'Anoop Goudar',
        'isActive': true,
        'contributedBy': 'Anoop',
        'location': 'Midtown-GF Floor',
        'condition': 'old',
        'numberOfCopies': 1,
        'isbn': '8787',
        'possessor': 'admin',
        'status': 'issued',
        'category': 'Technical',
        'publications': 'MIT',
        'author': 'Corman',
        'desc': 'Algo book best!!',
        'title': 'Introduction to Algorithms'
      }];

    svc.getBooks = getBooks;
    svc.createBook = createBook;
    svc.getBookDetails = getBookDetails;
    svc.updateBookDetails = updateBookDetails;
    svc.deleteBook = deleteBook;
    return svc;

    // ---------------------------------------------------------------------
    function getBooks() {
      return $q.when(books);
    }
    function createBook(book) {
      return $q.when(book[0]);
    }
    function getBookDetails(bookId) {
      return $q.when(books[0]);
    }
    function updateBookDetails(bookId, book) {
      return $q.when(true);
    }
    function deleteBook(bookId) {
      return $q.when(true);
    }
  }

}());
