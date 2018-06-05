(function() {
    /* global angular */
    
    urediVrstoVpisaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function urediVrstoVpisaCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PVrsteVpisa = true;
        vm.naslov = "Uredi vrsto vpisa";
        
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
        
        vm.idVrsteVpisa = $routeParams.idVrsteVpisa;

        vm.pridobiVrstoVpisa = function(){
            ostaloPodatki.najdiVrstoVpisa(vm.idVrsteVpisa).then(
                function success(odgovor){
                    vm.vrstaVpisa = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var vrstaVpisa = {
                koda: vm.vrstaVpisa.koda,
                naziv: vm.vrstaVpisa.naziv,
                opis: vm.vrstaVpisa.opis
            };
            ostaloPodatki.urediVrstoVpisa(vm.idVrsteVpisa, vrstaVpisa).then(
                function success(odgovor){
                    $location.path("/urediVrsteVpisa");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediVrstoVpisaCtrl', urediVrstoVpisaCtrl);
})();