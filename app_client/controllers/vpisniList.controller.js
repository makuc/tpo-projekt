(function(){
    /* global angular */
    
    vpisniListCtrl.$inject = ['studentPodatki', '$routeParams'];
    
    function vpisniListCtrl(studentPodatki, $routeParams) {
        var vm = this;
        
        vm.idStudenta = $routeParams.idStudenta;
        
        vm.veljavnostEMSO = function() {
            //logika za prevernjanje pravilnosti EMSA
            if(vm.isEMSO(vm.student.emso)){
                //je emso, izloci datum rojstva
                console.log("je EMSO");
            } else {
                //ni emso, javi napako
                console.log("ni EMSO");
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
        
        
        vm.shraniPodatke = function() {
            var student = {
                data: {
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
                    e_posta: vm.student.e_posta,
                    prenosni_telefon: vm.student.prenosni_telefon,
                    stalno_bivalisce_naslov: vm.student.stalno_bivalisce_naslov,
                    stalno_bivalisce_posta: vm.student.stalno_bivalisce_posta,
                    stalno_bivalisce_drzava_obcina: vm.student.stalno_bivalisce_drzava_obcina,
                    stalno_bivalisce_vrocanje:  vm.student.stalno_bivalisce_vrocanje,
                    zacasno_bivalisce_naslov: vm.student.zacasno_bivalisce_naslov,
                    zacasno_bivalisce_posta: vm.student.zacasno_bivalisce_posta,
                    zacasno_bivalisce_drzava_obcina: vm.student.zacasno_bivalisce_drzava_obcina,
                    zacasno_bivalisce_vrocanje: vm.student.zacasno_bivalisce_vrocanje
                }
            };
            
            studentPodatki.dodajStudenta(student).then(
                function success(odgovor) {
                    // preusmeri, na se enkratno preverjanje podatkov, nato pa na izbiranje predmetov
                },
                function error(odgovor) {
                    console.log("Zgodila se je napaka: " + odgovor);
                }
            );
        };
        
        vm.pridobiStudenta = function(){
            studentPodatki.izpisStudenta(vm.idStudenta).then(
                function success(odgovor) {
                    //doloceni podatki, se ze predizpolnjejo
                    vm.student = odgovor.data;
                },
                function error(odgovor) {
                    console.log("Pripetila se je napaka: " + odgovor);
                }
            );
        };
        
    }
    
    angular
        .module('tpo')
        .controller('vpisniListCtrl', vpisniListCtrl);
})();