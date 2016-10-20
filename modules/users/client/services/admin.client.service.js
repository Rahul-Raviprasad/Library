angular
  .module('admin.services')
  .factory('AdminServices', AdminServices);

AdminServices.$inject = ['$http'];

function AdminServices($http) {
  var svc = {};

  svc.getAllAdmins = getAllAdmins;
  svc.createAdmin = createAdmin;
  svc.deleteAdmin = deleteAdmin;

  return svc;

  // //////////

  function getAllAdmins() {
    return $http.get('/api/users').then(successHandler);
  }

  function createAdmin(admin) {
    return $http.post('api/users', admin).then(successHandler);
  }

  function deleteAdmin(adminID) {
    return $http.delete('/api/users/' + adminID).then(successHandler);
  }

  function successHandler(response) {
    return response.data;
  }
}
