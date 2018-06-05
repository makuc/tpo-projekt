(function() {
    /* global angular */
    
    
    izpitniRokiProfesorCtrl.$inject = ['$location', 'authentication', 'izpitniRokPodatki', 'ostaloPodatki'];
    
    function izpitniRokiProfesorCtrl($location, authentication, izpitniRokPodatki, ostaloPodatki) {
        var vm = this;
        
        vm.PIzpitniRoki = true;
        
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
        
        vm.logoutFunc = function() {
            delTok();
            return $location.path('/login');
        };
        
        function delTok(){
            return authentication.logout();
        }
        
        ostaloPodatki.pridobiVseVeljavneStudijskaLeta().then(
            function success(odgovor){
                vm.studijskaLeta = odgovor.data;
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        vm.prikazi = function(){
            vm.iskanje = " ";
            vm.VsiRoki = [];
            izpitniRokPodatki.najdiPredmeteZaposlenega().then(
            function success(odgovor){
                for(var i = 0; i < odgovor.data.length; i++){
                    izpitniRokPodatki.najdiVseIzpitePredmetaZaStudijskoLeto(vm.studijskoLeto._id, odgovor.data[i]._id).then(
                        function success(odg){
                            if(odg.data[0]){
                                for(var j = 0; j < odg.data.length; j++){
                                    vm.VsiRoki.push(odg.data[j]);
                                }
                            }
                        },
                        function error(odg){
                            console.log(odg);
                        }
                    );
                }
            },
            function error(odgovor){
                console.log(odgovor);
            }
            );
        };
        
        vm.uredi = function(id_rok){
            //console.log(id_rok);
            $location.path('/izpitniRok/profesor/uredi/' + id_rok); 
        };
        
        vm.izbrisi = function(rokId){
            izpitniRokPodatki.izbrisiIzpitniRok(rokId).then(
                function success(odgovor){
                    console.log(odgovor);
                    vm.prikazi();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        };
        
        vm.kandidati = function(rokId){
            $location.path('/vsiIzpitniRoki/' + rokId + '/kandidati')  ;
        };
        
    }
    
    
    angular
        .module('tpo')
        .controller('izpitniRokiProfesorCtrl', izpitniRokiProfesorCtrl);
})();