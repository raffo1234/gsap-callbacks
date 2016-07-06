(function() {
  'use strict';

  angular
    .module('loginAdmin', ['ngAnimate', 'ngMessages', 'ngResource', 'ngRoute', 'ngMaterial']);

})();

'use strict';
/**
 * @ngdoc function
 * @name loginAdmin.controller:recuperarContraseniaCtrl
 * @description
 * # recuperarContraseniaCtrl
 * Controller of the loginAdmin
 */
angular.module('loginAdmin')
  .controller('recuperarContraseniaCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

(function() {
  'use strict';

  angular
      .module('loginAdmin')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Angular Material Design',
        'url': 'https://material.angularjs.org/#/',
        'description': 'The Angular reference implementation of the Google\'s Material Design specification.',
        'logo': 'angular-material.png'
      },
      {
        'title': 'Sass (Ruby)',
        'url': 'http://sass-lang.com/',
        'description': 'Original Syntactically Awesome StyleSheets implemented in Ruby',
        'logo': 'ruby-sass.png'
      }
    ];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('loginAdmin')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    NavbarController.$inject = ["moment"];
    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('loginAdmin')
    .factory('githubContributor', githubContributor);

  /** @ngInject */
  function githubContributor($log, $http) {
    var apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';

    var service = {
      apiHost: apiHost,
      getContributors: getContributors
    };

    return service;

    function getContributors(limit) {
      if (!limit) {
        limit = 30;
      }

      return $http.get(apiHost + '/contributors?per_page=' + limit)
        .then(getContributorsComplete)
        .catch(getContributorsFailed);

      function getContributorsComplete(response) {
        return response.data;
      }

      function getContributorsFailed(error) {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      }
    }
  }
  githubContributor.$inject = ["$log", "$http"];
})();

(function() {
  'use strict';

  angular
    .module('loginAdmin')
    .directive('acmeMalarkey', acmeMalarkey);

  /** @ngInject */
  function acmeMalarkey(malarkey) {
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '=',
      },
      template: '&nbsp;',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    MalarkeyController.$inject = ["$log", "githubContributor"];
    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: true,
        postfix: ' '
      });

      el.addClass('acme-malarkey');

      angular.forEach(scope.extraValues, function(value) {
        typist.type(value).pause().delete();
      });

      watcher = scope.$watch('vm.contributors', function() {
        angular.forEach(vm.contributors, function(contributor) {
          typist.type(contributor.login).pause().delete();
        });
      });

      scope.$on('$destroy', function () {
        watcher();
      });
    }

    /** @ngInject */
    function MalarkeyController($log, githubContributor) {
      var vm = this;

      vm.contributors = [];

      activate();

      function activate() {
        return getContributors().then(function() {
          $log.info('Activated Contributors View');
        });
      }

      function getContributors() {
        return githubContributor.getContributors(10).then(function(data) {
          vm.contributors = data;

          return vm.contributors;
        });
      }
    }

  }
  acmeMalarkey.$inject = ["malarkey"];

})();

(function() {
  'use strict';

  angular
    .module('loginAdmin')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout) {
      
  }
  MainController.$inject = ["$timeout"];
})();

(function() {
  'use strict';

  angular
    .module('loginAdmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }
  runBlock.$inject = ["$log"];

})();

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
  routeConfig.$inject = ["$routeProvider"];

})();

