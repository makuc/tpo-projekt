(function() {
    /* global angular */
    
    urediPosteCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediPosteCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.nextPage = function(){
            vm.trenutnaStran++;
        };
        
        vm.prevPage = function(){
            vm.trenutnaStran--;
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
        
       // vm.uredi = function(drzavaId){
       //     $location.path("/urediPredmet/" + drzavaId);
      //  };
        
    }
    
    angular
        .module('tpo')
        .controller('urediPosteCtrl', urediPosteCtrl);
    
})();