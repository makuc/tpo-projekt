(function() {
    /* global angular */
    
    urediPostoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function urediPostoCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PPoste = true;
        
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
        
        vm.idPoste = $routeParams.idPoste;
       
        vm.najdiPosto = function(){
            ostaloPodatki.najdiPosto(vm.idPoste).then(
                function success(odgovor){
                     
                    vm.posta = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var posta = {
                postna_stevilka: vm.posta.postna_stevilka,
                naziv: vm.posta.naziv
            };
            ostaloPodatki.urediPosto(vm.idPoste, posta).then(
                function success(odgovor){
                    $location.path("/urediPoste");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediPostoCtrl', urediPostoCtrl);
})();