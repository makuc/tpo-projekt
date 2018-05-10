(function() {
    /* global angular */
    
    dodajNacinStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajNacinStudijaCtrl($location, ostaloPodatki, $routeParams, authentication){
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
        
        vm.pridobi = function(){
        };
        
        vm.shrani = function(){
            var data = {
                naziv: vm.podatki.naziv,
                sifra: vm.podatki.sifra,
            };
            ostaloPodatki.dodajNacinStudija(data).then(
                function success(odgovor){
                    $location.path("/urediNacineStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
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
        .controller('dodajNacinStudijaCtrl', dodajNacinStudijaCtrl);
})();