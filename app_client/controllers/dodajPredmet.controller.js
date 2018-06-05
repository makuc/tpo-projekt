(function() {
    /* global angular */
    
    dodajPredmetCtrl.$inject = ['$location', 'predmetPodatki', '$routeParams', 'authentication', 'ostaloPodatki'];
    
    
    function dodajPredmetCtrl($location, predmetPodatki, $routeParams, authentication, ostaloPodatki){
        var vm = this;
        
        vm.PPredmeti = true;
        vm.naslov = "Dodaj nov predmet";
        
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
        
        vm.opcijeKT = [1,2,3,4,5,6];
        
        vm.pridobiPredmet = function(){
        };
        
        vm.shrani = function(){
            var predmet = {
                naziv: vm.predmet.naziv,
                sifra: vm.predmet.sifra,
                KT: vm.predmet.KT
            };
            predmetPodatki.dodajPredmet(predmet).then(
                function success(odgovor){
                    $location.path("/urediPredmete");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediPredmete");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajPredmetCtrl', dodajPredmetCtrl);
})();