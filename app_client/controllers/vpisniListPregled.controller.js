(function() {
    
    /* global angular */
    
    
    vpisniListPregledCtrl.$inject = ['studentPodatki', '$routeParams', 'authentication', 'ostaloPodatki', '$location'];
    
    function vpisniListPregledCtrl(studentPodatki, $routeParams, authentication, ostaloPodatki, $location){
        var vm = this;
        
        vm.idVpisnice = $routeParams.idVpisnice;
        
        console.log(vm.idVpisnice);
        
        
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
        
        studentPodatki.pridobiPodatkeVpisnice(vm.idVpisnice).then(
            function success(odgovor) {
                console.log(odgovor.data);
                vm.podatkiVpisnice = odgovor.data.vpisniList;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        
        vm.nazaj = function(){
            $location.path('/vpis/' + vm.idVpisnice + '/izbiraPredmeta');
        };
        
        vm.zakljucekVpisa = function(){
            studentPodatki.zakljucekVpisa(vm.idVpisnice).then(
                function success(odgovor){
                    console.log(odgovor);
                    $location.path('/main');
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
      
    }

    
    
    angular
        .module('tpo')
        .controller('vpisniListPregledCtrl', vpisniListPregledCtrl);
    
})();