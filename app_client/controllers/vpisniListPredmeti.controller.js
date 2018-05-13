(function() {
    
    /* global angular */
    
    
    vpisniListPredmetiCtrl.$inject = ['studentPodatki', '$routeParams', 'authentication', 'ostaloPodatki', '$location'];
    
    function vpisniListPredmetiCtrl(studentPodatki, $routeParams, authentication, ostaloPodatki, $location){
        var vm = this;
        
        vm.idVpisnice = $routeParams.idVpisnice;
        
        console.log(vm.idVpisnice);
        studentPodatki.pridobiPodatkeVpisnice(vm.idVpisnice).then(
            function success(odgovor){
                console.log(odgovor.data);
                vm.podatkiVpisnice = odgovor.data;
                predizpolni();
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        
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
        
        function predizpolni() {
            if(vm.podatkiVpisnice.vpisniList.letnik.naziv == "1. letnik"){
                vm.prviLetnik = true;
                pridobiObveznePredmete();
            } else if(vm.podatkiVpisnice.vpisniList.letnik.naziv == "2. letnik"){
                vm.izbirniPredmeti = true;
                vm.drugiLetnik = true;
            } else if(vm.podatkiVpisnice.vpisniList.letnik.naziv == "3. letnik"){
                vm.izbirniPredmeti = true;
                vm.moduli = true;
                vm.tretjiLetnik = true;
            }
        }
        
        function pridobiObveznePredmete() {
            ostaloPodatki.pridobiVseVeljavnePredmetnike().then(
                function success(odgovor){
                    console.log(odgovor.data);
                    vm.obvezniPredmeti = [];
                    for(var i = 0; i < odgovor.data.length; i++){
                        if(odgovor.data[i].letnik.naziv == vm.podatkiVpisnice.vpisniList.letnik.naziv &&
                            odgovor.data[i].studijski_program.sifra == vm.podatkiVpisnice.vpisniList.studijski_program.sifra &&
                            odgovor.data[i].del_predmetnika.naziv  ==  "obvezni predmeti" &&
                            odgovor.data[i].studijsko_leto._id == vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                                vm.obvezniPredmeti = odgovor.data[i].predmeti;
                        }
                        
                        if(vm.drugiLetnik){
                            if(odgovor.data[i].letnik.naziv == vm.podatkiVpisnice.vpisniList.letnik.naziv &&
                                odgovor.data[i].studijski_program.sifra == vm.podatkiVpisnice.vpisniList.studijski_program.sifra &&
                                odgovor.data[i].del_predmetnika.naziv  ==  "splošno izbirni" &&
                                odgovor.data[i].studijsko_leto._id == vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                                vm.splosnoIzbirniPredmeti = odgovor.data[i].predmeti;
                            }
                            
                            if(odgovor.data[i].letnik.naziv == vm.podatkiVpisnice.vpisniList.letnik.naziv &&
                                odgovor.data[i].studijski_program.sifra == vm.podatkiVpisnice.vpisniList.studijski_program.sifra &&
                                odgovor.data[i].del_predmetnika.naziv  ==  "strokovno izbirni" &&
                                odgovor.data[i].studijsko_leto._id == vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                                vm.strokovnoIzbirniPredmeti = odgovor.data[i].predmeti;
                            }
                        }
                        
                        if(vm.tretjiLetnik){
                            if(odgovor.data[i].letnik.naziv == vm.podatkiVpisnice.vpisniList.letnik.naziv &&
                                odgovor.data[i].studijski_program.sifra == vm.podatkiVpisnice.vpisniList.studijski_program.sifra &&
                                odgovor.data[i].del_predmetnika.naziv  ==  "splošno izbirni" &&
                                odgovor.data[i].studijsko_leto._id == vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                                vm.splosnoIzbirniPredmeti = odgovor.data[i].predmeti;
                            }
                            if(odgovor.data[i].letnik.naziv == vm.podatkiVpisnice.vpisniList.letnik.naziv &&
                                odgovor.data[i].studijski_program.sifra == vm.podatkiVpisnice.vpisniList.studijski_program.sifra &&
                                odgovor.data[i].del_predmetnika.naziv  ==  "moduli" &&
                                odgovor.data[i].studijsko_leto._id == vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                                vm.moduliPredmeti = odgovor.data[i].predmeti;
                            }
                        }
                        
                    }
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        }
        
        vm.dodajModul = function(idPredmeta){
            studentPodatki.dodajModulniPredmet(vm.idVpisnice, idPredmeta).then(
                function success(odgovor){
                    console.log(odgovor);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
                
        };
        
        vm.odstraniModul = function(idPredmeta){
            studentPodatki.odstraniModulniPredmet(vm.idVpisnice, idPredmeta).then(
                function success(odgovor){
                    console.log(odgovor);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
                
        };
        
        vm.dodajStokovnoIzbirni = function(idPredmeta){
            studentPodatki.dodajStokovnoIzbirniPredmet(vm.idVpisnice, idPredmeta).then(
                function success(odgovor){
                    console.log(odgovor);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
                
        };
        
        vm.odstraniStrokovnoIzbirni = function(idPredmeta){
            studentPodatki.odstraniStrokovnoIzbirniPredmet(vm.idVpisnice, idPredmeta).then(
                function success(odgovor){
                    console.log(odgovor);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
                
        };
        
        vm.dodajSplosnoIzbirni = function(idPredmeta){
            studentPodatki.dodajSplosnoIzbirniPredmet(vm.idVpisnice, idPredmeta).then(
                function success(odgovor){
                    console.log(odgovor);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
                
        };
        
        vm.odstraniSplosnoIzbirni = function(idPredmeta){
            studentPodatki.odstraniSplosnoIzbirniPredmet(vm.idVpisnice, idPredmeta).then(
                function success(odgovor){
                    console.log(odgovor);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
                
        };


        vm.naslednjiKorak = function() {
            var data = {
                oblika_studija: "5ac8beac24ee18109953514b",
                obvezniPredmeti: vm.obvezniPredmeti
            };
            console.log(data);
            studentPodatki.oddajaVpisnice(vm.idVpisnice, data).then(
                function success(odgovor){
                    console.log(odgovor);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );    
            
        };
        
    }
    
    
    angular
        .module('tpo')
        .controller('vpisniListPredmetiCtrl', vpisniListPredmetiCtrl);
    
})();