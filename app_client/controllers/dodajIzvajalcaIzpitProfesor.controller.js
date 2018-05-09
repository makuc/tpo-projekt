(function() {
    /* global angular */
    
   dodajIzvajalcaIzpitProfesorCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki', 'izpitniRokPodatki'];
    
    
    function dodajIzvajalcaIzpitProfesorCtrl($location, ostaloPodatki, $routeParams, predmetPodatki, izpitniRokPodatki){
        var vm = this;
        
        vm.idIzpita = $routeParams.idIzpitnegaRoka;
        
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
        
        
        function pridobiZaposlene() {
            izpitniRokPodatki.pridobiIzpitniRok(vm.idIzpita).then(
                function success(odgovor){
                    vm.izpit = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
            
            ostaloPodatki.pridobiVseVeljavneZaposlene().then(
                function success(odgovor){
                    
                    
                    
                    vm.zaposleni = odgovor.data;
                    vm.vsiZaposleni = odgovor.data;
                    vm.stVseh = vm.zaposleni.length;
                    vm.stNaStran = 10;
                    vm.trenutnaStran = 0;
                        
                    var array = [setPagingData(1)];
                        
                    vm.strani = [1];
                        
                    for(var i = 2; i <= (vm.stVseh/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                        
                    function setPagingData(page){
                        var pagedData = vm.zaposleni.slice(
                            (page - 1) * vm.stNaStran,
                            page * vm.stNaStran
                        );
                        return pagedData;
                    }
                       vm.zaposleni = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        }
        
        vm.prikaziZaposlene = function(){
            pridobiZaposlene();
        };
        
        
        vm.odstraniIzvajalca = function(zaposlen_id) {
            izpitniRokPodatki.odstraniIzvajalca(vm.idIzpita, zaposlen_id).then(
                function success(odgovor){
                    pridobiZaposlene();
                    pridobiZaposlene();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.dodajIzvajalca = function(zaposlen_id){
            var data = {
                izvajalec: zaposlen_id
            };
            
            izpitniRokPodatki.dodajIzvajalca(vm.idIzpita, data).then(
                function success(odgovor){
                    pridobiZaposlene();
                    pridobiZaposlene();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.jeIzvajalec = function(izvajalecId){
            for(var i = 0; i < vm.izpit.izvajalci.length; i++){
               if(vm.izpit.izvajalci[i]._id == izvajalecId){
                   return true;
               }
            }
            return false;
        };
        
        vm.koncaj = function(){
            $location.path('/izpitniRok/profesor');
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajIzvajalcaIzpitProfesorCtrl', dodajIzvajalcaIzpitProfesorCtrl);
})();