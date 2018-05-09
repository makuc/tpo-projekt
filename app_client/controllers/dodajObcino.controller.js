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
                sifra: vm.obcina.obcina.sifra,
                ime: vm.obcina.obcina.ime
            };
            
            ostaloPodatki.dodajObcino(obcina).then(
                function success(odgovor){
                    $location.path("/urediObcine");
                },
                function error(odgovor){
                    vm.obvestilo = odgovor.data.message;
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