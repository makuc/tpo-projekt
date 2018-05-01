(function() {
    /* global angular */
    
    dodajStudijskiProgramCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajStudijskiProgramCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        ostaloPodatki.pridobiVseVeljavneVrsteStudije().then(
            function success(odgovor){
                vm.vrstaStudija = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        vm.pridobi = function(){
        };
        
        vm.shrani = function(){
            var data = {
                naziv: vm.podatki.naziv,
                sifra: vm.podatki.sifra,
                vrstaStudija: vm.podatki.vrstaStudija,
                semestri: vm.podatki.semestri,
                sifraEVS: vm.podatki.sifraEVS
            };
            ostaloPodatki.dodajStudijskiProgram(data).then(
                function success(odgovor){
                    $location.path("/urediStudijskePrograme");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediStudijskePrograme");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajStudijskiProgramCtrl', dodajStudijskiProgramCtrl);
})();