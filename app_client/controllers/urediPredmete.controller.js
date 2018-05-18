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
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stPredmetov/10-1){
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
        
        vm.prikaziPredmete = function(){
            if(vm.vpisan.skrbnik == false && vm.vpisan.referentka == false)
            {
                vm.vpisan.predavatelj = true;
            }
            
            if(vm.vpisan.skrbnik == true)
            {
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
            }
            else if(vm.vpisan.referentka == true)
            {
                console.log("referentka");
                predmetPodatki.izpisiVseVeljavnePredmete().then(
                    function success(odgovor){
                        vm.vsiPodatki = odgovor.data;
                        console.log("Vsi podatki: ", vm.vsiPodatki);
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
            }
            else if(vm.vpisan.predavatelj == true)
            {
                console.log("predavatelj");
                predmetPodatki.najdiPredmeteIzvajalca().then(
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
        
        vm.urediIzvedbe = function(predmetId)
        {
            $location.path("/urediIzvedbePredmeta/" + predmetId);
        }
               
       $scope.orderByMe = function(x) {
           if($scope.myOrderBy == x){
               $scope.bool=!($scope.bool);
           }
           
        $scope.myOrderBy = x;
        }
        
    }
    
    angular
        .module('tpo')
        .controller('urediPredmeteCtrl', urediPredmeteCtrl);
    
})();