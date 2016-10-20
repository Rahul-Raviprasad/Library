(function () {
  'use strict';

  angular
    .module('core.admin')
    .controller('AdminManageCtrl', AdminManageCtrl);

  AdminManageCtrl.inject = ['AdminServices', 'Authentication'];

  function AdminManageCtrl(AdminServices, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    // vm.admins = ['a', 'b', 'c', 'd'];
    AdminServices.getAllAdmins().then(successHandler);

    function successHandler(allAdmins) {
      vm.admins = allAdmins;
    }
  }
}());
