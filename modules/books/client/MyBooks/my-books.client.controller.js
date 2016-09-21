angular
  .module('books')
  .controller('MyBooksController', MyBooksController);

MyBooksController.$inject = ['BooksService', 'Authentication', 'BookHistoryService'];

function MyBooksController(BooksService, Authentication, BookHistoryService) {
  var vm = this;
  vm.myBooks = [];
  vm.categories = [];
  vm.categories.push('All');
  vm.selectedItem = 'All';
  vm.userEmail = Authentication.user.email;
  vm.submitBook = submitBook;
  vm.changeSelectedBook = changeSelectedBook;

  BooksService.getBooks().then(successfullGetBooksList);

  function successfullGetBooksList(bookList) {
    vm.myBooks = bookList.filter(myBooks);
    vm.filteredBooks = vm.myBooks;
  }

  function myBooks(book) {
    if (book.userEmail === vm.userEmail) {
      if (vm.categories.indexOf(book.category) === -1) {
        vm.categories.push(book.category);
      }
      return true;
    }
    return false;
    // return book.userEmail === Authentication.user.email;
  }

  function submitBook(book) {
    if (window.confirm('Are you sure you are done reading the book ?')) {
      // book.userName = 'admin';
      // book.userEmail = 'admin@admin.com';
      book.status = 'reserved';
      book.isBookWithAdmin = true;
      BooksService.updateBookDetails(book._id, book).then(updateBookHistoryAfterSubmission);
    }
  }

  function updateBookHistoryAfterSubmission(book) {
    var actionTaken = 'Book state has been changed to ' + book.status;
    var comments = 'Book is submitted by ' + vm.userName;
    BookHistoryService.pushTransactionToList(actionTaken, comments, book);
  }

  function changeSelectedBook(selectedItem) {
    vm.selectedItem = selectedItem;
    if (vm.selectedItem === 'All') {
      vm.filteredBooks = vm.myBooks;
    } else {
      vm.filteredBooks = vm.myBooks.filter(filterBooks);
    }
  }
  function filterBooks(book) {
    return book.category === vm.selectedItem;
  }
}
