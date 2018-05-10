(function() {
    /* global angular */
    
    urediDrzaveCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediDrzaveCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
       
         
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stDrzav/10-1){
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
        
        vm.prikaziDrzave = function(){
            ostaloPodatki.pridobiVseDrzave().then(
                function success(odgovor){
                    vm.vsiPodatki = odgovor.data;
                    vm.drzave = odgovor.data;
                    vm.stDrzav = vm.drzave.length;
                    vm.stDrzavNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stDrzav/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.drzave.slice(
                            (page - 1) * vm.stDrzavNaStran,
                            page * vm.stDrzavNaStran
                            );
                        return pagedData;
                    }
                    vm.drzave = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(drzavaId){
            ostaloPodatki.izbrisiDrzavo(drzavaId).then(
                function success(odgovor){
                    vm.prikaziDrzave();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(drzavaId){
            ostaloPodatki.obnoviDrzavo(drzavaId).then(
                function success(odgovor){
                    vm.prikaziDrzave();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(drzavaId){
           $location.path("/urediDrzavo/" + drzavaId);
       };
       
       $scope.orderByMe = function(x) {
           if($scope.myOrderBy == x){
               $scope.bool=!($scope.bool);
           }
           
        $scope.myOrderBy = x;
        }
        
    }
    
    angular
        .module('tpo')
        .controller('urediDrzaveCtrl', urediDrzaveCtrl);
    
})();