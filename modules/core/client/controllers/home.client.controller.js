(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;

    vm.carouselIndex = 1;
    vm.prev = prev;
    vm.next = next;

    // ------------------------------------------
    function prev() {
      vm.carouselIndex--;
    }
    function next() {
      vm.carouselIndex++;
    }
  }
}());
