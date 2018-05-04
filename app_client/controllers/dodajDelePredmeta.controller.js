(function() {
    /* global angular */
    
    dodajDelePredmetaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajDelePredmetaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.opcijeBool = ["true", "false"];
        
        vm.pridobiDelePredmetnika = function(){
        };
        
        vm.shrani = function(){
            var delPredmetnika = {
                sifra: vm.delPredmetnika.sifra,
                naziv: vm.delPredmetnika.naziv,
                obvezen: vm.delPredmetnika.obvezen,
                strokovni: vm.delPredmetnika.strokovni,
                modul: vm.delPredmetnika.modul
            };
            ostaloPodatki.dodajDelPredmetnika(delPredmetnika).then(
                function success(odgovor){
                    $location.path("/urediDelePredmetov");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediDelePredmetov");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajDelePredmetaCtrl', dodajDelePredmetaCtrl);
})();