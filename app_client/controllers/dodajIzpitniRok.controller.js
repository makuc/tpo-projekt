(function() {
    /* global angular */
    
    dodajIzpitniRokCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki', 'izpitniRokPodatki'];
    
    
    function dodajIzpitniRokCtrl($location, ostaloPodatki, $routeParams, predmetPodatki, izpitniRokPodatki){
        var vm = this;
        
        predmetPodatki.izpisiVseVeljavnePredmete().then(
            function success(odgovor){
                vm.predmeti = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then(
            function success(odgovor){
                vm.studijskaLeta = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );

        
        vm.shrani = function(){
            //preveri veljavnost datuma
            var data = {
                predmet: vm.podatki.predmet,
                studijsko_leto: vm.podatki.studijsko_leto,
                datum_izvajanja: vm.podatki.datum_izvajanja,
                opombe: vm.podatki.opombe
            };
            
            izpitniRokPodatki.ustvariIzpitniRok(data).then(
                function success(odgovor){
                    $location.path("/vsiIzpitniRoki");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/vsiIzpitniRoki");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajIzpitniRokCtrl', dodajIzpitniRokCtrl);
})();