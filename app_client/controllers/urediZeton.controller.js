(function() {
    /* global angular */
    
    urediZetonCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication', '$routeParams', 'studentPodatki'];
    
    
    function urediZetonCtrl(ostaloPodatki, $scope, $location, authentication, $routeParams, studentPodatki){
        var vm = this;
        
        vm.studentId = $routeParams.studentId;
        vm.zetonId = $routeParams.zetonId;
        
        vm.opcijeBool = [true, false];
        
        vm.prikaziZeton = function(){
            studentPodatki.izpisStudenta(vm.studentId).then(
                function success(odgovor){
                    vm.student = odgovor.data;
                    vm.zetoni = vm.student.zetoni;
                    console.log("tle");
                    // Napolni zeton s podatki
                    console.log("Student:", vm.student);
                    for (var i = 0; i < vm.zetoni.length; i++) 
                    {
                      if(vm.zetoni[i]._id == vm.zetonId)
                      {
                        vm.pridobiPodatkeZetona(vm.zetoni[i]);
                        vm.zeton = vm.zetoni[i];
                        break;
                      }
                    }
                    console.log("Zeton", vm.zeton);
                    
                    vm.pridobiPodatkeSifrantov();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.pridobiPodatkeSifrantov = function()
        {
          vm.sifranti = {};
          // studijski programi
          ostaloPodatki.pridobiVseVeljavneStudijskePrograme().then
          (
            function success(odgovor)
            {
              vm.sifranti.studijski_programi = odgovor.data;
              // letniki
              ostaloPodatki.pridobiVseVeljavneLetnike().then
              (
                function success(odgovor)
                {
                  vm.sifranti.letniki = odgovor.data;
                  // vrste vpisa
                  ostaloPodatki.pridobiVseVeljavneVrsteVpisa().then
                  (
                    function success(odgovor)
                    {
                      vm.sifranti.vrste_vpisa = odgovor.data;
                      // nacini studija
                      ostaloPodatki.pridobiVseVeljavneNacineStudija().then
                      (
                        function success(odgovor)
                        {
                          vm.sifranti.nacini_studija = odgovor.data;
                          // oblike studija
                          ostaloPodatki.pridobiVseVeljavneOblikeStudija().then
                          (
                            function success(odgovor)
                            {
                              vm.sifranti.oblike_studija = odgovor.data;
                              
                              // studijska leta
                              ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then
                              (
                                function success(odgovor)
                                {
                                  vm.sifranti.studijska_leta = odgovor.data;
                                  //console.log("Sifranti: ", vm.sifranti);
                                  console.log("Sifranti: ", vm.sifranti);
                                },
                                function error(odgovor)
                                {
                                  console.log(odgovor);
                                }
                              );
                              //console.log("Sifranti: ", vm.sifranti);
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
                              
                              ostaloPodatki.najdiStudijskoLeto(zeton.studijsko_leto).then
                              (
                                function success(odgovor)
                                {
                                  zeton.studijsko_leto = odgovor.data;
                                  //console.log(zeton.studijsko_leto);
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
        
        vm.shrani = function(){
            var data = {
                studijski_program: vm.zeton.studijski_program,
                letnik: vm.zeton.letnik,
                vrsta_vpisa: vm.zeton.vrsta_vpisa,
                nacin_studija: vm.zeton.nacin_studija,
                oblika_studija: vm.zeton.oblika_studija,
                prosta_izbira: vm.zeton.prosta_izbira
            };
            ostaloPodatki.urediZetonStudenta(vm.studentId, vm.zetonId, data).then(
                function success(odgovor){
                    $location.path("/prikaziStudente/" + vm.studentId + "/zetoni");
                },
                function error(odgovor){
                    vm.obvestilo = "Neveljavni podatki - preverite vnešene ocene.";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/prikaziStudente/" + vm.studentId + "/zetoni");
        };
    }
    
    angular
        .module('tpo')
        .controller('urediZetonCtrl', urediZetonCtrl);
})();