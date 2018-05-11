(function() {
    /* global angular */
    
    urediPosteCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication'];
    
    
    function urediPosteCtrl(ostaloPodatki, $scope, $location, authentication){
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
            if(vm.trenutnaStran < vm.stPost/10-1){
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
        
        vm.prikaziPoste = function(){
            ostaloPodatki.pridobiVsePoste().then(
                function success(odgovor){
                    vm.vsiPodatki = odgovor.data;
                    vm.poste = odgovor.data;
                    vm.stPost = vm.poste.length;
                    vm.stPostNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stPost/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.poste.slice(
                            (page - 1) * vm.stPostNaStran,
                            page * vm.stPostNaStran
                            );
                        return pagedData;
                    }
                    vm.poste = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(postaId){
            ostaloPodatki.izbrisiPosto(postaId).then(
                function success(odgovor){
                    vm.prikaziPoste();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(postaId){
            ostaloPodatki.obnoviPosto(postaId).then(
                function success(odgovor){
                    vm.prikaziPoste();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(postaId){
          $location.path("/urediPosto/" + postaId);
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
        .controller('urediPosteCtrl', urediPosteCtrl);
    
})();