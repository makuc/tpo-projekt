(function() {
    /* global angular */
    dbCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http'];
    function dbCtrl($location, authentication, $scope, $route, $window, $http) {
        
        var vm=this;
        vm.populate=function(){
      return $http.post("/api/v1/db/", {
        
      });
    }
        
        vm.delet=function(){$http.delete("/api/v1/db/");}
    }
    
    angular
        .module('tpo')
        .controller('dbCtrl', dbCtrl);
})();

/*
 vm.populate=function(){
            authentication.zacetniPodatki().then(
                function success(res) {
                    console.log("populated");
                },
                function error(res) {
                    console.log("err");
                    
                }
            );
        }
        
        vm.delet=function(){
            authentication.brisiBazo().then(
                function success(res) {
                    console.log("delete");
                },
                function error(res) {
                    console.log("err");
                    
                }
            );
        }
        */