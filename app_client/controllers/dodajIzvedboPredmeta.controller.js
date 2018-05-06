(function() {
    /* global angular */
    
    dodajIzvedboPredmetaCtrl.$inject = ['$location', 'predmetPodatki', '$routeParams', 'ostaloPodatki'];
    
    
    function dodajIzvedboPredmetaCtrl($location, predmetPodatki, $routeParams, ostaloPodatki){
        var vm = this;
        
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