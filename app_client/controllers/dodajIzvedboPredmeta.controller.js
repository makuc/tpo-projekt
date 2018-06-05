(function() {
    /* global angular */
    
    dodajIzvedboPredmetaCtrl.$inject = ['$location', 'predmetPodatki', '$routeParams', 'ostaloPodatki', 'authentication'];
    
    
    function dodajIzvedboPredmetaCtrl($location, predmetPodatki, $routeParams, ostaloPodatki, authentication){
        var vm = this;
        
        vm.vpisan=authentication.currentUser();
        
        vm.naslov = "Dodaj izvedbo predmeta";
        vm.PPredmeti = true;
        
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
        
        vm.predmetId = $routeParams.predmetId;
        
        vm.pridobiStudijskaLeta = function(){
            ostaloPodatki.pridobiVseStudijskaLeta().then(
              function success(odgovor){
                    vm.studijskaLeta = odgovor.data;
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            //console.log(vm.studijskoLetoId);
            var data = {
              studijsko_leto: vm.studijskoLetoId  
            };
            predmetPodatki.dodajIzvedboPredmetu(vm.predmetId, data).then(
            function success(odgovor){
                $location.path("/urediIzvedbePredmeta/" + vm.predmetId);
            },
            function error(odgovor){
                vm.obvestilo = "Napaka";
                console.log(odgovor);
            });
        };
        
        vm.preklici = function(){
            $location.path("/urediIzvedbePredmeta/" + vm.predmetId);
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajIzvedboPredmetaCtrl', dodajIzvedboPredmetaCtrl);
})();