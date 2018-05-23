(function() {
    /* global angular, html2canvas, pdfMake, Blob, saveAs */
    
    kartotecniListCtrl.$inject = ['studentPodatki', '$scope', '$location', 'authentication', 'ostaloPodatki','$routeParams'];
    
    
    function kartotecniListCtrl(studentPodatki, $scope, $location, authentication, ostaloPodatki,$routeParams){
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
       
        vm.najdiKartotecniList = function(){
            console.log(vm.idStudenta);
            ostaloPodatki.pridobiKartotecniList(vm.idStudenta).then(
                function success(odgovor){
                    vm.kart = odgovor.data;
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
        .controller('kartotecniListCtrl', kartotecniListCtrl);
})();