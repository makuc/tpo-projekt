(function(){
    
    /* global angular */
    
    urejanjeIzpitniRokProfesorCtrl.$inject = ['$routeParams', '$location', 'izpitniRokPodatki', 'authentication', 'ostaloPodatki'];
    
    function urejanjeIzpitniRokProfesorCtrl($routeParams, $location, izpitniRokPodatki, authentication, ostaloPodatki) {
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
        
        vm.idRoka = $routeParams.rokId;
        
        izpitniRokPodatki.pridobiIzpitniRok(vm.idRoka).then(
            function success(odgovor){
                console.log(odgovor.data);
                vm.podatki = odgovor.data;
                
                var ura = 2 + + vm.podatki.datum_izvajanja.substring(11,13);
                vm.ura = ura.toString();
                if(vm.ura.length == 1){
                    vm.ura = 0 + vm.ura;
                }
                vm.minuta = vm.podatki.datum_izvajanja.substring(14,16);
                
                vm.leto = vm.podatki.datum_izvajanja.substring(0,4);
                vm.mesec = vm.podatki.datum_izvajanja.substring(5,7);
                vm.dan = vm.podatki.datum_izvajanja.substring(8,10);
                
                izpitniRokPodatki.pridobiIzvedbePredmeta(vm.podatki.predmet._id, vm.podatki.studijsko_leto._id).then(
                    function success(odgovor){
                        console.log(odgovor.data);
                        vm.izvedbe = odgovor.data;
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            },
            function error(odgovor){
                console.log(odgovor);
                vm.obvestilo = odgovor.data.message;
            }
        );
        
        function urediDatum(){
            var ura = vm.ura - 2;
            console.log(ura);
            if(ura.toString().length == 1){
                ura = "0" + ura;
            }
            var date = vm.leto + "-" + vm.mesec + "-" + vm.dan + "T" + ura + ":" + vm.minuta + ":00.000Z";
            vm.objectDatum = new Date(date);
            
            return preveriDatum(vm.objectDatum);
        }
        
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
 
        
        vm.shrani = function(){
            if(urediDatum()){
                var data = {
                    datum_izvajanja: vm.objectDatum,
                    lokacija: vm.podatki.lokacija,
                    opombe: vm.podatki.opombe
                };
                
                izpitniRokPodatki.urediIzpitniRok(vm.idRoka, data).then(
                    function success(odgovor){
                        console.log(odgovor);
                        $location.path('/izpitniRok/profesor');
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            }
            
            
        };
        
        vm.preklici = function(){
            $location.path('/izpitniRok/profesor');
        };
        
        
    }
    
    angular
        .module('tpo')
        .controller("urejanjeIzpitniRokProfesorCtrl", urejanjeIzpitniRokProfesorCtrl);
    
})();