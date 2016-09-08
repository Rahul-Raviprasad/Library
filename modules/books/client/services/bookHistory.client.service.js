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

  function pushTransactionToList(comments, book) {
    var objReview = {};
    objReview.bookId = book._id;
    objReview.comments = comments;
    return $http.put('api/bookHistory/', objReview).then(successHandler);
  }

  function successHandler(response) {
    return response.data;
  }
}
