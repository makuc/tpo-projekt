(function() {
    /* global angular */
    
    urediNacineStudijaCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediNacineStudijaCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVseNacineStudija().then(
                function success(odgovor){
                    vm.nacinStudija = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(Id){
            ostaloPodatki.izbrisiNacinStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(Id){
            ostaloPodatki.obnoviNacinStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(Id){
            $location.path("/urediNacinStudija/" + Id);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediNacineStudijaCtrl', urediNacineStudijaCtrl);
    
})();