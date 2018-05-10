(function() {
    /* global angular */
    
    dodajPredmetnikCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki', 'authentication'];
    
    
    function dodajPredmetnikCtrl($location, ostaloPodatki, $routeParams, predmetPodatki, authentication){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
        
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.ime = odgovor.data.zaposlen.ime;
                    vm.priimek = odgovor.data.zaposlen.priimek;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        }
        
        vm.logoutFunc = function() {
            delTok();
            return $location.path('/login');
        };
        
        function delTok(){
            return authentication.logout();
        }
        
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
        };
        
        vm.shrani = function(){
            var data = {
                studijski_program: vm.podatki.studijski_program,
                studijsko_leto: vm.podatki.studijsko_leto,
                letnik: vm.podatki.letnik,
                del_predmetnika: vm.podatki.del_predmetnika
            };
            ostaloPodatki.dodajPredmetnik(data).then(
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
        .controller('dodajPredmetnikCtrl', dodajPredmetnikCtrl);
})();