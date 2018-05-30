(function() {
    /* global angular */
    mainCtrl.$inject = ['$location', 'authentication', '$scope','$route','$window','$http', 'studentPodatki', 'ostaloPodatki', 'izpitniRokPodatki'];
    function mainCtrl($location, authentication, $scope, $route, $window, $http, studentPodatki, ostaloPodatki, izpitniRokPodatki) {
        var vm = this;
        
        
        function pridobiZahtevke() {
                vm.zahtevkiSprememba = [];
                vm.zahtevkiIzbris = [];
                izpitniRokPodatki.pridobiZahtevkeZaSpremembeIzpita(authentication.currentUser().student).then(
                    function success(odgovor){
                        vm.zahtevki = odgovor.data;
                        
                        for(var i = 0; i < vm.zahtevki.length; i++){
                            if(vm.zahtevki[i].spremembe.lokacija == null && vm.zahtevki[i].spremembe.datum_izvajanja == null){
                                vm.zahtevkiIzbris.push(vm.zahtevki[i]);
                            } else {
                                vm.zahtevkiSprememba.push(vm.zahtevki[i]);
                            }
                        }
                        console.log(odgovor.data);
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
        
        vm.vpisan=authentication.currentUser();
        
        vm.odpriIndeks = function(){
            $location.path("/elektronskiIndeks/" + authentication.currentUser().student);
        };
        
        // vpisani je student
        if(authentication.currentUser().student){
            vm.jeStudent = true;
            vm.student = true;
            //console.log(authentication.currentUser());
            pridobiZahtevke();
        
        
            studentPodatki.izpisStudenta(authentication.currentUser().student).then(
                function success(odgovor){
                    console.log(odgovor.data);
                    for(var i = 0; i < odgovor.data.zetoni.length; i++){
                        if(!odgovor.data.zetoni[i].izkoriscen){
                            vm.neizkoriscenZeton = true;
                        }
                    }
                    vm.ime = odgovor.data.ime;
                    vm.priimek = odgovor.data.priimek;
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
            
            vm.pridobiStudenta = function()
            {
                studentPodatki.izpisStudenta(vm.vpisan.student).then(
                    function success(odgovor){
                        vm.studentObject = odgovor.data;
                        console.log("Student: ", vm.studentObject);
                        console.log("Predmeti predmetnika: ", vm.studentObject.studijska_leta_studenta[vm.studentObject.studijska_leta_studenta.length - 1].predmeti);
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            };
            
            vm.vpisniList = function(){
              $location.path('/vpis/' + authentication.currentUser().student + '/podatkiStudenta');  
            };
            
            vm.potrdiSprememboIzpita = function(idIzpita){
                
                izpitniRokPodatki.potrdiSprememboIzpita(authentication.currentUser().student, idIzpita).then(
                    function success(odgovor){
                        console.log(odgovor);
                        pridobiZahtevke();
                    },
                    function error(odgovor){
                        console.log(odgovor);
                    }
                );
            };
            
            
            if(!authentication.auth()) {
                return $location.path('/login');
            }
            
            $scope.myData = function() {
                return $location.path('/myData');
            };
                
        }
        
        
        // vpisan je zaposlen
        if(authentication.currentUser().zaposlen){
            ostaloPodatki.najdiZaposlenega(authentication.currentUser().zaposlen).then(
                function success(odgovor){
                    vm.ime = odgovor.data.zaposlen.ime;
                    vm.priimek = odgovor.data.zaposlen.priimek;
                    if(odgovor.data.referentka){
                        vm.referentka = true;
                    }
                    if(odgovor.data.skrbnik){
                        vm.skrbnik = true;
                    }
                    if(odgovor.data.zaposlen.predavatelj){
                        vm.predavatelj = true;
                    }
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
            vm.zaposlen = true;
            
            vm.izpitniRoki = function() {
                $location.path('/izpitniRok/profesor');
            };
            
            vm.seznamVpisanihVPredmet = function() {
                // to do
                $location.path('/urediPredmete');
            };
        }

        
    }
    
    angular
        .module('tpo')
        .controller('mainCtrl', mainCtrl);
})();