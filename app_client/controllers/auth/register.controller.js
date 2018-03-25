/* global angular */
(function() {
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function ctrlRegister($location, $window, authentication, aaData) {
    if(authentication.auth()) {
      $location.path('/');
    }
    
    aaData.setTitle("AA | Register");
    
    var vm = this;
    vm.captchaLoaded = false;
    
    vm.title = 'AA - Register';
    vm.pageHeader = {
      title: 'Create account',
      subtitle: "For the best experience possible"
    };
    vm.pageFooter = {
      left: [
        {
          title: "Registration",
          href: "/register"
        }
      ],
      right: ""
    };
    
    vm.formData = {
      name: "",
      email: "",
      password: "",
      password2: "",
      terms: false,
      
    };
    vm.prevPage = $location.search().page || '/';
    
    vm.error = "";
    
    vm.captchaID = undefined;
    
    vm.submit = function() {
      vm.formError = "<ul>";
      
      if(!vm.formData.name) {
        vm.formError += "<li>Creator's name is required</li>";
        angular.element( document.querySelector( '#name' ) ).parent().parent().addClass('has-error');
      } else {
        angular.element( document.querySelector( '#name' ) ).parent().parent().removeClass('has-error');
      }
      
      if(!vm.formData.email) {
        vm.formError += "<li>Email is required</li>";
        angular.element( document.querySelector( '#email' ) ).parent().parent().addClass('has-error');
      } else if(!isEmail(vm.formData.email)) {
        vm.formError += "<li>Entered email is invalid</li>";
        angular.element( document.querySelector( '#email' ) ).parent().parent().addClass('has-error');
      } else {
        angular.element( document.querySelector( '#email' ) ).parent().parent().removeClass('has-error');
      }
      
      if(!vm.formData.password) {
        vm.formError += "<li>Password is required</li>";
        angular.element( document.querySelector( '#password' ) ).parent().parent().addClass('has-error');
      } else {
        angular.element( document.querySelector( '#password' ) ).parent().parent().removeClass('has-error');
      }
      if(!vm.formData.password2) {
        vm.formError += "<li>Repeated password is required</li>";
        angular.element( document.querySelector( '#password2' ) ).parent().parent().addClass('has-error');
      } else {
        angular.element( document.querySelector( '#password2' ) ).parent().parent().removeClass('has-error');
      }
      
      if(vm.formData.password != vm.formData.password2) {
        vm.formError += "<li>Entered passwords don't match</li>";
        angular.element( document.querySelector( '#password' ) ).parent().parent().addClass('has-error');
        angular.element( document.querySelector( '#password2' ) ).parent().parent().addClass('has-error');
      } else {
        angular.element( document.querySelector( '#password' ) ).parent().parent().removeClass('has-error');
        angular.element( document.querySelector( '#password2' ) ).parent().parent().removeClass('has-error');
      }
      
      if(!vm.formData.terms) {
        vm.formError += "<li>You have to agree to the terms to register</li>";
        angular.element( document.querySelector( '#terms' ) ).parent().parent().parent().addClass('has-error');
      } else {
        angular.element( document.querySelector( '#terms' ) ).parent().parent().parent().removeClass('has-error');
      }
      
      if(vm.formError != "<ul>") {
        vm.formError += "</ul>";
        return false;
      }
      vm.formError = "";
      
      if(vm.captchaID !== undefined) {
        $window.grecaptcha.reset(vm.captchaID);
      }
      
      vm.captchaID = $window.grecaptcha.render('btn-register', {
        'sitekey' : '6LfYvz4UAAAAABiUZ8cxXA3DdN8-YhUSt-N7K7uX',
        'callback' : vm.sendData
      });
      
      console.log(vm.captchaID);
      
      $window.grecaptcha.execute(vm.captchaID);
    };
    
    vm.sendData = function(token) {
      vm.formError = "";
      vm.formData.captcha = token;
      
      vm.register();
    };
    vm.register = function() {
      vm.formError = "";
      
      authentication
        .register(vm.formData)
        .then(
          function success() {
            $location.search('page', null);
            $location.path(vm.prevPage);
          },
          function error(err) {
            if(err.status != 500) return vm.formError = err.status + " - " + err.data.message;
            else vm.formError = "Encountered an unknown error. Please try again later";
          }
        );
    };
  }
  ctrlRegister.$inject = ['$location', '$window', 'authentication', 'aaData'];
  
  angular
    .module('aa-novels')
    .controller('register.controller', ctrlRegister);
})();