angular
  .module('books')
  .controller('MyBooksController', MyBooksController);

MyBooksController.$inject = ['BooksService', 'Authentication'];

function MyBooksController(BooksService, Authentication) {
  var vm = this;
  vm.myBooks = [];
  vm.categories = [];
  vm.categories.push('All');
  vm.selectedItem = 'All';
  vm.userEmail = Authentication.user.email;

  BooksService.getBooks().then(successfullGetBooksList);

  function successfullGetBooksList(bookList) {
    vm.myBooks = bookList.filter(myBooks);
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
}
