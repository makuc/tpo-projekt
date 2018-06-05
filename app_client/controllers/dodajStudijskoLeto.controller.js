(function() {
    /* global angular */
    
    dodajStudijskoLetoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
    
    
    function dodajStudijskoLetoCtrl($location, ostaloPodatki, $routeParams, authentication){
        var vm = this;
        
        vm.PStudijskaLeta = true;
        vm.naslov = "Dodaj študijsko leto";
        
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
                studijsko_leto: vm.podatki.studijsko_leto
            };
            ostaloPodatki.dodajStudijskoLeto(data).then(
                function success(odgovor){
                    $location.path("/urediStudijskaLeta");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediStudijskaLeta");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajStudijskoLetoCtrl', dodajStudijskoLetoCtrl);
})();