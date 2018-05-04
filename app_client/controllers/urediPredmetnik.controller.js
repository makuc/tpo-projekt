(function() {
    /* global angular */
    
    urediPredmetnikCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki'];
    
    
    function urediPredmetnikCtrl($location, ostaloPodatki, $routeParams, predmetPodatki){
        var vm = this;
        
        vm.id = $routeParams.idPredmetnika;
        
        ostaloPodatki.pridobiVseVeljavneStudijskePrograme().then(
            function success(odgovor){
                vm.studijskiProgrami = odgovor.data;
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
        
        ostaloPodatki.pridobiVseVeljavneDelePredmetnika().then(
            function success(odgovor){
                vm.deliPredmetnika = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        ostaloPodatki.pridobiVseVeljavneLetnike().then(
            function success(odgovor){
                vm.letniki = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        predmetPodatki.izpisiVseVeljavnePredmete().then(
            function success(odgovor){
                vm.predmeti = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        vm.pridobi = function(){
            ostaloPodatki.najdiPredmetnik(vm.id).then(
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
                studijski_program: vm.podatki.studijski_program,
                studijsko_leto: vm.podatki.studijsko_leto,
                letnik: vm.podatki.letnik,
                del_predmetnika: vm.podatki.del_predmetnika
            };
            ostaloPodatki.urediPredmetnik(vm.id, data).then(
                function success(odgovor){
                    console.log(odgovor);
                    $location.path("/urediPredmetnike");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediPredmetnike");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediPredmetnikCtrl', urediPredmetnikCtrl);
})();