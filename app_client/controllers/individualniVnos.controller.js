(function() {
    /* global angular */
    
    individualniVnosCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki', 'izpitniRokPodatki', 'authentication', 'studentPodatki'];
    
    
    function individualniVnosCtrl($location, ostaloPodatki, $routeParams, predmetPodatki, izpitniRokPodatki, authentication, studentPodatki){
        var vm = this;
        vm.podatki = {datum:new Date()};
        vm.vpisan=authentication.currentUser();
        
        vm.studentId = $routeParams.studentId;
        
        studentPodatki.izpisStudenta(vm.studentId).then(
            function success(odgovor){
                vm.podatkiStudenta = odgovor.data;
                console.log(odgovor.data);
                if($routeParams.studentId)
                {
                  vm.vsiStudenti = [];
                  vm.vsiStudenti.push(vm.podatkiStudenta);
                  vm.izbranStudent = vm.vsiStudenti[0];
                }
                var nasel = false;
                console.log("Student id: ", )
                for (var i = 0; i < vm.podatkiStudenta.studijska_leta_studenta.length; i++) {
                  if(vm.podatkiStudenta.studijska_leta_studenta[i].studijsko_leto._id == vm.podatki.studijskoLeto._id || $routeParams.studentId)
                  {
                    for (var j = 0; j < vm.podatkiStudenta.studijska_leta_studenta[i].predmeti.length; j++) {
                      //console.log("predmet stud: ", vm.podatkiStudenta.studijska_leta_studenta[i].predmeti[j].predmet);
                      //console.log("predmet: ", vm.podatki.predmet);
                      //console.log("");
                      if(vm.podatkiStudenta.studijska_leta_studenta[i].predmeti[j].predmet._id == vm.podatki.predmet._id)
                      {
                        vm.opravljanjLetos = vm.podatkiStudenta.studijska_leta_studenta[i].predmeti[j].zaporedni_poskus;
                        vm.opravljanjSkupaj = vm.podatkiStudenta.studijska_leta_studenta[i].predmeti[j].zaporedni_poskus_skupaj;
                        nasel = true;
                        console.log("(" + vm.opravljanjLetos + "," + vm.opravljanjSkupaj + ")");
                        break;
                      }
                    }
                    if(!$routeParams.studentId)
                    {
                      break;
                    }
                  }
                }
                if(nasel == false)
                {
                  vm.opravljanjLetos = 1;
                  vm.opravljanjSkupaj = 1;
                }
                console.log("Podatki studenta: ", vm.podatkiStudenta);
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        vm.izbiraOcen = [1,2,3,4,5,6,7,8,9,10];
        
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
        
        function preveriDatum(datum){
            if(datum.getDay() > 5){
                vm.obvestilo = "Med vikendi ni mogoče dodanjanje izpitnega roka";
                return false;
            }
            return true;
            
        }
        
        vm.izbrano = function(){
            vm.predmeti = [];
            //console.log(vm.podatki.studijskoLeto._id);
            if(vm.vpisan.referentka == true)
            {
              predmetPodatki.izpisiVseVeljavnePredmete().then(
                  function success(odgovor){
                      for(var i = 0; i < odgovor.data.length; i++){
                          //console.log(odgovor.data[i] + " " + vm.podatki.studijskoLeto._id);
                          if(seIzvaja(odgovor.data[i], vm.podatki.studijskoLeto._id)){
                              vm.predmeti.push(odgovor.data[i]);
                          }
                      }
                  },
                  function error(odgovor){
                      console.log(odgovor);
                  }
              );
            }
            else
            {
              izpitniRokPodatki.najdiPredmeteZaposlenega().then(
                function success(odgovor){
                  for(var i = 0; i < odgovor.data.length; i++){
                    //console.log(odgovor.data[i] + " " + vm.podatki.studijskoLeto._id);
                    if(seIzvaja(odgovor.data[i], vm.podatki.studijskoLeto._id)){
                        vm.predmeti.push(odgovor.data[i]);
                    }
                    
                  }
                },
                function error(odgovor){
                    console.log(odgovor);
                }
              );
            }
            
            //console.log("Predmeti: ", vm.predmeti);
        };
        
        vm.izbranPredmet = function(){
            //console.log(vm.podatki.predmet);
            console.log(vm.podatki.studijskoLeto);
            izpitniRokPodatki.pridobiIzvedbePredmeta(vm.podatki.predmet._id, vm.podatki.studijskoLeto._id).then(
                function success(odgovor){
                    console.log(odgovor.data);
                    vm.izvedbe = odgovor.data;
                    
                      /*studentPodatki.izpisStudentov().then(
                        
                      );*/
                    if($routeParams.studentId)
                    {
                      vm.dobiStudenta($routeParams.studentId);

                      console.log("Student: ", vm.vsiStudenti);
                    }
                    else
                    {
                      predmetPodatki.najdiVpisaneVPredmet(vm.podatki.predmet._id, vm.podatki.studijskoLeto._id).then(
                        function success(odgovor){
                          vm.vsiStudenti = odgovor.data.vpisani.studenti;
                          //vm.izbranStudent = vm.vsiStudenti[0];
                          console.log("Vsi studenti: ", vm.vsiStudenti);
                        },
                        function error(odgovor){
                            console.log(odgovor);
                        }
                      );
                    }
                      
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            ); 
        };
        
        vm.dobiStudenta = function(studentId)
        {
          studentPodatki.izpisStudenta(studentId).then(
            function success(odgovor){
                vm.podatkiStudenta = odgovor.data;
                console.log(odgovor.data);
                if($routeParams.studentId)
                {
                  vm.vsiStudenti = [];
                  vm.vsiStudenti.push(vm.podatkiStudenta);
                  vm.izbranStudent = vm.vsiStudenti[0];
                }
                var nasel = false;
                console.log("Student id: ", )
                for (var i = 0; i < vm.podatkiStudenta.studijska_leta_studenta.length; i++) {
                  if(vm.podatkiStudenta.studijska_leta_studenta[i].studijsko_leto._id == vm.podatki.studijskoLeto._id || $routeParams.studentId)
                  {
                    for (var j = 0; j < vm.podatkiStudenta.studijska_leta_studenta[i].predmeti.length; j++) {
                      //console.log("predmet stud: ", vm.podatkiStudenta.studijska_leta_studenta[i].predmeti[j].predmet);
                      //console.log("predmet: ", vm.podatki.predmet);
                      //console.log("");
                      if(vm.podatkiStudenta.studijska_leta_studenta[i].predmeti[j].predmet._id == vm.podatki.predmet._id)
                      {
                        vm.opravljanjLetos = vm.podatkiStudenta.studijska_leta_studenta[i].predmeti[j].zaporedni_poskus;
                        vm.opravljanjSkupaj = vm.podatkiStudenta.studijska_leta_studenta[i].predmeti[j].zaporedni_poskus_skupaj;
                        nasel = true;
                        console.log("(" + vm.opravljanjLetos + "," + vm.opravljanjSkupaj + ")");
                        break;
                      }
                    }
                    if(!$routeParams.studentId)
                    {
                      break;
                    }
                  }
                }
                if(nasel == false)
                {
                  vm.opravljanjLetos = 1;
                  vm.opravljanjSkupaj = 1;
                }
                console.log("Podatki studenta: ", vm.podatkiStudenta);
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        };
        
        function seIzvaja(predmet, studijskoLeto){
            for(var i = 0; i < predmet.izvedbe_predmeta.length; i++){
                if(predmet.izvedbe_predmeta[i].studijsko_leto == studijskoLeto){
                    return true;
                }
            }
            return false;
        }
        
        vm.individualnoOddaj = function()
        {
          var datumOk = urediDatum(vm.podatki.datum);
            
          if(datumOk){
              var data = {
                predmet: vm.podatki.predmet._id,
                studijsko_leto: vm.podatki.studijskoLeto._id,
                datum_izvajanja: vm.objectDatum,
                izvedba_predmeta: vm.podatki.izvedbe._id,
                lokacija: vm.podatki.lokacija,
                opombe: vm.podatki.maxPrijav,
                tock: vm.izbraneTocke,
                koncna_ocena: vm.izbranaOcena,
                zaporedni_poskus: vm.opravljanjLetos,
                zaporedni_poskus_skupaj: vm.opravljanjSkupaj
              };
  
              console.log("Data: ", data);
          
              ostaloPodatki.inidividualniVnosOcene(vm.izbranStudent._id ,data).then(
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
        

        ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then(
            function success(odgovor){
                vm.studijskaLeta = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        function urediDatum(){
            if(vm.ura){
                 var ura = vm.ura - 2;
                console.log(ura);
                
                if(ura.toString().length == 1){
                    ura = "0" + ura;
                }
                var date = vm.leto + "-" + vm.mesec + "-" + vm.dan + "T" + ura + ":" + vm.minuta + ":00.000Z";
            } else {
                var date = vm.leto + "-" + vm.mesec + "-" + vm.dan + "T" + "22:00:00.000Z";
            }
           
            vm.objectDatum = new Date(date);
            
            return preveriDatum(vm.objectDatum);
        }

        
        vm.shrani = function(){
            //preveri veljavnost datuma
            
            //console.log(vm.podatki.izvedbe);

            var datumOk = urediDatum(vm.podatki.datum);
            
            if(datumOk){
                var data = {
                predmet: vm.podatki.predmet,
                studijsko_leto: vm.podatki.studijskoLeto,
                datum_izvajanja: vm.objectDatum,
                izvedba_predmeta: vm.podatki.izvedbe,
                lokacija: vm.podatki.lokacija,
                opombe: vm.podatki.maxPrijav
                };
    
                console.log(data);
            
                izpitniRokPodatki.ustvariIzpitniRok(data).then(
                    function success(odgovor){
                        console.log(odgovor);
                        $location.path("/vsiIzpitniRoki");
                    },
                    function error(odgovor){
                        vm.obvestilo = odgovor.data.message;
                        console.log(odgovor);
                    }
                ); 
            }
                
            

        };
        
        vm.preklici = function(){
            $location.path("/vsiIzpitniRoki");
        };
    }
    
    angular
        .module('tpo')
        .controller('individualniVnosCtrl', individualniVnosCtrl);
})();