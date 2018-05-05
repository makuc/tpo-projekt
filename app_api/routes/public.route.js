var express = require('express');
var router = express.Router();

var ctrl = {
    izvozi: {
        vpisniList: require("../controllers/izvozi/vpisniList.controller")
    },
    other: require('../controllers/other.controller'),
    db: require('../controllers/db.controller'),
    
    users: require("../controllers/users.controller"),
    
    NeodvisniPodatki: {
        StudijskoLeto: require("../controllers/studijskoLeto.controller"),
        
        Obcina: require("../controllers/obcina.controller"),
        Drzava: require("../controllers/drzava.controller"),
        Posta: require("../controllers/posta.controller"),
        
        DelPredmetnika: require("../controllers/delPredmetnika.controller"),
        Predmet: require("../controllers/predmet.controller"),
        Letnik: require("../controllers/letnik.controller"),
        Predmetnik: require("../controllers/predmetnik.controller"),
        
        NacinStudija: require("../controllers/nacinStudija.controller"),
        OblikaStudija: require("../controllers/oblikaStudija.controller"),
        VrstaStudija: require("../controllers/vrstaStudija.controller"),
        StudijskiProgram: require("../controllers/studijskiProgram.controller"),
        
        VrstaVpisa: require("../controllers/vrstaVpisa.controller"),
        
        Zaposlen: require("../controllers/zaposlen.controller")
    },
    
    Izpit: require('../controllers/izpit.controller.js'),
    
    student: require("../controllers/student.controller"),
    
    zeton: require("../controllers/zeton.controller.js"),
    vpis: require("../controllers/vpis.controller")
};


// Osnovne povezave
router.get('/', ctrl.other.index);
router.post('/db', ctrl.db.vnosZacetnihPodatkov);
router.delete('/db', ctrl.db.izbrisBaze);

// Uporabniki - povezave
router.post("/prijava", ctrl.users.login);
router.post("/odjava", ctrl.users.logout);
router.post('/pozabljeno-geslo', ctrl.users.pozabljenoGeslo);
router.post('/pozabljeno-geslo/:ponastavi_geslo', ctrl.users.ponastaviGeslo);

router.get("/uporabnik", ctrl.users.getUsers);
router.get("/uporabnik/:user", ctrl.users.getUser);
router.post("/uporabnik", ctrl.users.addUser);
router.delete("/uporabnik/:user", ctrl.users.deleteUser);
router.put("/uporabnik/:user", ctrl.users.updateUser);

// Študenti
router.get('/student', ctrl.student.getStudente);
router.post('/student', ctrl.student.createStudenta);
router.post('/student/uvoz-sprejetih', ctrl.student.uvoziStudente);
router.get('/student/:student_id', ctrl.student.getStudenta);
router.put('/student/:student_id', ctrl.student.updateStudenta);

// Žetoni
router.post('/zeton', ctrl.zeton.ustvariZetone);
router.post('/zeton/:student_id', ctrl.zeton.ustvariZeton);
router.get('/zeton/:student_id', ctrl.zeton.pridobiZetoneStudenta);
router.put('/zeton/:student_id/:zeton_id', ctrl.zeton.urediZeton);
router.delete('/zeton/:student_id/:zeton_id', ctrl.zeton.izbrisZetona);

// Vpisi
router.post('/vpis/zeton', ctrl.vpis.pripraviVpisniList);
router.get('/vpis/:vpisniList_id', ctrl.vpis.najdiVpisniList);
router.put('/vpis/:vpisniList_id', ctrl.vpis.urediVpisniList);
router.post('/vpis/:vpisniList_id', ctrl.vpis.oddajVpisniList);

// Vpisni list
router.get('/vpisni-list/:vpisnica_id', ctrl.izvozi.vpisniList.pdfVpisniList);

