(function() {
    /* global angular */
<<<<<<< HEAD
     mainCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http'];
    function mainCtrl($location, authentication, $scope, $route, $window, $http) {
        if(!authentication.auth()) {
            
        return $location.path('/login');
       
         }
         

        
   function delTok(){
        return authentication.logout()
    }
    
         $scope.logoutFunc= function() {
         delTok();
         return $location.path('/login');
    }
        
    }
=======
    mainCtrl.$inject = [];
    function mainCtrl() {}
>>>>>>> Uros
    
    angular
        .module('tpo')
        .controller('mainCtrl', mainCtrl);
})();