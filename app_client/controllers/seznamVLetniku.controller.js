(function() {
    /* global angular */
    
    seznamVpisanihVLetnikCtrl.$inject = ['ostaloPodatki', 'authentication', '$scope', '$location'];
    
    function seznamVpisanihVLetnikCtrl(ostaloPodatki, authentication, $scope, $location){
        var vm = this;
        
        vm.vpisan=authentication.currentUser();
        
        vm.RSeznamVpisanih = true;
        
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.ime = odgovor.data.zaposlen.ime;
                    vm.priimek = odgovor.data.zaposlen.priimek;
                    vm.vpisan = odgovor.data;
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
            pripraviStrani();
        });
        
        

        
        ostaloPodatki.pridobiVseVeljavneLetnike().then(
            function succes(odgovor){
                //console.log(odgovor.data);
                vm.letniki = [];
                for(var i = 0; i < odgovor.data.length; i++){
                    if(odgovor.data[i].studijskiProgram.sifraEVS == "1000468"){
                        vm.letniki.push(odgovor.data[i]);
                    }
                }
                console.log(vm.letniki);
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        
        vm.prikaziTabelo = function() {
            console.log(vm.letnik);
            ostaloPodatki.seznamVpisanihVLetnik(vm.letnik._id, "5ac3c4553f0fb21a058ff3da").then(
                function success(odgovor){
                    vm.studenti = odgovor.data;
                    console.log(odgovor.data);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
    }
    
    angular
        .module('tpo')
        .controller('seznamVpisanihVLetnikCtrl', seznamVpisanihVLetnikCtrl);
})();