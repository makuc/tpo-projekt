(function() {
  /* global angular */
  
  dodajLetnikCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication'];
  
  
  function dodajLetnikCtrl($location, ostaloPodatki, $routeParams, authentication){
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
    
    vm.letnik = {
      pogoj_letnik: "",
      studijskiProgrami: "",
      naziv: ""
    };
    
    vm.pridobiLetnik = function(){
    };
      
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
      
    vm.shrani = function(){
      //console.log("ZAPOSLEN:");
      //console.log(vm.zaposlen);
      
      console.log(vm.letnik.studijskiProgram);
      var letnik = {
        studijski_program: vm.letnik.studijskiProgram,
        pogoj_letnik: vm.letnik.pogoj_letnik,
        naziv: vm.letnik.naziv,
        KT_izbirnihPredmetov: vm.letnik.KT_izbirnihPredmetov,
        KT_strokovnihIzbirnihPredmetov: vm.letnik.KT_strokovnihIzbirnihPredmetov,
        st_modulov: vm.letnik.st_modulov
      };
      ostaloPodatki.dodajLetnik(letnik).then(
        function success(odgovor){
          $location.path("/urediLetnike");
        },
        function error(odgovor){
          vm.obvestilo = "Napaka";
          console.log(odgovor);
        }
      );
    };
      
    vm.preklici = function(){
      $location.path("/urediLetnike");
    };
  }
    
  angular
    .module('tpo')
    .controller('dodajLetnikCtrl', dodajLetnikCtrl);
})();