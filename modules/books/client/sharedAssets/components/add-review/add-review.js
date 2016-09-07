angular
  .module('books.component')
  .component('addReview', {
    bindings: {
      createReview: '&'
    },
    controller: AddReviewController,
    controllerAs: 'vm',
    templateUrl: 'modules/books/client/sharedAssets/components/add-review/add-review.html'
  });

AddReviewController.inject = [];
function AddReviewController() {
  var vm = this;
  vm.newReview = '';
  vm.addReview = addReview;

  function addReview() {
    vm.createReview({ newReview: vm.newReview });
    vm.newReview = '';
  }
}
