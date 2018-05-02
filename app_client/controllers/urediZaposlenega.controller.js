(function() {
    /* global angular */
    
    urediZaposlenegaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediZaposlenegaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.idZaposlenega = $routeParams.idZaposlenega;

        vm.pridobiZaposlenega = function(){
            ostaloPodatki.najdiZaposlenega(vm.idZaposlenega).then(
                function success(odgovor){
                    vm.zaposlen = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var zaposlen = {
                priimek: vm.zaposlen.zaposlen.priimek,
                ime: vm.zaposlen.zaposlen.ime,
                naziv: vm.zaposlen.zaposlen.naziv,
                email: vm.zaposlen.zaposlen.email
            };
            ostaloPodatki.urediZaposlenega(vm.idZaposlenega, zaposlen).then(
                function success(odgovor){
                    $location.path("/urediZaposlene");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediZaposlenegaCtrl', urediZaposlenegaCtrl);
})();