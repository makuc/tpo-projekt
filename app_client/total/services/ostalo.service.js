(function() {
    /* global angular */
    
    var ostaloPodatki = function($http){
        //obcine
        function pridobiVseObcine(){
            return $http.get('/api/v1/obcina/vse');
        }
        
        function pridobiVseVeljavneObcine() {
            return $http.get('/api/v1/obcina');
        }
        
        function pridobiVseIzbrisaneObcine(){
            return $http.get('/api/v1/obcina/izbrisane');
        }
        
        function dodajObcino(podatki){
            return $http.post('/api/v1/obcina', podatki);
        }
        
        function najdiObcino(obcina_id){
            return $http.get('/api/v1/obcina/' + obcina_id);
        }
        
        function izbrisiObcino(obcina_id){
            return $http.delete('/api/v1/obcina/' + obcina_id);    
        }
        
        function obnoviObcino(obcina_id){
            return $http.post('/api/v1/obcina/' + obcina_id);
        }
        
        function urediObcino(obcina_id, podatki){
            return $http.put('/api/v1/obcina/' + obcina_id, podatki);
        }
        
        
        //drzave
        function pridobiVseDrzave(){
            return $http.get('/api/v1/drzava/vse');
        }
        
        function pridobiVseVeljavneDrzave(){
            return $http.get('/api/v1/drzava');
        }
        
        function pridobiVseIzbrisaneDrzave(){
            return $http.get('/api/v1/drzava/izbrisane');
        }
        
        function dodajDrzavo(podatki){
            return $http.post('/api/v1/drzava', podatki);
        }
        
        function najdiDrzavo(drzava_id){
            return $http.get('/api/v1/drzava/' + drzava_id);
        }
        
        function izbrisiDrzavo(drzava_id){
            return $http.delete('/api/v1/drzava/' + drzava_id);
        }
        
        function obnoviDrzavo(drzava_id){
            return $http.post('/api/v1/drzava/' + drzava_id);
   
        }
        
        function urediDrzavo(drzava_id, podatki){
            return $http.put('/api/v1/drzava/' + drzava_id, podatki);
        }
        
        //poste
        function pridobiVsePoste(){
            return $http.get('/api/v1/posta/vse');
        }
        
        function pridobiVseVeljavnePoste(){
            return $http.get('/api/v1/posta');
        }
        
        function pridobiVseIzbrisanePoste(){
            return $http.get('/api/v1/posta/izbrisane');
        }
        
        function dodajPosto(podatki){
            return $http.post('/api/v1/posta', podatki);
        }
        
        function najdiPosto(posta_id){
            return $http.get('/api/v1/posta/' + posta_id);
        }
        
        function izbrisiPosto(posta_id){
            return $http.delete('/api/v1/posta/' + posta_id);
        }
        
        function obnoviPosto(posta_id){
            return $http.post('/api/v1/posta/' + posta_id);
        }
        
        function urediPosto(posta_id, podatki){
            return $http.put('/api/v1/posta/' + posta_id, podatki);
        }
        
        //letniki
        function pridobiVseLetnike(){
            return $http.get('/api/v1/letnik/vsi');
        }
        
        function pridobiVseVeljavneLetnike(){
            return $http.get('/api/v1/letnik');
        }
        
        function pridobiVseIzbrisaneLetnike(){
            return $http.get('/api/v1/letnik/izbrisani');
        }
        
        function dodajLetnik(podatki){
            return $http.post('/api/v1/letnik', podatki);
        }
        
        function najdiLetnik(letnik_id){
            return $http.get('/api/v1/letnik/' + letnik_id);
        }
        
        function izbrisiLetnik(letnik_id){
            return $http.delete('/api/v1/letnik/' + letnik_id);    
        }
        
        function obnoviLetnik(letnik_id){
            return $http.post('/api/v1/letnik/' + letnik_id);   
        }
        
        function urediLetnik(letnik_id, podatki){
            return $http.put('/api/v1/letnik/' + letnik_id, podatki);
        }
        
        
        //nacini studija
        function pridobiVseNacineStudija(){
            return $http.get('/api/v1/nacin-studija/vsi');
        }
        
        function pridobiVseVeljavneNacineStudija(){
            return $http.get('/api/v1/nacin-studija');
        }
        
        function pridobiVseIzbrisaneNacineStudija(){
            return $http.get('/api/v1/nacin-studija/izbrisani');
        }
        
        function dodajNacinStudija(podatki){
            return $http.post('/api/v1/nacin-studija', podatki);
        }
        
        function najdiNacinStudija(nacinStudija_id){
            return $http.get('/api/v1/nacin-studija/' + nacinStudija_id);
        }
        
        function izbrisiNacinStudija(nacinStudija_id){
            return $http.delete('/api/v1/nacin-studija/' + nacinStudija_id);
        }
        
        function obnoviNacinStudija(nacinStudija_id){
            return $http.post('/api/v1/nacin-studija/' + nacinStudija_id);
        }
        
        function urediNacinStudija(nacinStudija_id, podatki){
            return $http.put('/api/v1/nacin-studija/' + nacinStudija_id, podatki);
        }
        
        //oblike studija
        function pridobiVseOblikeStudija(){
            return $http.get('/api/v1/oblika-studija/vse');
        }
        
        function pridobiVseVeljavneOblikeStudija(){
            return $http.get('/api/v1/oblika-studija');          
        }
        
        function pridobiVseIzbrisaneOblikeStudija(){
            return $http.get('/api/v1/oblika-studija/izbrisani');
        }
        
        function dodajOblikoStudija(podatki){
            return $http.post('/api/v1/oblika-studija', podatki);
        }
        
        function najdiOblikoStudija(oblikaStudija_id){
            return $http.get('/api/v1/oblika-studija/' + oblikaStudija_id);
        }
        
        function izbrisiOblikoStudija(oblikaStudija_id){
            return $http.delete('/api/v1/oblika-studija/' + oblikaStudija_id);
        }
        
        function obnoviOblikoStudija(oblikaStudija_id){
            return $http.post('/api/v1/oblika-studija/' + oblikaStudija_id);
        }
        
        function urediOblikoStudija(oblikaStudija_id, podatki){
            return $http.put('/api/v1/oblika-studija/' + oblikaStudija_id, podatki);
        }
        
        //predmetnik
        function pridobiVsePredmetnike(){
            return $http.get('/api/v1/predmetnik/vsi');    
        }
        
        function pridobiVseVeljavnePredmetnike(){
            return $http.get('/api/v1/predmetnik');
        }
        
        function pridobiVseIzbrisanePredmetnike(){
            return $http.get('/api/v1/predmetnik/izbrisani');
        }
        
        function dodajPredmetnik(podatki){
            return $http.post('/api/v1/predmetnik', podatki);
        }
        
        function najdiPredmetnik(predmetnik_id){
            return $http.get('/api/v1/predmetnik/' + predmetnik_id);
        }
        
        function izbrisiPredmetnik(predmetnik_id){
            return $http.delete('/api/v1/predmetnik/' + predmetnik_id);
        }
        
        function obnoviPredmetnik(predmetnik_id){
            return $http.post('/api/v1/predmetnik/' + predmetnik_id);
        }
        
        function urediPredmetnik(predmetnik_id, podatki){
            return $http.put('/api/v1/predmetnik/' + predmetnik_id, podatki);
        }
        
        function dodajPredmetPredmetniku(predmetnik_id, podatki){
            /*console.log("Complete req: " + '/api/v1/predmetnik/' + predmetnik_id + '/predmet');
            console.log("Podatki req: " + podatki);*/
            return $http.post('/api/v1/predmetnik/' + predmetnik_id + '/predmet', podatki);
        }
        
        function odstraniPredmetIzPredmetnika(predmetnik_id, predmet_id){
            //podatki.predmet = "5ac8df8efeae4c1cfd56302a";
            return $http.delete('/api/v1/predmetnik/' + predmetnik_id + '/predmet/' + predmet_id);
        }
        
        //studijski programi
        function pridobiVseStudijskePrograme(){
            return $http.get('/api/v1/studijski-program/vsi');
        }
        
        function pridobiVseVeljavneStudijskePrograme(){
            return $http.get('/api/v1/studijski-program');
        }
        
        function pridobiVseIzbrisaneStudijskePrograme(){
            return $http.get('/api/v1/studijski-program/izbrisani');
        }
        
        function dodajStudijskiProgram(podatki){
            return $http.post('/api/v1/studijski-program', podatki);
        }
        
        function najdiStudijskiProgram(studijskiProgram_id){
            return $http.get('/api/v1/studijski-program/' + studijskiProgram_id);
        }
        
        function izbrisiStudijskiProgram(studijskiProgram_id){
            return $http.delete('/api/v1/studijski-program/' + studijskiProgram_id);
        }
        
        function obnoviStudijskiProgram(studijskiProgram_id){
            return $http.post('/api/v1/studijski-program/' + studijskiProgram_id);
        }
        
        function urediStudijskiProgram(studijskiProgram_id, podatki){
            return $http.put('/api/v1/studijski-program/' + studijskiProgram_id, podatki);
        }
        
        //studijskih let
        function pridobiVseStudijskaLeta(){
            return $http.get('/api/v1/leto/vsa');
        }
        
        function pridobiVseVeljavneStudijskaLeta(){
            return $http.get('/api/v1/leto');
        }
        
        function pridobiVseIzbrisaneStudijskaLeta(){
            return $http.get('/api/v1/leto/izbrisani');
        }
        
        function dodajStudijskoLeto(podatki){
            return $http.post('/api/v1/leto', podatki);
        }
        
        function najdiStudijskoLeto(studijskoLeto_id){
            return $http.get('/api/v1/leto/' + studijskoLeto_id);
        }
        
        function izbrisiStudijskoLeto(studijskoLeto_id){
            return $http.delete('/api/v1/leto/' + studijskoLeto_id);
        }
        
        function obnoviStudijskoLeto(studijskoLeto_id){
            return $http.post('/api/v1/leto/' + studijskoLeto_id);
        }
        
        function urediStudijskoLeto(studijskoLeto_id, podatki){
            return $http.put('/api/v1/leto/' + studijskoLeto_id, podatki);    
        }
        
        //vrsta studija
        function pridobiVseVrsteStudije(){
            return $http.get('/api/v1/vrsta-studija/vse');
        }
        
        function pridobiVseVeljavneVrsteStudije(){
            return $http.get('/api/v1/vrsta-studija');
        }
        
        function pridobiVseIzbrisaneVrsteStudije(){
            return $http.get('/api/v1/vrsta-studija/izbrisani');
        }
        
        function dodajVrstoStudija(podatki){
            return $http.post('/api/v1/vrsta-studija', podatki);
        }
        
        function najdiVrstoStudija(vrstaStudija_id){
            return $http.get('/api/v1/vrsta-studija/' + vrstaStudija_id);
        }
        
        function izbrisiVrstoStudija(vrstaStudija_id){
            return $http.delete('/api/v1/vrsta-studija/' + vrstaStudija_id);
        }
        
        function obnoviVrstoStudija(vrstaStudija_id){
            return $http.post('/api/v1/vrsta-studija/' + vrstaStudija_id);
        }
        
        function urediVrstoStudija(vrstaStudija_id, podatki){
            return $http.put('/api/v1/vrsta-studija/' + vrstaStudija_id, podatki);
        }
        
        
        //vrsta vpisa
        function pridobiVseVrsteVpisa(){
            return $http.get('/api/v1/vrsta-vpisa/vse');
        }
        
        function pridobiVseVeljavneVrsteVpisa(){
            return $http.get('/api/v1/vrsta-vpisa');
        }
        
        function pridobiVseIzbrisaneVrsteVpisa(){
            return $http.get('/api/v1/vrsta-vpisa/izbrisani');
        }
        
        function dodajVrstoVpisa(podatki){
            return $http.post('/api/v1/vrsta-vpisa', podatki);
        }
        
        function najdiVrstoVpisa(vrstaVpis_id){
            return $http.get('/api/v1/vrsta-vpisa/' + vrstaVpis_id);
        }
        
        function izbrisiVrstoVpisa(vrstaVpis_id){
            return $http.delete('/api/v1/vrsta-vpisa/' + vrstaVpis_id);
        }
        
        function obnoviVrstoVpisa(vrstaVpis_id){
            return $http.post('/api/v1/vrsta-vpisa/' + vrstaVpis_id);
        }
        
        function urediVrstoVpisa(vrstaVpis_id, podatki){
            return $http.put('/api/v1/vrsta-vpisa/' + vrstaVpis_id, podatki);
        }
        
        //zaposleni
        function pridobiVseZaposlene(){
            return $http.get('/api/v1/zaposlen/vsi');
        }
        
        function pridobiVseVeljavneZaposlene(){
            return $http.get('/api/v1/zaposlen');
        }
        
        function pridobiVseIzbrisaneZaposlene(){
            return $http.get('/api/v1/zaposlen/izbrisani');
        }
        
        function dodajZaposlenega(podatki){
            return $http.post('/api/v1/zaposlen/', podatki);
        }
        
        function najdiZaposlenega(zaposlen_id){
            return $http.get('/api/v1/zaposlen/' + zaposlen_id);
        }
        
        function izbrisiZaposlenega(zaposlen_id){
            return $http.delete('/api/v1/zaposlen/' + zaposlen_id);
        }
        
        function obnoviZaposlenega(zaposlen_id){
            return $http.post('/api/v1/zaposlen/' + zaposlen_id);
        }
        
        function urediZaposlenega(zaposlen_id, podatki){
            return $http.put('/api/v1/zaposlen/' + zaposlen_id, podatki);
        }
        
        //deli predmetnika
        function pridobiVseDelePredmetnika(){
            return $http.get('/api/v1/del-predmetnika/vse');
        }
        
        function pridobiVseVeljavneDelePredmetnika(){
            return $http.get('/api/v1/del-predmetnika');
        }
        
        function pridobiVseIzbrisaneDelePredmetnika(){
            return $http.get('/api/v1/del-predmetnika/izbrisani');
        }
        
        function dodajDelPredmetnika(podatki){
            return $http.post('/api/v1/del-predmetnika', podatki);
        }
        
        function najdiDelPredmetnika(delPredmetnika_id){
            return $http.get('/api/v1/del-predmetnika/' + delPredmetnika_id);
        }
        
        function izbrisiDelPredmetnika(delPredmetnika_id){
            return $http.delete('/api/v1/del-predmetnika/' + delPredmetnika_id);
        }
        
        function obnoviDelPredmetnika(delPredmetnika_id){
            return $http.post('/api/v1/del-predmetnika/' + delPredmetnika_id);
        }
        
        function urediDelPredmetnika(delPredmetnika_id, podatki){
            return $http.put('/api/v1/del-predmetnika/' + delPredmetnika_id, podatki);    
        }
        
        function uvoziStudente(podatki) {
            
            return $http.post('/api/v1/student/uvoz-sprejetih', podatki);
        }
        
        // Vpis / Referentka
        
        function najdiOddaneVpise()
        {
            return $http.get('/api/v1/vpis');
        }
        
        function najdiVseVpise()
        {
            return $http.get('/api/v1/vpis/vsi');
        }
        
        function potrdiVpis(vpisId)
        {
            return $http.post('/api/v1/vpis/' + vpisId + '/potrdi');
        }
        
        // Izpiti (prijava student)
        
        function vsiIzpitniRoki(studentId)
        {
            return $http.get('/api/v1/student/' + studentId + '/izpit');
        }
        
        function prijaviNaRok(izpitId, studentData)
        {
            return $http.post('/api/v1/izpit/' + izpitId + '/prijava', studentData);
        }
        
        function odjaviOdRoka(izpitId, studentId)
        {
            return $http.delete('/api/v1/izpit/' + izpitId + '/odjava/' + studentId);
        }
        
        // Izpiti (prijava referentka)
        
        function obstajajociIzpitniRoki(studentId)
        {
            return $http.get('/api/v1/student/' + studentId + '/izpiti');
        }
        
        function prijaviNaRokForce(izpitId, studentData)
        {
            return $http.post('/api/v1/izpit/' + izpitId + '/prijava/force', studentData);
        }
        
        function odjaviOdRokaForce(izpitId, studentId)
        {
            return $http.delete('/api/v1/izpit/' + izpitId + '/odjava/' + studentId + '/force');
        }
        
        // Izpitni rok - izvedba - prijavljeni kandidati-
        
        function pridobiIzpitniRok(rokId)
        {
            return $http.get('/api/v1/izpit/' + rokId);
        }
        
        function posodobiOceno(rokId, studentId, data)
        {
            // /api/v1/student/5aef49a79958d4255801a970/izpit/5af174a9267cef0a952d32fa
            return $http.post('/api/v1/student/' + studentId + '/izpit/' + rokId, data);
        }
        
        // Zeton
        
        function izbrisiZetonStudentu(studentId, zetonId)
        {
            // /api/v1/student/5ac8ca4d36fba41313122307/zeton/5af1a8f970975116696d097a
            return $http.delete('/api/v1/student/' + studentId + '/zeton/' + zetonId);
        }
        
        function urediZetonStudenta(studentId, zetonId, data)
        {
            return $http.put('/api/v1/student/' + studentId + '/zeton/' + zetonId, data);
        }
        
        function dodajZetonStudentu(studentId, data)
        {
            // /api/v1/student/5aef49a79958d4255801a971/zeton
            console.log("Service data: ", data);
            return $http.post('api/v1/student/' + studentId + '/zeton', data);
        }
        
        function pridobiOsnutekZetona(studentId)
        {
            // /api/v1/student/5aef49a79958d4255801a970/zeton
            console.log("Osnutek studentId: ", studentId);
            return $http.get('/api/v1/student/' + studentId + '/zeton');
        }
        
        // Sklepi
        
        function dodajSklepStudentu(studentId, data)
        {
            // /api/v1/student/5aef49a79958d4255801a971/sklep
            return $http.post('/api/v1/student/' + studentId + '/sklep', data)
        }
        
        function urediSklepStudentu(studentId, sklepId, data)
        {
            // /api/v1/student/5aef49a79958d4255801a970/sklep/5afd94c13a8a06108fde6d7d
            return $http.put('/api/v1/student/' + studentId + '/sklep/' + sklepId, data)
        }
        
        function odstraniSklepStudentu(studentId, sklepId)
        {
            // /api/v1/student/5aef49a79958d4255801a970/sklep/5afd94c13a8a06108fde6d7d
            return $http.delete('/api/v1/student/' + studentId + '/sklep/' + sklepId)
        }
        
        // kartoteccni list
        function pridobiKartotecniList(studentId)
        {
            return $http.get('/api/v1/student/' + studentId + '/cel');
        }
        
        // Narocila potrdil vpisa
        function pridobiVsaNarocila()
        {
            return $http.get('/api/v1/narocilo');
        }
        
        function narociPotrdiloVpisa(data)
        {
            console.log("Data service: ", data);
            return $http.post('/api/v1/narocilo', data);
        }
        
        function zakljuciNarociloPotrdilaVpisa(narociloId)
        {
            console.log("service narociloId:", narociloId);
            return $http.post('/api/v1/narocilo/' + narociloId);
        }
        
        // Narocila potrdil o opravljenih izpitih
        function pridobiVsaNarocilaIzpitov()
        {
            return $http.get('/api/v1/narocilo-izpitov');
        }
        
        function narociPotrdiloIzpitov(data)
        {
            return $http.post('/api/v1/narocilo-izpitov', data);
        }
        
        function zakljuciNarociloPotrdilaIzpitov(narociloId)
        {
            return $http.post('/api/v1/narocilo-izpitov/' + narociloId);
        }
        
        // Individualn vnos ocene
        function inidividualniVnosOcene(studentId, data)
        {
            return $http.post('/api/v1/student/' + studentId + '/ocena', data);
        }
        
        function seznamVpisanihVLetnik(letnik, leto){
            return $http.get('api/v1/letnik/' + letnik + '/leto/' + leto);
        }
        
        return {
            uvoziStudente: uvoziStudente,
            
            pridobiVseObcine: pridobiVseObcine,
            pridobiVseVeljavneObcine: pridobiVseVeljavneObcine,
            pridobiVseIzbrisaneObcine: pridobiVseIzbrisaneObcine,
            dodajObcino: dodajObcino,
            najdiObcino: najdiObcino,
            izbrisiObcino: izbrisiObcino,
            obnoviObcino: obnoviObcino,
            urediObcino: urediObcino,
            
            pridobiVseDrzave: pridobiVseDrzave,
            pridobiVseVeljavneDrzave: pridobiVseVeljavneDrzave,
            pridobiVseIzbrisaneDrzave: pridobiVseIzbrisaneDrzave,
            dodajDrzavo: dodajDrzavo,
            najdiDrzavo: najdiDrzavo,
            izbrisiDrzavo: izbrisiDrzavo,
            obnoviDrzavo: obnoviDrzavo,
            urediDrzavo: urediDrzavo,
            
            pridobiVsePoste: pridobiVsePoste,
            pridobiVseVeljavnePoste: pridobiVseVeljavnePoste,
            pridobiVseIzbrisanePoste: pridobiVseIzbrisanePoste,
            dodajPosto: dodajPosto,
            najdiPosto: najdiPosto,
            izbrisiPosto: izbrisiPosto,
            obnoviPosto: obnoviPosto,
            urediPosto: urediPosto,
            
            pridobiVseVrsteVpisa: pridobiVseVrsteVpisa,
            pridobiVseVeljavneVrsteVpisa: pridobiVseVeljavneVrsteVpisa,
            pridobiVseIzbrisaneVrsteVpisa: pridobiVseIzbrisaneVrsteVpisa,
            dodajVrstoVpisa: dodajVrstoVpisa,
            najdiVrstoVpisa: najdiVrstoVpisa,
            izbrisiVrstoVpisa: izbrisiVrstoVpisa,
            obnoviVrstoVpisa: obnoviVrstoVpisa,
            urediVrstoVpisa: urediVrstoVpisa,
            
            pridobiVseStudijskaLeta: pridobiVseStudijskaLeta,
            pridobiVseVeljavneStudijskaLeta: pridobiVseVeljavneStudijskaLeta,
            pridobiVseIzbrisaneStudijskaLeta: pridobiVseIzbrisaneStudijskaLeta,
            dodajStudijskoLeto: dodajStudijskoLeto,
            najdiStudijskoLeto: najdiStudijskoLeto,
            izbrisiStudijskoLeto: izbrisiStudijskoLeto,
            obnoviStudijskoLeto: obnoviStudijskoLeto,
            urediStudijskoLeto: urediStudijskoLeto,
            
            pridobiVseOblikeStudija: pridobiVseOblikeStudija,
            pridobiVseVeljavneOblikeStudija: pridobiVseVeljavneOblikeStudija,
            pridobiVseIzbrisaneOblikeStudija: pridobiVseIzbrisaneOblikeStudija,
            dodajOblikoStudija: dodajOblikoStudija,
            najdiOblikoStudija: najdiOblikoStudija,
            izbrisiOblikoStudija: izbrisiOblikoStudija,
            obnoviOblikoStudija: obnoviOblikoStudija,
            urediOblikoStudija: urediOblikoStudija,
            
            pridobiVseNacineStudija: pridobiVseNacineStudija,
            pridobiVseVeljavneNacineStudija: pridobiVseVeljavneNacineStudija,
            pridobiVseIzbrisaneNacineStudija: pridobiVseIzbrisaneNacineStudija,
            dodajNacinStudija: dodajNacinStudija,
            najdiNacinStudija: najdiNacinStudija,
            izbrisiNacinStudija: izbrisiNacinStudija,
            obnoviNacinStudija: obnoviNacinStudija,
            urediNacinStudija: urediNacinStudija,
            
            pridobiVseVrsteStudije: pridobiVseVrsteStudije,
            pridobiVseVeljavneVrsteStudije: pridobiVseVeljavneVrsteStudije,
            pridobiVseIzbrisaneVrsteStudije: pridobiVseIzbrisaneVrsteStudije,
            dodajVrstoStudija: dodajVrstoStudija,
            najdiVrstoStudija: najdiVrstoStudija,
            izbrisiVrstoStudija: izbrisiVrstoStudija,
            obnoviVrstoStudija: obnoviVrstoStudija,
            urediVrstoStudija: urediVrstoStudija,
            
            pridobiVseStudijskePrograme: pridobiVseStudijskePrograme,
            pridobiVseVeljavneStudijskePrograme: pridobiVseVeljavneStudijskePrograme,
            pridobiVseIzbrisaneStudijskePrograme: pridobiVseIzbrisaneStudijskePrograme,
            dodajStudijskiProgram: dodajStudijskiProgram,
            najdiStudijskiProgram: najdiStudijskiProgram,
            izbrisiStudijskiProgram: izbrisiStudijskiProgram,
            obnoviStudijskiProgram: obnoviStudijskiProgram,
            urediStudijskiProgram: urediStudijskiProgram,
            
            pridobiVseDelePredmetnika: pridobiVseDelePredmetnika,
            pridobiVseVeljavneDelePredmetnika: pridobiVseVeljavneDelePredmetnika,
            pridobiVseIzbrisaneDelePredmetnika: pridobiVseIzbrisaneDelePredmetnika,
            dodajDelPredmetnika: dodajDelPredmetnika,
            najdiDelPredmetnika: najdiDelPredmetnika,
            izbrisiDelPredmetnika: izbrisiDelPredmetnika,
            obnoviDelPredmetnika: obnoviDelPredmetnika,
            urediDelPredmetnika: urediDelPredmetnika,
            
            pridobiVseLetnike: pridobiVseLetnike,
            pridobiVseVeljavneLetnike: pridobiVseVeljavneLetnike,
            pridobiVseIzbrisaneLetnike: pridobiVseIzbrisaneLetnike,
            dodajLetnik: dodajLetnik,
            najdiLetnik: najdiLetnik,
            izbrisiLetnik: izbrisiLetnik,
            obnoviLetnik: obnoviLetnik,
            urediLetnik: urediLetnik,
            
            pridobiVsePredmetnike: pridobiVsePredmetnike,
            pridobiVseVeljavnePredmetnike: pridobiVseVeljavnePredmetnike,
            pridobiVseIzbrisanePredmetnike: pridobiVseIzbrisanePredmetnike,
            dodajPredmetnik: dodajPredmetnik,
            najdiPredmetnik: najdiPredmetnik,
            izbrisiPredmetnik: izbrisiPredmetnik,
            obnoviPredmetnik: obnoviPredmetnik,
            urediPredmetnik: urediPredmetnik,
            dodajPredmetPredmetniku: dodajPredmetPredmetniku,
            odstraniPredmetIzPredmetnika: odstraniPredmetIzPredmetnika,
            
            pridobiVseZaposlene: pridobiVseZaposlene,
            pridobiVseVeljavneZaposlene: pridobiVseVeljavneZaposlene,
            pridobiVseIzbrisaneZaposlene: pridobiVseIzbrisaneZaposlene,
            dodajZaposlenega: dodajZaposlenega,
            najdiZaposlenega: najdiZaposlenega,
            izbrisiZaposlenega: izbrisiZaposlenega,
            obnoviZaposlenega: obnoviZaposlenega,
            urediZaposlenega: urediZaposlenega,
            
            najdiOddaneVpise: najdiOddaneVpise,
            najdiVseVpise: najdiVseVpise,
            potrdiVpis: potrdiVpis,
            
            vsiIzpitniRoki: vsiIzpitniRoki,
            prijaviNaRok: prijaviNaRok,
            odjaviOdRoka: odjaviOdRoka,
            
            obstajajociIzpitniRoki: obstajajociIzpitniRoki,
            prijaviNaRokForce: prijaviNaRokForce,
            odjaviOdRokaForce: odjaviOdRokaForce,
            pridobiIzpitniRok: pridobiIzpitniRok,
            posodobiOceno: posodobiOceno,
            
            izbrisiZetonStudentu: izbrisiZetonStudentu,
            urediZetonStudenta: urediZetonStudenta,
            dodajZetonStudentu: dodajZetonStudentu,
            pridobiOsnutekZetona: pridobiOsnutekZetona,
            
            dodajSklepStudentu: dodajSklepStudentu,
            urediSklepStudentu: urediSklepStudentu,
            odstraniSklepStudentu: odstraniSklepStudentu,
            
            pridobiKartotecniList: pridobiKartotecniList,
                
            pridobiVsaNarocila: pridobiVsaNarocila,
            narociPotrdiloVpisa: narociPotrdiloVpisa,
            zakljuciNarociloPotrdilaVpisa: zakljuciNarociloPotrdilaVpisa,
            
            pridobiVsaNarocilaIzpitov: pridobiVsaNarocilaIzpitov,
            narociPotrdiloIzpitov: narociPotrdiloIzpitov,
            zakljuciNarociloPotrdilaIzpitov: zakljuciNarociloPotrdilaIzpitov,
            
            inidividualniVnosOcene: inidividualniVnosOcene,
            
            seznamVpisanihVLetnik: seznamVpisanihVLetnik
        };
    };
    
    
    ostaloPodatki.$inject = ['$http'];
    angular
        .module('tpo')
        .service('ostaloPodatki', ostaloPodatki);
})();