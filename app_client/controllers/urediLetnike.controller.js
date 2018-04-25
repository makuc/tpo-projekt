(function() {
    /* global angular */
    
    urediLetnikeCtrl.$inject = ['ostaloPodatki', '$location'];
    
    function urediLetnikeCtrl(ostaloPodatki, $location){
        var vm = this;
        
        vm.prikaziLetnike = function(){
            ostaloPodatki.pridobiVseLetnike().then(
                function success(odgovor){
                    vm.letniki = odgovor.data;
                    console.log(odgovor.data);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(letnikId){
            ostaloPodatki.izbrisiLetnik(letnikId).then(
                function success(odgovor){
                    vm.prikaziLetnike();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(letnikId){
            ostaloPodatki.obnoviLetnik(letnikId).then(
                function success(odgovor){
                    vm.prikaziLetnike();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(letnikId){
            $location.path("/urediLetnike/" + letnikId);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediLetnikeCtrl', urediLetnikeCtrl);
    
})();