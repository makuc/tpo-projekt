(function() {
    
    /* global angular */
    
    
    vpisniListPregledCtrl.$inject = ['studentPodatki', '$routeParams', 'authentication', 'ostaloPodatki', '$location', '$window'];
    
    function vpisniListPregledCtrl(studentPodatki, $routeParams, authentication, ostaloPodatki, $location, $window){
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
                
                vm.vsiPredmeti = [];
                vm.vsotaKT = 0;
                
                for(var i = 0; i < vm.podatkiVpisnice.obvezniPredmeti.length; i++){
                    vm.vsiPredmeti.push(vm.podatkiVpisnice.obvezniPredmeti[i]);
                    vm.vsotaKT += vm.podatkiVpisnice.obvezniPredmeti[i].KT;
                }
                
                if(vm.podatkiVpisnice.strokovniIzbirniPredmeti){
                    for(var j = 0; j < vm.podatkiVpisnice.strokovniIzbirniPredmeti.length; j++){
                        vm.vsiPredmeti.push(vm.podatkiVpisnice.strokovniIzbirniPredmeti[j]);
                        vm.vsotaKT += vm.podatkiVpisnice.strokovniIzbirniPredmeti[j].KT;
                    }
                }
                
                if(vm.podatkiVpisnice.splosniIzbirniPredmeti){
                    for(var k = 0; k < vm.podatkiVpisnice.splosniIzbirniPredmeti.length; k++){
                        vm.vsiPredmeti.push(vm.podatkiVpisnice.splosniIzbirniPredmeti[k]);
                        vm.vsotaKT += vm.podatkiVpisnice.splosniIzbirniPredmeti[k].KT;
                    }
                }
                
                if(vm.podatkiVpisnice.moduli){
                    for(var l = 0; l < vm.podatkiVpisnice.moduli.length; l++){
                        vm.vsiPredmeti.push(vm.podatkiVpisnice.moduli[l]);
                        vm.vsotaKT += vm.podatkiVpisnice.moduli[l].KT;
                    }
                }
                
                if(vm.podatkiVpisnice.modulniPredmeti){
                    for(var m = 0; m < vm.podatkiVpisnice.modulniPredmeti.length; m++){
                        vm.vsiPredmeti.push(vm.podatkiVpisnice.modulniPredmeti[m]);
                        vm.vsotaKT += vm.podatkiVpisnice.modulniPredmeti[m].KT;
                    }
                }
                
                studentPodatki.izpisStudenta(vm.podatkiVpisnice.student._id).then(
                    function success(odgovor){
                        console.log(odgovor.data);
                        vm.podatkiStudenta = odgovor.data;
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            
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
                    $window.open("/api/v1/vpisni-list/" + vm.idVpisnice, '_blank');
                    $location.path('/main');
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.sporocilo = odgovor.data.message;
                }
            );
        };
      
    }

    
    
    angular
        .module('tpo')
        .controller('vpisniListPregledCtrl', vpisniListPregledCtrl);
    
})();