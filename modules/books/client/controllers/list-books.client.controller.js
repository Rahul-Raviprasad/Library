(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['BooksService', 'Authentication'];

  function BooksListController(BooksService, Authentication) {
    var vm = this;
    vm.chooseCategory = chooseCategory;
    vm.opener = false;
    vm.selectedItem = 'All';
    vm.categories = [];
    vm.categories.push('All');
    vm.issueBook = issueBook;
    vm.filterCategories = filterCategories;
    vm.books = BooksService.query(function() {
      angular.forEach(vm.books, function(book) {
        if (vm.categories.indexOf(book.category) === -1) {
          vm.categories.push(book.category);
        }
      });
    });
    vm.filteredBooks = vm.books;
    vm.Authentication = Authentication;

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
    function filterCategories(category) {
      return category !== vm.selectedItem;
    }
    function issueBook(book) {
      if (window.confirm('Do you really read this book ?')) {
        book.status = 'issued';
        book.issuedTo = vm.Authentication.user.displayName;
        BooksService.update({ bookId: book._id }, book);
      }
    }
  }
}());
