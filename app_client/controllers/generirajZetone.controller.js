(function(){
  /* global angular */
  
  generirajZetoneCtrl.$inject = ['zetoni', '$routeParams', 'authentication', 'ostaloPodatki', '$location'];
  
  function generirajZetoneCtrl(zetoni, $routeParams, authentication, ostaloPodatki, $location) {
    var vm = this;
    
    vm.RGeneriranjeZetonov = true;
    
    vm.vpisan=authentication.currentUser();
    
    vm.data = {
      letnik: "",
      trenutno_leto: "",
      naslednje_leto: "",
      minimalno_KT: 0
    };
    
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
    
    ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then(
      function success(odgovor) {
        vm.studijskaLeta = odgovor.data;
      },
      function error(odgovor) {
        console.log("Napake pri pridobivanju študijskih let: " + odgovor);
      }
    );
    ostaloPodatki.pridobiVseVeljavneLetnike().then(
      function success(odgovor) {
        vm.letniki = odgovor.data;
      },
      function error(odgovor) {
        console.log("Napake pri pridobivanju letnikov: " + odgovor);
      }
    );
    ostaloPodatki.pridobiVseVeljavneVrsteVpisa().then(
      function success(odgovor) {
        vm.vrsteVpisa = odgovor.data;
      },
      function error(odgovor) {
        console.log("Napake pri pridobivanju vrst vpisa: " + odgovor);
      }
    );
    
    vm.najdiVrstoVpisa = function(vrsta) {
      var ime;
      for(var i = 0; i < vm.vrsteVpisa.length; i++)
      {
        if(vm.vrsteVpisa[i]._id == vrsta)
        {
          ime = vm.vrsteVpisa[i].naziv;
          break;
        }
      }
      
      if(!ime)
        ime = "Ta vrsta vpisa ne obstaja";
      
      return ime;
    };
    
    vm.generiraj = function() {
      zetoni.generiraj(vm.data).then(
        function success(odgovor) {
          vm.napaka = "";
          vm.message = "Žetoni generirani";
          
          vm.studenti = odgovor.data;
          
          console.log(odgovor.data);
        },
        function error(odgovor) {
          vm.napaka = odgovor.data.message;
        }
      );
    };
  }
  
  angular
    .module('tpo')
    .controller('generirajZetoneCtrl', generirajZetoneCtrl);
})();