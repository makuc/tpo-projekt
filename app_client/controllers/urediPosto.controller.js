(function() {
    /* global angular */
    
    urediPostoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediPostoCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.idPoste = $routeParams.idPoste;
       
        vm.najdiPosto = function(){
            ostaloPodatki.najdiPosto(vm.idPoste).then(
                function success(odgovor){
                     
                    vm.posta = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var posta = {
                postna_stevila: vm.posta.postna_stevilka,
                naziv: vm.posta.naziv
            };
            ostaloPodatki.urediPosto(vm.idPoste, posta).then(
                function success(odgovor){
                    $location.path("/urediPoste");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediPoste");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediPostoCtrl', urediPostoCtrl);
})();