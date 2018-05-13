(function() {
    
    /* global angular */
    
    
    vpisniListPredmetiCtrl.$inject = ['studentPodatki', '$routeParams', 'authentication', 'ostaloPodatki', '$location'];
    
    function vpisniListPredmetiCtrl(studentPodatki, $routeParams, authentication, ostaloPodatki, $location){
        var vm = this;
        
        vm.idVpisnice = $routeParams.idVpisnice;
        
        console.log(vm.idVpisnice);
        studentPodatki.pridobiPodatkeVpisnice(vm.idVpisnice).then(
            function success(odgovor){
                console.log(odgovor.data);
                vm.podatkiVpisnice = odgovor.data;
                predizpolni();
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        
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
        
        function predizpolni() {
            if(vm.podatkiVpisnice.vpisniList.letnik.naziv == "1. letnik"){
                
            } else if(vm.podatkiVpisnice.vpisniList.letnik.naziv == "2. letnik"){
                vm.izbirniPredmeti = true;
                
            } else if(vm.podatkiVpisnice.vpisniList.letnik.naziv == "3. letnik"){
                vm.izbirniPredmeti = true;
                vm.moduli = true;
                
            }
        }

        
    }
    
    
    angular
        .module('tpo')
        .controller('vpisniListPredmetiCtrl', vpisniListPredmetiCtrl);
    
})();