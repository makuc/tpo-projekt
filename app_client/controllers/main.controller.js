(function() {
    /* global angular */
     mainCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window'];
    function mainCtrl($location, authentication, $scope,$route,$window) {
        if(!authentication.auth()) {
             $window.alert("Napačno uporabniško ime ali geslo!");
        return $location.path('/login');
         }
        
        
    }
    
    angular
        .module('tpo')
        .controller('mainCtrl', mainCtrl);
})();