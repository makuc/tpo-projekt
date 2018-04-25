(function() {
  /* global angular */
  
  urediLetnikCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams'];
  
  
  function urediLetnikCtrl($location, ostaloPodatki, $routeParams){
    var vm = this;
    
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
        naziv: vm.letnik.naziv
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