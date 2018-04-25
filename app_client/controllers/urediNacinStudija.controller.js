(function() {
    /* global angular */
    
    urediNacinStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediNacinStudijaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.idNacinStudija = $routeParams.idNacinStudija;
        
        vm.pridobi = function(){
            ostaloPodatki.najdiNacinStudija(vm.idNacinStudija).then(
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
                sifra: vm.podatki.sifra
            };
            ostaloPodatki.urediNacinStudija(vm.idNacinStudija, data).then(
                function success(odgovor){
                    $location.path("/urediNacineStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediNacineStudija");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediNacinStudijaCtrl', urediNacinStudijaCtrl);
})();