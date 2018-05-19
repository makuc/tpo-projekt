(function() {
    /* global angular */
    
    urediPredmeteCtrl.$inject = ['predmetPodatki', '$scope', '$location', 'authentication', 'ostaloPodatki'];
    
    
    function urediPredmeteCtrl(predmetPodatki, $scope, $location, authentication, ostaloPodatki){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
        
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.ime = odgovor.data.zaposlen.ime;
                    vm.priimek = odgovor.data.zaposlen.priimek;
                    vm.vpisan.zaposlen = odgovor.data;
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
            pripraviStrani()
        });
        
        vm.prikaziPredmete = function(){
            if(vm.vpisan.skrbnik == false && vm.vpisan.referentka == false)
            {
                vm.vpisan.predavatelj = true;
            }
            
            if(vm.vpisan.skrbnik == true)
            {
                predmetPodatki.izpisiVsePredmete().then(
                    function success(odgovor){
                        vm.data = odgovor.data;
                        pripraviStrani();
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            }
            else if(vm.vpisan.referentka == true)
            {
                console.log("referentka");
                predmetPodatki.izpisiVseVeljavnePredmete().then(
                    function success(odgovor){
                        vm.data = odgovor.data;
                        pripraviStrani();
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            }
            else if(vm.vpisan.predavatelj == true)
            {
                console.log("predavatelj");
                predmetPodatki.najdiPredmeteIzvajalca().then(
                    function success(odgovor){
                        vm.data = odgovor.data;
                        pripraviStrani();
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            }
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
        
        vm.urediIzvedbe = function(predmetId) {
            $location.path("/urediIzvedbePredmeta/" + predmetId);
        };
               
        $scope.orderByMe = function(x) {
            if($scope.myOrderBy == x){
                $scope.bool=!($scope.bool);
            }
           
            $scope.myOrderBy = x;
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediPredmeteCtrl', urediPredmeteCtrl);
    
})();