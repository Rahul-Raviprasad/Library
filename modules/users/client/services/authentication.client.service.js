(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('users.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$window'];

  function Authentication($window) {
    var auth = {
      user: $window.user
    };

    function isAdmin() {
      if (auth.user) {
        for (var i = 0; i < auth.user.roles.length; i++) {
          if (auth.user.roles[i] === 'admin') {
            return true;
          }
        }
      }
      return false;
    }
    auth.isAdmin = isAdmin;

    return auth;
  }
}());
