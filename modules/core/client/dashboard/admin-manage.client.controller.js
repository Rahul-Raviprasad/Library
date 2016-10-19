(function () {
  'use strict';

  angular
    .module('core.admin')
    .controller('AdminManageCtrl', AdminManageCtrl);

  AdminManageCtrl.inject = [];

  function AdminManageCtrl() {
    var vm = this;
    vm.admins = ['a', 'b', 'c', 'd'];
  }
}());
