(function() {
    /* global angular */
    
    dodajVrstoStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajVrstoStudijaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        
        vm.pridobi = function(){
        };
        
        vm.shrani = function(){
            var data = {
                opis: vm.podatki.opis,
                sifra: vm.podatki.sifra,
                klasiusSRV: vm.podatki.klasiusSRV,
                predpona: vm.podatki.predpona
            };
            ostaloPodatki.dodajVrstoStudija(data).then(
                function success(odgovor){
                    $location.path("/urediVrsteStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediVrsteStudija");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajVrstoStudijaCtrl', dodajVrstoStudijaCtrl);
})();