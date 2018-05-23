(function() {
    /* global angular */
    
    dodajIzpitniRokCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki', 'izpitniRokPodatki', 'authentication'];
    
    
    function dodajIzpitniRokCtrl($location, ostaloPodatki, $routeParams, predmetPodatki, izpitniRokPodatki, authentication){
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
        
        function preveriDatum(datum){
            if(datum.getDay() > 5){
                vm.obvestilo = "Med vikendi ni mogoče dodanjanje izpitnega roka";
                return false;
            }
            return true;
            
        }
        
        vm.izbrano = function(){
            vm.predmeti = [];
            //console.log(vm.podatki.studijskoLeto._id);
            predmetPodatki.izpisiVseVeljavnePredmete().then(
                function success(odgovor){
                    for(var i = 0; i < odgovor.data.length; i++){
                        //console.log(odgovor.data[i] + " " + vm.podatki.studijskoLeto._id);
                        if(seIzvaja(odgovor.data[i], vm.podatki.studijskoLeto._id)){
                            vm.predmeti.push(odgovor.data[i]);
                        }
                    
                    }
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        
        };
        
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
        
        function seIzvaja(predmet, studijskoLeto){
            for(var i = 0; i < predmet.izvedbe_predmeta.length; i++){
                if(predmet.izvedbe_predmeta[i].studijsko_leto == studijskoLeto){
                    return true;
                }
            }
            return false;
        }
        

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
            
            //console.log(vm.podatki.izvedbe);

            var datumOk = preveriDatum(vm.podatki.datum);
            
            if(datumOk){
                var data = {
                predmet: vm.podatki.predmet,
                studijsko_leto: vm.podatki.studijskoLeto,
                datum_izvajanja: vm.podatki.datum,
                izvedba_predmeta: vm.podatki.izvedbe,
                lokacija: vm.podatki.lokacija,
                opombe: vm.podatki.maxPrijav
                };
    
                console.log(data);
            
                izpitniRokPodatki.ustvariIzpitniRok(data).then(
                    function success(odgovor){
                        console.log(odgovor);
                        $location.path("/vsiIzpitniRoki");
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