(function() {
    /* global angular, moment */
    
    dodajSklepCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'authentication', 'studentPodatki'];
    
    
    function dodajSklepCtrl($location, ostaloPodatki, $routeParams, authentication, studentPodatki){
        var vm = this;
        
        vm.SSklipi = true;
        
         vm.vpisan=authentication.currentUser();
         vm.studentId = $routeParams.studentId;
         vm.sklepId = $routeParams.sklepId;
        
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
        
        vm.opcijeBool = ["true", "false"];
        
        vm.idDelaPredmetnika = $routeParams.idDelaPredmeta;
        
        

        vm.pridobiDelPredmeta = function(){
            studentPodatki.izpisStudenta(vm.studentId).then(
                function success(odgovor){
                    vm.kart = odgovor.data;
                    vm.deliPredmetnika = odgovor.data.sklepi;
                    //console.log(vm.deliPredmetnika);
                    //console.log(vm.sklepId);
                    for (var i = 0; i < vm.deliPredmetnika.length; i++) {
                      if(vm.deliPredmetnika[i]._id == vm.sklepId)
                      {
                        vm.delPredmetnika = vm.deliPredmetnika[i];
                        break;
                      }
                    }
                    if(!vm.delPredmetnika)
                    {
                        vm.datum = moment().locale("sl");
                        vm.delPredmetnika = {
                            datum: "",
                            besedilo: "",
                            organ: ""
                        };
                    }
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        vm.setDate = function () {
            // do you stuff.. and
            if(vm.datum)
                vm.delPredmetnika.datum = vm.datum.toISOString();
        };
        vm.shrani = function(){
          //console.log(vm.delPredmetnika.obvezen);
          console.log(vm.delPredmetnika.datum);
            var data = {
                datum: vm.delPredmetnika.datum,
                organ: vm.delPredmetnika.organ,
                besedilo: vm.delPredmetnika.besedilo
            };
            ostaloPodatki.dodajSklepStudentu(vm.studentId, data).then(
                function success(odgovor){
                    $location.path("/sklepi/" + vm.studentId);
                },
                function error(odgovor){
                    vm.obvestilo = odgovor.data.message;//"Že obstaja zapis s to šifro";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/sklepi/" + vm.studentId);
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajSklepCtrl', dodajSklepCtrl);
})();