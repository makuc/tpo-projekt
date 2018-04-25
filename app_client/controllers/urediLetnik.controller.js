(function() {
    /* global angular */
    
    urediLetnikCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediLetnikCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.idLetnika = $routeParams.idLetnika;
        
        //vm.opcijeKT = ["a", "b", "c"];
        //vm.opcijeKT = [1,2,3,4,5,6];
        vm.studijskiProgrami = ostaloPodatki.pridobiVseVeljavneStudijskePrograme();
        vm.pogoji = ostaloPodatki.pridobiVseVeljavneLetnike();
        
        vm.pridobiLetnik = function(){
            ostaloPodatki.najdiLetnik(vm.idLetnika).then(
                function success(odgovor){
                  
                    vm.letnik = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var letnik = {
                studijskiProgram: vm.letnik.studijskiProgram,
                pogoj_letnik: vm.letnik.pogoj_letnik,
                naziv: vm.letnik.naziv
            };
            ostaloPodatki.urediLetnik(vm.idLetnika, letnik).then(
                function success(odgovor){
                    $location.path("/urediLetnike/");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediLetnike/");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediLetnikCtrl', urediLetnikCtrl);
})();