(function() {
    /* global angular */
    
    urediOblikeStudijaCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediOblikeStudijaCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVseOblikeStudija().then(
                function success(odgovor){
                    vm.oblikeStudija = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(Id){
            ostaloPodatki.izbrisiOblikoStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(Id){
            ostaloPodatki.obnoviOblikoStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(Id){
            $location.path("/urediOblikoStudija/" + Id);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediOblikeStudijaCtrl', urediOblikeStudijaCtrl);
    
})();