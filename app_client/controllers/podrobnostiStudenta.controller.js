(function() {
    /* global angular */
    
    podrobnostiStudentaCtrl.$inject = ['$location', 'studentPodatki', '$routeParams'];
    
    
    function podrobnostiStudentaCtrl($location, studentPodatki, $routeParams){
        var vm = this;
        
        vm.idStudenta = $routeParams.idStudenta;
       
        vm.najdiStudenta = function(){
            studentPodatki.izpisStudenta(vm.idStudenta).then(
                function success(odgovor){
                    vm.student = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };

        
        vm.preklici = function(){
            $location.path("/prikaziStudente");
        };
    }
    
    angular
        .module('tpo')
        .controller('podrobnostiStudentaCtrl', podrobnostiStudentaCtrl);
})();