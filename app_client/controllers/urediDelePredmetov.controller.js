(function() {
    /* global angular */
    
    urediDelePredmetovCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication'];
    
    
    function urediDelePredmetovCtrl(ostaloPodatki, $scope, $location, authentication){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
        
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.ime = odgovor.data.zaposlen.ime;
                    vm.priimek = odgovor.data.zaposlen.priimek;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        }
        
        vm.logoutFunc = function() {
            delTok();
            return $location.path('/login');
        };
        
        function delTok(){
            return authentication.logout();
        }
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stDelovPredmetnika/10-1){
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
        
        vm.prikaziDelePredmetnika = function(){
            ostaloPodatki.pridobiVseDelePredmetnika().then(
                function success(odgovor){
                    //console.log(odgovor.data);
                    vm.vsiPodatki = odgovor.data;
                    vm.deliPredmetnika = odgovor.data;
                    vm.stDelovPredmetnika = vm.deliPredmetnika.length;
                    vm.stDelovPredmetnikaNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stDelovPredmetnika/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.deliPredmetnika.slice(
                            (page - 1) * vm.stDelovPredmetnikaNaStran,
                            page * vm.stDelovPredmetnikaNaStran
                            );
                        return pagedData;
                    }
                    vm.deliPredmetnika = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(delPredmetnikaId){
            ostaloPodatki.izbrisiDelPredmetnika(delPredmetnikaId).then(
                function success(odgovor){
                    vm.prikaziDelePredmetnika();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(delPredmetnikaId){
            ostaloPodatki.obnoviDelPredmetnika(delPredmetnikaId).then(
                function success(odgovor){
                    vm.prikaziDelePredmetnika();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(prikaziDelePredmetnika){
            $location.path("/urediDelePredmeta/" + prikaziDelePredmetnika);
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
        .controller('urediDelePredmetovCtrl', urediDelePredmetovCtrl);
    
})();