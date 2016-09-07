angular
  .module('books.component')
  .component('allReviews', {
    bindings: {
      src: "="
    },
    controller: function () {
    },
    controllerAs: 'vm',
    templateUrl: 'modules/books/client/sharedAssets/components/all-reviews/all-reviews.html'
  });
