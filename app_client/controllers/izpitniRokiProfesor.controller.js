(function() {
    /* global angular */
    
    
    
    
    izpitniRokiProfesorCtrl.$inject = ['$location', 'authentication', 'izpitniRokPodatki', 'ostaloPodatki'];
    
    function izpitniRokiProfesorCtrl($location, authentication, izpitniRokPodatki, ostaloPodatki) {
        var vm = this;
        
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
        
        vm.izvajalci = function(id_rok){
            $location.path('/dodajIzvajalceIzpitniRok/profesor/' + id_rok); 
        };
        
    }
    
    
    angular
        .module('tpo')
        .controller('izpitniRokiProfesorCtrl', izpitniRokiProfesorCtrl);
})();