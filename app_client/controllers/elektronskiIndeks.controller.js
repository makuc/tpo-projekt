(function(){
    /* global angular */
    
    elektronskiIndeksCtrl.$inject = ["studentPodatki", "$routeParams", "ostaloPodatki"];
    
    function elektronskiIndeksCtrl(studentPodatki, $routeParams, ostaloPodatki){
        var vm = this;
        
        vm.idStudenta = $routeParams.studentId;
        
        studentPodatki.izpisStudenta(vm.idStudenta).then(
            function success(odgovor){
                vm.student = odgovor.data;
                //console.log(vm.student);
                
                vm.opravljeniPredmeti = [];
                vm.skupnaOcena = 0;
                vm.skupnoSteviloIzpitov = 0;
                vm.skupnoKreditneTocke = 0;
                vm.studijskaLeta = [];
                
                for(var i = 0; i < vm.student.studijska_leta_studenta.length; i++){
                    console.log(vm.student.studijska_leta_studenta[i]);
                    vm.student.studijska_leta_studenta[i].skupnaOcena = 0;
                    vm.student.studijska_leta_studenta[i].st = 0;
                    vm.student.studijska_leta_studenta[i].KT = 0;
                    for(var j = 0; j < vm.student.studijska_leta_studenta[i].predmeti.length; j++){
                        //console.log(vm.student.studijska_leta_studenta[i].predmeti[j].ocena);
                        if(vm.student.studijska_leta_studenta[i].predmeti[j].ocena > 5){
                            vm.opravljeniPredmeti.push(vm.student.studijska_leta_studenta[i].predmeti[j]);
                            vm.skupnaOcena += vm.student.studijska_leta_studenta[i].predmeti[j].ocena;
                            vm.skupnoSteviloIzpitov++;
                            vm.skupnoKreditneTocke += vm.student.studijska_leta_studenta[i].predmeti[j].predmet.KT;
                            vm.student.studijska_leta_studenta[i].skupnaOcena += vm.student.studijska_leta_studenta[i].predmeti[j].ocena;
                            vm.student.studijska_leta_studenta[i].KT += vm.student.studijska_leta_studenta[i].predmeti[j].predmet.KT;
                            vm.student.studijska_leta_studenta[i].st ++;
                        }
                    }
                    vm.studijskaLeta.push(vm.student.studijska_leta_studenta[i]);
                }
                //console.log(vm.studijskaLeta);
                vm.skupnoPovprecje = vm.skupnaOcena / vm.skupnoSteviloIzpitov;
                console.log(vm.opravljeniPredmeti);
                for(var l = 0; l < vm.opravljeniPredmeti.length; l++){
                    dopolniPodatke(l);
                }
            },
            function error(odgovor){
                console.log(odgovor);
            }
        );
        
        
        function dopolniPodatke(l){
            ostaloPodatki.pridobiVseVeljavnePredmetnike().then(
                function success(odgovor){
                   // console.log(odgovor.data);
                    for(var k = 0; k < odgovor.data.length; k++){
                        if(odgovor.data[k].studijsko_leto._id == vm.opravljeniPredmeti[l].izpit.studijsko_leto){
                           // console.log(odgovor.data[k]);
                            for(var m = 0; m < odgovor.data[k].predmeti.length; m++){
                                if(odgovor.data[k].predmeti[m]._id == vm.opravljeniPredmeti[l].predmet._id){
                                    //console.log(odgovor.data[k]);
                                   vm.opravljeniPredmeti[l].letnik = odgovor.data[k].letnik.naziv;
                                   //console.log(vm.opravljeniPredmeti[l].letnik);
                                }
                            }
                        }
                    }
                },
                function error(odgovor){
                    console.log(odgovor);
                }
            );
        }
        
    }
    
    angular
        .module('tpo')
        .controller('elektronskiIndeksCtrl', elektronskiIndeksCtrl);
    
})();