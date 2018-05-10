(function() {
    /* global angular */
    
    dodajPostoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajPostoCtrl($location, ostaloPodatki, $routeParams, authentication){
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
        
        vm.pridobiPosto = function(){
        };
        
        vm.shrani = function(){
            //console.log("ZAPOSLEN:");
            //console.log(vm.zaposlen);
            var posta = {
                naziv: vm.posta.posta.naziv,
                postna_stevilka: vm.posta.posta.postna_stevilka
                
            };
            ostaloPodatki.dodajPosto(posta).then(
                function success(odgovor){
                    $location.path("/urediPoste");
                },
                function error(odgovor){
                    vm.obvestilo = odgovor.data.message;
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediPoste");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajPostoCtrl', dodajPostoCtrl);
})();