// Ostalo
// Controller Študijsko Leto
router.get('/leto', ctrl.NeodvisniPodatki.StudijskoLeto.getStudijskaLeta);
router.get('/leto/vsa', ctrl.NeodvisniPodatki.StudijskoLeto.getVseStudijskaLeta);
router.get('/leto/izbrisana', ctrl.NeodvisniPodatki.StudijskoLeto.getIzbrisaneStudijskaLeta);
router.post('/leto', ctrl.NeodvisniPodatki.StudijskoLeto.addStudijskoLeto);
router.get('/leto/:leto_id', ctrl.NeodvisniPodatki.StudijskoLeto.getStudijskoLeto);
router.post('/leto/:leto_id', ctrl.NeodvisniPodatki.StudijskoLeto.obnoviStudijskoLeto);
router.put('/leto/:leto_id', ctrl.NeodvisniPodatki.StudijskoLeto.editStudijskoLeto);
router.delete('/leto/:leto_id', ctrl.NeodvisniPodatki.StudijskoLeto.delStudijskoLeto);

// Controller Občina
router.get('/obcina', ctrl.NeodvisniPodatki.Obcina.getObcine);
router.get('/obcina/vse', ctrl.NeodvisniPodatki.Obcina.getVseObcine);
router.get('/obcina/izbrisane', ctrl.NeodvisniPodatki.Obcina.getIzbrisaneObcine);
router.post('/obcina', ctrl.NeodvisniPodatki.Obcina.addObcina);
router.get('/obcina/:obcina_id', ctrl.NeodvisniPodatki.Obcina.getObcina);
router.post('/obcina/:obcina_id', ctrl.NeodvisniPodatki.Obcina.obnoviObcina);
router.put('/obcina/:obcina_id', ctrl.NeodvisniPodatki.Obcina.editObcina);
router.delete('/obcina/:obcina_id', ctrl.NeodvisniPodatki.Obcina.delObcina);

// Controller Država
router.get('/drzava', ctrl.NeodvisniPodatki.Drzava.getDrzave);
router.get('/drzava/vse', ctrl.NeodvisniPodatki.Drzava.getVseDrzave);
router.get('/drzava/izbrisane', ctrl.NeodvisniPodatki.Drzava.getIzbrisaneDrzave);
router.post('/drzava', ctrl.NeodvisniPodatki.Drzava.addDrzava);
router.get('/drzava/:drzava_id', ctrl.NeodvisniPodatki.Drzava.getDrzava);
router.post('/drzava/:drzava_id', ctrl.NeodvisniPodatki.Drzava.obnoviDrzava);
router.put('/drzava/:drzava_id', ctrl.NeodvisniPodatki.Drzava.editDrzava);
router.delete('/drzava/:drzava_id', ctrl.NeodvisniPodatki.Drzava.delDrzava);

// Controller Pošta
router.get('/posta', ctrl.NeodvisniPodatki.Posta.getPoste);
router.get('/posta/vse', ctrl.NeodvisniPodatki.Posta.getVsePoste);
router.get('/posta/izbrisane', ctrl.NeodvisniPodatki.Posta.getIzbrisanePoste);
router.post('/posta', ctrl.NeodvisniPodatki.Posta.addPosta);
router.get('/posta/:posta_id', ctrl.NeodvisniPodatki.Posta.getPosta);
router.post('/posta/:posta_id', ctrl.NeodvisniPodatki.Posta.obnoviPosta);
router.put('/posta/:posta_id', ctrl.NeodvisniPodatki.Posta.editPosta);
router.delete('/posta/:posta_id', ctrl.NeodvisniPodatki.Posta.delPosta);

// Controller Način Študija
router.get('/nacin-studija', ctrl.NeodvisniPodatki.NacinStudija.getNacineStudija);
router.get('/nacin-studija/vsi', ctrl.NeodvisniPodatki.NacinStudija.getVseNacineStudija);
router.get('/nacin-studija/izbrisani', ctrl.NeodvisniPodatki.NacinStudija.getIzbrisaneNacineStudija);
router.post('/nacin-studija', ctrl.NeodvisniPodatki.NacinStudija.addNacinStudija);
router.get('/nacin-studija/:nacin_id', ctrl.NeodvisniPodatki.NacinStudija.getNacinStudija);
router.post('/nacin-studija/:nacin_id', ctrl.NeodvisniPodatki.NacinStudija.obnoviNacinStudija);
router.put('/nacin-studija/:nacin_id', ctrl.NeodvisniPodatki.NacinStudija.editNacinStudija);
router.delete('/nacin-studija/:nacin_id', ctrl.NeodvisniPodatki.NacinStudija.delNacinStudija);

