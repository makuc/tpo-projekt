(function() {
    /* global angular */
    
    urediDelePredmetaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function urediDelePredmetaCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PUrediDelePredmetov = true;
        vm.naslov = "Uredi del predmeta";
        
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