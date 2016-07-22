(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['BooksService'];

  function BooksListController(BooksService) {
    var vm = this;
    vm.chooseCategory = chooseCategory;
    vm.opener = false;
    vm.selectedItem = 'Choose Category';
    vm.categories = [];

    vm.books = BooksService.query(function() {
      angular.forEach(vm.books, function(book, key) {
        console.log(book.category);
        vm.categories.push(book.category);
      });
    });

    function chooseCategory(category) {
      vm.selectedItem = category;
      vm.opener = false;
    }
  }
}());
