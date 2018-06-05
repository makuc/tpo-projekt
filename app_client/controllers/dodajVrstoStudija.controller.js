(function() {
    /* global angular */
    
    dodajVrstoStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajVrstoStudijaCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PVrsteStudija = true;
        vm.naslov = "Dodaj vrsto študija";
        
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
        
        
        vm.pridobi = function(){
        };
        
        vm.shrani = function(){
            var data = {
                opis: vm.podatki.opis,
                sifra: vm.podatki.sifra,
                klasiusSRV: vm.podatki.klasiusSRV,
                predpona: vm.podatki.predpona
            };
            ostaloPodatki.dodajVrstoStudija(data).then(
                function success(odgovor){
                    $location.path("/urediVrsteStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
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
        .controller('dodajVrstoStudijaCtrl', dodajVrstoStudijaCtrl);
})();