// Controller Oblika Študija
router.get('/oblika-studija', ctrl.NeodvisniPodatki.OblikaStudija.getOblikeStudija);
router.get('/oblika-studija/vse', ctrl.NeodvisniPodatki.OblikaStudija.getVseOblikeStudija);
router.get('/oblika-studija/izbrisane', ctrl.NeodvisniPodatki.OblikaStudija.getIzbrisaneOblikeStudija);
router.post('/oblika-studija', ctrl.NeodvisniPodatki.OblikaStudija.addOblikaStudija);
router.get('/oblika-studija/:oblika_id', ctrl.NeodvisniPodatki.OblikaStudija.getOblikaStudija);
router.post('/oblika-studija/:oblika_id', ctrl.NeodvisniPodatki.OblikaStudija.obnoviOblikaStudija);
router.put('/oblika-studija/:oblika_id', ctrl.NeodvisniPodatki.OblikaStudija.editOblikaStudija);
router.delete('/oblika-studija/:oblika_id', ctrl.NeodvisniPodatki.OblikaStudija.delOblikaStudija);

// Controller Vrsta Študija
router.get('/vrsta-studija', ctrl.NeodvisniPodatki.VrstaStudija.getVrsteStudija);
router.get('/vrsta-studija/vse', ctrl.NeodvisniPodatki.VrstaStudija.getVseVrsteStudija);
router.get('/vrsta-studija/izbrisane', ctrl.NeodvisniPodatki.VrstaStudija.getIzbrisaneVrsteStudija);
router.post('/vrsta-studija', ctrl.NeodvisniPodatki.VrstaStudija.addVrstaStudija);
router.get('/vrsta-studija/:vrsta_id', ctrl.NeodvisniPodatki.VrstaStudija.getVrstaStudija);
router.post('/vrsta-studija/:vrsta_id', ctrl.NeodvisniPodatki.VrstaStudija.obnoviVrstaStudija);
router.put('/vrsta-studija/:vrsta_id', ctrl.NeodvisniPodatki.VrstaStudija.editVrstaStudija);
router.delete('/vrsta-studija/:vrsta_id', ctrl.NeodvisniPodatki.VrstaStudija.delVrstaStudija);

// Controller Vrsta Vpisa
router.get('/vrsta-vpisa', ctrl.NeodvisniPodatki.VrstaVpisa.getVrsteVpisa);
router.get('/vrsta-vpisa/vse', ctrl.NeodvisniPodatki.VrstaVpisa.getVseVrsteVpisa);
router.get('/vrsta-vpisa/izbrisane', ctrl.NeodvisniPodatki.VrstaVpisa.getIzbrisaneVrsteVpisa);
router.post('/vrsta-vpisa', ctrl.NeodvisniPodatki.VrstaVpisa.addVrstaVpisa);
router.get('/vrsta-vpisa/:vrsta_id', ctrl.NeodvisniPodatki.VrstaVpisa.getVrstaVpisa);
router.post('/vrsta-vpisa/:vrsta_id', ctrl.NeodvisniPodatki.VrstaVpisa.obnoviVrstaVpisa);
router.put('/vrsta-vpisa/:vrsta_id', ctrl.NeodvisniPodatki.VrstaVpisa.editVrstaVpisa);
router.delete('/vrsta-vpisa/:vrsta_id', ctrl.NeodvisniPodatki.VrstaVpisa.delVrstaVpisa);

