(function() {
    /* global angular */
    ponastaviCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http','$routeParams'];
    function ponastaviCtrl($location, authentication, $scope, $route, $window, $http, $routeParams) {
        
        var vm=this;
        vm.passwd="";
        vm.confirm="";
        
        vm.submit = function() {
            if(vm.passwd == vm.confirm && vm.passwd!==""){
                authentication.ponastaviGeslo(vm.passwd, $routeParams.ponastavi_id  ).then(
                    function success(res) {
                        if(res.data.success){
                           $location.path("/login");
                        }else{
                            alert("Napaka ")
                        }
                    },
                    function error(res) {
                        alert("Napak ")
                    }
                );
                
            }else{
                vm.formError="Gesla se ne ujemata"
            }
        };
    }
    
    angular
        .module('tpo')
        .controller('ponastaviCtrl', ponastaviCtrl);
})();