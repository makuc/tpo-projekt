(function() {
    /* global angular */
    
    ustvariZetonCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication', '$routeParams', 'studentPodatki'];
    
    
    function ustvariZetonCtrl(ostaloPodatki, $scope, $location, authentication, $routeParams, studentPodatki){
        var vm = this;
        
        vm.studentId = $routeParams.studentId;
        
        vm.opcijeBool = [true, false];
        
        vm.prikaziZeton = function(){
            studentPodatki.izpisStudenta(vm.studentId).then(
                function success(odgovor){
                    vm.student = odgovor.data;
                    console.log("Student: ", vm.student);
                    
                    /*vm.zetoni = vm.student.zetoni;
                    
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
                    console.log("Zeton", vm.zeton);*/
                    vm.zeton = {};
                    
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
          ostaloPodatki.pridobiVseStudijskePrograme().then
          (
            function success(odgovor)
            {
              vm.sifranti.studijski_programi = odgovor.data;
              // letniki
              ostaloPodatki.pridobiVseLetnike().then
              (
                function success(odgovor)
                {
                  vm.sifranti.letniki = odgovor.data;
                  // vrste vpisa
                  ostaloPodatki.pridobiVseVrsteVpisa().then
                  (
                    function success(odgovor)
                    {
                      vm.sifranti.vrste_vpisa = odgovor.data;
                      // nacini studija
                      ostaloPodatki.pridobiVseNacineStudija().then
                      (
                        function success(odgovor)
                        {
                          vm.sifranti.nacini_studija = odgovor.data;
                          // oblike studija
                          ostaloPodatki.pridobiVseOblikeStudija().then
                          (
                            function success(odgovor)
                            {
                              vm.sifranti.oblike_studija = odgovor.data;
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
                studijski_program: vm.zeton.studijski_program._id,
                letnik: vm.zeton.letnik._id,
                vrsta_vpisa: vm.zeton.vrsta_vpisa._id,
                nacin_studija: vm.zeton.nacin_studija._id,
                oblika_studija: vm.zeton.oblika_studija._id,
                prosta_izbira: vm.zeton.prosta_izbira,
                studijsko_leto: "5ac3c4553f0fb21a058ff3d8",
                studijsko_leto_prvega_vpisa_v_ta_program: "5ac3c4553f0fb21a058ff3d8",
                vrsta_studija: "5ac8bb39c3e49f0ee16a8b36",
                usmeritev: "-",
                izbirna_skupina: "-",
                kraj_izvajanja: "Ljubljana"
            };
            console.log("Data: ", data);
            ostaloPodatki.dodajZetonStudentu(vm.studentId, data).then(
                function success(odgovor){
                    $location.path("/prikaziStudente/" + vm.studentId + "/zetoni");
                },
                function error(odgovor){
                    vm.obvestilo = "Neveljavni podatki.";
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
        .controller('ustvariZetonCtrl', ustvariZetonCtrl);
})();