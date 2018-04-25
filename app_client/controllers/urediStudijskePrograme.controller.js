(function() {
    /* global angular */
    
    urediStudijskeProgrameCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediStudijskeProgrameCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVseStudijskePrograme().then(
                function success(odgovor){
                    vm.studijskiProgram = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(Id){
            ostaloPodatki.izbrisiStudijskiProgram(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(Id){
            ostaloPodatki.obnoviStudijskiProgram(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(Id){
            $location.path("/urediStudijskiProgram/" + Id);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediStudijskeProgrameCtrl', urediStudijskeProgrameCtrl);
    
})();