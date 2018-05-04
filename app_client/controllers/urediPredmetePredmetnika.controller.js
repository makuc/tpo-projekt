(function() {
    /* global angular */
    
    urediPredmetePredmetnikaCtrl.$inject = ['ostaloPodatki', 'predmetPodatki', '$scope', '$location', '$routeParams'];
    
    
    function urediPredmetePredmetnikaCtrl(ostaloPodatki, predmetPodatki, $scope, $location, $routeParams){
        var vm = this;
        
        vm.idPredmetnika = $routeParams.idPredmetnika;

        ostaloPodatki
        .najdiPredmetnik(vm.idPredmetnika)
        .then(
          function success(odgovor) {
            vm.predmetnik = odgovor.data;
            //console.log(vm.predmetnik);
          },
          function error(odgovor) {
            console.log(odgovor);
          }
        );
        
        vm.posodobiPredmetnik = function()
        {
          
        }
        
        vm.nextPage = function(){
            vm.trenutnaStran++;
        };
        
        vm.prevPage = function(){
            vm.trenutnaStran--;
        };
        
        vm.setPage = function(x){
            vm.trenutnaStran = x-1;
        };
        
        vm.prikaziPredmete = function(){
            predmetPodatki.izpisiVseVeljavnePredmete().then(
                function success(odgovor){
                    vm.vsiPodatki = odgovor.data;
                    vm.predmeti = odgovor.data;
                    vm.stPredmetov = vm.predmeti.length;
                    vm.stPredmetovNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stPredmetov/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.predmeti.slice(
                            (page - 1) * vm.stPredmetovNaStran,
                            page * vm.stPredmetovNaStran
                            );
                        return pagedData;
                    }
                    vm.predmeti = array;
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
          console.log("Predmet id: " + predmetId);
          console.log("Predmetnik id: " + vm.predmetnik._id);
          var data = {
            predmet: predmetId
          };
          console.log("Podatki: " + data);
          
          ostaloPodatki.odstraniPredmetIzPredmetnika(vm.predmetnik._id, data).then(
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
          console.log("Predmet id: " + predmetId);
          console.log("Predmetnik id: " + vm.predmetnik._id);
          var podatkiNeki = {
            predmet: predmetId
          };
          console.log("Podatki: " + podatkiNeki);
          
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
        .controller('urediPredmetePredmetnikaCtrl', urediPredmetePredmetnikaCtrl);
    
})();