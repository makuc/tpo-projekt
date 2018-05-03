(function() {
    /* global angular */
    
    urediDelePredmetaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediDelePredmetaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.opcijeBool = ["true", "false"];
        
        vm.idDelaPredmetnika = $routeParams.idDelaPredmeta;

        vm.pridobiDelPredmeta = function(){
            ostaloPodatki.najdiDelPredmetnika(vm.idDelaPredmetnika).then(
                function success(odgovor){
                    vm.delPredmetnika = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
          //console.log(vm.delPredmetnika.obvezen);
            var delPredmetnika = {
                sifra: vm.delPredmetnika.sifra,
                naziv: vm.delPredmetnika.naziv,
                obvezen: vm.delPredmetnika.obvezen,
                strokovni: vm.delPredmetnika.strokovni,
                modul: vm.delPredmetnika.modul
            };
            ostaloPodatki.urediDelPredmetnika(vm.idDelaPredmetnika, delPredmetnika).then(
                function success(odgovor){
                    $location.path("/urediDelePredmetov");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediDelePredmetaCtrl', urediDelePredmetaCtrl);
})();