(function() {
    /* global angular */
    
    prijavljeniKandidatiCtrl.$inject = ['ostaloPodatki', '$scope', '$location', '$route'];
    
    
    function prijavljeniKandidatiCtrl(ostaloPodatki, $scope, $location, $route){
        var vm = this;
        
        vm.izvedbaId = $route.current.pathParams.rokId;
        //console.log(vm.izvedbaId);
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stKandidatov/10-1){
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
        
        vm.prikaziKandidate = function(){
            ostaloPodatki.pridobiIzpitniRok(vm.izvedbaId).then(
                function success(odgovor){
                    //console.log(odgovor.data);
                    vm.izpitniRok = odgovor.data;
                    vm.kandidati = vm.izpitniRok.polagalci;
                    //console.log("kandidati: ", vm.kandidati);
                    vm.stKandidatov = vm.kandidati.length;
                    vm.stKandidatovNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stKandidatov/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.kandidati.slice(
                            (page - 1) * vm.stKandidatovNaStran,
                            page * vm.stKandidatovNaStran
                            );
                        return pagedData;
                    }
                    vm.kandidati = array;
                    //console.log(vm.kandidati);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(studentId){
            //console.log(zaposlenId);
            // /vsiIzpitniRoki/5af174a9267cef0a952d32fa/kandidati
            $location.path("/vsiIzpitniRoki/" + vm.izvedbaId + '/kandidati/' + studentId);
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
        .controller('prijavljeniKandidatiCtrl', prijavljeniKandidatiCtrl);
    
})();