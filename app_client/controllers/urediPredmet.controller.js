(function() {
    /* global angular */
    
    urediPredmetCtrl.$inject = ['$location', 'predmetPodatki', '$routeParams', 'authentication', 'ostaloPodatki'];
    
    
    function urediPredmetCtrl($location, predmetPodatki, $routeParams, authentication, ostaloPodatki){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
         
         vm.PPredmeti = true;
         vm.naslov = "Uredi predmet";
        
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
        
        vm.idPredmeta = $routeParams.idPredmeta;
        
        vm.opcijeKT = [1,2,3,4,5,6];
        
        vm.pridobiPredmet = function(){
            predmetPodatki.pridobiPredmet(vm.idPredmeta).then(
                function success(odgovor){
                    vm.predmet = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var predmet = {
                naziv: vm.predmet.naziv,
                sifra: vm.predmet.sifra,
                KT: vm.predmet.KT
            };
            predmetPodatki.urediPredmet(vm.idPredmeta, predmet).then(
                function success(odgovor){
                    $location.path("/urediPredmete");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediPredmetCtrl', urediPredmetCtrl);
})();