angular
  .module('bookHistory.services')
  .factory('BookHistoryService', BookHistoryService);

BookHistoryService.$inject = ['$http'];

function BookHistoryService($http) {
  var svc = {};
  svc.getBookHistoryForBook = getBookHistoryForBook;
  svc.pushTransactionToList = pushTransactionToList;

  return svc;

  // //////////

  function getBookHistoryForBook(bookId) {
    return $http.get('/api/bookHistory/' + bookId).then(successHandler);
  }

  function pushTransactionToList(actionTaken, comments, book) {
    var objHistory = {};
    objHistory.bookId = book._id;
    objHistory.comments = comments;
    objHistory.actionTaken = actionTaken;
    return $http.put('api/bookHistory/', objHistory).then(successHandler);
  }

  function successHandler(response) {
    return response.data;
  }
}
