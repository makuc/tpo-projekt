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
        
        vm.prikaziZetone = function(){
            studentPodatki.izpisStudenta(vm.studentId).then(
                function success(odgovor){
                    vm.student = odgovor.data;
                    vm.zetoni = vm.student.zetoni;
                    
                    for(var i = 0; i < vm.zetoni.length; i++){
                        vm.pridobiPodatkeZetona(vm.zetoni[i]);
                    }
                    pripraviStrani();
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
                              // oblika studija
                              ostaloPodatki.najdiStudijskoLeto(zeton.studijsko_leto).then
                              (
                                function success(odgovor)
                                {
                                  zeton.studijsko_leto = odgovor.data;
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