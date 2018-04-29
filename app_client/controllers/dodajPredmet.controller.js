(function() {
    /* global angular */
    
    dodajPredmetCtrl.$inject = ['$location', 'predmetPodatki', '$routeParams'];
    
    
    function dodajPredmetCtrl($location, predmetPodatki, $routeParams){
        var vm = this;
        
        vm.opcijeKT = [1,2,3,4,5,6];
        
        vm.pridobiPredmet = function(){
        };
        
        vm.shrani = function(){
            var predmet = {
                naziv: vm.predmet.naziv,
                sifra: vm.predmet.sifra,
                KT: vm.predmet.KT
            };
            predmetPodatki.dodajPredmet(predmet).then(
                function success(odgovor){
                    $location.path("/urediPredmete");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediPredmete");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajPredmetCtrl', dodajPredmetCtrl);
})();