(function() {
    /* global angular */
    
    urediIzvedboPredmetaCtrl.$inject = ['$location', 'predmetPodatki', '$routeParams', 'ostaloPodatki', '$scope', 'authentication'];
    
    
    function urediIzvedboPredmetaCtrl($location, predmetPodatki, $routeParams, ostaloPodatki, $scope, authentication){
        var vm = this;
        
        vm.vpisan=authentication.currentUser();
        
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
        vm.izvedbaId = $routeParams.izvedbaId;
        $scope.isDisabled = true;
        
        vm.naStran = 10.0;
        vm.strani = [1];
        vm.stran = 0;
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
        
        vm.pridobiPredmet = function(){
            ostaloPodatki.pridobiVseZaposlene().then(
                function success(odgovor){
                    vm.zaposleni = odgovor.data;
                    
                },
                function error(odgovor){
                    console.log(odgovor);
                }  
            );
            ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then(
                function success(odgovor){
                    vm.studijskaLeta = odgovor.data;
                },
                function error(odgovor){
                    console.log(odgovor);
                }  
            );
            predmetPodatki.pridobiPredmet(vm.predmetId).then(
                function success(odgovor){
                    vm.predmet = odgovor.data;
  
                    for (var i = 0; i < vm.predmet.izvedbe_predmeta.length; i++) {
                      if(vm.predmet.izvedbe_predmeta[i]._id == vm.izvedbaId)
                      {
                        vm.izvedba = vm.predmet.izvedbe_predmeta[i];
                        break;
                      }
                    }
                    pripraviStrani();
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
          predmetPodatki.odstraniIzvajalcaIzvedbiPredmeta(vm.predmetId, vm.izvedba._id, izvajalecId).then(
            function success(odgovor){
                //console.log(odgovor);
                vm.pridobiPredmet();
            },
            function error(odgovor){
                vm.obvestilo = "Že obstaja zapis s to šifro";
                console.log(odgovor);
            }
          );
        };
        
        vm.dodajIzvajalca = function(izvajalecId)
        {
          //console.log("izvajalci: ", vm.predmet);
          if(vm.izvedba.izvajalci.length < 3)
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
          predmetPodatki.dodajIzvajalcaIzvedbePredmeta(vm.predmetId, vm.izvedba._id, data).then(
            function success(odgovor){
                //console.log(odgovor);
                vm.pridobiPredmet();
            },
            function error(odgovor){
                vm.obvestilo = "Že obstaja zapis s to šifro";
                console.log(odgovor);
            }
          );
        };
        
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
        };
        
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