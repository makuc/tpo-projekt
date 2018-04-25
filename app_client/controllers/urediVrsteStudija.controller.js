(function() {
    /* global angular */
    
    urediVrsteStudijaCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediVrsteStudijaCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVseVrsteStudije().then(
                function success(odgovor){
                    vm.vrstaStudija = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(Id){
            ostaloPodatki.izbrisiVrstoStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(Id){
            ostaloPodatki.obnoviVrstoStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(Id){
            $location.path("/urediVrstoStudija/" + Id);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediVrsteStudijaCtrl', urediVrsteStudijaCtrl);
    
})();