(function() {
    /* global angular */
    
    izpitiForceCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication', '$route', 'studentPodatki'];
    
    
    function izpitiForceCtrl(ostaloPodatki, $scope, $location, authentication, $route, studentPodatki){
        var vm = this;
        
        vm.studentId = $route.current.params.studentId;
        vm.vpisan = authentication.currentUser();
        vm.SIzpiti = true;
        //console.log($route.current.params.studentId);
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
                    if(vm.stran > max -1)
                        vm.setPage(max -1);
                }
                
                vm.n = vm.strani.length-1;
                $scope.$apply();
            }, 500);
        }
        $scope.$watch('iskanje', function() {
            pripraviStrani();
        });
        
        vm.prikaziIzpite = function(){
            ostaloPodatki.obstajajociIzpitniRoki(vm.studentId).then(
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
                    studentPodatki.izpisStudenta(vm.studentId).then(
                        function success(odgovor){
                            vm.student = odgovor.data;
                            vm.kart = odgovor.data;
                        },
                        function error(odgovor){
                            console.log(odgovor);
                        }
                    );
                    console.log(vm.izpiti);
                    vm.unikatPrijave = {};
                    pripraviStrani();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.prijavi = function(izpitId, datumIzvajanja, predmetId){
            /*
            datumIzvajanja = new Date(datumIzvajanja);
            var dns = new Date(Date.now());
            var upostevanRok = new Date(dns.getFullYear(), dns.getMonth(), dns.getDate() + 2);
            var sporocilo = 0;
            if(upostevanRok > datumIzvajanja) {
                 console.log("Rok za prijavo na izpit je potekel.")
                 vm.obvestilo = "Rok za prijavo na izpit je potekel.";
                 sporocilo = 1;
                 //return;
            }
            
            /*console.log("tukaj");
            for (var i = 0; i < vm.izpitiData.length; i++) {
                console.log("tukaj2");
              if(vm.izpitiData[i].predmet._id == predmetId && vm.jePrijavljen(vm.izpitiData[i].polagalci) == true)
              {
                //console.log("na ta predmet ste ze prijavljeni");
                if(sporocilo == 1)
                {
                  vm.obvestilo = "Rok za prijavo na izpit je potekel. Za ta predmet že obstaja prijava na izpit.";
                }
                else
                {
                  vm.obvestilo = "Za ta predmet že obstaja prijava na izpit.";
                }
                sporocilo = 2;
                
                //return;
              }
            }*/
            var studentData = {
              student: vm.studentId
            };
            ostaloPodatki.prijaviNaRokForce(izpitId, studentData).then(
                function success(odgovor){
                    console.log(odgovor);
                    vm.prikaziIzpite();
                    vm.obvestilo = odgovor.data.message;
                    /*if(sporocilo == 0)
                    {
                      vm.obvestilo = "";
                    }*/
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
            /*var potekel = false;
            if(upostevanRok > datumIzvajanja) {
                 console.log("Rok za odjavo od izpita je potekel.")
                 vm.obvestilo = "Rok za odjavo od izpita je potekel.";
                 potekel = true;
                 //return;
            }*/
            ostaloPodatki.odjaviOdRokaForce(izpitId, vm.studentId).then(
                function success(odgovor){
                    vm.prikaziIzpite();
                    //if(potekel == false)
                    {
                      vm.obvestilo = odgovor.data.message;
                    }
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
        
    }
    
    angular
        .module('tpo')
        .controller('izpitiForceCtrl', izpitiForceCtrl);
    
})();