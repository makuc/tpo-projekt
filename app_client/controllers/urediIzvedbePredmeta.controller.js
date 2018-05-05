(function() {
    /* global angular */
    
    urediIzvedbePredmetaCtrl.$inject = ['ostaloPodatki', 'predmetPodatki', '$scope', '$location', '$routeParams'];
    
    
    function urediIzvedbePredmetaCtrl(ostaloPodatki, predmetPodatki, $scope, $location, $routeParams){
        var vm = this;
        
        vm.predmetId = $routeParams.predmetId;

        /*predmetPodatki
        .pridobiPredmet(vm.predmetId)
        .then(
          function success(odgovor) {
            vm.predmet = odgovor.data;
            //console.log(vm.predmetnik);
          },
          function error(odgovor) {
            console.log(odgovor);
          }
        );*/
        
        vm.nextPage = function(){
            vm.trenutnaStran++;
        };
        
        vm.prevPage = function(){
            vm.trenutnaStran--;
        };
        
        vm.setPage = function(x){
            vm.trenutnaStran = x-1;
        };
        
        vm.prikaziIzvedbe = function(){
            predmetPodatki.pridobiPredmet(vm.predmetId).then(
                function success(odgovor){
                    console.log(odgovor.data)
                    vm.predmet = odgovor.data;
                    vm.izvedbe_predmeta = vm.predmet.izvedbe_predmeta;
                    console.log("Izvedbe: ", vm.izvedbe_predmeta);
                    vm.stIzvedb = vm.izvedbe_predmeta.length;
                    vm.stIzvedbNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stIzvedb/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.izvedbe_predmeta.slice(
                            (page - 1) * vm.stIzvedbNaStran,
                            page * vm.stIzvedbNaStran
                            );
                        return pagedData;
                    }
                    vm.izvedbe_predmeta = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.izbris = function(predmetId){
            predmetPodatki.izbrisiPredmet(predmetId).then(
                function success(odgovor){
                    vm.prikaziPredmete();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.obnovi = function(predmetId){
            predmetPodatki.obnoviPredmet(predmetId).then(
                function success(odgovor){
                    vm.prikaziPredmete();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(predmetId){
            $location.path("/urediPredmet/" + predmetId);
        };
        
        vm.preklici = function()
        {
          $location.path("/urediPredmetnike");
        };
        
        vm.jeVsebovan = function(predmetId)
        {
          if(vm.predmetnik == null)
          {
            return false;
          }
          //console.log(vm.predmetnik.predmeti);
          for(var i = 0; i < vm.predmetnik.predmeti.length ; i++) 
          { 
            if(vm.predmetnik.predmeti[i]._id == predmetId)
            {
              return true;
            }
          }
          return false;
        };
        
       vm.odstraniPredmet = function(predmetId)
        {
          ostaloPodatki.odstraniPredmetIzPredmetnika(vm.predmetnik._id, predmetId).then(
            function success(odgovor){
                    vm.predmetnik = odgovor.data;
                    vm.prikaziPredmete();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
   
            );
        };
        
        vm.dodajPredmet = function(predmetId)
        {
          var podatkiNeki = {
            predmet: predmetId
          };
          /*console.log("Predmet id: " + predmetId);
          console.log("Predmetnik id: " + vm.predmetnik._id);
          console.log("Podatki: " + podatkiNeki);*/
          
          ostaloPodatki.dodajPredmetPredmetniku(vm.predmetnik._id, podatkiNeki).then(
            function success(odgovor){
                    vm.predmetnik = odgovor.data;
                    vm.prikaziPredmete();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
   
            );
        };
    };
        
    
    angular
        .module('tpo')
        .controller('urediIzvedbePredmetaCtrl', urediIzvedbePredmetaCtrl);
    
})();