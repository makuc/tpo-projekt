(function() {
    /* global angular */
    
    urediStudijskaLetaCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediStudijskaLetaCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVseStudijskaLeta().then(
                function success(odgovor){
                    vm.studijskaLeta = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(Id){
            ostaloPodatki.izbrisiStudijskoLeto(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(Id){
            ostaloPodatki.obnoviStudijskoLeto(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(Id){
            $location.path("/urediStudijskoLeto/" + Id);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediStudijskaLetaCtrl', urediStudijskaLetaCtrl);
    
})();