'use strict';
describe('Controller: recuperarContraseniaCtrl', function () {
// load the controller's module
  beforeEach(module('loginAdmin'));
  var recuperarContraseniaCtrl,
      scope;
// Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    recuperarContraseniaCtrl = $controller('recuperarContraseniaCtrl', {
      $scope: scope
    });
  }));
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
