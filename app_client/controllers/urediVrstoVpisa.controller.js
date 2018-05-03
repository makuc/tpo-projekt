(function() {
    /* global angular */
    
    urediVrstoVpisaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediVrstoVpisaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.idVrsteVpisa = $routeParams.idVrsteVpisa;

        vm.pridobiVrstoVpisa = function(){
            ostaloPodatki.najdiVrstoVpisa(vm.idVrsteVpisa).then(
                function success(odgovor){
                    vm.vrstaVpisa = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var vrstaVpisa = {
                koda: vm.vrstaVpisa.koda,
                naziv: vm.vrstaVpisa.naziv,
                opis: vm.vrstaVpisa.opis
            };
            ostaloPodatki.urediVrstoVpisa(vm.idVrsteVpisa, vrstaVpisa).then(
                function success(odgovor){
                    $location.path("/urediVrsteVpisa");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediVrsteVpisa");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediVrstoVpisaCtrl', urediVrstoVpisaCtrl);
})();