(function() {
  'use strict';

  angular
    .module('loginAdmin')
    
    .directive("addUser", addUser)
    .directive("validateEmail", validateEmail)

    function validateEmail($timeout, $log) {
      var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

      return {
        require: 'ngModel',
        restrict: '',
        scope: {},
        link: function(scope, elm, attrs, ctrl) {
          // only apply the validator if ngModel is present and Angular has added the email validator
          if (ctrl && ctrl.$validators.email) {

            // this will overwrite the default Angular email validator
            ctrl.$validators.email = function(modelValue) {
              return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
            };
          }
        }
      }
    }
    validateEmail.$inject = ["$timeout", "$log"];
   
   
    function addUser($timeout, $log){
    	return {
			restrict: "A",
            link: function (scope, ele, attr) {
                $timeout(function () {

                    ele.on('click', function(){

                        var self = $(this),

                        selfContainer = self.parent('.btn-circle-js'),
                        wrapperRegister = $('.wrapper-register-box');

                        if(!selfContainer.hasClass('is-animated')){

                            selfContainer.addClass('is-animated');

                            TweenLite.to(selfContainer, 0.6, {delay: 0, right: '50%', top: '50%', ease: Circ.easeOut});
                            TweenLite.to(self, 0.6, {delay: 0.2, right: '20px', top: '40px', lineHeight: '50px', width: '50px', height: '50px', ease: Circ.easeOut});
                            TweenLite.to(selfContainer, 0.4, {delay: 0.2, top: 0, left: 0, right: '0', width: '100%', height: '100%', borderRadius: '4px', margin: 0,
                                ease: Circ.easeOut, onComplete: function(){
                                    TweenLite.to(wrapperRegister, 0.6, {delay: 0, autoAlpha: 1, ease: Circ.easeOut});
                                    TweenLite.to(self, 0.4, {delay: 0, rotation: '45', ease: Circ.easeOut});
                                }
                            });

                        }else{

                            selfContainer.removeClass('is-animated');
                            TweenLite.to(wrapperRegister, 0.3, {delay: 0, autoAlpha: 0, ease: Circ.easeOut});
                            TweenLite.to(selfContainer, 0.4, {delay: 0.2, top: '40%', left: 'auto', right: '40%', width: '90px', height: '90px', margin: 0, borderRadius: '50%',
                                    ease: Circ.easeOut, onComplete: function(){
                                        TweenLite.to(self, 0.3, {rotation: 0, ease: Circ.easeOut});
                                    }
                            });
                            TweenLite.to(selfContainer, 0.6, {delay: 0.5, right: '-45px', top: '15px', ease: Circ.easeOut});
                            TweenLite.to(self, 0.6, {delay: 0.2, top: 0, right: '0', width: '90px', height: '90px', ease: Circ.easeOut});
                        }
                    });
                });
            }
        }
    }
    addUser.$inject = ["$timeout", "$log"];

   
    
})();
/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('loginAdmin')
    

})();

(function() {
  'use strict';

  angular
    .module('loginAdmin')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    
  }
  config.$inject = ["$logProvider"];

})();

