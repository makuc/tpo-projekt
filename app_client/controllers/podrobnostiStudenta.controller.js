(function() {
    /* global angular */
    
    podrobnostiStudentaCtrl.$inject = ['$location', 'studentPodatki', '$routeParams', 'authentication', 'ostaloPodatki'];
    
    
    function podrobnostiStudentaCtrl($location, studentPodatki, $routeParams, authentication, ostaloPodatki){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
        
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.ime = odgovor.data.zaposlen.ime;
                    vm.priimek = odgovor.data.zaposlen.priimek;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        }
        
        vm.logoutFunc = function() {
            delTok();
            return $location.path('/login');
        };
        
        function delTok(){
            return authentication.logout();
        }
        
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