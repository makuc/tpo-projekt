(function() {
    /* global angular */
    
    urediZetoneCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication', '$routeParams', 'studentPodatki'];
    
    
    function urediZetoneCtrl(ostaloPodatki, $scope, $location, authentication, $routeParams, studentPodatki){
        var vm = this;
        
         vm.studentId = $routeParams.studentId;
         //console.log(vm.studentId);
        
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
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stZetonov/10-1){
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
        
        vm.prikaziZetone = function(){
            studentPodatki.izpisStudenta(vm.studentId).then(
                function success(odgovor){
                    vm.student = odgovor.data;
                    vm.zetoni = vm.student.zetoni;
                    vm.stZetonov = vm.zetoni.length;
                    vm.stZetonovNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    // Napolni zetone s podatki
                    console.log("Student:", vm.student);
                    for (var i = 0; i < vm.zetoni.length; i++) 
                    {
                      vm.pridobiPodatkeZetona(vm.zetoni[i]);
                    }
                    console.log("Zetoni", vm.zetoni);
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stZetonov/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.zetoni.slice(
                            (page - 1) * vm.stZetonovNaStran,
                            page * vm.stZetonovNaStran
                            );
                        return pagedData;
                    }
                    vm.zetoni = array;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.pridobiPodatkeZetona = function(zeton)
        {
          // studijski program
          ostaloPodatki.najdiStudijskiProgram(zeton.studijski_program).then
          (
            function success(odgovor)
            {
              zeton.studijski_program = odgovor.data;
              // letnik
              ostaloPodatki.najdiLetnik(zeton.letnik).then
              (
                function success(odgovor)
                {
                  zeton.letnik = odgovor.data;
                  // vrsta vpisa
                  ostaloPodatki.najdiVrstoVpisa(zeton.vrsta_vpisa).then
                  (
                    function success(odgovor)
                    {
                      zeton.vrsta_vpisa = odgovor.data;
                      // nacin studija
                      ostaloPodatki.najdiNacinStudija(zeton.nacin_studija).then
                      (
                        function success(odgovor)
                        {
                          zeton.nacin_studija = odgovor.data;
                          // oblika studija
                          ostaloPodatki.najdiOblikoStudija(zeton.oblika_studija).then
                          (
                            function success(odgovor)
                            {
                              zeton.oblika_studija = odgovor.data;
                            },
                            function error(odgovor)
                            {
                              console.log(odgovor);
                            }
                          );
                        },
                        function error(odgovor)
                        {
                          console.log(odgovor);
                        }
                      );
                    },
                    function error(odgovor)
                    {
                      console.log(odgovor);
                    }
                  );
                },
                function error(odgovor)
                {
                  console.log(odgovor);
                }
              );
            },
            function error(odgovor)
            {
              console.log(odgovor);
            }
          );
        };
        
        vm.izbris = function(zetonId){
            //console.log("izbris: ", zaposlenId);
            ostaloPodatki.izbrisiZetonStudentu(vm.studentId, zetonId).then(
                function success(odgovor){
                    vm.prikaziZetone();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.uredi = function(zetonId){
            $location.path("/prikaziStudente/" + vm.studentId + "/zetoni/" + zetonId);
        };
        
        vm.nazaj = function()
        {
          $location.path("/prikaziStudente");
        };
               
       $scope.orderByMe = function(x) { 
           if($scope.myOrderBy == x){
               $scope.bool=!($scope.bool);
           }
           
        $scope.myOrderBy = x;
        }
    }
    
    angular
        .module('tpo')
        .controller('urediZetoneCtrl', urediZetoneCtrl);
    
})();