(function () {
  'use strict';

  angular
    .module('articles')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['BooksService'];

  function BooksListController(BooksService) {
    var vm = this;

    vm.articles = BooksService.query();
  }
}());
