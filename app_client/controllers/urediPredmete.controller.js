(function() {
    /* global angular */
    
    urediPredmeteCtrl.$inject = ['predmetPodatki', '$scope', '$location'];
    
    
    function urediPredmeteCtrl(predmetPodatki, $scope, $location){
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
        
        vm.prikaziPredmete = function(){
            predmetPodatki.izpisiVsePredmete().then(
                function success(odgovor){
                    vm.vsiPodatki = odgovor.data;
                    vm.predmeti = odgovor.data;
                    vm.stPredmetov = vm.predmeti.length;
                    vm.stPredmetovNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stPredmetov/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.predmeti.slice(
                            (page - 1) * vm.stPredmetovNaStran,
                            page * vm.stPredmetovNaStran
                            );
                        return pagedData;
                    }
                    vm.predmeti = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(predmetId){
            predmetPodatki.izbrisiPredmet(predmetId).then(
                function success(odgovor){
                    vm.prikaziPredmete();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(predmetId){
            predmetPodatki.obnoviPredmet(predmetId).then(
                function success(odgovor){
                    vm.prikaziPredmete();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(predmetId){
            $location.path("/urediPredmet/" + predmetId);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediPredmeteCtrl', urediPredmeteCtrl);
    
})();