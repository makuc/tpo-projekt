(function() {
    /* global angular */
    
    urediOblikeStudijaCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediOblikeStudijaCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVseOblikeStudija().then(
                function success(odgovor){
                    vm.oblikeStudija = odgovor.data;
                    vm.vseOblikeStudija = odgovor.data;
                    vm.stVseh = vm.oblikeStudija.length;
                    vm.stNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stVseh/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.oblikeStudija.slice(
                            (page - 1) * vm.stNaStran,
                            page * vm.stNaStran
                            );
                        return pagedData;
                    }
                    vm.oblikeStudija = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(Id){
            ostaloPodatki.izbrisiOblikoStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(Id){
            ostaloPodatki.obnoviOblikoStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(Id){
            $location.path("/urediOblikoStudija/" + Id);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('urediOblikeStudijaCtrl', urediOblikeStudijaCtrl);
    
})();