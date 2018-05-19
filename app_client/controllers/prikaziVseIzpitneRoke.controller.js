(function() {
    /* global angular */
    
    prikaziVseIzpitneRokeCtrl.$inject = ['izpitniRokPodatki', '$scope', '$location', 'ostaloPodatki', 'authentication'];

    
    function prikaziVseIzpitneRokeCtrl(izpitniRokPodatki, $scope, $location, ostaloPodatki, authentication){
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
        
        
        ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then(
            function success(odgovor){
                vm.studijskaLeta = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
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
        
        vm.prikazi = function(){
            if(/*vm.vpisan.skrbnik == false &&*/ vm.vpisan.referentka == false)
            {
                vm.vpisan.predavatelj = true;
            }
            
            if(vm.vpisan.predavatelj == true)
            {
                console.log("predavatelj: ", vm.vpisan);
                // CHANGE THIS
                izpitniRokPodatki.najdiVseIzpiteZaStudijskoLeto(vm.studijskoLeto._id).then(
                    function success(odgovor){
                        vm.VsiRoki = odgovor.data;
                        //console.log(vm.VsiRoki);
                        vm.izpitniRoki = [];
                        for (var i = 0; i < vm.VsiRoki.length; i++) {
                            for (var j = 0; j < vm.VsiRoki[i].izvajalci.length; j++) {
                                if(vm.VsiRoki[i].izvajalci[j]._id == vm.vpisan.zaposlen)
                                {
                                    vm.izpitniRoki.push(vm.VsiRoki[i]);
                                }
                            }
                        }
                        pripraviStrani();
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            }
            else
            {
                izpitniRokPodatki.najdiVseIzpiteZaStudijskoLeto(vm.studijskoLeto._id).then(
                    function success(odgovor){
                        vm.izpitniRoki = odgovor.data;
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            }
        };
        
        vm.uredi = function(id_rok){
            $location.path('/izpitniRok/referentka/uredi/' + id_rok);    
        };
          
    
        vm.kandidati = function(rokId){
            $location.path('/vsiIzpitniRoki/' + rokId + '/kandidati')  ;
        };
            
    }
    
    angular
        .module('tpo')
        .controller('prikaziVseIzpitneRokeCtrl', prikaziVseIzpitneRokeCtrl);
    
})();