// Controller Študijski Program
router.get('/studijski-program', ctrl.NeodvisniPodatki.StudijskiProgram.getStudijskePrograme);
router.get('/studijski-program/vsi', ctrl.NeodvisniPodatki.StudijskiProgram.getVseStudijskePrograme);
router.get('/studijski-program/izbrisani', ctrl.NeodvisniPodatki.StudijskiProgram.getIzbrisaneStudijskePrograme);
router.post('/studijski-program', ctrl.NeodvisniPodatki.StudijskiProgram.addStudijskiProgram);
router.get('/studijski-program/:program_id', ctrl.NeodvisniPodatki.StudijskiProgram.getStudijskiProgram);
router.post('/studijski-program/:program_id', ctrl.NeodvisniPodatki.StudijskiProgram.obnoviStudijskiProgram);
router.put('/studijski-program/:program_id', ctrl.NeodvisniPodatki.StudijskiProgram.editStudijskiProgram);
router.delete('/studijski-program/:program_id', ctrl.NeodvisniPodatki.StudijskiProgram.delStudijskiProgram);

// Controller Del Predmetnika
router.get('/del-predmetnika', ctrl.NeodvisniPodatki.DelPredmetnika.getDele);
router.get('/del-predmetnika/vse', ctrl.NeodvisniPodatki.DelPredmetnika.getVseDele);
router.get('/del-predmetnika/izbrisane', ctrl.NeodvisniPodatki.DelPredmetnika.getIzbrisaneDele);
router.post('/del-predmetnika', ctrl.NeodvisniPodatki.DelPredmetnika.addDel);
router.get('/del-predmetnika/:delPredmetnika_id', ctrl.NeodvisniPodatki.DelPredmetnika.getDel);
router.post('/del-predmetnika/:delPredmetnika_id', ctrl.NeodvisniPodatki.DelPredmetnika.obnoviDel);
router.put('/del-predmetnika/:delPredmetnika_id', ctrl.NeodvisniPodatki.DelPredmetnika.editDel);
router.delete('/del-predmetnika/:delPredmetnika_id', ctrl.NeodvisniPodatki.DelPredmetnika.delDel);

// Controller Predmet
router.get('/predmet', ctrl.NeodvisniPodatki.Predmet.getPredmete);
router.get('/predmet/vse', ctrl.NeodvisniPodatki.Predmet.getVsePredmete);
router.get('/predmet/izbrisane', ctrl.NeodvisniPodatki.Predmet.getIzbrisanePredmete);
router.post('/predmet', ctrl.NeodvisniPodatki.Predmet.addPredmet);
router.get('/predmet/:predmet_id', ctrl.NeodvisniPodatki.Predmet.getPredmet);
router.post('/predmet/:predmet_id', ctrl.NeodvisniPodatki.Predmet.obnoviPredmet);
router.put('/predmet/:predmet_id', ctrl.NeodvisniPodatki.Predmet.editPredmet);
router.delete('/predmet/:predmet_id', ctrl.NeodvisniPodatki.Predmet.delPredmet);
// Vzdrževanje izvedb predmeta
router.post('/predmet/:predmet_id/izvedba', ctrl.NeodvisniPodatki.Predmet.addIzvedbaPredmeta);
router.delete('/predmet/:predmet_id/izvedba/:studijskoLeto_id', ctrl.NeodvisniPodatki.Predmet.delIzvedbaPredmeta);
router.post('/predmet/:predmet_id/izvedba/:studijskoLeto_id/izvajalec', ctrl.NeodvisniPodatki.Predmet.addIzvajalcaIzvedbiPredmeta);
router.delete('/predmet/:predmet_id/izvedba/:studijskoLeto_id/izvajalec/:izvajalec_id', ctrl.NeodvisniPodatki.Predmet.delIzvajalcaIzvedbiPredmeta);
//router.get('/predmet/:predmet_id/izvedba/:izvdeba_id', ctrl.NeodvisniPodatki.Predmet.pridobiIzvedboPredmeta);

