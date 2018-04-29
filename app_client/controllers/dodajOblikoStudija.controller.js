(function() {
    /* global angular */
    
    dodajOblikoStudijaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajOblikoStudijaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        
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