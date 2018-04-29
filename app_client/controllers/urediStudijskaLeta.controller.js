(function() {
    /* global angular */
    
    urediStudijskaLetaCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediStudijskaLetaCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVseStudijskaLeta().then(
                function success(odgovor){
                    vm.studijskaLeta = odgovor.data;
                    vm.vsaStudijskaLeta = odgovor.data;
                    vm.stVseh = vm.studijskaLeta.length;
                    vm.stNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stVseh/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.studijskaLeta.slice(
                            (page - 1) * vm.stNaStran,
                            page * vm.stNaStran
                            );
                        return pagedData;
                    }
                    vm.studijskaLeta = array;
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