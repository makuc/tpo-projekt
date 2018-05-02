(function() {
    /* global angular */
    
    dodajZaposlenegaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajZaposlenegaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.pridobiZaposlenega = function(){
        };
        
        vm.shrani = function(){
            console.log("ZAPOSLEN:");
            console.log(vm.zaposlen);
            var zaposlen = {
                ime: vm.zaposlen.zaposlen.ime,
                priimek: vm.zaposlen.zaposlen.priimek,
                naziv: vm.zaposlen.zaposlen.naziv,
                email: vm.zaposlen.zaposlen.email
            };
            ostaloPodatki.dodajZaposlenega(zaposlen).then(
                function success(odgovor){
                    $location.path("/urediZaposlene");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediZaposlene");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajZaposlenegaCtrl', dodajZaposlenegaCtrl);
})();