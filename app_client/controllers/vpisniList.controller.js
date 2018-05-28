(function(){
    /* global angular */
    
    vpisniListCtrl.$inject = ['predmetPodatki', 'studentPodatki', '$routeParams', 'authentication', 'ostaloPodatki', '$location'];
    
    function vpisniListCtrl(predmetPodatki, studentPodatki, $routeParams, authentication, ostaloPodatki, $location) {
        var vm = this;
        
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
        
        vm.idStudenta = $routeParams.idStudenta;
        
        vm.meseci = ["01","02","03","04","05","06","07","08","09","10","11","12"];
        
        vm.dnevi = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
        
        vm.leta = ["2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990","1989","1988","1987","1986","1985","1984","1983","1982","1981","1980","1979","1978","1977","1976","1975","1974","1973","1972","1971","1970","1969","1968","1967","1966","1965","1964","1963","1962","1961","1960","1959","1958","1957","1956","1955","1954","1953","1952","1951","1950"];
        
        ostaloPodatki.pridobiVseVeljavneObcine().then(
            function success(odgovor) {
                vm.obcine = odgovor.data;
            },
            function error(odgovor) {
                console.log("Prišlo do napake pri pridobivanju občin: " + odgovor);
            }
        );
        ostaloPodatki.pridobiVseVeljavneDrzave().then(
            function success(odgovor) {
                vm.drzave = odgovor.data;
                //console.log(odgovor.data);
            },
            function error(odgovor) {
                console.log("Prišlo do napake pri pridobivanju drćav: " + odgovor);
            }
        );
        ostaloPodatki.pridobiVseVeljavnePoste().then(
            function success(odgovor) {
                vm.poste = odgovor.data;
            },
            function error(odgovor) {
                console.log("Prišlo do napake pri pridobivanju pošt: " + odgovor);
            }
        );
        
        ostaloPodatki.pridobiVseVeljavneVrsteStudije().then(
            function success(odgovor){
                vm.vrstaStudija = odgovor.data;
                //console.log(vm.vrstaStudija);
            },
            function error(odgovor) {
                console.log("Prišlo do napake pri pridobivanju vrst študija:" + odgovor);
            }
        );
        
        
        studentPodatki.izpisStudenta(vm.idStudenta).then(
            function success(odgovor) {
                //doloceni podatki, se ze predizpolnjejo
                vm.student = odgovor.data;
                console.log(vm.student);
                prikaziDatumRojstva();
                
                for(var i = 0; i < odgovor.data.zetoni.length; i++){
                    if(!odgovor.data.zetoni[i].izkoriscen){
                        vm.neizkoriscenZeton = odgovor.data.zetoni[i];
                        console.log(vm.neizkoriscenZeton);
                    }
                }
                vm.ime = odgovor.data.ime;
                vm.priimek = odgovor.data.priimek;
            },
            function error(odgovor) {
                console.log("Pripetila se je napaka: " + odgovor);
            }
        );
        
        
        
        function prikaziDatumRojstva(){
            if(vm.student.datum_rojstva){
                vm.letnica = vm.student.datum_rojstva.substring(0,4);
                vm.mesec = vm.student.datum_rojstva.substring(5,7);
                vm.dan = vm.student.datum_rojstva.substring(8,10);
                console.log(vm.letnica);
            }
        }
        
        vm.veljavnostEMSO = function() {
            //logika za prevernjanje pravilnosti EMSA
            if(vm.isEMSO(vm.student.emso)){
                //je emso, izloci datum rojstva
                //console.log("je EMSO");
                //console.log(vm.student.emso.substring(4,7) + " " + vm.letnica.substring(1,4));
                console.log(vm.student.emso.substring(0,2) + "."+ vm.dan + "   "  + vm.student.emso.substring(2,4) + ".1" + vm.student.emso.substring(4,7));
                vm.napacenEmso="";
                if(vm.dan != vm.student.emso.substring(0,2) || vm.mesec != vm.student.emso.substring(2,4) || !vm.letnica || vm.letnica.substring(1,4) != vm.student.emso.substring(4,7)){
                    vm.napacenEmso = "Datum rojstva in EMSO se ne ujemata";
                    return false;
                } else {
                    vm.napacenEmso = "";
                    return true;
                }
            } else {
                //console.log("ni EMSO");
                vm.napacenEmso = "Ponovno preverite vnos EMSA";
                return false;
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
                var EMSOdigit = parseInt(inputEMSO.substring(i, i + 1), 10);
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
        };
        
        function jeDavncaStevilka(davnca){
            var isnum = /^\d+$/.test(davnca);
            if(isnum){
                if(davnca.length == 8){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
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
        
        function shraniDatum(){
            //console.log(vm.student.datum_rojstva);
            //console.log(vm.letnica + "-" + vm.mesec + "-" + vm.dan + "T" + "00:00:00.000Z");
            vm.student.datum_rojstva = vm.letnica + "-" + vm.mesec + "-" + vm.dan + "T" + "00:00:00.000Z";
        }
        
        vm.shrani = function() {
            
                
            shraniDatum();
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
                zacasno_bivalisce_vrocanje: vm.student.zacasno_bivalisce_vrocanje,
                izo_zavod: vm.student.predhodna_izobrazba.zavod,
                izo_kraj: vm.student.predhodna_izobrazba.kraj,
                izo_drzava: vm.student.predhodna_izobrazba.drzava,
                izo_program: vm.student.predhodna_izobrazba.program,
                izo_leto_zakljucka: vm.student.predhodna_izobrazba.leto_zakljucka,
                izo_uspeh: vm.student.predhodna_izobrazba.uspeh,
                izo_smer_strokovna_izobrazba: vm.student.predhodna_izobrazba.smer_strokovna_izobrazba,
                izo_nacin_koncanja: vm.student.predhodna_izobrazba.nacin_koncanja,
                izo_najvisja_dosezena_izobrazba: vm.student.predhodna_izobrazba.najvisja_dosezena_izobrazba
            };
            
            studentPodatki.urediStudenta(vm.idStudenta, student).then(
                function success(odgovor) {
                    vm.uspesnoShranjeno = "Podatki so uspešno shranjeni.";
                    // preusmeri, na se enkratno preverjanje podatkov, nato pa na izbiranje predmetov
                },
                function error(odgovor) {
                    console.log("Zgodila se je napaka: " + odgovor);
                }
            );
        };
        
        vm.zabeleziDrzavljanstvo = function(){
            vm.student.drzavljanstvo = "Državljan države: " + vm.student.drzava_rojstva.slovenski_naziv;
        };
        
        function preveriObcinaPostaDrzava(){
            console.log(vm.student.obcina_rojstva.ime)
            if(vm.student.drzava_rojstva.slovenski_naziv != "Slovenija"){
                if(vm.student.obcina_rojstva.ime != "-"){
                    vm.napacenEmso = "Država rojstva in občina rojstva se ne ujemata";
                    return false;
                }
            } else {
                if(vm.student.obcina_rojstva.ime == "-"){
                    vm.napacenEmso = "Država rojstva in občina rojstva se ne ujemata";
                    return false;
                }
            }
            
            if(vm.student.stalno_bivalisce_drzava.slovenski_naziv != "Slovenija"){
                if(vm.student.stalno_bivalisce_obcina.ime != "-"){
                    vm.napacenEmso = "Država stalnega bivališča in občina stalnega bivališča se ne ujemata";
                    return false;
                }
                if(vm.student.stalno_bivalisce_posta.naziv != "-"){
                    vm.napacenEmso = "Država stalnega bivališča in pošta stalnega bivališča se ne ujemata";
                    return false;
                }
            } else {
                if(vm.student.stalno_bivalisce_obcina.ime == "-"){
                    vm.napacenEmso = "Država stalnega bivališča in občina stalnega bivališča se ne ujemata";
                    return false;
                }
                if(vm.student.stalno_bivalisce_posta.naziv == "-"){
                    vm.napacenEmso = "Država stalnega bivališča in pošta stalnega bivališča se ne ujemata";
                    return false;
                }
            }
            
            if(vm.student.zacasno_bivalisce_drzava){
                if(vm.student.zacasno_bivalisce_drzava.slovenski_naziv != "Slovenija"){
                    if(vm.student.stalno_bivalisce_obcina.ime != "-"){
                        vm.napacenEmso = "Država stalnega bivališča in občina začasnega bivališča se ne ujemata";
                        return false;
                    }
                    if(vm.student.stalno_bivalisce_posta != "-"){
                        vm.napacenEmso = "Država stalnega bivališča in pošta začasnega bivališča se ne ujemata";
                        return false;
                    }
                } else {
                    if(vm.student.stalno_bivalisce_obcina.ime == "-"){
                        vm.napacenEmso = "Država stalnega bivališča in občina začasnega bivališča se ne ujemata";
                        return false;
                    }
                    if(vm.student.stalno_bivalisce_posta == "-"){
                        vm.napacenEmso = "Država stalnega bivališča in pošta začasnega bivališča se ne ujemata";
                        return false;
                    }
                }
            }
            return true;
        }
        
        vm.shraniPodatke = function() {
            
            if(vm.student.vpisna_stevilka && vm.student.priimek && vm.student.ime && vm.student.kraj_rojstva && vm.student.drzava_rojstva
                && vm.student.obcina_rojstva && vm.student.drzavljanstvo && vm.student.spol && vm.student.emso && vm.student.davcna_stevilka && vm.student.email
                && vm.student.prenosni_telefon && vm.student.stalno_bivalisce_naslov && vm.student.stalno_bivalisce_posta && vm.student.stalno_bivalisce_obcina
                && vm.student.stalno_bivalisce_drzava && vm.student.predhodna_izobrazba.zavod && vm.student.predhodna_izobrazba.kraj
                && vm.student.predhodna_izobrazba.drzava && vm.student.predhodna_izobrazba.program && vm.student.predhodna_izobrazba.leto_zakljucka
                && vm.student.predhodna_izobrazba.uspeh && vm.student.predhodna_izobrazba.smer_strokovna_izobrazba && vm.student.predhodna_izobrazba.nacin_koncanja
                && vm.student.predhodna_izobrazba.najvisja_dosezena_izobrazba){
                
                vm.napacenEmso = "";
                
                if(vm.student.stalno_bivalisce_vrocanje || ( vm.student.zacasno_bivalisce_drzava && vm.student.zacasno_bivalisce_naslov && vm.student.zacasno_bivalisce_obcina 
                    && vm.student.zacasno_bivalisce_posta && vm.student.zacasno_bivalisce_vrocanje)){
                    
                    if(jeDavncaStevilka(vm.student.davcna_stevilka)){
                        if(vm.veljavnostEMSO(vm.student.emso)){
                            
                            if(preveriObcinaPostaDrzava()){
                                vm.shrani();
                
                                $location.path("/vpis/izbiraZetona");
                            } 
                            
                        }
                        
                    } else {
                        vm.napacenEmso = "Ponovno preverite vnos davčne številke";
                    }
                        
                    
                    
                } else {
                    vm.napacenEmso = "Vnesite informacije o začasnem bivališču ali pa izberite drug način prejemanja pošte.";
                }
                
                
           
            } else {
                vm.napacenEmso = "Vnesite vse potrebne podatke";
            }
            
            
           
            
            
        };
        
    }
    
    
    angular
        .module('tpo')
        .controller('vpisniListCtrl', vpisniListCtrl);
})();