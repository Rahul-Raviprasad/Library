(function () {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope', '$state', '$http', '$location', '$window', 'Authentication'];

  function AuthenticationController($scope, $state, $http, $location, $window, Authentication) {
    var vm = this;
    signin();

    vm.authentication = Authentication;
    vm.signin = signin;

    // Get an eventual error defined in the URL query string:
    vm.error = $location.search().err;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    function signin(isValid) {
      if (!Authentication.user) {
        $http.post('/api/auth/getUserDetails').success(function (response) {
          // If successful we assign the response to the global user model
          vm.authentication.user = response.user;

          // And redirect to the previous or home page
          $state.go($state.previous.state.name || 'home', $state.previous.params);
        }).error(function (response) {
          vm.error = response.message;
        });
      }
    }
  }
}());
