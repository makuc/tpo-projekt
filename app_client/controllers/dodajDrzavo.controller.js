(function() {
    /* global angular */
    
    dodajDrzavoCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function dodajDrzavoCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.pridobiDrzavo = function(){
        };
        
        vm.shrani = function(){
            //console.log("ZAPOSLEN:");
            //console.log(vm.zaposlen);
            var drzava = {
                dvomestna_koda: vm.drzava.drzava.dvomestna_koda,
                trimestna_koda: vm.drzava.drzava.trimestna_koda,
                numericna_oznaka: vm.drzava.drzava.numericna_oznaka,
                ISO_naziv: vm.drzava.drzava.ISO_naziv,
                slovenski_naziv: vm.drzava.drzava.slovenski_naziv
                
                
            };
            ostaloPodatki.dodajDrzavo(drzava).then(
                function success(odgovor){
                    $location.path("/urediDrzave");
                },
                function error(odgovor){
                    vm.obvestilo = odgovor.data.message;
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
        .controller('dodajDrzavoCtrl', dodajDrzavoCtrl);
})();