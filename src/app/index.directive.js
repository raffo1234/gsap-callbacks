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

   
    
})();