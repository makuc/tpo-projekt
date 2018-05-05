(function() {
    /* global angular */
    
    urediObcineCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediObcineCtrl(ostaloPodatki, $scope, $location){
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
        
    }
    
    angular
        .module('tpo')
        .controller('urediObcineCtrl', urediObcineCtrl);
    
})();