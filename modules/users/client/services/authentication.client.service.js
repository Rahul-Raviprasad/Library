(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('users.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$window'];

  function Authentication($window) {
    var auth = {
      'user': {
        '__v': 0,
        'displayName': 'rahul raviprasad',
        'provider': 'local',
        'username': 'rahul123',
        '_id': '57e2e87b9756d7029216025f',
        'created': '2016-09-21T20:07:23.390Z',
        'roles': [
          'user',
          'admin'
        ],
        'profileImageURL': 'modules/users/client/img/profile/default.png',
        'email': 'rahul@gmail.com',
        'lastName': 'raviprasad',
        'firstName': 'rahul'
      }
    };

    return auth;
  }
}());
