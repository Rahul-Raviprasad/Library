(function () {
  'use strict';

  angular
    .module('core.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.manage', {
        url: '',
        templateUrl: 'modules/core/client/views/admin-manage.view.html',
        controller: '',
        // controllerAs: 'vm',
        data: {
          pageTitle: 'Dashboard'
        }
      });
  }
}());
