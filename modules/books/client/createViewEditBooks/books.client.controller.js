(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksController', BooksController);

  BooksController.$inject = ['$scope', '$state', 'BooksService', '$window', 'Authentication', '$stateParams', 'ReviewsService', 'BookHistoryService', '$timeout', 'FileUploader'];

  function BooksController($scope, $state, BooksService, $window, Authentication, $stateParams, ReviewsService, BookHistoryService, $timeout, FileUploader) {
    var vm = this;

    // vm.book = book;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.edit = false;
    vm.deleteBook = deleteBook;
    vm.createReview = createReview;
    // vm.fileSelected = fileSelected;
    vm.editBook = editBook;
    vm.imageURL = 'modules/books/client/img/default5.jpeg';
    vm.uploadBookPicture = uploadBookPicture;
    vm.uploader = new FileUploader({
      url: 'api/book/picture',
      alias: 'newProfilePicture',
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;
      vm.book.imageURL = response;
      BooksService.createBook(vm.book).then(successfullCreateBook, failureCreatingBook);
      // Populate user object
      // vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    function successfullCreateBook(data) {
      vm.book = data;
      var actionTaken = 'Book got created';
      var comments = 'NA';
      // uploadBookPicture();
      BookHistoryService.pushTransactionToList(actionTaken, comments, vm.book);
      $state.go('books.view', {
        bookId: data._id
      });
    }
    function failureCreatingBook(res) {
      vm.error = res.data.message;
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    function editBook() {
      vm.edit = true;
      $state.go('books.edit', {
        bookId: vm.book._id
      });
    }
    // vm.bookHistory = [{ action: 'test', comments: 'NA', date: 'today' }, { action: 'test1', comments: 'NA', date: 'tomorrow' }];

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
      if (vm.uploader.queue.length) {
        uploadBookPicture();
      } else {
        vm.book.imageURL = vm.imageURL;
        BooksService.createBook(vm.book).then(successfullCreateBook, failureCreatingBook);
      }
      // BooksService.createBook(vm.book).then(successfullCreateBook, failureCreatingBook);
    }

    function deleteBook(book) {
      if (window.confirm('Are you sure you want to remove this book from shelf permanently ?')) {
        // BooksService.deleteBook(book._id).then(successfullyDeleted, errorDeleting);
        book.isActive = false;
        BooksService.updateBookDetails(book._id, book).then(successfullyDeleted, errorDeleting);
      }
      function successfullyDeleted(data) {
        alert('Book has been removed successfully from the shelf');
        $state.go('books.list');
      }
      function errorDeleting(data) {
        alert('Cannot delete this book, you may need it in future! ');
      }
    }

    // function fileSelected() {
    //   // get selected file element
    //   var oFile = document.getElementById('book_cover').files[0];
    //
    //   // filter for image files
    //   var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    //   if (! rFilter.test(oFile.type)) {
    //     // Tech debt: throw error as image file file is not of supported format
    //     return;
    //   }
    //
    //   var iMaxFilesize = 1048576; // 1MB -Allow file to be only as big as 1MB
    //   // little test for filesize
    //   if (oFile.size > iMaxFilesize) {
    //     document.getElementById('warnsize').style.display = 'block';
    //     return;
    //   }
    //
    //
    //   var oImage = document.getElementById('book_image');
    //
    //   // prepare HTML5 FileReader
    //   var oReader = new FileReader();
    //   oReader.onload = function(e) {
    //
    //   // e.target.result contains the DataURL which we will use as a source of the image
    //     oImage.src = e.target.result;
    //
    //     oImage.onload = function () { // binding onload event
    //
    //       // we are going to display some custom image information here
    //       vm.oFile = oFile;
    //       // 'Name: ' + oFile.name;
    //       // 'Size: ' + oFile.size;
    //       // 'Type: ' + oFile.type;
    //       // 'Dimension: ' + oImage.naturalWidth + ' x ' + oImage.naturalHeight;
    //     };
    //   };
    //
    //   // read selected file as DataURL
    //   oReader.readAsDataURL(oFile);
    //
    // }

    // Change user profile picture
    function uploadBookPicture() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.book.bookImageURL;
    }

  }
}());
