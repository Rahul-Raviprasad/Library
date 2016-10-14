(function () {
  'use strict';

  angular
    .module('books.component')
    .controller('BookDetailsEditCtrl', BookDetailsEditCtrl);
    // .component('bookDetailsEdit', {
    //   bindings: {
    //     // book: '=',
    //     edit: '='
    //   },
    //   controller: BookDetailsEditCtrl,
    //   // controllerAs: 'vm',
    //   templateUrl: 'modules/books/client/createViewEditBooks/editBook/components/book-details-edit.html'
    //
    // });

  BookDetailsEditCtrl.inject = ['BooksService', 'BookHistoryService', '$scope', '$stateParams', '$state', 'FileUploader', '$timeout', '$window', 'Authentication'];

  function BookDetailsEditCtrl(BooksService, BookHistoryService, $scope, $stateParams, $state, FileUploader, $timeout, $window, Authentication) {
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;
    vm.authentication = Authentication;

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
            vm.book.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;
      vm.book.imageURL = response;
      BooksService.updateBookDetails(vm.book._id, vm.book).then(successCallback, errorCallback);
      // Populate user object
      // vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    function successCallback(res) {
      // vm.edit = false;
      var actionTaken = 'Book details got updated';
      var comments = 'NA';
      BookHistoryService.pushTransactionToList(actionTaken, comments, vm.book);
      alert('Changes has been saved successfully');
      $state.go('books.view', {
        bookId: vm.book._id
      });
    }

    function errorCallback(res) {
      alert('Sorry, your changes could not be saved for some reasons. Please try after sometime.');
    }

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

    if ($stateParams.bookId) {
      BooksService.getBookDetails($stateParams.bookId).then(successfullFetchingBookDetails);
    }

    function successfullFetchingBookDetails(data) {
      vm.book = data;
      vm.tempBook = vm.book;
    }

    function cancel() {
      // vm.book = vm.tempBook;
      $state.go('books.view', {
        bookId: vm.book._id
      });
    }

    function save(isValid) {
      if (isValid) {
        if (vm.book._id) {
          if (vm.uploader.queue.length) {
            uploadBookPicture();
          } else {
            BooksService.updateBookDetails(vm.book._id, vm.book).then(successCallback, errorCallback);
          }
          // BooksService.updateBookDetails(vm.book._id, vm.book).then(successCallback, errorCallback);
        }
      } else {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookForm');
        return false;
      }
    }
  }

}());
