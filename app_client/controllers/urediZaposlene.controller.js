(function() {
    /* global angular */
    
    urediZaposleneCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediZaposleneCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stZaposlenih/10-1){
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
        
        vm.prikaziZaposlene = function(){
            ostaloPodatki.pridobiVseZaposlene().then(
                function success(odgovor){
                    //console.log(odgovor.data);
                    vm.vsiPodatki = odgovor.data;
                    vm.zaposleni = odgovor.data;
                    vm.stZaposlenih = vm.zaposleni.length;
                    vm.stZaposlenihNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stZaposlenih/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.zaposleni.slice(
                            (page - 1) * vm.stZaposlenihNaStran,
                            page * vm.stZaposlenihNaStran
                            );
                        return pagedData;
                    }
                    vm.zaposleni = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(zaposlenId){
            //console.log("izbris: ", zaposlenId);
            ostaloPodatki.izbrisiZaposlenega(zaposlenId).then(
                function success(odgovor){
                    vm.prikaziZaposlene();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(zaposlenId){
            ostaloPodatki.obnoviZaposlenega(zaposlenId).then(
                function success(odgovor){
                    vm.prikaziZaposlene();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(zaposlenId){
            $location.path("/urediZaposlenega/" + zaposlenId);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediZaposleneCtrl', urediZaposleneCtrl);
    
})();