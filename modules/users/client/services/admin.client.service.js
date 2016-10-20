angular
  .module('admin.services')
  .factory('AdminServices', AdminServices);

AdminServices.$inject = ['$http'];

function AdminServices($http) {
  var svc = {};

  svc.getAllAdmins = getAllAdmins;

  return svc;

  // //////////

  function getAllAdmins(bookId) {
    return $http.get('/api/users').then(successHandler);
  }

  function successHandler(response) {
    return response.data;
  }
}