angular.module("loginAdmin").run(["$templateCache", function($templateCache) {$templateCache.put("app/main/main.html","<div class=\"wrapper-login\"><div class=\"helper\"></div><div id=\"login\" class=\"display-inline-block\"><div class=\"login-box\"><div class=\"btn-circle-js btn-circle color\"><md-button class=\"btn-circle-ico md-icon-button\" aria-label=\"Registrar\" add-user=\"\"><md-icon md-svg-icon=\"assets/icons/ic_add_black_36px.svg\" class=\"display-inline-block\"></md-icon></md-button><div class=\"wrapper-register-box\"><div class=\"login-box color\"><div class=\"login-box-inner\"><form name=\"formRegister\" action=\"\"><div class=\"login-header\"><h1>REGISTRO</h1></div><div class=\"login-body align-left\"><md-input-container><label>Email</label> <input type=\"email\" ng-required=\"true\" name=\"email\" ng-model=\"user.email\" validate-email=\"\"><div ng-messages=\"formRegister.email.$error\" ng-if=\"formRegister.email.$dirty\"><div ng-message=\"required\">Ingresa tu usuario.</div><div ng-message=\"email\">Formato no válido.</div><div ng-message=\"validate-email\">Formato no válido.</div></div></md-input-container><md-input-container><label>Contraseña</label> <input type=\"password\" name=\"contrasenia\" ng-model=\"user.contrasenia\" ng-required=\"true\" ng-minlength=\"8\"><div ng-messages=\"formRegister.contrasenia.$error\" ng-if=\"formRegister.contrasenia.$dirty\"><div ng-message=\"required\">Ingresa tu contraseña.</div><div ng-message=\"minlength\">Mínimo 8 carácteres.</div></div></md-input-container><md-input-container><label>Confirmar contraseña</label> <input type=\"password\" name=\"confirmar\" ng-model=\"user.confirmar\" ng-required=\"true\" ng-pattern=\"user.contrasenia\"><div ng-messages=\"formRegister.confirmar.$error\" ng-if=\"formRegister.confirmar.$dirty\"><div ng-message=\"required\">Ingresa tu contraseña.</div><div ng-message=\"pattern\">Debe ser igual a la contraseña.</div></div></md-input-container></div><div class=\"login-footer\"><div class=\"form-group last\"><md-button disabled=\"\" ng-disabled=\"formRegister.$invalid || formRegister.$pending\" class=\"btn form-button\">REGISTRAR</md-button></div></div></form></div></div></div></div><div class=\"login-box-inner\"><div class=\"login-header\"><h1>LOGIN</h1></div><form action=\"\" name=\"formLogin\"><div class=\"login-body align-left\"><md-input-container><label>Email</label> <input type=\"email\" ng-required=\"true\" ng-minlength=\"2\" name=\"email\" ng-model=\"user.email\" validate-email=\"\"><div ng-messages=\"formLogin.email.$error\" ng-if=\"formLogin.email.$dirty\"><div ng-message=\"required\">Ingresa tu usuario</div><div ng-message=\"email\">Formato no válido.</div><div ng-message=\"validate-email\">Formato no válido.</div></div></md-input-container><md-input-container><label>Contraseña</label> <input type=\"password\" ng-required=\"true\" ng-minlength=\"8\" name=\"password\" ng-model=\"user.password\"><div ng-messages=\"formLogin.password.$error\" ng-if=\"formLogin.password.$dirty\"><div ng-message=\"required\">Ingresa tu contraseña.</div><div ng-message=\"minlength\">Mínimo 8 carácteres.</div></div></md-input-container></div><div class=\"login-footer\"><div class=\"form-group\"><md-button disabled=\"\" ng-disabled=\"formLogin.$invalid || formLogin.$pending\" class=\"btn form-button\">ENTRAR</md-button></div><div class=\"form-group last\"><a href=\"#/recuperar-contrasenia\">¿Olvidaste tu contraseña?</a></div></div></form></div></div></div></div>");
$templateCache.put("app/views/recuperar-contrasenia.html","<div class=\"wrapper-login\"><div class=\"helper\"></div><div id=\"login\" class=\"display-inline-block\"><div class=\"login-box-back\"></div><div class=\"login-box\"><div class=\"login-box-inner\"><div class=\"login-header\"><h1>RECUPERAR</h1></div><form action=\"\" name=\"formRecuperarContrasenia\"><div class=\"login-body align-left\"><md-input-container><label>Email</label> <input type=\"email\" ng-required=\"true\" ng-minlength=\"2\" name=\"email\" ng-model=\"user.email\"><div ng-messages=\"formRecuperarContrasenia.email.$error\" ng-if=\"formRecuperarContrasenia.email.$dirty\"><div ng-message=\"required\">Ingresa tu usuario</div><div ng-message=\"email\">Formato no válido.</div></div></md-input-container></div><div class=\"login-footer\"><div class=\"form-group\"><md-button disabled=\"\" ng-disabled=\"formRecuperarContrasenia.$invalid || formRecuperarContrasenia.$pending\" class=\"btn form-button\">ENVIAR</md-button></div><div class=\"form-group last\"><a href=\"#/\"><md-icon md-svg-icon=\"assets/icons/ic_arrow_back_white_24px.svg\" class=\"display-inline-block\"></md-icon>Login</a></div></div></form></div></div></div></div>");
$templateCache.put("app/components/navbar/navbar.html","<md-toolbar layout=\"row\" layout-align=\"center center\"><md-button href=\"https://github.com/Swiip/generator-gulp-angular\">Gulp Angular</md-button><section flex=\"\" layout=\"row\" layout-align=\"left center\"><md-button href=\"#\" class=\"md-raised\">Home</md-button><md-button href=\"#\" class=\"md-raised\">About</md-button><md-button href=\"#\" class=\"md-raised\">Contact</md-button></section><md-button class=\"acme-navbar-text\">Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>");}]);