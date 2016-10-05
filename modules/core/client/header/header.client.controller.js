(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication'];

  function HeaderController($scope, $state, Authentication) {
    var vm = this;

    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.isAdmin = isAdmin;

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    isAdmin();

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }

    function isAdmin() {
      if (Authentication.user) {
        for (var i = 0; i < Authentication.user.roles.length; i++) {
          if (Authentication.user.roles[i] === 'admin') {
            $scope.admin = true;
            return true;
          }
        }
      }
      $scope.admin = false;
      return false;
    }
  }
}());
