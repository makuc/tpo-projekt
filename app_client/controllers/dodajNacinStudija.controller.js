(function() {
    /* global angular */
    
    dodajNacinStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajNacinStudijaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        
        vm.pridobi = function(){
        };
        
        vm.shrani = function(){
            var data = {
                naziv: vm.podatki.naziv,
                sifra: vm.podatki.sifra,
            };
            ostaloPodatki.dodajNacinStudija(data).then(
                function success(odgovor){
                    $location.path("/urediNacineStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
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
        .controller('dodajNacinStudijaCtrl', dodajNacinStudijaCtrl);
})();