(function() {
    /* global angular */
    
    potrdiVpiseCtrl.$inject = ['ostaloPodatki', '$scope', '$location', '$route', '$window'];
    
    
    function potrdiVpiseCtrl(ostaloPodatki, $scope, $location, $route, $window){
        var vm = this;
        
        vm.RPotrditevVpisa = true;
        
        vm.oddani = true;
        
        vm.naStran = 10.0;
        vm.stran = 0;
        vm.strani = [1];
        vm.nextPage = function(){
            if(vm.stran < vm.strani.length -1){
                vm.stran++;
            }
        };
        vm.prevPage = function(){
            if(vm.stran > 0){
                vm.stran--;
            }
        };
        vm.setPage = function(x){
            vm.stran = x - 1;
            
            if(vm.stran < 0)
                vm.stran = 0;
            else if(vm.stran > vm.strani.length)
                vm.stran = vm.strani.length;
        };
        function pripraviStrani() {
            setTimeout(function() {
                vm.strani = [1];
                if($scope.query)
                {
                    var max = Math.ceil($scope.query.length / vm.naStran);
                    console.log($scope.query.length + " - " + max);
                    for(var i = 1; i < max; i++) {
                        vm.strani.push(i + 1);
                    }
                    
                    vm.setPage(0);
                }
                
                vm.n = vm.strani.length-1;
                $scope.$apply();
            }, 500);
        }
        $scope.$watch('iskanje', function() {
            pripraviStrani();
        });
        
        vm.pridobiVseVpise = function(){
            ostaloPodatki.najdiOddaneVpise().then(
                function success(odgovor){
                    vm.nepotrjeniVpisi = odgovor.data;
                    pripraviStrani();
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