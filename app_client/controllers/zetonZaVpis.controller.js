(function() {
    /* global angular */
    
    zetonZaVpisCtrl.$inject = ['studentPodatki', 'ostaloPodatki', '$scope', '$location'];
    
    
    function zetonZaVpisCtrl(studentPodatki, ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stStudentov/10-1){
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
        
        vm.prikaziStudente = function(){
            studentPodatki.izpisStudentov().then(
                function success(odgovor){
                    vm.vsiPodatki = odgovor.data;
                    vm.studenti = odgovor.data;
                    vm.stStudentov = vm.studenti.length;
                    vm.stStudentovNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stStudentov/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.studenti.slice(
                            (page - 1) * vm.stStudentovNaStran,
                            page * vm.stStudentovNaStran
                            );
                        return pagedData;
                    }
                    vm.studenti = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
               
       $scope.orderByMe = function(x) {
           if($scope.myOrderBy == x){
               $scope.bool=!($scope.bool);
           }
           
        $scope.myOrderBy = x;
        }
        


      vm.zeton = function(studentID){
           $location.path("/podrobnostiStudenta/" + studentID);
       };
        
    }
    
    angular
        .module('tpo')
        .controller('zetonZaVpisCtrl', zetonZaVpisCtrl);
    
})();