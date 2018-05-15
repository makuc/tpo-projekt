(function() {
    
    /* global angular */
    
    
    vpisniListPredmetiCtrl.$inject = ['studentPodatki', '$routeParams', 'authentication', 'ostaloPodatki', '$location'];
    
    function vpisniListPredmetiCtrl(studentPodatki, $routeParams, authentication, ostaloPodatki, $location){
        var vm = this;
        
        vm.idVpisnice = $routeParams.idVpisnice;
        
        console.log(vm.idVpisnice);
        
        pridobiObveznePredmete();
        
        
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
        
        function pridobiVseOstalo(){
             ostaloPodatki.pridobiVseVeljavnePredmetnike().then(
                function success(odgovor){
                    console.log(odgovor.data);
                    vm.obvezniPredmeti = [];
                    /*for(var i = 0; i < odgovor.data.length; i++){
                        /*if(odgovor.data[i].letnik.naziv == vm.podatkiVpisnice.vpisniList.letnik.naziv &&
                            odgovor.data[i].studijski_program.sifra == vm.podatkiVpisnice.vpisniList.studijski_program.sifra &&
                            odgovor.data[i].del_predmetnika.naziv  ==  "obvezni predmeti" &&
                            odgovor.data[i].studijsko_leto._id == vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                                vm.obvezniPredmeti = odgovor.data[i].predmeti;
                        }*/
                        
                       /* if(vm.drugiLetnik){
                            if(odgovor.data[i].letnik.naziv == vm.podatkiVpisnice.vpisniList.letnik.naziv &&
                                odgovor.data[i].studijski_program.sifra == vm.podatkiVpisnice.vpisniList.studijski_program.sifra &&
                                odgovor.data[i].del_predmetnika.naziv  ==  "splošni izbirni" &&
                                odgovor.data[i].studijsko_leto._id == vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                                vm.splosnoIzbirniPredmeti = odgovor.data[i].predmeti;
                                console.log(vm.splosnoIzbirniPredmeti);
                            }
                            
                            if(odgovor.data[i].letnik.naziv == vm.podatkiVpisnice.vpisniList.letnik.naziv &&
                                odgovor.data[i].studijski_program.sifra == vm.podatkiVpisnice.vpisniList.studijski_program.sifra &&
                                odgovor.data[i].del_predmetnika.naziv  ==  "strokovni izbirni" &&
                                odgovor.data[i].studijsko_leto._id == vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                                vm.strokovnoIzbirniPredmeti = odgovor.data[i].predmeti;
                                console.log(vm.strokovnoIzbirniPredmeti);
                            }
                        }
                        
                        if(vm.tretjiLetnik){
                            if(odgovor.data[i].letnik.naziv == vm.podatkiVpisnice.vpisniList.letnik.naziv &&
                                odgovor.data[i].studijski_program.sifra == vm.podatkiVpisnice.vpisniList.studijski_program.sifra &&
                                odgovor.data[i].del_predmetnika.naziv  ==  "splošni izbirni" &&
                                odgovor.data[i].studijsko_leto._id == vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                                vm.splosnoIzbirniPredmeti = odgovor.data[i].predmeti;
                                console.log(vm.splosnoIzbirniPredmeti);
                            }
                            
                        }
                        
                    }*/
                    
                    vm.podatkiVpisnice.vpisniList.predmeti = vm.obvezniPredmeti;
                        
                    console.log(vm.podatkiVpisnice);
                },
                function error(odgovor){
                    console.log(odgovor);
                }
                );
                
                if(vm.tretjiLetnik){
                    vm.modulniPredmeti = [];
                    for(var i = 0; i < vm.podatkiVpisnice.moduli.length; i++){
                        if(vm.podatkiVpisnice.moduli[i].studijsko_leto ==  vm.podatkiVpisnice.vpisniList.studijsko_leto._id){
                            vm.modulniPredmeti.push(vm.podatkiVpisnice.moduli[i]);
                        }
                    }
                }
                console.log(vm.modulniPredmeti);
        }
        
        function pridobiObveznePredmete() {
            studentPodatki.pridobiPodatkeVpisnice(vm.idVpisnice).then(
                function success(odgovor){
                    console.log(odgovor.data);
                    vm.podatkiVpisnice = odgovor.data;
                    if(vm.podatkiVpisnice.vpisniList.letnik.naziv == "1. letnik"){
                        vm.prviLetnik = true;
                    } else if(vm.podatkiVpisnice.vpisniList.letnik.naziv == "2. letnik"){
                        vm.izbirniPredmeti = true;
                        vm.drugiLetnik = true;
                    } else if(vm.podatkiVpisnice.vpisniList.letnik.naziv == "3. letnik"){
                        vm.izbirniPredmeti = true;
                        vm.moduli = true;
                        vm.tretjiLetnik = true;
                    }
                    pridobiVseOstalo();
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
            
            
            
        }
        
        vm.izbran = function(idPredmeta){
            for(var i = 0; i < vm.podatkiVpisnice.vpisniList.predmeti.length; i++){
                if(vm.podatkiVpisnice.vpisniList.predmeti[i]._id == idPredmeta){
                    return true;
                }
            }
            
            if(vm.podatkiVpisnice.vpisniList.splosniIzbirniPredmeti){
                for(var j = 0; j < vm.podatkiVpisnice.vpisniList.splosniIzbirniPredmeti.length; j++){
                    if(vm.podatkiVpisnice.vpisniList.splosniIzbirniPredmeti[j]._id == idPredmeta){
                        return true;
                    }
                }
            }
            
            //console.log(vm.podatkiVpisnice.vpisniList.strokovniIzbirniPredmeti);
            if(vm.podatkiVpisnice.vpisniList.strokovniIzbirniPredmeti){
                for(var k = 0; k < vm.podatkiVpisnice.vpisniList.strokovniIzbirniPredmeti.length; k++){
                    //console.log(vm.podatkiVpisnice.vpisniList.strokovniIzbirniPredmeti[k]._id + " == " + idPredmeta);
                    if(vm.podatkiVpisnice.vpisniList.strokovniIzbirniPredmeti[k]._id == idPredmeta){
                        return true;
                    }
                }
            }
        
            return false;
        };
        
        vm.izbranModul = function(idModula){
            if(vm.podatkiVpisnice.vpisniList){
                for(var i = 0; i < vm.podatkiVpisnice.vpisniList.moduli.length; i++){
                    console.log(vm.podatkiVpisnice.vpisniList.moduli[i]._id == idModula);
                    if(vm.podatkiVpisnice.vpisniList.moduli[i]._id == idModula){
                        return true;
                    }
                }
            }

            
            return false;
        };
        
        vm.dodajModul = function(modul){
            var data =  {
                modul: modul
            };
            studentPodatki.dodajModul(vm.idVpisnice, data).then(
                function success(odgovor){
                    console.log(odgovor);
                    pridobiObveznePredmete();
                    vm.sporocilo="";
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.sporocilo = odgovor.data.message;
                }
            );
             
        };
        
        vm.odstraniModul = function(idModula){
            studentPodatki.odstraniModul(vm.idVpisnice, idModula).then(
                function success(odgovor){
                    console.log(odgovor);
                    pridobiObveznePredmete();
                    vm.sporocilo="";
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.sporocilo = odgovor.data.message;
                }
            );
                
        };
        
        vm.dodajModulniPredmet = function(idPredmeta){
            var data = {
                predmet: idPredmeta
            };
            
            studentPodatki.dodajModulniPredmet(vm.idVpisnice, data).then(
                function success(odgovor){
                    console.log(odgovor);
                    pridobiObveznePredmete();
                    vm.sporocilo="";
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.sporocilo = odgovor.data.message;
                }
            );
        };
        
        vm.odstraniModulniOPredmet = function(idPredmeta){
            studentPodatki.odstraniModulniPredmet(vm.idVpisnice, idPredmeta).then(
                function success(odgovor){
                    console.log(odgovor);
                    pridobiObveznePredmete();
                    vm.sporocilo="";
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.sporocilo = odgovor.data.message;
                }
            );
        };
        
        vm.dodajStrokovnoIzbirni = function(idPredmeta){
            var data = {
                predmet: idPredmeta
            };
            studentPodatki.dodajStrokovnoIzbirniPredmet(vm.idVpisnice, data).then(
                function success(odgovor){
                    console.log(odgovor);
                    pridobiObveznePredmete();
                    vm.sporocilo="";
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.dodajSplosnoIzbirni(idPredmeta);
                }
            );
                
        };
        
        vm.odstraniStrokovnoIzbirni = function(idPredmeta){
            studentPodatki.odstraniStrokovnoIzbirniPredmet(vm.idVpisnice, idPredmeta).then(
                function success(odgovor){
                    console.log(odgovor);
                    pridobiObveznePredmete();
                    vm.sporocilo="";
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.sporocilo = odgovor.data.message;
                }
            );
                
        };
        
        vm.dodajSplosnoIzbirni = function(idPredmeta){
            var data = {
                predmet : idPredmeta
            };
            studentPodatki.dodajSplosnoIzbirniPredmet(vm.idVpisnice, data).then(
                function success(odgovor){
                    console.log(odgovor);
                    pridobiObveznePredmete();
                    vm.sporocilo="";
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.sporocilo = odgovor.data.message;
                }
            );
                
        };
        
        vm.odstraniSplosnoIzbirni = function(idPredmeta){
            studentPodatki.odstraniSplosnoIzbirniPredmet(vm.idVpisnice, idPredmeta).then(
                function success(odgovor){
                    console.log(odgovor);
                    pridobiObveznePredmete();
                    vm.sporocilo="";
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.sporocilo = odgovor.data.message;
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
                    $location.path('/vpis/' + vm.idVpisnice + '/pregled');
                },
                function error(odgovor){
                    console.log(odgovor);
                    vm.sporocilo = odgovor.data.message;
                }
            );    
            
        };
        
    }
    
    
    angular
        .module('tpo')
        .controller('vpisniListPredmetiCtrl', vpisniListPredmetiCtrl);
    
})();