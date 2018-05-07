(function() {
    /* global angular */
    
    potrdiVpiseCtrl.$inject = ['ostaloPodatki', '$scope', '$location', '$route', '$window'];
    
    
    function potrdiVpiseCtrl(ostaloPodatki, $scope, $location, $route, $window){
        var vm = this;
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stNepotrjenihVpisov/10-1){
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
        
        vm.pridobiVseVpise = function(){
            ostaloPodatki.najdiVseVpise().then(
                function success(odgovor){
                    vm.vsiVpisi = odgovor.data;
                    vm.nepotrjeniVpisi = [];
                    
                    for (var i = 0; i < vm.vsiVpisi.length; i++) {
                      if(vm.vsiVpisi[i].potrjen == false) // pravilno je false, samo ni se primerov za false
                      {
                        vm.nepotrjeniVpisi.push(vm.vsiVpisi[i]);
                      }
                    }
                    console.log(vm.nepotrjeniVpisi);
                    
                    vm.stNepotrjenihVpisov = vm.nepotrjeniVpisi.length;
                    vm.stNepotrjenihVpisovNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stNepotrjenihVpisov/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.nepotrjeniVpisi.slice(
                            (page - 1) * vm.stNepotrjenihVpisovNaStran,
                            page * vm.stNepotrjenihVpisovNaStran
                            );
                        return pagedData;
                    }
                    vm.nepotrjeniVpisi = array;
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
        
        vm.potrdiVpis = function(vpisniListId)
        {
          console.log("link: ", "/api/v1/potrdilo-vpisa/" + vpisniListId);
          ostaloPodatki.potrdiVpis(vpisniListId).then(
              function success(odgovor){
                $window.open("/api/v1/potrdilo-vpisa/" + vpisniListId, '_blank');
                  vm.pridobiVseVpise();
                  
              },
              function error(odgovor){
                  console.log(odgovor);
              }
          );
        };
        
        vm.prikaziVpisniList = function(vpisniListId)
        {
          $window.open("/api/v1/vpisni-list/" + vpisniListId, '_blank');
        }
        
    }
    
    angular
        .module('tpo')
        .controller('potrdiVpiseCtrl', potrdiVpiseCtrl);
    
})();