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
        multiselect: '=',
        dropdownName: '@',
        onChange: '&'
      },
      controller: DropdownController,
      controllerAs: 'vm',
      templateUrl: 'modules/books/client/sharedAssets/components/dropdown/dropdown.html'
    });

  DropdownController.inject = [];
  function DropdownController() {
    var vm = this;
    vm.source = vm.src.requesters || vm.src;
    vm.filterValues = filterValues;
    vm.chooseValue = chooseValue;

    function filterValues(value) {
      if (typeof(value) === 'object') {
        return value.requesterName !== vm.selectedItem.requesterName;
      } else if (typeof(value) === 'string') {
        return value !== vm.selectedItem;
      }
    }
    function chooseValue(value) {
      vm.selectedItem = value;
      vm.opener = false;
      vm.onChange({ selectedItem: vm.selectedItem });
    }
  }
}());
