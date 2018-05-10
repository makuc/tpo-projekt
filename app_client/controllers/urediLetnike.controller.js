(function() {
    /* global angular */
    
    urediLetnikeCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    function urediLetnikeCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stVseh/10-1){
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
        
        vm.prikaziLetnike = function(){
            ostaloPodatki.pridobiVseLetnike().then(
                function success(odgovor){
                    vm.letniki = odgovor.data;
                    vm.vsiLetniki = odgovor.data;
                    vm.stVseh = vm.letniki.length;
                    vm.stNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stVseh/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.letniki.slice(
                            (page - 1) * vm.stNaStran,
                            page * vm.stNaStran
                            );
                        return pagedData;
                    }
                    vm.letniki = array;
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
               
       $scope.orderByMe = function(x) {
           if($scope.myOrderBy == x){
               $scope.bool=!($scope.bool);
           }
           
        $scope.myOrderBy = x;
        }
        
    }
    
    angular
        .module('tpo')
        .controller('urediLetnikeCtrl', urediLetnikeCtrl);
    
})();