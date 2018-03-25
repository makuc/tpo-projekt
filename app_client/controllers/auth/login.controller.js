/* global angular */
(function() {
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function ctrlLogin($location, $route, authentication, aaData) {
    
    if(authentication.auth()) {
      return $location.path('/');
    }
    
    var vm = this;
    
    aaData.setTitle("AA | Login");
    
    vm.title = 'AA - Login';
    vm.pageHeader = {
      title: 'Login into your account',
      subtitle: "For the best experience possible"
    };
    vm.pageFooter = {
      left: [
        {
          title: "Login",
          href: "/login"
        }
      ],
      right: ""
    };
    
    vm.formData = {
      email: "",
      password: "",
      remember: false
    };
    vm.prevPage = $location.search().page || '/';
    
    vm.error = "";
    
    vm.sendData = function() {
      vm.formError = "<ul>";
      
      if(!vm.formData.email){
        vm.formError += "<li>Email is required</li>";
        angular.element(document.querySelector('#email')).parent().parent().addClass('has-error');
      } else if(!isEmail(vm.formData.email)) {
        vm.formError += "<li>Entered email is invalid</li>";
        angular.element(document.querySelector('#email')).parent().parent().addClass('has-error');
      } else {
        angular.element(document.querySelector('#email')).parent().parent().removeClass('has-error');
      }
      
      if(!vm.formData.password) {
        vm.formError += "<li>Password is required</li>";
        angular.element(document.querySelector('#password')).parent().parent().addClass('has-error');
      } else {
        angular.element(document.querySelector('#password')).parent().parent().removeClass('has-error');
      }
      
      if(vm.formError != "<ul>") {
        vm.formError += "</ul>";
        return false;
      }
      vm.login();
    };
    vm.login = function() {
      vm.formError = "";
      
      authentication
        .login(vm.formData)
        .then(
          function success() {
            $location.search('page', null);
            $location.path(vm.prevPage);
          },
          function error(res) {
            if(res.status == 403) return vm.formError = "An illegal expression is entered in the form";
            
            vm.formError = "User doesn't exist in our database";
          }
        );
    };
  }
  ctrlLogin.$inject = ['$location', '$route', 'authentication', 'aaData'];
  
  angular
    .module('aa-novels')
    .controller('login.controller', ctrlLogin);
})();