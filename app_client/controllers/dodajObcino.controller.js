(function() {
    /* global angular */
    
    dodajObcinoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajObcinoCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.pridobiObcino = function(){
        };
        
        vm.shrani = function(){
            //console.log("ZAPOSLEN:");
            //console.log(vm.zaposlen);
            var obcina = {
                ime: vm.obcina.obcina.ime,
                sifra: vm.obcina.obcina.sifra
                
            };
            ostaloPodatki.dodajObcino(obcina).then(
                function success(odgovor){
                    $location.path("/urediObcine");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediObcine");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajObcinoCtrl', dodajObcinoCtrl);
})();