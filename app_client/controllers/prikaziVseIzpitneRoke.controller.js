(function() {
    /* global angular */
    
    prikaziVseIzpitneRokeCtrl.$inject = ['izpitniRokPodatki', '$scope', '$location', 'ostaloPodatki'];

    
    function prikaziVseIzpitneRokeCtrl(izpitniRokPodatki, $scope, $location, ostaloPodatki){
        var vm = this;
        
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
        
        vm.izbris = function(Id){
            ostaloPodatki.izbrisiNacinStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(Id){
            ostaloPodatki.obnoviNacinStudija(Id).then(
                function success(odgovor){
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(Id){
            $location.path("/urediNacinStudija/" + Id);
        };
        
    }
    
    angular
        .module('tpo')
        .controller('prikaziVseIzpitneRokeCtrl', prikaziVseIzpitneRokeCtrl);
    
})();