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
    vm.selectedItem = 'All';
    vm.categories = [];
    vm.categories.push('All');
    vm.books = BooksService.query(function() {
      angular.forEach(vm.books, function(book, key) {
        vm.categories.push(book.category);
      });
    });
    vm.filteredBooks = vm.books;

    function chooseCategory(category) {
      vm.selectedItem = category;
      vm.opener = false;
      if (vm.selectedItem === 'All') {
        vm.filteredBooks = vm.books;
      } else {
        vm.filteredBooks = vm.books.filter(filterBooks);
      }
    }
    function filterBooks(book) {
      return book.category === vm.selectedItem;
    }
  }
}());
