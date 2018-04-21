(function() {
    /* global angular */
    pozabljenoCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http'];
    function pozabljenoCtrl($location, authentication, $scope, $route, $window, $http) {
        var vm = this;
        
        vm.email = "";
        
        vm.submit = function() {
            if(!isEmail(vm.email))
                return  vm.formError="Neveljaven elektronski naslov";
            
            authentication.pozabljenoGeslo(vm.email).then(
                function success(res) {
                    var pozabljenoId = res.data.ponastavi_geslo;
                    $location.path("/pozabljeno-geslo/"+pozabljenoId);
                },
                function error(res) {
                    vm.formError="Neveljaven uporabnik";
                    
                }
            );
        };
        
        
        
        
        var isEmail = function(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        };

        
    }
    
    angular
        .module('tpo')
        .controller('pozabljenoCtrl', pozabljenoCtrl);
})();