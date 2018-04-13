(function() {
    /* global angular */
    pozabljenoCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http'];
    function pozabljenoCtrl($location, authentication, $scope, $route, $window, $http) {
        var vm = this;
        
        vm.email = "";
        
        vm.submit = function() {
            authentication.pozabljenoGeslo(vm.email).then(
                function success(res) {
                    var pozabljenoId = res.data.ponastavi_geslo;
                    $location.path("/pozabljeno-geslo/"+pozabljenoId);
                },
                function error(res) {
                    console.log("Napaka:\n" + res.data);
                }
            );
        };
        
    }
    
    angular
        .module('tpo')
        .controller('pozabljenoCtrl', pozabljenoCtrl);
})();