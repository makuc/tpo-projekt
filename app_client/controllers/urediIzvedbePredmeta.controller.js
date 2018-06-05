(function() {
    /* global angular */
    
    urediIzvedbePredmetaCtrl.$inject = ['ostaloPodatki', 'predmetPodatki', '$scope', '$location', '$routeParams', 'authentication'];
    
    
    function urediIzvedbePredmetaCtrl(ostaloPodatki, predmetPodatki, $scope, $location, $routeParams, authentication){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
         vm.PPredmeti = true;
         vm.RVpisaniVPredmet = true;
        
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.ime = odgovor.data.zaposlen.ime;
                    vm.priimek = odgovor.data.zaposlen.priimek;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        }
        
        vm.logoutFunc = function() {
            delTok();
            return $location.path('/login');
        };
        
        function delTok(){
            return authentication.logout();
        }
        
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
        
        vm.naStran = 10.0;
        vm.stran = 0;
        vm.strani = [1];
        vm.nextPage = function(){
            if(vm.stran < vm.strani.length -1){
                vm.stran++;
            }
        };
        vm.prevPage = function(){
            if(vm.stran > 0){
                vm.stran--;
            }
        };
        vm.setPage = function(x){
            vm.stran = x - 1;
            
            if(vm.stran < 0)
                vm.stran = 0;
            else if(vm.stran > vm.strani.length)
                vm.stran = vm.strani.length;
        };
        function pripraviStrani() {
            setTimeout(function() {
                vm.strani = [1];
                if($scope.query)
                {
                    var max = Math.ceil($scope.query.length / vm.naStran);
                    console.log($scope.query.length + " - " + max);
                    for(var i = 1; i < max; i++) {
                        vm.strani.push(i + 1);
                    }
                    
                    vm.setPage(0);
                }
                
                vm.n = vm.strani.length-1;
                $scope.$apply();
            }, 500);
        }
        $scope.$watch('iskanje', function() {
            pripraviStrani();
        });
        
        vm.prikaziIzvedbe = function(){
            predmetPodatki.pridobiPredmet(vm.predmetId).then(
                function success(odgovor){
                    vm.predmet = odgovor.data;
                    console.log("Predmet:", vm.predmet)
                    
                    vm.izvedbe_predmeta = vm.predmet.izvedbe_predmeta;
                    pripraviStrani();
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
        
        vm.urediIzvedbo = function(izvedbaId){
            $location.path("/urediIzvedbePredmeta/" + vm.predmetId + "/izvedba/" + izvedbaId);
        };
        
        vm.urediIzvajalce = function(izvedbaId){
            console.log("se ni");
            //$location.path("/urediPredmet/" + vm.predmetId + "/izvedba/" + izvedbaId);
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
        
        vm.dodajIzvedbo = function(studijskoLetoId)
        {
            var data = {
              studijsko_leto: studijskoLetoId  
            };
            predmetPodatki.dodajIzvedboPredmetu(vm.predmetId, data).then(
            function success(odgovor){
                    vm.prikaziIzvedbe();
            },
            function error(odgovor){
                console.log(odgovor);
            });
        };
        
        vm.izbrisiIzvedbo = function(izvedbaId)
        {
            predmetPodatki.odstraniIzvedboPredmeta(vm.predmetId, izvedbaId).then(
            function success(odgovor){
                    vm.prikaziIzvedbe();
            },
            function error(odgovor){
                console.log(odgovor);
            });
        };
        
        vm.pokaziVpisane = function(studijskoLetoId)
        {
            $location.path("/urediIzvedbePredmeta/" + vm.predmetId + "/studijsko_leto/" + studijskoLetoId);
        };
        
    };
    
    
        
    
    angular
        .module('tpo')
        .controller('urediIzvedbePredmetaCtrl', urediIzvedbePredmetaCtrl);
    
})();