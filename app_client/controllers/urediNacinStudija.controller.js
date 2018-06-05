(function() {
    /* global angular */
    
    urediNacinStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function urediNacinStudijaCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PNacini = true;
        vm.naslov = "Uredi način študija";
        
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
        
        vm.idNacinStudija = $routeParams.idNacinStudija;
        
        vm.pridobi = function(){
            ostaloPodatki.najdiNacinStudija(vm.idNacinStudija).then(
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
                sifra: vm.podatki.sifra
            };
            ostaloPodatki.urediNacinStudija(vm.idNacinStudija, data).then(
                function success(odgovor){
                    $location.path("/urediNacineStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediNacineStudija");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediNacinStudijaCtrl', urediNacinStudijaCtrl);
})();