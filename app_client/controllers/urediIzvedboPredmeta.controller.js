(function() {
    /* global angular */
    
    urediIzvedboPredmetaCtrl.$inject = ['$location', 'predmetPodatki', '$routeParams', 'ostaloPodatki'];
    
    
    function urediIzvedboPredmetaCtrl($location, predmetPodatki, $routeParams, ostaloPodatki){
        var vm = this;
        
        vm.predmetId = $routeParams.predmetId;
        vm.izvedbaId = $routeParams.izvedbaId;
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stZaposlenih/10-1){
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
        
        //
        vm.nextPageIzvajalci = function(){
            if(vm.trenutnaStranIzvajalci < vm.stIzvajalcev/10-1){
                vm.trenutnaStranIzvajalci++;
            }
        };
        
        vm.prevPageIzvajalci = function(){
            if(vm.trenutnaStranIzvajalci > 0){
                vm.trenutnaStranIzvajalci--;
            }
        };
        
        vm.setPageIzvajalci = function(x){
            vm.trenutnaStranIzvajalci = x-1;
        };
        
        function setPagingDataIzvajalci(page){
            var pagedData = vm.izvajalci.slice(
                (page - 1) * vm.stIzvajalcevNaStran,
                page * vm.stIzvajalcevNaStran
                );
            return pagedData;
        }
        
        vm.pridobiPredmet = function(){
            predmetPodatki.pridobiPredmet(vm.predmetId).then(
                function success(odgovor){
                  console.log("n1");
                    vm.predmet = odgovor.data;
  
                    for (var i = 0; i < vm.predmet.izvedbe_predmeta.length; i++) {
                      if(vm.predmet.izvedbe_predmeta[i]._id == vm.izvedbaId)
                      {
                        vm.izvedba = vm.predmet.izvedbe_predmeta[i];
                        
                        vm.izvajalci = vm.izvedba.izvajalci;
                        vm.stIzvajalcev = vm.izvajalci.length;
                        vm.stIzvajalcevNaStran = 10;
                        vm.trenutnaStranIzvajalci = 0;
                        
                        var array = [setPagingDataIzvajalci(1)];
                        
                        vm.straniIzvajalcev = [1];
                        
                        for(var i = 2; i <= (vm.stIzvajalcev/10)+1; i++){
                            array.push(setPagingDataIzvajalci(i));
                            vm.straniIzvajalcev.push(i);
                        }
 
                        vm.izvajalci = array;
                        
                        break;
                      }
                    }
                    
                    ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then(
                      function success(odgovor){
                        console.log("n2");
                          vm.studijskaLeta = odgovor.data;
                          //console.log("studijska leta: ", vm.studijskaLeta);
                          
                          
                          ostaloPodatki.pridobiVseZaposlene().then(
                            function success(odgovor){
                              console.log("n3");
                                vm.zaposleni = odgovor.data;
                                //console.log("zaposleni: ", vm.zaposleni);
                                
                                 vm.stZaposlenih = vm.zaposleni.length;
                                vm.stZaposlenihNaStran = 10;
                                vm.trenutnaStran = 0;
                                
                                var array = [setPagingData(1)];
                                
                                vm.strani = [1];
                                
                                for(var i = 2; i <= (vm.stZaposlenih/10)+1; i++){
                                    array.push(setPagingData(i));
                                    vm.strani.push(i);
                                }
                                
                                function setPagingData(page){
                                    var pagedData = vm.zaposleni.slice(
                                        (page - 1) * vm.stZaposlenihNaStran,
                                        page * vm.stZaposlenihNaStran
                                        );
                                    return pagedData;
                                }
                                vm.zaposleni = array;
                                
                            },
                            function error(odgovor){
                                console.log(odgovor);
                            }  
                          )
                      },
                      function error(odgovor){
                          console.log(odgovor);
                      }  
                    )
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.odstraniIzvajalca = function(izvajalecId)
        {
          //console.log("odstrani izvajalca id: ", izvajalecId);
          //return predmetPodatki.odstraniIzvajalcaIzvedbiPredmeta()
          predmetPodatki.odstraniIzvajalcaIzvedbiPredmeta(vm.predmetId, vm.izvedba.studijsko_leto._id, izvajalecId).then(
            function success(odgovor){
                //console.log(odgovor);
                vm.pridobiPredmet();
            },
            function error(odgovor){
                vm.obvestilo = "Že obstaja zapis s to šifro";
                console.log(odgovor);
            }
          );
        }
        
        vm.dodajIzvajalca = function(izvajalecId)
        {
          console.log("izvajalci: ", vm.izvajalci);
          if(vm.izvajalci && vm.izvajalci[0].length < 3)
          {
              vm.obvestilo = "";
          }
          else
          {
              vm.obvestilo = "Posamezna izvedba predmeta ima lahko največ 3 izvajalce.";
              return;
          }
          //console.log("dodaj izvajalca id: ", izvajalecId);
          var data = {
            izvajalec: izvajalecId
          };
          predmetPodatki.dodajIzvajalcaIzvedbePredmeta(vm.predmetId, vm.izvedba.studijsko_leto._id, data).then(
            function success(odgovor){
                //console.log(odgovor);
                vm.pridobiPredmet();
            },
            function error(odgovor){
                vm.obvestilo = "Že obstaja zapis s to šifro";
                console.log(odgovor);
            }
          );
        }
        
        vm.jeIzvajalec = function(izvajalecId)
        {
          if(vm.izvedba == null)
          {
            return;
          }
          //console.log("izvajalci: ", vm.izvedba.izvajalci);
          for (var i = 0; i < vm.izvedba.izvajalci.length; i++) {
            //console.log("izvajalec: ", vm.izvedba.izvajalci[i]);
            if(vm.izvedba.izvajalci[i]._id == izvajalecId)
            {
              //console.log("jeIzvajalec: ", izvajalecId);
              return true;
            }
          }
          return false;
        }
        
        vm.shrani = function(){
            $location.path("/urediIzvedbePredmeta/" + vm.predmetId);
          
            /*var predmet = {
            };
            predmetPodatki.urediPredmet(vm.idPredmeta, predmet).then(
                function success(odgovor){
                    $location.path("/urediPredmete");
                },
                function error(odgovor){
                    vm.obvestilo = "Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );*/
        };
        
        vm.preklici = function(){
            $location.path("/urediIzvedbePredmeta/:predmetId");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediIzvedboPredmetaCtrl', urediIzvedboPredmetaCtrl);
})();