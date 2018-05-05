(function() {
    /* global angular */
    
    urediDrzavoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediDrzavoCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.idDrzave = $routeParams.idDrzave;
        
        vm.najdiDrzavo = function(){
            ostaloPodatki.najdiDrzavo(vm.idDrzave).then(
                function success(odgovor){
                    vm.drzava = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var drzava = {
                dvomestna_koda: vm.drzava.dvomestna_koda,
                trimestna_koda: vm.drzava.trimestna_koda,
                numericna_oznaka: vm.drzava.numericna_oznaka,
                ISO_naziv: vm.drzava.ISO_naziv,
                slovenski_naziv: vm.drzava.slovenski_naziv
            };
            ostaloPodatki.urediDrzavo(vm.idDrzave, drzava).then(
                function success(odgovor){
                    $location.path("/urediDrzave");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediDrzave");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediDrzavoCtrl', urediDrzavoCtrl);
})();