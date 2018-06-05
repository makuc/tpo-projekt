(function() {
  /* global angular */
  
  urediLetnikCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
  
  
  function urediLetnikCtrl($location, ostaloPodatki, $routeParams, authentication){
    var vm = this;
    
    vm.PLetniki = true;
    vm.naslov = "Uredi letnik";
    
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
    
    vm.idLetnika = $routeParams.idLetnika;
    
    //vm.opcijeKT = ["a", "b", "c"];
    //vm.opcijeKT = [1,2,3,4,5,6]; //
    ostaloPodatki
      .pridobiVseVeljavneStudijskePrograme()
      .then(
        function success(odgovor) {
          vm.studijskiProgrami = odgovor.data;
        },
        function error(odgovor) {
          console.log(odgovor);
        }
      );
    ostaloPodatki
      .pridobiVseVeljavneLetnike()
      .then(
        function success(odgovor) {
          vm.pogoji = odgovor.data;
          console.log(vm.pogoji);
        },
        function error(odgovor) {
          console.log(odgovor);
        }
      );
    
    
    vm.pridobiLetnik = function(){
      ostaloPodatki.najdiLetnik(vm.idLetnika).then(
        function success(odgovor){
          console.log(odgovor.data);
          vm.letnik = odgovor.data;
        },
        function error(odgovor){
          console.log(odgovor);
        }
      );
    };
    
    vm.shrani = function(){
      var letnik = {
        studijskiProgram: vm.letnik.studijskiProgram,
        pogoj_letnik: vm.letnik.pogoj_letnik,
        naziv: vm.letnik.naziv,
        KT_izbirnihPredmetov: vm.letnik.KT_izbirnihPredmetov,
        KT_strokovnihIzbirnihPredmetov: vm.letnik.KT_strokovnihIzbirnihPredmetov,
        st_modulov: vm.letnik.st_modulov
      };
      ostaloPodatki.urediLetnik(vm.idLetnika, letnik).then(
        function success(odgovor){
          $location.path("/urediLetnike/");
        },
        function error(odgovor){
          vm.obvestilo = "Že obstaja zapis s to šifro";
          console.log(odgovor);
        }
      );
    };
    
    vm.preklici = function(){
      $location.path("/urediLetnike/");
    };
  }
  
  angular
    .module('tpo')
    .controller('urediLetnikCtrl', urediLetnikCtrl);
})();