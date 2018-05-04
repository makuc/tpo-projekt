(function() {
    /* global angular */
    
    dodajVrstoVpisaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajVrstoVpisaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.pridobiVrstoVpisa = function(){
        };
        
        vm.shrani = function(){
            //console.log("ZAPOSLEN:");
            //console.log(vm.zaposlen);
            var vrstaVpisa = {
                koda: vm.vrstaVpisa.koda,
                naziv: vm.vrstaVpisa.naziv,
                opis: vm.vrstaVpisa.opis
            };
            ostaloPodatki.dodajVrstoVpisa(vrstaVpisa).then(
                function success(odgovor){
                    $location.path("/urediVrsteVpisa");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
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
        .controller('dodajVrstoVpisaCtrl', dodajVrstoVpisaCtrl);
})();