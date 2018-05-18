(function() {
    /* global angular */
    
    urediOcenoIzpitaCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
    
    
    function urediOcenoIzpitaCtrl($location, ostaloPodatki, $routeParams){
        var vm = this;
        
        vm.studentId = $routeParams.studentId;
        vm.izvedbaId = $routeParams.rokId;
        
        
        vm.opcijeOcen = [1,2,3,4,5,6,7,8,9,10];
        
        vm.prikaziKandidata = function(){
            ostaloPodatki.pridobiIzpitniRok(vm.izvedbaId).then(
                function success(odgovor){
                    //console.log(odgovor.data);
                    vm.izpitniRok = odgovor.data;
                    vm.kandidati = vm.izpitniRok.polagalci;
                    //console.log("kandidati: ", vm.kandidati);
                    for (var i = 0; i < vm.kandidati.length; i++) {
                      if(vm.kandidati[i].student._id == vm.studentId)
                      {
                        vm.kandidat = vm.kandidati[i];
                        if(vm.kandidat.tock < 0)
                        {
                            vm.kandidat.tock = "";
                        }
                        break;
                      }
                    }
                    console.log(vm.kandidat);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.shrani = function(){
            var data = {
                tock: vm.kandidat.tock,
                ocena: vm.kandidat.ocena,
                koncna_ocena: vm.kandidat.koncna_ocena
            };
            ostaloPodatki.posodobiOceno(vm.izvedbaId, vm.studentId, data).then(
                function success(odgovor){
                    $location.path("/vsiIzpitniRoki/" + vm.izvedbaId + "/kandidati");
                },
                function error(odgovor){
                    vm.obvestilo = "Neveljavni podatki - preverite vnešene ocene.";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/vsiIzpitniRoki/" + vm.izvedbaId + "/kandidati");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediOcenoIzpitaCtrl', urediOcenoIzpitaCtrl);
})();