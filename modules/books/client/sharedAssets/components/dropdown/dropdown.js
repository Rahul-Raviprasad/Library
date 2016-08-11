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

  DropdownController.inject = [];
  function DropdownController() {
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
    function filterBooks(book) {
      return book.category === vm.selectedItem;
    }
  }
}());
