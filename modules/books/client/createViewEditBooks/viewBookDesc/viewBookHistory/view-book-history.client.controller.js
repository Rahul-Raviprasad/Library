angular
  .module('books')
  .controller('BookHistoryController', BookHistoryController);

BookHistoryController.inject = ['$stateParams', 'BookHistoryService', 'Authentication'];

function BookHistoryController($stateParams, BookHistoryService, Authentication) {
  var vm = this;
  vm.bookId = $stateParams.bookId;
  vm.authentication = Authentication;

  if (vm.bookId) {
    BookHistoryService.getBookHistoryForBook(vm.bookId).then(successfullFetchingHistory);
  }

  function successfullFetchingHistory(bookHistory) {
    if (bookHistory.length) {
      vm.bookHistory = bookHistory[0].history;
    }
  }
}
