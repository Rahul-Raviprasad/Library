(function () {
  'use strict';

  angular
    .module('books')
    .controller('UnavailableBooksController', UnavailableBooksController);

  UnavailableBooksController.$inject = ['BooksService', 'Authentication', 'BookHistoryService'];

  function UnavailableBooksController(BooksService, Authentication, BookHistoryService) {
    var vm = this;
    vm.selectedItem = 'All';
    vm.categories = [];
    vm.categories.push('All');
    vm.changeSelectedBook = changeSelectedBook;
    vm.makeAvailable = makeAvailable;
    vm.authentication = Authentication;

    function makeAvailable(book) {
      if (window.confirm('So you found the book ahh.. ?')) {
        book.isActive = true;
        BooksService.updateBookDetails(book._id, book).then(successMakingAvailable);
      }
    }
    function successMakingAvailable() {
      vm.filteredBooks = vm.books.filter(filteredBooks);
      alert('Book is back in shelf!');
    }
    function filteredBooks(book) {
      return book.isActive === false;
    }

    function changeSelectedBook(selectedItem) {
      vm.selectedItem = selectedItem;
      if (vm.selectedItem === 'All') {
        vm.filteredBooks = vm.books;
      } else {
        vm.filteredBooks = vm.books.filter(filterBooks);
      }
    }
    function filterBooks(book) {
      return book.category === vm.selectedItem;
    }

    BooksService.getUnavialableBooks().then(successfullGetBooksList);

    function successfullGetBooksList(listedBooks) {
      vm.books = listedBooks;
      angular.forEach(vm.books, function(book) {
        vm.filteredBooks = vm.books;

        if (vm.categories.indexOf(book.category) === -1) {
          vm.categories.push(book.category);
        }

      });
    }
  }
}());
