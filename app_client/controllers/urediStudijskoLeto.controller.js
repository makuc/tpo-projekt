(function() {
    /* global angular */
    
    urediStudijskoLetoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediStudijskoLetoCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.id = $routeParams.idStudijskegaLeta;
        
        vm.pridobi = function(){
            ostaloPodatki.najdiStudijskoLeto(vm.id).then(
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
                studijsko_leto: vm.podatki.studijsko_leto
            };
            ostaloPodatki.urediStudijskoLeto(vm.id, data).then(
                function success(odgovor){
                    $location.path("/urediStudijskaLeta");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediStudijskoLetoCtrl', urediStudijskoLetoCtrl);
})();