(function() {
    /* global angular */
    
    dodajZaposlenegaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajZaposlenegaCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PUrediZaposlene = true;
        vm.naslov = "Dodaj zaposlenega";
        
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
        
        vm.pridobiZaposlenega = function(){
        };
        
        vm.shrani = function(){
            //console.log("ZAPOSLEN:");
            //console.log(vm.zaposlen);
            var zaposlen = {
                ime: vm.zaposlen.zaposlen.ime,
                priimek: vm.zaposlen.zaposlen.priimek,
                naziv: vm.zaposlen.zaposlen.naziv,
                email: vm.zaposlen.zaposlen.email
            };
            ostaloPodatki.dodajZaposlenega(zaposlen).then(
                function success(odgovor){
                    $location.path("/urediZaposlene");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediZaposlene");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajZaposlenegaCtrl', dodajZaposlenegaCtrl);
})();