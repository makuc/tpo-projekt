(function() {
    /* global angular */
    
    dodajPredmetnikCtrl.$inject = ['$location', 'ostaloPodatki', '$routeParams', 'predmetPodatki', 'authentication'];
    
    
    function dodajPredmetnikCtrl($location, ostaloPodatki, $routeParams, predmetPodatki, authentication){
        var vm = this;
        
         vm.vpisan=authentication.currentUser();
         
         vm.PPredmetniki = true;
         vm.naslov = "Dodaj predmetnik";
        
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
        
        vm.id = $routeParams.idPredmetnika;
        
        ostaloPodatki.pridobiVseVeljavneStudijskePrograme().then(
            function success(odgovor){
                vm.studijskiProgrami = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then(
            function success(odgovor){
                vm.studijskaLeta = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        ostaloPodatki.pridobiVseVeljavneDelePredmetnika().then(
            function success(odgovor){
                vm.deliPredmetnika = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        vm.pridobiLetnike = function(){
            ostaloPodatki.pridobiVseVeljavneLetnike().then(
                function success(odgovor){
                    vm.letniki = [];
                    //console.log(odgovor.data);
                    if(vm.podatki.studijski_program.sifra == "VT"){
                        //uni
                        for(var i = 0; i < odgovor.data.length; i++){
                            //console.log(odgovor.data[i]);
                            if(odgovor.data[i].studijskiProgram.sifra == "VT"){
                                vm.letniki.push(odgovor.data[i]);
                            }
                        }
                    }
                    if(vm.podatki.studijski_program.sifra == "VU"){
                        //vs
                        for(var j = 0; j < odgovor.data.length; j++){
                            //console.log(odgovor.data[i]);
                            if(odgovor.data[j].studijskiProgram.sifra == "VU"){
                                vm.letniki.push(odgovor.data[j]);
                            }
                        }
                    }
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        predmetPodatki.izpisiVseVeljavnePredmete().then(
            function success(odgovor){
                vm.predmeti = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        vm.pridobi = function(){
        };
        
        vm.shrani = function(){
            var data = {
                studijski_program: vm.podatki.studijski_program,
                studijsko_leto: vm.podatki.studijsko_leto,
                letnik: vm.podatki.letnik,
                del_predmetnika: vm.podatki.del_predmetnika,
                ime: vm.podatki.ime
            };
            ostaloPodatki.dodajPredmetnik(data).then(
                function success(odgovor){
                    console.log(odgovor);
                    $location.path("/urediPredmetnike");
                },
                function error(odgovor){
                    vm.obvestilo = "Napaka";
                    console.log(odgovor);
                }
            );
        };
        
        vm.preklici = function(){
            $location.path("/urediPredmetnike");
        };
    }
    
    angular
        .module('tpo')
        .controller('dodajPredmetnikCtrl', dodajPredmetnikCtrl);
})();