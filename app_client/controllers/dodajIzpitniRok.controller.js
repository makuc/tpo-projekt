(function() {
    /* global angular */
    
    dodajIzpitniRokCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki', 'izpitniRokPodatki'];
    
    
    function dodajIzpitniRokCtrl($location, ostaloPodatki, $routeParams, predmetPodatki, izpitniRokPodatki){
        var vm = this;
        
        function preveriDatum(datum){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(yyyy < datum.getFullYear()){
                if(datum.getDay() > 5){
                    vm.obvestilo = "Med vikendi ni mogoče dodanjanje izpitnega roka";
                    return false;
                }
                return true;
            } else if(yyyy == datum.getFullYear()){
                if(mm < datum.getMonth()+1){
                    if(datum.getDay() > 5){
                        vm.obvestilo = "Med vikendi ni mogoče dodanjanje izpitnega roka";
                        return false;
                    }
                    return true;
                } else if(mm == datum.getMonth()+1){
                    if(dd < datum.getDate()){
                        if(datum.getDay() > 5){
                            vm.obvestilo = "Med vikendi ni mogoče dodanjanje izpitnega roka";
                            return false;
                        }
                        return true;
                    } else {
                        vm.obvestilo = "Datum je manjši kot današnji";
                        return false;
                    }
                } else {
                    vm.obvestilo = "Datum je manjši kot današnji";
                    return false;
                }
            } else {
                vm.obvestilo = "Datum je manjši kot današnji";
                return false;
            }
        }

        
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
            
            var datumOk = preveriDatum(vm.podatki.datum);
            
            if(datumOk){
                var data = {
                predmet: vm.podatki.predmet,
                studijsko_leto: vm.podatki.studijskoLeto,
                datum_izvajanja: vm.podatki.datum,
                opombe: vm.podatki.opombe
                };
    
            
                izpitniRokPodatki.ustvariIzpitniRok(data).then(
                    function success(odgovor){
                        console.log(odgovor);
                        $location.path("/dodajIzvajalceIzpitniRok/" + odgovor.data._id);
                    },
                    function error(odgovor){
                        vm.obvestilo = odgovor.data.message;
                        console.log(odgovor);
                    }
                ); 
            }
                
            

        };
        
        vm.preklici = function(){
            $location.path("/vsiIzpitniRoki");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajIzpitniRokCtrl', dodajIzpitniRokCtrl);
})();