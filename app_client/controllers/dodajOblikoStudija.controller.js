(function() {
    /* global angular */
    
    dodajOblikoStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajOblikoStudijaCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;     
        
        vm.vpisan=authentication.currentUser();
        
        vm.POblike = true;
        vm.naslov = "Dodaj obliko študija";
        
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
            ostaloPodatki.dodajOblikoStudija(data).then(
                function success(odgovor){
                    $location.path("/urediOblikeStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediOblikeStudija");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajOblikoStudijaCtrl', dodajOblikoStudijaCtrl);
})();