(function() {
    /* global angular */
    
    urediStudijskeProgrameCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediStudijskeProgrameCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVseStudijskePrograme().then(
                function success(odgovor){
                    vm.studijskiProgram = odgovor.data;
                    vm.vsiStudijskiProgrami = odgovor.data;
                    vm.stVseh = vm.studijskiProgram.length;
                    vm.stNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stVseh/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.studijskiProgram.slice(
                            (page - 1) * vm.stNaStran,
                            page * vm.stNaStran
                            );
                        return pagedData;
                    }
                    vm.studijskiProgram = array;
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