angular
  .module('books')
  .controller('BookHistoryController', BookHistoryController);

BookHistoryController.inject = ['$stateParams', 'BookHistoryService'];

function BookHistoryController($stateParams, BookHistoryService) {
  var vm = this;
  var bookId = $stateParams.bookId;

  if (bookId) {
    BookHistoryService.getBookHistoryForBook(bookId).then(successfullFetchingHistory);
  }

  function successfullFetchingHistory(bookHistory) {
    if (bookHistory.length) {
      vm.bookHistory = bookHistory[0].history;
    }
  }
}
