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
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stVseh/10-1){
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
        
        vm.prikazi = function(){
            izpitniRokPodatki.najdiVseIzpiteZaStudijskoLeto(vm.studijskoLeto._id).then(
                function success(odgovor){
                    vm.VsiRoki = odgovor.data;
                    vm.izpitniRoki = odgovor.data;
                    vm.stVseh = vm.izpitniRoki.length;
                    vm.stNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stVseh/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.izpitniRoki.slice(
                            (page - 1) * vm.stNaStran,
                            page * vm.stNaStran
                            );
                        return pagedData;
                    }
                    vm.izpitniRoki = array;
                    console.log(vm.izpitniRoki[0]);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
    vm.uredi = function(){
          
    };
      
    vm.izvajalci = function(id_rok){
       $location.path('/dodajIzvajalceIzpitniRok/' + id_rok); 
    };
        
    }
    
    angular
        .module('tpo')
        .controller('prikaziVseIzpitneRokeCtrl', prikaziVseIzpitneRokeCtrl);
    
})();