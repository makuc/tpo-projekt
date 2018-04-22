(function() {
    /* global angular */
    
    urediPredmeteCtrl.$inject = ['predmetPodatki', '$scope', '$location'];
    
    
    function urediPredmeteCtrl(predmetPodatki, $scope, $location){
        var vm = this;
        
        vm.prikaziPredmete = function(){
            predmetPodatki.izpisiVsePredmete().then(
                function success(odgovor){
                    vm.predmeti = odgovor.data;
                    vm.stPredmetov = vm.predmeti.length;
                    vm.stPredmetovNaStran = 10;
                    vm.trenutnaStran = 1;
                    
                    $scope.$watch("vm.trenutnaStran", function(){
                        setPagingData(vm.trenutnaStran);
                    });
                    
                    function setPagingData(page){
                        var pagedData = vm.predmeti.slice(
                            (page - 1) * vm.stPredmetovNaStran,
                            page * vm.stPredmetovNaStran
                        );
                        vm.predmeti = pagedData;
                    }
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