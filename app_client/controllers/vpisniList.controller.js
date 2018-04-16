(function(){
    /* global angular */
    
    vpisniListCtrl.$inject = ['predmetPodatki', 'studentPodatki', '$routeParams', 'authentication', 'ostaloPodatki'];
    
    function vpisniListCtrl(predmetPodatki, studentPodatki, $routeParams, authentication, ostaloPodatki) {
        var vm = this;
        
        vm.idStudenta = authentication.currentUser().student;
        
        vm.veljavnostEMSO = function() {
            //logika za prevernjanje pravilnosti EMSA
            if(vm.isEMSO(vm.student.emso)){
                //je emso, izloci datum rojstva
                //console.log("je EMSO");
                //console.log(vm.student.emso.substring(0,2) + "."  + vm.student.emso.substring(2,4) + ".1" + vm.student.emso.substring(4,7));
                vm.napacenEmso="";
                if(vm.student.emso.substring(4,7) > 900){
                    vm.student.datum_rojstva = vm.student.emso.substring(0,2) + "."  + vm.student.emso.substring(2,4) + ".1" + vm.student.emso.substring(4,7);
                } else {
                    vm.student.datum_rojstva = vm.student.emso.substring(0,2) + "."  + vm.student.emso.substring(2,4) + ".2" + vm.student.emso.substring(4,7);
                }
            } else {
                //console.log("ni EMSO");
                vm.napacenEmso = "Ponovno preverite vnos EMSA";
            }
        };
        
        vm.isEMSO = function(inputEMSO){
            if(inputEMSO.length !== "DDMMLLLRRZZZK".length || inputEMSO === "7777777777777"){
                return false;
            }
            // DDMMLLLRRZZZK
            // 765432765432
            var n = 7;
            var sum = 0;
            for (var i = 0; i < 12; i++){
                var EMSOdigit = parseInt(inputEMSO.substring(i, i + 1));
                if(isNaN(EMSOdigit)){
                    return false;
                }
                sum += n * EMSOdigit;
                n--;
                if(n < 2){
                    n = 7;
                }
            }
            var ostanek = sum % 11;
            var kontrola = 11 - ostanek;
            if (kontrola.toString() === inputEMSO.substring(12, 12 + 1)){
                return true;
            }
            return false;
        }
        vm.izbranNaslov = function(stalno) {
            if(stalno) {
                if(vm.student.stalno_bivalisce_vrocanje)
                    vm.student.zacasno_bivalisce_vrocanje = false;
                else
                    vm.student.zacasno_bivalisce_vrocanje = true;
            } else {
                if(vm.student.zacasno_bivalisce_vrocanje)
                    vm.student.stalno_bivalisce_vrocanje = false;
                else
                    vm.student.stalno_bivalisce_vrocanje = true;
            }
        };
        
        vm.shraniPodatke = function() {
            var student = {
                vpisna_stevilka: vm.student.vpisna_stevilka,
                priimek: vm.student.priimek,
                ime: vm.student.ime,
                datum_rojstva: vm.student.datum_rojstva,
                kraj_rojstva: vm.student.kraj_rojstva,
                drzava_rojstva: vm.student.drzava_rojstva,
                obcina_rojstva: vm.student.obcina_rojstva,
                drzavljanstvo: vm.student.drzavljanstvo,
                spol: vm.student.spol,
                emso: vm.student.emso,
                davcna_stevilka: vm.student.davcna_stevilka,
                email: vm.student.email,
                prenosni_telefon: vm.student.prenosni_telefon,
                stalno_bivalisce_naslov: vm.student.stalno_bivalisce_naslov,
                stalno_bivalisce_posta: vm.student.stalno_bivalisce_posta,
                stalno_bivalisce_obcina: vm.student.stalno_bivalisce_obcina,
                stalno_bivalisce_drzava: vm.student.stalno_bivalisce_drzava,
                stalno_bivalisce_vrocanje: vm.student.stalno_bivalisce_vrocanje,
                zacasno_bivalisce_naslov: vm.student.zacasno_bivalisce_naslov,
                zacasno_bivalisce_posta: vm.student.zacasno_bivalisce_posta,
                zacasno_bivalisce_obcina: vm.student.zacasno_bivalisce_obcina,
                zacasno_bivalisce_drzava: vm.student.zacasno_bivalisce_drzava,
                zacasno_bivalisce_vrocanje: vm.student.zacasno_bivalisce_vrocanje
            };
            
            studentPodatki.urediStudenta(vm.idStudenta, student).then(
                function success(odgovor) {
                    // preusmeri, na se enkratno preverjanje podatkov, nato pa na izbiranje predmetov
                },
                function error(odgovor) {
                    console.log("Zgodila se je napaka: " + odgovor);
                }
            );
        };
        
        studentPodatki.izpisStudenta(vm.idStudenta).then(
            function success(odgovor) {
                //doloceni podatki, se ze predizpolnjejo
                vm.student = odgovor.data;
                //console.log(vm.student);
            },
            function error(odgovor) {
                console.log("Pripetila se je napaka: " + odgovor);
            }
        );
        ostaloPodatki.pridobiObcine().then(
            function success(odgovor) {
                vm.obcine = odgovor.data;
            },
            function error(odgovor) {
                console.log("Prišlo do napake pri pridobivanju občin: " + odgovor);
            }
        );
        ostaloPodatki.pridobiDrzave().then(
            function success(odgovor) {
                vm.drzave = odgovor.data;
            },
            function error(odgovor) {
                console.log("Prišlo do napake pri pridobivanju drćav: " + odgovor);
            }
        );
        ostaloPodatki.pridobiPoste().then(
            function success(odgovor) {
                vm.poste = odgovor.data;
            },
            function error(odgovor) {
                console.log("Prišlo do napake pri pridobivanju pošt: " + odgovor);
            }
        );
        
        vm.izbiraPredmetov = function(){
            var letnik = 1;
            if(letnik == 1){
                predmetPodatki.pridobiPredmet("5ac8df8efeae4c1cfd56301b").then(
                    function success(odgovor) {
                        vm.predmeti = odgovor.data;
                    },
                    function error(odgovor) {
                        console.log(odgovor);
                    }
                );

            }
        };
    }
    
    
    angular
        .module('tpo')
        .controller('vpisniListCtrl', vpisniListCtrl);
})();