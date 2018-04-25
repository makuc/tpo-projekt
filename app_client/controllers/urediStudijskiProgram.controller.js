(function() {
    /* global angular */
    
    urediStudijskiProgramCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediStudijskiProgramCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.id = $routeParams.idStudijskegaPrograma;
        
        vm.pridobi = function(){
            ostaloPodatki.najdiStudijskiProgram(vm.id).then(
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
                naziv: vm.podatki.naziv,
                sifra: vm.podatki.sifra,
                vrstaStudija: vm.podatki.vrstaStudija,
                semestri: vm.podatki.semestri,
                sifraEVS: vm.podatki.sifraEVS
            };
            ostaloPodatki.urediStudijskiProgram(vm.id, data).then(
                function success(odgovor){
                    $location.path("/urediStudijskePrograme");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediStudijskiProgramCtrl', urediStudijskiProgramCtrl);
})();