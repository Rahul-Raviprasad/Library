(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksController', BooksController);

  BooksController.$inject = ['$scope', '$state', 'BooksService', '$window', 'Authentication', '$stateParams', 'ReviewsService', 'BookHistoryService'];

  function BooksController($scope, $state, BooksService, $window, Authentication, $stateParams, ReviewsService, BookHistoryService) {
    var vm = this;

    // vm.book = book;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.edit = false;
    vm.deleteBook = deleteBook;
    vm.createReview = createReview;
    vm.fileSelected = fileSelected;

    if ($stateParams.bookId) {
      BooksService.getBookDetails($stateParams.bookId).then(successfullFetchingBookDetails);
      ReviewsService.getReviewsForBook($stateParams.bookId).then(successfullFetchingReviews);
    }

    function successfullFetchingBookDetails(data) {
      vm.book = data;
    }

    function successfullFetchingReviews(data) {
      if (data.length) {
        vm.allReviews = data[0].reviews;
      }
    }

    function createReview(newReview, book) {
      if (newReview.trim() !== '') {
        ReviewsService.pushReviewToList(newReview, book).then(successfullBookReview, errorBookReview);
      } else {
        alert('Review cannot be empty! ');
      }
      function successfullBookReview(data) {
        alert('Thanks for your valuable review !');
        vm.allReviews = data.reviews;
      }
      function errorBookReview(data) {
        alert('Could not add your review, kindly try after sometime.');
        // ReviewsService.createReview(newReview, book);
      }
      // ReviewsService.createReview(newReview, book);
    }

    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookForm');
        return false;
      }
      BooksService.createBook(vm.book).then(successfullCreateBook, failureCreatingBook);

      function successfullCreateBook(data) {
        vm.book = data;
        var actionTaken = 'Book got created';
        var comments = 'NA';
        BookHistoryService.pushTransactionToList(actionTaken, comments, vm.book);
        $state.go('books.view', {
          bookId: data._id
        });
      }
      function failureCreatingBook(res) {
        vm.error = res.data.message;
      }
    }

    function deleteBook(book) {
      if (window.confirm('Are you sure you want to remove this book from shelf permanently ?')) {
        BooksService.deleteBook(book._id).then(successfullyDeleted, errorDeleting);
      }
      function successfullyDeleted(data) {
        alert('Book has been removed successfully from the shelf');
        $state.go('books.list');
      }
      function errorDeleting(data) {
        alert('Cannot delete this book, you may need it in future! ');
      }
    }

    function fileSelected() {
      // get selected file element
      var oFile = document.getElementById('book_cover').files[0];

      // filter for image files
      var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
      if (! rFilter.test(oFile.type)) {
        // Tech debt: throw error as image file file is not of supported format
        return;
      }

      var iMaxFilesize = 1048576; // 1MB -Allow file to be only as big as 1MB
      // little test for filesize
      if (oFile.size > iMaxFilesize) {
        document.getElementById('warnsize').style.display = 'block';
        return;
      }


      var oImage = document.getElementById('book_image');

      // prepare HTML5 FileReader
      var oReader = new FileReader();
      oReader.onload = function(e) {

      // e.target.result contains the DataURL which we will use as a source of the image
        oImage.src = e.target.result;

        oImage.onload = function () { // binding onload event

          // we are going to display some custom image information here
          vm.oFile = oFile;
          // 'Name: ' + oFile.name;
          // 'Size: ' + oFile.size;
          // 'Type: ' + oFile.type;
          // 'Dimension: ' + oImage.naturalWidth + ' x ' + oImage.naturalHeight;
        };
      };

      // read selected file as DataURL
      oReader.readAsDataURL(oFile);

    }
  }
}());
