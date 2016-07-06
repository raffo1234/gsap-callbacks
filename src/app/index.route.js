(function() {
  'use strict';

  angular
    .module('loginAdmin')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/recuperar-contrasenia', {
        templateUrl: 'app/views/recuperar-contrasenia.html',
        controller: 'recuperarContraseniaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
