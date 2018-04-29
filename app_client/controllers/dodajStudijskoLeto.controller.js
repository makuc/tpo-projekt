(function() {
    /* global angular */
    
    dodajStudijskoLetoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajStudijskoLetoCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        
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