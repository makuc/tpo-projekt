(function(){
    /* global angular */
    
    vpisniListCtrl.$inject = ['studentPodatki', '$rounteParams'];
    
    function vpisniListCtrl(studentPodatki, $routeParams) {
        var vm = this;
        
        vm.idStudenta = $routeParams.idStudenta;
        
        vm.veljavnostEMSO = function() {
            //logika za prevernjanje pravilnosti EMSA
            
        };
        
        vm.veljavnostImeinPriimek = function() {
            //preverjanje, da so pri imenu in priimku uporabljene samo crke
            
        };
        
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