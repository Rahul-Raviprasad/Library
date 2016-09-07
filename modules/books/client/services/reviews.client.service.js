angular
  .module('reviews.services')
  .factory('ReviewsService', ReviewsService);

ReviewsService.$inject = ['$http'];

function ReviewsService($http) {
  var svc = {};
  // svc.createReview = createReview;
  svc.getReviewsForBook = getReviewsForBook;
  svc.pushReviewToList = pushReviewToList;

  return svc;

  // //////////

  // function createReview(comments, book) {
  //   var objReview = {};
  //   objReview.bookId = book._id;
  //   objReview.comments = comments;
  //   return $http.post('api/reviews', objReview).then(successHandler);
  // }

  function getReviewsForBook(bookId) {
    return $http.get('/api/reviews/' + bookId).then(successHandler);
  }

  function pushReviewToList(comments, book) {
    var objReview = {};
    objReview.bookId = book._id;
    objReview.comments = comments;
    return $http.put('api/reviews/', objReview).then(successHandler);
  }

  function successHandler(response) {
    return response.data;
  }
}
