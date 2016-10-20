(function () {
  'use strict';

  angular
    .module('core.admin')
    .controller('AdminManageCtrl', AdminManageCtrl);

  AdminManageCtrl.inject = ['AdminServices', 'Authentication'];

  function AdminManageCtrl(AdminServices, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.deleteAdmin = deleteAdmin;
    AdminServices.getAllAdmins().then(successHandler);

    function deleteAdmin(adminID) {
      AdminServices.deleteAdmin(adminID).then(remainingAdmins);
    }

    function remainingAdmins() {
      AdminServices.getAllAdmins().then(successHandler);
    }

    function successHandler(allAdmins) {
      vm.admins = allAdmins;
    }
  }
}());
