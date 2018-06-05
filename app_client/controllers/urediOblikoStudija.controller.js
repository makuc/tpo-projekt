(function() {
    /* global angular */
    
    urediOblikoStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function urediOblikoStudijaCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.vpisan=authentication.currentUser();
        
        vm.POblike = true;
        vm.naslov = "Uredi obliko študija";
        
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
        
        vm.id = $routeParams.idOblikaStudija;
        
        vm.pridobi = function(){
            ostaloPodatki.najdiOblikoStudija(vm.id).then(
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
            ostaloPodatki.urediOblikoStudija(vm.id, data).then(
                function success(odgovor){
                    $location.path("/urediOblikeStudija");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediOblikoStudijaCtrl', urediOblikoStudijaCtrl);
})();