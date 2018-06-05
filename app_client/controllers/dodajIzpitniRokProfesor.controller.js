(function() {
    /* global angular */
    
    dodajIzpitniRokProfesorCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki', 'izpitniRokPodatki', 'authentication'];
    
    
    function dodajIzpitniRokProfesorCtrl($location, ostaloPodatki, $routeParams, predmetPodatki, izpitniRokPodatki, authentication){
        var vm = this;
        
        vm.vpisan=authentication.currentUser();
        
        vm.PIzpitniRoki = true;
        
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
        
        
        vm.profesor = true;
        
        function preveriDatum(datum){
            console.log(datum);
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
        
        vm.izbranPredmet = function(){
            //console.log(vm.podatki.predmet);
            console.log(vm.podatki.studijskoLeto);
            izpitniRokPodatki.pridobiIzvedbePredmeta(vm.podatki.predmet._id, vm.podatki.studijskoLeto._id).then(
                function success(odgovor){
                    console.log(odgovor.data);
                    vm.izvedbe = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            ); 
        };

        
        izpitniRokPodatki.najdiPredmeteZaposlenega().then(
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


        function urediDatum(){
            if(vm.ura){
                 var ura = vm.ura - 2;
                console.log(ura);
                
                if(ura.toString().length == 1){
                    ura = "0" + ura;
                }
                var date = vm.leto + "-" + vm.mesec + "-" + vm.dan + "T" + ura + ":" + vm.minuta + ":00.000Z";
            } else {
                var date = vm.leto + "-" + vm.mesec + "-" + vm.dan + "T" + "22:00:00.000Z";
            }
           
            vm.objectDatum = new Date(date);
            
            return preveriDatum(vm.objectDatum);
        }
        
        vm.shrani = function(){
            //preveri veljavnost datuma
            
            var datumOk = urediDatum(vm.podatki.datum);
            
            if(datumOk){
                var data = {
                predmet: vm.podatki.predmet,
                studijsko_leto: vm.podatki.studijskoLeto,
                datum_izvajanja: vm.objectDatum,
                izvedba_predmeta: vm.podatki.izvedbe,
                lokacija: vm.podatki.lokacija,
                opombe: vm.podatki.maxPrijav
                };
    
            
                izpitniRokPodatki.ustvariIzpitniRok(data).then(
                    function success(odgovor){
                        console.log(odgovor);
                        $location.path("/izpitniRok/profesor");
                    },
                    function error(odgovor){
                        vm.obvestilo = odgovor.data.message;
                        console.log(odgovor);
                    }
                ); 
            }
                
            

        };
        
        vm.preklici = function(){
            $location.path("/izpitniRok/profesor");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajIzpitniRokProfesorCtrl', dodajIzpitniRokProfesorCtrl);
})();