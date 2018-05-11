(function() {
    /* global angular */
    
    dodajDelePredmetaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajDelePredmetaCtrl($location, ostaloPodatki, $routeParams, authentication){
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
        
        vm.opcijeBool = ["true", "false"];
        
        vm.pridobiDelePredmetnika = function(){
        };
        
        vm.shrani = function(){
            var delPredmetnika = {
                sifra: vm.delPredmetnika.sifra,
                naziv: vm.delPredmetnika.naziv,
                obvezen: vm.delPredmetnika.obvezen,
                strokovni: vm.delPredmetnika.strokovni,
                modul: vm.delPredmetnika.modul
            };
            ostaloPodatki.dodajDelPredmetnika(delPredmetnika).then(
                function success(odgovor){
                    $location.path("/urediDelePredmetov");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediDelePredmetov");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajDelePredmetaCtrl', dodajDelePredmetaCtrl);
})();