(function() {
    /* global angular */
    
    dodajPostoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajPostoCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.pridobiPosto = function(){
        };
        
        vm.shrani = function(){
            //console.log("ZAPOSLEN:");
            //console.log(vm.zaposlen);
            var posta = {
                naziv: vm.posta.posta.naziv,
                postna_stevilka: vm.posta.posta.postna_stevilka
                
            };
            ostaloPodatki.dodajPosto(posta).then(
                function success(odgovor){
                    $location.path("/urediPoste");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediPoste");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajPostoCtrl', dodajPostoCtrl);
})();