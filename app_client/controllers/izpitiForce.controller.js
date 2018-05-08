(function() {
    /* global angular */
    
    izpitiForceCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication', '$route'];
    
    
    function izpitiForceCtrl(ostaloPodatki, $scope, $location, authentication, $route){
        var vm = this;
        
        vm.studentId = $route.current.params.studentId;
        //console.log($route.current.params.studentId);
        //console.log(authentication.currentUser());
        
        vm.nextPage = function(){
            if(vm.trenutnaStran < vm.stVseh/10-1){
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
        
        vm.prikaziIzpite = function(){
            ostaloPodatki.vsiIzpitniRoki(vm.studentId).then(
                function success(odgovor){
                    vm.izpiti = odgovor.data;
                    vm.izpitiData = odgovor.data;
                    vm.stVseh = vm.izpiti.length;
                    vm.stNaStran = 10;
                    vm.trenutnaStran = 0;
                    
                    var array = [setPagingData(1)];
                    
                    vm.strani = [1];
                    
                    for(var i = 2; i <= (vm.stVseh/10)+1; i++){
                        array.push(setPagingData(i));
                        vm.strani.push(i);
                    }
                    
                    function setPagingData(page){
                        var pagedData = vm.izpiti.slice(
                            (page - 1) * vm.stNaStran,
                            page * vm.stNaStran
                            );
                        return pagedData;
                    }
                    vm.izpiti = array;
                    vm.unikatPrijave = {};
                    
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
            var sporocilo = 0;
            if(upostevanRok > datumIzvajanja) {
                 console.log("Rok za prijavo na izpit je potekel.")
                 vm.obvestilo = "Rok za prijavo na izpit je potekel.";
                 sporocilo = 1;
                 //return;
            }
            
            for (var i = 0; i < vm.izpitiData.length; i++) {
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
            }
            var studentData = {
              student: vm.studentId
            };
            ostaloPodatki.prijaviNaRokForce(izpitId, studentData).then(
                function success(odgovor){
                    vm.prikaziIzpite();
                    if(sporocilo == 0)
                    {
                      vm.obvestilo = "";
                    }
                },
                function error(odgovor){
                    console.log("Err:", odgovor);
                    vm.obvestilo = "Opozorilo";
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
            var potekel = false;
            if(upostevanRok > datumIzvajanja) {
                 console.log("Rok za odjavo od izpita je potekel.")
                 vm.obvestilo = "Rok za odjavo od izpita je potekel.";
                 potekel = true;
                 //return;
            }
            ostaloPodatki.odjaviOdRokaForce(izpitId, vm.studentId).then(
                function success(odgovor){
                    vm.prikaziIzpite();
                    if(potekel == false)
                    {
                      vm.obvestilo = "";
                    }
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.obvestilo = "Opozorilo";
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