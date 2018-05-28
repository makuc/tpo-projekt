(function(){
    
    /* global angular */
    
    izberiZetonCtrl.$inject = ['studentPodatki', 'authentication', 'ostaloPodatki', '$location'];
    
    function izberiZetonCtrl(studentPodatki, authentication, ostaloPodatki, $location){
        var vm = this;
        
        vm.neizkorisceniZetoni = [];
        studentPodatki.izpisStudenta(authentication.currentUser().student).then(
            function success(odgovor){
                console.log(odgovor.data);
                for(var i = 0; i < odgovor.data.zetoni.length; i++){
                    if(!odgovor.data.zetoni[i].izkoriscen){
                        vm.neizkorisceniZetoni.push(odgovor.data.zetoni[i]);
                        vm.pridobiPodatkeZetona(odgovor.data.zetoni[i]);
                    }
                }
                console.log(vm.neizkorisceniZetoni);
                vm.ime = odgovor.data.ime;
                vm.priimek = odgovor.data.priimek;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
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
        
        
        vm.nazaj = function(){
            $location.path('/vpis/' + authentication.currentUser().student + "/podatkiStudenta");
        };
        
        vm.izberi = function(zetonId){
            var data = {
                zeton: zetonId
            };
            console.log(data);
            studentPodatki.kreiranjeNovegaVpisa(data).then(
              function success(odgovor){
                  console.log(odgovor.data.vpisniList_id);
                  $location.path("/vpis/" + odgovor.data.vpisniList_id + "/izbiraPredmeta");
              },
              function error(odgovor){
                  console.log(odgovor);
              }
            );
        };
            
    }
    
    angular
        .module("tpo")
        .controller("izberiZetonCtrl", izberiZetonCtrl);
    
})();