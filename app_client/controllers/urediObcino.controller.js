(function() {
    /* global angular */
    
    urediObcinoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediObcinoCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.idObcine = $routeParams.idObcine;
       
        vm.najdiObcino = function(){
            ostaloPodatki.najdiObcino(vm.idObcine).then(
                function success(odgovor){
                     console.log(odgovor.data);
                    vm.obcina = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var obcina = {
                sifra: vm.obcina.sifra,
                ime: vm.obcina.ime
            };
            ostaloPodatki.urediObcino(vm.idObcine, obcina).then(
                function success(odgovor){
                    $location.path("/urediObcine");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
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
        .controller('urediObcinoCtrl', urediObcinoCtrl);
})();