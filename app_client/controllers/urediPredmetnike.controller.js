(function() {
    /* global angular */
    
    urediPredmetnikeCtrl.$inject = ['ostaloPodatki', '$scope', '$location'];
    
    
    function urediPredmetnikeCtrl(ostaloPodatki, $scope, $location){
        var vm = this;
        
        vm.prikazi = function(){
            ostaloPodatki.pridobiVsePredmetnike().then(
                function success(odgovor){
                    vm.predmetnik = odgovor.data;
                    vm.vsiPredmetniki = odgovor.data;
                    vm.stVseh = vm.predmetnik.length;
                    vm.stNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stVseh/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.predmetnik.slice(
                            (page - 1) * vm.stNaStran,
                            page * vm.stNaStran
                            );
                        return pagedData;
                    }
                    vm.predmetnik = array;
                    
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
            
        };
        
        vm.izbris = function(Id){
            ostaloPodatki.izbrisiPredmetnik(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(Id){
            ostaloPodatki.obnoviPredmetnik(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(Id){
            $location.path("/urediPredmetnik/" + Id);
        };
        
        vm.urediPredmete = function(Id)
        {
            $location.path("/urediPredmetePredmetnika/" + Id);
        }
        
        /*vm.vrstaStudija = function(idVrsteStudija){
            ostaloPodatki.najdiVrstoStudija(idVrsteStudija).then(
                function success(odgovor){
                    vm.vrstaStudija.idVrsteStudija = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };*/
        

    }
    
    angular
        .module('tpo')
        .controller('urediPredmetnikeCtrl', urediPredmetnikeCtrl);
    
})();