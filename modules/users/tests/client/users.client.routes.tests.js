(function () {
  'use strict';

  describe('Users Route Tests', function () {
    // Initialize global variables
    var $scope,
      Authentication;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _Authentication_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      Authentication = _Authentication_;
    }));

    describe('Settings Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('settings');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/settings');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have templateUrl', function () {
          expect(mainstate.templateUrl).toBe('modules/users/client/views/settings/settings.client.view.html');
        });
      });

    });

    describe('Authentication Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('authentication');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/authentication');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have templateUrl', function () {
          expect(mainstate.templateUrl).toBe('modules/users/client/views/authentication/authentication.client.view.html');
        });
      });

      describe('Signin Route', function () {
        var signinstate;
        beforeEach(inject(function ($state) {
          signinstate = $state.get('authentication.signin');
        }));

        it('Should have the correct URL', function () {
          expect(signinstate.url).toEqual('/signin?err');
        });

        it('Should not be abstract', function () {
          expect(signinstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(signinstate.templateUrl).toBe('modules/users/client/views/authentication/signin.client.view.html');
        });
      });

    });

    describe('Password Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('password');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/password');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('Forgot Route', function () {
        var forgotstate;
        beforeEach(inject(function ($state) {
          forgotstate = $state.get('password.forgot');
        }));

        it('Should have the correct URL', function () {
          expect(forgotstate.url).toEqual('/forgot');
        });

        it('Should not be abstract', function () {
          expect(forgotstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(forgotstate.templateUrl).toBe('modules/users/client/views/password/forgot-password.client.view.html');
        });
      });

    });

    describe('Password Reset Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('password.reset');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/reset');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('Invalid Route', function () {
        var invalidstate;
        beforeEach(inject(function ($state) {
          invalidstate = $state.get('password.reset.invalid');
        }));

        it('Should have the correct URL', function () {
          expect(invalidstate.url).toEqual('/invalid');
        });

        it('Should not be abstract', function () {
          expect(invalidstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(invalidstate.templateUrl).toBe('modules/users/client/views/password/reset-password-invalid.client.view.html');
        });
      });

      describe('Success Route', function () {
        var successstate;
        beforeEach(inject(function ($state) {
          successstate = $state.get('password.reset.success');
        }));

        it('Should have the correct URL', function () {
          expect(successstate.url).toEqual('/success');
        });

        it('Should not be abstract', function () {
          expect(successstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(successstate.templateUrl).toBe('modules/users/client/views/password/reset-password-success.client.view.html');
        });
      });

      describe('Form Route', function () {
        var formstate;
        beforeEach(inject(function ($state) {
          formstate = $state.get('password.reset.form');
        }));

        it('Should have the correct URL', function () {
          expect(formstate.url).toEqual('/:token');
        });

        it('Should not be abstract', function () {
          expect(formstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(formstate.templateUrl).toBe('modules/users/client/views/password/reset-password.client.view.html');
        });
      });

    });
  });
}());
