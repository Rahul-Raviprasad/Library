(function () {
  'use strict';

  angular
    .module('core.admin')
    .controller('AdminManageCtrl', AdminManageCtrl);

  AdminManageCtrl.inject = ['AdminServices', 'Authentication', 'FileUploader', '$window', '$timeout', '$scope', '$state'];

  function AdminManageCtrl(AdminServices, Authentication, FileUploader, $window, $timeout, $scope, $state) {
    var vm = this;
    vm.authentication = Authentication;
    vm.deleteAdmin = deleteAdmin;
    vm.save = save;
    vm.imageUrl = 'modules/users/client/img/profile/default.png';
    vm.uploader = new FileUploader({
      url: 'api/book/picture',
      alias: 'newProfilePicture',
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageUrl = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.adminForm');
        return false;
      }
      if (vm.uploader.queue.length) {
        vm.uploader.uploadAll();
      } else {
        AdminServices.createAdmin(vm.admin).then(successfullCreateAdmin);
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      vm.admin.profileImageURL = response;
      AdminServices.createAdmin(vm.admin).then(successfullCreateAdmin);
      cancelUpload();
    }

    function successfullCreateAdmin() {
      $state.go('admin.manage');
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      cancelUpload();
      vm.error = response.message;
    }


    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.book.bookImageURL;
    }

    if ($state.current.name !== 'admin.create') {
      AdminServices.getAllAdmins().then(successHandler);
    }

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
