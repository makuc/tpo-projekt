(function() {
    /* global angular */
    
    izpitiCtrl.$inject = ['ostaloPodatki', '$scope', '$location', 'authentication'];
    
    
    function izpitiCtrl(ostaloPodatki, $scope, $location, authentication){
        var vm = this;
        
        vm.studentId = authentication.currentUser().student;
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
            if(upostevanRok > datumIzvajanja) {
                 console.log("Rok za prijavo na izpit je potekel.")
                 vm.obvestilo = "Rok za prijavo na izpit je potekel.";
                 return;
            }
            
            for (var i = 0; i < vm.izpitiData.length; i++) {
              if(vm.izpitiData[i].predmet._id == predmetId && vm.jePrijavljen(vm.izpitiData[i].polagalci) == true)
              {
                //console.log("na ta predmet ste ze prijavljeni");
                vm.obvestilo = "Za ta predmet že obstaja prijava na izpit.";
                return;
              }
            }
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
                    vm.obvestilo = odgovor;
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
                    vm.obvestilo = odgovor;
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
              if(polagalci[i].odjavljen == false && polagalci[i].veljavnost == true)
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
        .controller('izpitiCtrl', izpitiCtrl);
    
})();