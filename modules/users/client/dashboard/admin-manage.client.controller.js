(function () {
  'use strict';

  angular
    .module('core.admin')
    .controller('AdminManageCtrl', AdminManageCtrl);

  AdminManageCtrl.inject = ['AdminServices'];

  function AdminManageCtrl(AdminServices) {
    var vm = this;
    // vm.admins = ['a', 'b', 'c', 'd'];
    AdminServices.getAllAdmins().then(successHandler);

    function successHandler(allAdmins) {
      vm.admins = allAdmins;
    }
  }
}());
