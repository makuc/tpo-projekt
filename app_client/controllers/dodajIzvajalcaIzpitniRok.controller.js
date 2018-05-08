(function() {
    /* global angular */
    
   dodajIzvajalcaIzpitCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki', 'izpitniRokPodatki'];
    
    
    function dodajIzvajalcaIzpitCtrl($location, ostaloPodatki, $routeParams, predmetPodatki, izpitniRokPodatki){
        var vm = this;
        
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
        
        
        vm.preklici = function(){
            $location.path("/vsiIzpitniRoki");
        };
        
        vm.odstraniIzvajalca = function(zaposlen_id) {
            console.log(vm.izvajalci);
        };
        
        vm.dodajIzvajalca = function(zaposlen_id){
            vm.izvajalci = [vm.izvajalci, zaposlen_id];
            //vm.jeIzvajalec(zaposlen_id);
            console.log(vm.izvajalci);
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajIzvajalcaIzpitCtrl', dodajIzvajalcaIzpitCtrl);
})();