// Controller Letnik
router.get('/letnik', ctrl.NeodvisniPodatki.Letnik.getLetnike);
router.get('/letnik/vsi', ctrl.NeodvisniPodatki.Letnik.getVseLetnike);
router.get('/letnik/izbrisani', ctrl.NeodvisniPodatki.Letnik.getIzbrisaneLetnike);
router.post('/letnik', ctrl.NeodvisniPodatki.Letnik.addLetnik);
router.get('/letnik/:letnik_id', ctrl.NeodvisniPodatki.Letnik.getLetnik);
router.post('/letnik/:letnik_id', ctrl.NeodvisniPodatki.Letnik.obnoviLetnik);
router.put('/letnik/:letnik_id', ctrl.NeodvisniPodatki.Letnik.editLetnik);
router.delete('/letnik/:letnik_id', ctrl.NeodvisniPodatki.Letnik.delLetnik);

// Controller Predmetnik
router.get('/predmetnik', ctrl.NeodvisniPodatki.Predmetnik.getPredmetnike);
router.get('/predmetnik/vsi', ctrl.NeodvisniPodatki.Predmetnik.getVsePredmetnike);
router.get('/predmetnik/izbrisani', ctrl.NeodvisniPodatki.Predmetnik.getIzbrisanePredmetnike);
router.post('/predmetnik', ctrl.NeodvisniPodatki.Predmetnik.addPredmetnik);
router.get('/predmetnik/:predmetnik_id', ctrl.NeodvisniPodatki.Predmetnik.getPredmetnik);
router.post('/predmetnik/:predmetnik_id', ctrl.NeodvisniPodatki.Predmetnik.obnoviPredmetnik);
router.put('/predmetnik/:predmetnik_id', ctrl.NeodvisniPodatki.Predmetnik.editPredmetnik);
router.delete('/predmetnik/:predmetnik_id', ctrl.NeodvisniPodatki.Predmetnik.delPredmetnik);
router.post('/predmetnik/:predmetnik_id/predmet', ctrl.NeodvisniPodatki.Predmetnik.dodajPredmet);
router.delete('/predmetnik/:predmetnik_id/predmet/:predmet_id', ctrl.NeodvisniPodatki.Predmetnik.odstraniPredmet);

// Controller Zaposlen
router.get('/zaposlen', ctrl.NeodvisniPodatki.Zaposlen.getZaposlene);
router.get('/zaposlen/vsi', ctrl.NeodvisniPodatki.Zaposlen.getVseZaposlene);
router.get('/zaposlen/izbrisani', ctrl.NeodvisniPodatki.Zaposlen.getIzbrisaneZaposlene);
router.post('/zaposlen', ctrl.NeodvisniPodatki.Zaposlen.addZaposlenega);
router.get('/zaposlen/:zaposlen_id', ctrl.NeodvisniPodatki.Zaposlen.getZaposlenega);
router.post('/zaposlen/:zaposlen_id', ctrl.NeodvisniPodatki.Zaposlen.obnoviZaposlenega);
router.put('/zaposlen/:zaposlen_id', ctrl.NeodvisniPodatki.Zaposlen.editZaposlenega);
router.delete('/zaposlen/:zaposlen_id', ctrl.NeodvisniPodatki.Zaposlen.delZaposlenega);

// Controller Izpiti
router.get('/izpit/leto/:studijskoLeto_id', ctrl.Izpit.getIzpiteStudijskoLeto);
router.get('/izpit/predmet/:predmet_id', ctrl.Izpit.getIzpitePredmet);
router.get('/izpit/leto/:studijskoLeto_id/predmet/>predmet_id', ctrl.Izpit.getIzpiteStudijskoLetoPredmet);
router.get('/izpit/:izpit_id', ctrl.Izpit.getIzpit);
router.post('/izpit', ctrl.Izpit.addIzpit);
router.delete('/izpit/:izpit_id', ctrl.Izpit.delIzpit);
router.put('/izpit/:izpit_id', ctrl.Izpit.editIzpit);

module.exports = router;