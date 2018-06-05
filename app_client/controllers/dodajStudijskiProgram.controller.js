(function() {
    /* global angular */
    
    dodajStudijskiProgramCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajStudijskiProgramCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PStudijskiProgrami = true;
        vm.naslov = "Dodaj študijski program";
        
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
        
        ostaloPodatki.pridobiVseVeljavneVrsteStudije().then(
            function success(odgovor){
                vm.vrstaStudija = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        vm.pridobi = function(){
        };
        
        vm.shrani = function(){
            var data = {
                naziv: vm.podatki.naziv,
                sifra: vm.podatki.sifra,
                vrstaStudija: vm.podatki.vrstaStudija,
                semestri: vm.podatki.semestri,
                sifraEVS: vm.podatki.sifraEVS
            };
            ostaloPodatki.dodajStudijskiProgram(data).then(
                function success(odgovor){
                    $location.path("/urediStudijskePrograme");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediStudijskePrograme");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajStudijskiProgramCtrl', dodajStudijskiProgramCtrl);
})();