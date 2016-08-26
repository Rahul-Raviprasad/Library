(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['BooksService', 'Authentication', '$scope'];

  function BooksListController(BooksService, Authentication, $scope) {
    var vm = this;
    vm.selectedItem = 'All';
    vm.categories = [];
    vm.categories.push('All');
    vm.issueBook = issueBook;
    vm.submitBook = submitBook;
    vm.filteredBooks = vm.books;
    vm.submittedBooks = vm.books;
    vm.userName = Authentication.user.displayName;
    vm.userEmail = Authentication.user.email;
    vm.requestBook = requestBook;
    vm.requested = false;
    vm.cancelRequest = cancelRequest;
    vm.approve = approve;
    vm.reject = reject;
    vm.requesters = requesters;
    vm.showApproveReject = true;
    vm.changeSelectedBook = changeSelectedBook;
    var msg = { msg: 'aaa' };
    function changeSelectedBook(selectedItem) {
      vm.selectedItem = selectedItem;
      if (vm.selectedItem === 'All') {
        vm.filteredBooks = vm.books;
      } else {
        vm.filteredBooks = vm.books.filter(filterBooks);
      }
    }
    function filterBooks(book) {
      return book.category === vm.selectedItem;
    }

    vm.books = BooksService.query(function() {
      angular.forEach(vm.books, function(book) {
        vm.filteredBooks = vm.books;
        var index = book.queueList.findIndex(
          function(queueItem) {
            return queueItem.requesterEmail === vm.userEmail;
          }
        );
        if (index >= 0) {
          book.loggedUserRequested = true;
          book.loggedUserQueueNumber = book.queueList[index].queueNumber;
        } else {
          book.loggedUserRequested = false;
        }
        if (vm.categories.indexOf(book.category) === -1) {
          vm.categories.push(book.category);
        }
      });
      vm.submittedBooks = vm.books.filter(submittedBooks);

      function submittedBooks(book) {
        return book.userName === 'admin';
      }
    });

    function cancelRequest(book) {
      if (window.confirm('Are you sure you want to leave the queue? You may have to stand in the end of the queue once you leave!')) {
        if (book._id) {
          var index = book.queueList.findIndex(
            function(queueItem) {
              return queueItem.requesterEmail === vm.userEmail;
            }
          );
          if (index >= 0) {
            book.loggedUserRequested = false;
            book.loggedUserQueueNumber = 0;
            book.queueList.splice(index, 1);
            for (var i = index; i <= book.queueList.length - 1; i++) {
              book.queueList[i].queueNumber--;
            }
            book.$update(successCallback, errorCallback);
          }
        }
      }
      function successCallback(res) {
        alert('Your request has been cancelled!');
      }
      function errorCallback(res) {
        alert('Unable to cancel your request, please contact admin for more details.');
      }
    }

    function requestBook(book) {
      if (window.confirm('Do you want to stand in the queue among the other readers ?')) {
        if (book._id) {
          var reqObj = {};
          reqObj = {
            requesterName: vm.userName,
            requesterEmail: vm.userEmail,
            queueNumber: book.queueList.length > 0 ? (book.queueList.length + 1) : 1
          };
          book.queueList.push(reqObj);
          book.loggedUserRequested = true;
          book.loggedUserQueueNumber = reqObj.queueNumber;
          book.$update(successCallback, errorCallback);
        }
      }
      function successCallback(res) {
        alert('Your request has been successfully placed!');
      }
      function errorCallback(res) {
        alert('Unable to place your request, please contact admin for more details.');
      }
    }

    function submittedBooks(book) {
      return book.category === vm.selectedItem;
    }

    function issueBook(book) {
      if (window.confirm('Do you really read this book ?')) {
        book.status = 'issued';
        book.userName = vm.userName;
        book.userEmail = vm.userEmail;
        BooksService.update({ bookId: book._id }, book);
      }
    }

    function submitBook(book) {
      if (window.confirm('Are you sure you are done reading the book ?')) {
        book.userName = 'admin';
        book.userEmail = 'admin@admin.com';
        BooksService.update({ bookId: book._id }, book);
      }
    }

    function approve(book) {
      if (window.confirm('Are you sure you want to approve ?')) {
        if (book.queueList.length <= 0) {
          book.status = 'available';
          book.userName = vm.userName;
          book.userEmail = vm.userEmail;
          BooksService.update({ bookId: book._id }, book);
        } else {
          book.status = 'reserved';
          BooksService.update({ bookId: book._id }, book);
          // vm.requesters = requesters(book);
          vm.showApproveReject = false;
          // send Email to the first person in the queue.
        }
      }
    }

    function reject() {
      if (window.confirm('Are you sure you want to reject ?')) {
        // send email to the current book user with admin comments.
        alert('user is sent with the admin comments.');
      }
    }

    function requesters(book) {
      var requesters = [];
      for (var i = 0; i < book.queueList.length; i++) {
        requesters.push(book.queueList[i].requesterName);
      }
      vm.selectedRequester = requesters[0];
      return requesters;
    }
  }
}());
