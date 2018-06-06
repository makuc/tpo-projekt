(function() {
    /* global angular */
    
    individualniVnosCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', '$scope', '$timeout', 'predmetPodatki', 'izpitniRokPodatki', 'authentication', 'studentPodatki'];
    
    
    function individualniVnosCtrl($location, ostaloPodatki, $routeParams, $scope, $timeout, predmetPodatki, izpitniRokPodatki, authentication, studentPodatki){
        var vm = this;
        vm.podatki = {datum:new Date()};
        vm.vpisan = authentication.currentUser();
        
        vm.SVnosOcen = true;
        
        vm.studentId = $routeParams.studentId;
        
        studentPodatki.izpisStudenta(vm.studentId).then(
          function success(odgovor){
            vm.podatkiStudenta = odgovor.data;
            vm.kart = odgovor.data;
            
            vm.studijskaLeta = [];
            for(var i = 0; i < vm.podatkiStudenta.studijska_leta_studenta.length; i++)
            {
              var studLeto = vm.podatkiStudenta.studijska_leta_studenta[i].studijsko_leto;
              vm.studijskaLeta.push(studLeto);
            }
          },
          function error(odgovor){
            console.log(odgovor);
          }
        );
        
        vm.izbiraOcen = [1,2,3,4,5,6,7,8,9,10];
        
        if(vm.vpisan.zaposlen){
          ostaloPodatki.najdiZaposlenega(vm.vpisan.zaposlen).then(
            function success(odgovor){
              vm.ime = odgovor.data.zaposlen.ime;
              vm.priimek = odgovor.data.zaposlen.priimek;
            },
            function error(odgovor){
              console.log(odgovor);
            }
          );
        }
        if(vm.vpisan.referentka != true) {
          izpitniRokPodatki.najdiPredmeteZaposlenega().then(
            function success(odgovor){
              vm.opravlja = [];
              
              for(var i = 0; i < odgovor.data.length; i++){
                //console.log(odgovor.data[i] + " " + vm.podatki.studijskoLeto._id);
                if(seIzvaja(odgovor.data[i], vm.podatki.studijskoLeto._id)){
                    vm.opravlja.push(odgovor.data[i]);
                }
                
              }
            },
            function error(odgovor){
                console.log(odgovor);
            }
          );
        }
        
        vm.logoutFunc = function() {
          authentication.logout();
          return $location.path('/login');
        };
        
        function preveriDatum(datum){
          if(datum.getDay() > 5){
            vm.obvestilo = "Med vikendi ni mogoče dodanjanje izpitnega roka";
            return false;
          }
          return true;
        }
        
        vm.izbiraLeta = function(){
          pripraviIzborPredmetov();
        };
        function pripraviIzborPredmetov() {
          vm.predmeti = [];
          
          for(var i = 0; i < vm.podatkiStudenta.studijska_leta_studenta.length; i++)
          {
            vm.sLeto = vm.podatkiStudenta.studijska_leta_studenta[i];
            
            if(vm.sLeto.studijsko_leto._id == vm.podatki.studijskoLeto._id)
            {
              var predmetnik = vm.sLeto.predmeti;
              
              for(var j = 0; j < predmetnik.length; j++)
              {
                if(vm.vpisan.referentka == true)
                {
                  vm.predmeti.push(predmetnik[j].predmet);
                }
                else
                {
                  for(var k = 0; k < vm.opravlja.length; k++)
                  {
                    console.log("Primerjaj:", vm.opravlja[k], " | ", predmetnik[j]._id);
                  }
                }
              }
            }
          }
          
          console.log("Konec iskanja:", vm.predmeti);
          
          $timeout(function() {
            $scope.$apply();
          }, 0);
        }
        
        vm.izbirajPodrobnosti = false;
        vm.izbranPredmet = function(){
          vm.izbirajPodrobnosti = false;
          
          console.log("Izbrano leto:", vm.podatki.studijskoLeto);
          
          if(vm.podatki.studijskoLeto && vm.podatki.predmet)
          {
            izpitniRokPodatki.pridobiIzvedbePredmeta(vm.podatki.predmet._id, vm.podatki.studijskoLeto._id).then(
              function success(odgovor){
                console.log("Izvedbe: ", odgovor.data);
                vm.izvedbe = odgovor.data;
                
                // Najdi izbran letnik
                for(var j = 0; j < vm.sLeto.predmeti.length; j++)
                {
                  if(vm.podatki.predmet._id == vm.sLeto.predmeti[j].predmet._id)
                  {
                    vm.izpit = vm.sLeto.predmeti[j].izpit;
                    vm.myPredmet = vm.sLeto.predmeti[j];
                    
                    if(vm.izpit && vm.myPredmet.ocena <= 0)
                    {
                      console.log("Prijavljen na izpit !!!");
                      parseIzpit();
                    }
                    else
                    {
                      console.log("Ni prijave na izpit !!!");
                      
                      vm.datum = new Date();
                      
                      vm.dan = vm.datum.getDate();
                      vm.mesec = vm.datum.getMonth() +1;
                      vm.leto = vm.datum.getFullYear();
                      
                      vm.ura = undefined;
                      vm.minuta = undefined;
                      
                      vm.opravljanjLetos = vm.myPredmet.zaporedni_poskus +1;
                      vm.opravljanjSkupaj = vm.myPredmet.zaporedni_poskus_skupaj +1;
                      
                      vm.podatki.lokacija = "";
                      
                      vm.izbirajPodrobnosti = true;
                    }
                  }
                }
              },
              function error(odgovor){
                console.log(odgovor);
              }
            );
          }
        };
        function parseIzpit() {
          izberiIzvajalca();
          
          vm.datum = new Date(vm.izpit.datum_izvajanja);
          
          vm.dan = vm.datum.getDate();
          vm.mesec = vm.datum.getMonth() +1;
          vm.leto = vm.datum.getFullYear();
          
          vm.ura = vm.datum.getHours();
          vm.minuta = vm.datum.getMinutes();
          
          vm.podatki.lokacija = vm.izpit.lokacija;
          
          var polaganje = najdiPolaganje();
          //console.log("Polaganje:", polaganje);
          
          vm.opravljanjLetos = polaganje.zaporedni_poskus;
          vm.opravljanjSkupaj = polaganje.zaporedni_poskus_skupaj;
          
          vm.izbirajPodrobnosti = true;
        }
        function izberiIzvajalca() {
          var najdena = false;
          
          // Najdi izbrano izvedbo
          for(var i = 0; i < vm.izvedbe.length && !najdena; i++)
          {
            var izvPredmeta = vm.izvedbe[i].izvajalci;
            var izvIzpita = vm.izpit.izvajalci;
            
            najdena = izvPredmeta.length == izvIzpita.length;
            
            for(var x = 0; x < izvPredmeta.length; x++)
            {
              for(var y = 0; y < izvIzpita.length; y++)
              {
                if(izvPredmeta[x]._id == izvIzpita[y]._id)
                {
                  vm.podatki.izvedbe = vm.izvedbe[i];
                }
                
              }
            }
          }
        }
        function najdiPolaganje() {
          console.log("Iščem polaganje...");
          
          for(var i = 0; i < vm.izpit.polagalci.length; i++)
          {
            vm.polaganje = undefined;
            
            if(vm.izpit.polagalci[i].student == vm.studentId)
            {
              return vm.izpit.polagalci[i];
            }
          }
        }
        
        function seIzvaja(predmet, studijskoLeto){
            for(var i = 0; i < predmet.izvedbe_predmeta.length; i++){
                if(predmet.izvedbe_predmeta[i].studijsko_leto == studijskoLeto){
                    return true;
                }
            }
            return false;
        }
        
        vm.individualnoOddaj = function() {
          var datumOk = urediDatum(vm.podatki.datum);
            
          if(datumOk){
              var data = {
                predmet: vm.podatki.predmet._id,
                studijsko_leto: vm.podatki.studijskoLeto._id,
                datum_izvajanja: vm.objectDatum,
                izvedba_predmeta: vm.podatki.izvedbe._id,
                lokacija: vm.podatki.lokacija,
                opombe: vm.podatki.maxPrijav,
                koncna_ocena: vm.izbranaOcena,
                zaporedni_poskus: vm.opravljanjLetos,
                zaporedni_poskus_skupaj: vm.opravljanjSkupaj
              };
  
              //console.log("Data: ", data);
              
              ostaloPodatki.inidividualniVnosOcene(vm.studentId, data).then(
                  function success(odgovor){
                      console.log(odgovor);
                      //vm.obvestilo = "USPEH!";
                      vm.obvestiloSucc = "Ocena uspešno vnešena.";
                      vm.obvestilo = "";
                      //$location.path("/");
                  },
                  function error(odgovor){
                      vm.obvestilo = odgovor.data.message;
                      vm.obvestiloSucc = "";
                      console.log(odgovor);
                  }
              ); 
          }
        };
        
        function urediDatum() {
          vm.datum.setDate(vm.dan);
          vm.datum.setMonth(vm.mesec -1);
          vm.datum.setFullYear(vm.leto);
          
          if(vm.ura)
            vm.datum.setHours(vm.ura);
          else
            vm.datum.setHours(0);
          
          if(vm.minuta)
            vm.datum.setMinutes(vm.minuta);
          else
            vm.datum.setMinutes(0);
          
          vm.objectDatum = vm.datum;
          
          return preveriDatum(vm.objectDatum);
        }
        
        vm.preklici = function(){
            $location.path("/podrobnostiStudenta/" + vm.studentId);
        };
    }
    
    angular
        .module('tpo')
        .controller('individualniVnosCtrl', individualniVnosCtrl);
})();