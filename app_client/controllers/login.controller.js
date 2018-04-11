    /* global angular */
(function() {
 

    loginCtrl.$inject = ['$location', 'authentication', '$scope','$route'];
    function loginCtrl($location, authentication, $scope,$route) {
        
     if(authentication.auth()) {
        return $location.path('/student/main');
     }
        
     function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    
        var vm = this;
        
    vm.formData = {
      email: "",
      password: "",
      remember: false
    };
    vm.prevPage = $location.search().page || '/';
    console.log(vm.prevPage);
    vm.error = "";
    
    vm.sendData = function() {
      vm.formError = "<ul>";
      
      if(!vm.formData.email){
        vm.formError += "<li>Elektronska pošta zahtevana</li>";
        angular.element(document.querySelector('#email')).parent().parent().addClass('has-error');
      } else if(!isEmail(vm.formData.email)) {
        vm.formError += "<li>Neveljavna elektronska pošta</li>";
        angular.element(document.querySelector('#email')).parent().parent().addClass('has-error');
      } else {
        angular.element(document.querySelector('#email')).parent().parent().removeClass('has-error');
      }
      
      if(!vm.formData.password) {
        vm.formError += "<li>Geslo zahtevano</li>";
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
            if(authentication.auth()){
            $location.search('page', null);
            $location.path("/student/main");
            }else{
               vm.formError = "Uporabnika ni v bazi";
              
            }
          },
          function error(res) {
            if(res.status == 403) return vm.formError = "An illegal expression is entered in the form";
            
            vm.formError = "User doesn't exist in our database";
          }
        );
    };
        
        
    }
    angular
        .module('tpo')
        .controller('loginCtrl', loginCtrl);
})();