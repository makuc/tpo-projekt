(function() {
    /* global angular */
    
    izpitiCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication'];
    
    
    function izpitiCtrl(ostaloPodatki, $scope, $location, authentication){
        var vm = this;
        
        vm.studentId = authentication.currentUser().student;
        //console.log(authentication.currentUser());
        
        vm.naStran = 10.0;
        vm.stran = 0;
        vm.strani = [1];
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
            pripraviStrani()
        });
        
        vm.prikaziIzpite = function(){
            ostaloPodatki.vsiIzpitniRoki(vm.studentId).then(
                function success(odgovor){
                    vm.izpiti = odgovor.data;
                    for (var i = 0; i < vm.izpiti.length; i++) {
                        for (var j = 0; j < vm.izpiti[i].polagalci.length; j++) {
                            if(vm.izpiti[i].polagalci[j].student == vm.studentId)
                            {
                                vm.izpiti[i].polagalec = vm.izpiti[i].polagalci[j];
                            }
                        }
                    }
                    vm.unikatPrijave = {};
                    pripraviStrani();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.prijavi = function(izpitId, datumIzvajanja, predmetId){
            datumIzvajanja = new Date(datumIzvajanja);
            var dns = new Date(Date.now());
            var upostevanRok = new Date(dns.getFullYear(), dns.getMonth(), dns.getDate() + 2);
            if(upostevanRok > datumIzvajanja) {
                 console.log("Rok za prijavo na izpit je potekel.");
                 vm.obvestilo = "Rok za prijavo na izpit je potekel.";
                 return;
            }
            
            /*for (var i = 0; i < vm.izpiti.length; i++) {
              if(vm.izpiti[i].predmet._id == predmetId && vm.jePrijavljen(vm.izpiti[i].polagalci) == true)
              {
                //console.log("na ta predmet ste ze prijavljeni");
                vm.obvestilo = "Za ta predmet že obstaja prijava na izpit.";
                return;
              }
            }*/
            var studentData = {
              student: vm.studentId
            };
            ostaloPodatki.prijaviNaRok(izpitId, studentData).then(
                function success(odgovor){
                    vm.prikaziIzpite();
                    vm.obvestilo = "";
                },
                function error(odgovor){
                    console.log("Err:", odgovor);
                    vm.obvestilo = odgovor.data.message;
                }
            );
        };
        
        vm.odjavi = function(izpitId, datumIzvajanja){
            datumIzvajanja = new Date(datumIzvajanja);
            var dns = new Date(Date.now());
            var upostevanRok = new Date(dns.getFullYear(), dns.getMonth(), dns.getDate() + 2);
            /*console.log("upostevanRok: ", upostevanRok);
            console.log("datumIzvajanja: ", datumIzvajanja);
            console.log("upostevanRok < datumIzvajanja = ", upostevanRok < datumIzvajanja);
            console.log("/");*/
            if(upostevanRok > datumIzvajanja) {
                 console.log("Rok za odjavo od izpita je potekel.")
                 vm.obvestilo = "Rok za odjavo od izpita je potekel.";
                 return;
            }
            ostaloPodatki.odjaviOdRoka(izpitId, vm.studentId).then(
                function success(odgovor){
                    vm.prikaziIzpite();
                    vm.obvestilo = "";
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.obvestilo = odgovor.data.message;
                }
            );
        };
        
        vm.jeUnikatPredmet = function(polagalci){
          return false;
        };
        
        vm.jePrijavljen = function(polagalci){
          if(polagalci == null || polagalci.length < 1)
          {
            return false;
          }
          //console.log("polagalci: ", polagalci);
          //console.log(polagalci.length);
          for (var i = 0; i < polagalci.length; i++) {
            if(polagalci[i].student == vm.studentId)
            {
              //console.log(polagalci[i]);
              if(polagalci[i].odjavljen == false && polagalci[i].valid == true)
              {
                return true;
              }
              else
              {
                return false;
              }
            }
          }
          return false;
        };
        
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
        
    }
    
    angular
        .module('tpo')
        .controller('izpitiCtrl', izpitiCtrl);
    
})();