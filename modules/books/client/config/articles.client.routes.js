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
        templateUrl: 'modules/books/client/views/form-article.client.view.html',
        controller: 'BooksController',
        controllerAs: 'vm',
        resolve: {
          booksResolve: newArticle
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Book Create'
        }
      })
      .state('books.edit', {
        url: '/:articleId/edit',
        templateUrl: 'modules/books/client/views/form-article.client.view.html',
        controller: 'BooksController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getArticle
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Book {{ articleResolve.title }}'
        }
      })
      .state('books.view', {
        url: '/:articleId',
        templateUrl: 'modules/books/client/views/view-article.client.view.html',
        controller: 'BooksController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getArticle
        },
        data: {
          pageTitle: 'Book {{ articleResolve.title }}'
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'BooksService'];

  function getArticle($stateParams, BooksService) {
    return BooksService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newArticle.$inject = ['BooksService'];

  function newArticle(BooksService) {
    return new BooksService();
  }
}());
