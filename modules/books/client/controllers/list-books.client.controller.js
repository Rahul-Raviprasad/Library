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
    vm.categories = ['Fiction', 'Non Fictional', 'Technical', 'Magzine'];

    vm.books = BooksService.query();

    function chooseCategory(category) {
      vm.selectedItem = category;
      vm.opener = false;
    }
  }
}());
