(function() {
    /* global angular */
    
    urediVrstoStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediVrstoStudijaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.id = $routeParams.idVrsteStudija;
        
        vm.pridobi = function(){
            ostaloPodatki.najdiVrstoStudija(vm.id).then(
                function success(odgovor){
                    vm.podatki = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var data = {
                sifra: vm.podatki.sifra,
                opis: vm.podatki.opis,
                klasiusSRV: vm.podatki.klasiusSRV,
                predpona: vm.podatki.predpona
            };
            ostaloPodatki.urediVrstoStudija(vm.id, data).then(
                function success(odgovor){
                    $location.path("/urediVrsteStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediVrstoStudijaCtrl', urediVrstoStudijaCtrl);
})();