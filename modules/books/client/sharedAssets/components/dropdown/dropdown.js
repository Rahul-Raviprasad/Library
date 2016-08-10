(function () {
  'use strict';

  angular
    .module('books.component')
    .component('dropdown', {
      bindings: {
        src: '=',
        selectedItem: '=',
        width: '=',
        height: '=',
        multiselect: '='
      },
      controller: DropdownController,
      controllerAs: 'vm',
      templateUrl: 'modules/books/client/sharedAssets/components/dropdown/dropdown.html'
    });

  DropdownController.inject = ['$document'];
  function DropdownController($document) {
    var vm = this;
    vm.filterValues = filterValues;
    vm.chooseValue = chooseValue;

    function filterValues(value) {
      return value !== vm.selectedItem;
    }
    function chooseValue(value) {
      vm.selectedItem = value;
      vm.opener = false;
    }
    $document.on('click', function (e) {
      console.log(e.target);
    });
    function filterBooks(book) {
      return book.category === vm.selectedItem;
    }
  }
}());
