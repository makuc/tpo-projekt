(function() {
    /* global angular */
    
    urediVrstoStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function urediVrstoStudijaCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PVrsteStudija = true;
        vm.naslov = "Uredi vrsto študija";
        
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
        
        vm.id = $routeParams.idVrsteStudija;
        
        vm.pridobi = function(){
            ostaloPodatki.najdiVrstoStudija(vm.id).then(
                function success(odgovor){
                    vm.podatki = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var data = {
                sifra: vm.podatki.sifra,
                opis: vm.podatki.opis,
                klasiusSRV: vm.podatki.klasiusSRV,
                predpona: vm.podatki.predpona
            };
            ostaloPodatki.urediVrstoStudija(vm.id, data).then(
                function success(odgovor){
                    $location.path("/urediVrsteStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediVrsteStudija");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediVrstoStudijaCtrl', urediVrstoStudijaCtrl);
})();