(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['BooksService', 'Authentication', 'BookHistoryService'];

  function BooksListController(BooksService, Authentication, BookHistoryService) {
    var vm = this;
    vm.Authentication = Authentication;
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
    vm.changeSelectedBook = changeSelectedBook;
    vm.assignBookToSelectedUser = assignBookToSelectedUser;
    vm.filterQueriedBooks = queryFilter;
    vm.query = '';
    vm.finalFilteredBooks = [];

    function queryFilter(book) {
      return book.title.toLowerCase().indexOf(vm.query.toLowerCase()) > -1
        || book.author.toLowerCase().indexOf(vm.query.toLowerCase()) > -1
        || book.publications.toLowerCase().indexOf(vm.query.toLowerCase()) > -1
        || book.category.toLowerCase().indexOf(vm.query.toLowerCase()) > -1
        || book.location.toLowerCase().indexOf(vm.query.toLowerCase()) > -1;
    }

    function assignBookToSelectedUser(requester, book) {
      removeFromSubmittedBooks(book);
      book.status = 'issued';
      book.userName = requester.requesterName;
      book.userEmail = requester.requesterEmail;
      book.isBookWithAdmin = false;
      book.submitRequestApproved = false;
      // BooksService.update({ bookId: book._id }, book);
      removeUserFromQueue(book, requester.requesterEmail);
    }

    function removeFromSubmittedBooks(book) {
      var index = vm.submittedBooks.findIndex(
        function(subBook) {
          return subBook === book;
        }
      );
      if (index >= 0) {
        vm.submittedBooks.splice(index, 1);
      }
    }

    function changeSelectedBook(selectedItem) {
      vm.selectedItem = selectedItem;
      if (vm.selectedItem === 'All') {
        vm.filteredBooks = vm.books;
      } else {
        vm.filteredBooks = vm.books.filter(filterBooks);
      }
      vm.submittedBooks = vm.filteredBooks.filter(submittedBooks);
    }
    function filterBooks(book) {
      return book.category === vm.selectedItem;
    }

    function submittedBooks(book) {
      return book.status === 'reserved';
    }

    BooksService.getBooks().then(successfullGetBooksList);

    function successfullGetBooksList(listedBooks) {
      vm.books = listedBooks;
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

        book.requesters = [{ requesterName: '--Select--' }];
        for (var i = 0; i < book.queueList.length; i++) {
          book.requesters.push(book.queueList[i]);
        }
        book.selectedRequester = book.requesters[0];

      });
      vm.submittedBooks = vm.books.filter(submittedBooks);
    }

    function cancelRequest(book) {
      if (window.confirm('Are you sure you want to leave the queue? You may have to stand at the end of the queue once you leave!')) {
        var userEmail = vm.userEmail;
        removeUserFromQueue(book, userEmail);
      }
    }

    function removeUserFromQueue(book, userEmail) {
      if (book._id) {
        var index = book.queueList.findIndex(
          function(queueItem) {
            return queueItem.requesterEmail === userEmail;
          }
        );
        if (index >= 0) {
          book.loggedUserRequested = false;
          book.loggedUserQueueNumber = 0;
          book.queueList.splice(index, 1);
          for (var i = index; i <= book.queueList.length - 1; i++) {
            book.queueList[i].queueNumber--;
          }
          BooksService.updateBookDetails(book._id, book).then(updateBookHistoryAfterAssigning, errorCallback);
        }
      }
    }

    function updateBookHistoryAfterAssigning(book) {
      alert('Done!');
      var actionTaken = 'Book state has been changed to ' + book.status;
      var comments = 'Book is assigned to ' + book.userName + ' who was in queue.';
      BookHistoryService.pushTransactionToList(actionTaken, comments, book);
    }
    function errorCallback(res) {
      alert('Couldn\'t do');
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
          BooksService.updateBookDetails(book._id, book).then(successCallback, errorCallback);
        }
      }
      function successCallback(res) {
        alert('Your request has been successfully placed!');
        // vm.requestSuccessful = true;
      }
      function errorCallback(res) {
        alert('Unable to place your request, please contact admin for more details.');
      }
    }

    function issueBook(book) {
      if (window.confirm('Do you really read this book ?')) {
        book.status = 'issued';
        book.userName = vm.userName;
        book.userEmail = vm.userEmail;
        BooksService.updateBookDetails(book._id, book).then(updateBookHistory);
      }
    }

    function submitBook(book) {
      if (window.confirm('Are you sure you are done reading the book ?')) {
        // book.userName = 'admin';
        // book.userEmail = 'admin@admin.com';
        book.status = 'reserved';
        book.isBookWithAdmin = true;
        BooksService.updateBookDetails(book._id, book).then(updateBookHistoryAfterSubmission);
      }
    }

    function approve(book) {
      if (window.confirm('Are you sure you want to approve ?')) {
        book.userName = '';
        book.userEmail = '';
        book.submitRequestApproved = true;
        if (book.queueList.length <= 0) {
          book.status = 'available';
          book.isBookWithAdmin = false;
          book.submitRequestApproved = false;
          removeFromSubmittedBooks(book);
        } else {
          book.status = 'reserved';
          book.isBookWithAdmin = true;
          // send Email to the first person in the queue.
        }
        BooksService.updateBookDetails(book._id, book).then(updateBookHistoryAfterApproval);
      }
    }

    function reject(book) {
      if (window.confirm('Are you sure you want to reject ?')) {
        book.submitRequestApproved = false;
        book.status = 'issued';
        book.isBookWithAdmin = false;
        BooksService.updateBookDetails(book._id, book).then(successfulRejection);
        // send email to the current book user with admin comments.
        var actionTaken = 'Book submit request is rejected.';
        var comments = 'Book is rejected by ' + vm.userName + ' and ' + book.userName + ' is summoned for clarification.';
        BookHistoryService.pushTransactionToList(actionTaken, comments, book);
      }

      function successfulRejection(data) {
        removeFromSubmittedBooks(book);
        alert('user is sent with the admin comments.');
      }
    }

    function updateBookHistory(data) {
      var actionTaken = 'Book state has been changed to issued';
      var comments = 'Book is issued to ' + vm.userName;
      BookHistoryService.pushTransactionToList(actionTaken, comments, data);
    }

    function updateBookHistoryAfterApproval(book) {
      var actionTaken = 'Book state has been changed to ' + book.status;
      var comments = 'Submit Request for the book is approved by ' + vm.userName;
      BookHistoryService.pushTransactionToList(actionTaken, comments, book);
    }
    function updateBookHistoryAfterSubmission(book) {
      var actionTaken = 'Book state has been changed to ' + book.status;
      var comments = 'Book is submitted by ' + vm.userName;
      BookHistoryService.pushTransactionToList(actionTaken, comments, book);
    }
  }
}());
