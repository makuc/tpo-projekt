(function() {
    /* global angular */
    
    urediStudijskiProgramCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function urediStudijskiProgramCtrl($location, ostaloPodatki, $routeParams, authentication){
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
        
        vm.id = $routeParams.idStudijskegaPrograma;
        
        ostaloPodatki.pridobiVseVeljavneVrsteStudije().then(
            function success(odgovor){
                vm.vrstaStudija = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        vm.pridobi = function(){
            ostaloPodatki.najdiStudijskiProgram(vm.id).then(
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
                naziv: vm.podatki.naziv,
                sifra: vm.podatki.sifra,
                vrstaStudija: vm.podatki.vrstaStudija,
                semestri: vm.podatki.semestri,
                sifraEVS: vm.podatki.sifraEVS
            };
            ostaloPodatki.urediStudijskiProgram(vm.id, data).then(
                function success(odgovor){
                    console.log(odgovor);
                    $location.path("/urediStudijskePrograme");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediStudijskiProgramCtrl', urediStudijskiProgramCtrl);
})();