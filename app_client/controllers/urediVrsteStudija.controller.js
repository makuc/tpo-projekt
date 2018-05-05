(function() {
    /* global angular */
    
    urediVrsteStudijaCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediVrsteStudijaCtrl(ostaloPodatki, $scope, $location){
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
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVseVrsteStudije().then(
                function success(odgovor){
                    vm.vrstaStudija = odgovor.data;
                    vm.vseVrsteStudija = odgovor.data;
                    vm.stVseh = vm.vrstaStudija.length;
                    vm.stNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stVseh/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.vrstaStudija.slice(
                            (page - 1) * vm.stNaStran,
                            page * vm.stNaStran
                            );
                        return pagedData;
                    }
                    vm.vrstaStudija = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(Id){
            ostaloPodatki.izbrisiVrstoStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(Id){
            ostaloPodatki.obnoviVrstoStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(Id){
            $location.path("/urediVrstoStudija/" + Id);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediVrsteStudijaCtrl', urediVrsteStudijaCtrl);
    
})();