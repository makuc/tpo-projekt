(function() {
    /* global angular */
    
    urediVrsteVpisaCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediVrsteVpisaCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stVrstVpisav/10-1){
                vm.trenutnaStran++;
            }
        };
        
        vm.prevPage = function(){
            if(vm.trenutnaStran > 0){
                vm.trenutnaStran--;
            }
        };
        
        vm.setPage = function(x){
            vm.trenutnaStran = x-1;
        };
        
        vm.prikaziVrsteVpisa = function(){
            ostaloPodatki.pridobiVseVrsteVpisa().then(
                function success(odgovor){
                    //console.log(odgovor.data);
                    vm.vsiPodatki = odgovor.data;
                    vm.vrsteVpisa = odgovor.data;
                    vm.stVrstVpisa = vm.vrsteVpisa.length;
                    vm.stVrstVpisaNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stVrstVpisa/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.vrsteVpisa.slice(
                            (page - 1) * vm.stVrstVpisaNaStran,
                            page * vm.stVrstVpisaNaStran
                            );
                        return pagedData;
                    }
                    vm.vrsteVpisa = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(vrstaVpisaId){
            ostaloPodatki.izbrisiVrstoVpisa(vrstaVpisaId).then(
                function success(odgovor){
                    vm.prikaziVrsteVpisa();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(vrstaVpisaId){
            ostaloPodatki.obnoviVrstoVpisa(vrstaVpisaId).then(
                function success(odgovor){
                    vm.prikaziVrsteVpisa();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(vrstaVpisaId){
            $location.path("/urediVrstoVpisa/" + vrstaVpisaId);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediVrsteVpisaCtrl', urediVrsteVpisaCtrl);
    
})();