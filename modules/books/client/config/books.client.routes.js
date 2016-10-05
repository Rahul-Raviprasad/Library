(function () {
  'use strict';

  angular
    .module('books.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('books', {
        abstract: true,
        url: '/books',
        template: '<ui-view/>'
      })
      .state('myBooks', {
        url: '/myBooks',
        templateUrl: 'modules/books/client/MyBooks/my-books.client.view.html',
        controller: 'MyBooksController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'My Books'
        }
      })
      .state('books.list', {
        url: '',
        templateUrl: 'modules/books/client/listBooks/list-books.client.view.html',
        controller: 'BooksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Books List'
        }
      })
      .state('books.create', {
        url: '/create',
        templateUrl: 'modules/books/client/createViewEditBooks/createBook/form-book.client.view.html',
        controller: 'BooksController',
        controllerAs: 'vm',
        // resolve: {
        //   bookResolve: newBook
        // },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Book Create'
        }
      })
      .state('books.submit', {
        url: '/submitted',
        templateUrl: 'modules/books/client/listBooks/list-submitted-books.client.view.html',
        controller: 'BooksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Submitted Books List'
        }
      })
      .state('books.listUnavailable', {
        url: '/unavailable',
        templateUrl: 'modules/books/client/UnavailableBooks/unavailable-books.client.view.html',
        controller: 'UnavailableBooksController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Unavailable Books List'
        }
      })
      // .state('books.edit', {
      //   url: '/:bookId/edit',
      //   templateUrl: 'modules/books/client/createEditBooks/form-book.client.view.html',
      //   controller: 'BooksController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     bookResolve: getBook
      //   },
      //   data: {
      //     roles: ['user', 'admin'],
      //     pageTitle: 'Edit Book {{ bookResolve.title }}'
      //   }
      // })
      .state('books.view', {
        url: '/:bookId',
        templateUrl: 'modules/books/client/createViewEditBooks/viewBookDesc/view-book.client.view.html',
        controller: 'BooksController',
        controllerAs: 'vm'
      })
      .state('books.edit', {
        url: '/edit/:bookId',
        templateUrl: 'modules/books/client/createViewEditBooks/editBook/book-details-edit.html',
        controller: 'BookDetailsEditCtrl',
        controllerAs: 'vm'
      })
      .state('books.history', {
        url: '/history/:bookId',
        templateUrl: 'modules/books/client/createViewEditBooks/viewBookDesc/viewBookHistory/view-book-history.client.view.html',
        controller: 'BookHistoryController',
        controllerAs: 'vm'
      });
  }
  //
  // getBook.$inject = ['$stateParams', 'BooksService'];
  //
  // function getBook($stateParams, BooksService) {
  //   return BooksService.get({
  //     bookId: $stateParams.bookId
  //   }).$promise;
  // }
  //
  // newBook.$inject = ['BooksService'];
  //
  // function newBook(BooksService) {
  //   return new BooksService();
  // }
}());
