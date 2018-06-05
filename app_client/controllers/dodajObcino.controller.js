(function() {
    /* global angular */
    
    dodajObcinoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajObcinoCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PUrediObcine = true;
        
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
        
        vm.pridobiObcino = function(){
        };
        
        vm.shrani = function(){
            //console.log("ZAPOSLEN:");
            //console.log(vm.zaposlen);
            var obcina = {
                sifra: vm.obcina.obcina.sifra,
                ime: vm.obcina.obcina.ime
            };
            
            ostaloPodatki.dodajObcino(obcina).then(
                function success(odgovor){
                    $location.path("/urediObcine");
                },
                function error(odgovor){
                    vm.obvestilo = odgovor.data.message;
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediObcine");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajObcinoCtrl', dodajObcinoCtrl);
})();