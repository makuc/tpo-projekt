(function() {
    /* global angular */
    
    urediObcineCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication'];
    
    
    function urediObcineCtrl(ostaloPodatki, $scope, $location, authentication){
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
            if(vm.trenutnaStran < vm.stObcin/10-1){
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
        
        vm.prikaziObcine = function(){
            ostaloPodatki.pridobiVseObcine().then(
                function success(odgovor){
                    vm.vsiPodatki = odgovor.data;
                    vm.obcine = odgovor.data;
                    vm.stObcin = vm.obcine.length;
                    vm.stObcinNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stObcin/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.obcine.slice(
                            (page - 1) * vm.stObcinNaStran,
                            page * vm.stObcinNaStran
                            );
                        return pagedData;
                    }
                    vm.obcine = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(obcinaId){
            ostaloPodatki.izbrisiObcino(obcinaId).then(
                function success(odgovor){
                    vm.prikaziObcine();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(obcinaId){
            ostaloPodatki.obnoviObcino(obcinaId).then(
                function success(odgovor){
                    vm.prikaziObcine();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
      vm.uredi = function(obcinaId){
           $location.path("/urediObcino/" + obcinaId);
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
        .controller('urediObcineCtrl', urediObcineCtrl);
    
})();