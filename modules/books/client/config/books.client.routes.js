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
      .state('books.list', {
        url: '',
        templateUrl: 'modules/books/client/views/list-books.client.view.html',
        controller: 'BooksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Books List'
        }
      })
      .state('books.create', {
        url: '/create',
        templateUrl: 'modules/books/client/views/form-book.client.view.html',
        controller: 'BooksController',
        controllerAs: 'vm',
        resolve: {
          bookResolve: newBook
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Book Create'
        }
      })
      .state('books.edit', {
        url: '/:bookId/edit',
        templateUrl: 'modules/books/client/views/form-book.client.view.html',
        controller: 'BooksController',
        controllerAs: 'vm',
        resolve: {
          bookResolve: getBook
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Book {{ bookResolve.title }}'
        }
      })
      .state('books.view', {
        url: '/:bookId',
        templateUrl: 'modules/books/client/views/view-book.client.view.html',
        controller: 'BooksController',
        controllerAs: 'vm',
        resolve: {
          bookResolve: getBook
        },
        data: {
          pageTitle: 'Book {{ bookResolve.title }}'
        }
      });
  }

  getBook.$inject = ['$stateParams', 'BooksService'];

  function getBook($stateParams, BooksService) {
    return BooksService.get({
      bookId: $stateParams.bookId
    }).$promise;
  }

  newBook.$inject = ['BooksService'];

  function newBook(BooksService) {
    return new BooksService();
  }
}());
