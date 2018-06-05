(function() {
    /* global angular */
    
    dodajVrstoVpisaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajVrstoVpisaCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PVrsteVpisa = true;
        vm.naslov = "Dodaj vrsto vpisa";
        
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
        
        vm.pridobiVrstoVpisa = function(){
        };
        
        vm.shrani = function(){
            //console.log("ZAPOSLEN:");
            //console.log(vm.zaposlen);
            var vrstaVpisa = {
                koda: vm.vrstaVpisa.koda,
                naziv: vm.vrstaVpisa.naziv,
                opis: vm.vrstaVpisa.opis
            };
            ostaloPodatki.dodajVrstoVpisa(vrstaVpisa).then(
                function success(odgovor){
                    $location.path("/urediVrsteVpisa");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediVrsteVpisa");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajVrstoVpisaCtrl', dodajVrstoVpisaCtrl);
})();