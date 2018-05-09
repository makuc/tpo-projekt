var express = require('express');
var router = express.Router();
var auth = require("../controllers/auth/authentication.controller");

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

// Ostalo
// Controller Študijsko Leto
router.get('/leto', ctrl.NeodvisniPodatki.StudijskoLeto.getStudijskaLeta);
router.get('/leto/vsa', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskoLeto.getVseStudijskaLeta);
router.get('/leto/izbrisana', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskoLeto.getIzbrisaneStudijskaLeta);
router.post('/leto', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskoLeto.addStudijskoLeto);
router.get('/leto/:leto_id', ctrl.NeodvisniPodatki.StudijskoLeto.getStudijskoLeto);
router.post('/leto/:leto_id', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskoLeto.obnoviStudijskoLeto);
router.put('/leto/:leto_id', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskoLeto.editStudijskoLeto);
router.delete('/leto/:leto_id', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskoLeto.delStudijskoLeto);
router.get('/trenutno-leto', ctrl.NeodvisniPodatki.StudijskoLeto.pridobiTrenutnoStudijskoLeto);
router.post('/trenutno-leto', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskoLeto.oznaciTrenutnoStudijskoLeto);

// Controller Občina
router.get('/obcina', ctrl.NeodvisniPodatki.Obcina.getObcine);
router.get('/obcina/vse', auth.skrbnik, ctrl.NeodvisniPodatki.Obcina.getVseObcine);
router.get('/obcina/izbrisane', auth.skrbnik, ctrl.NeodvisniPodatki.Obcina.getIzbrisaneObcine);
router.post('/obcina', auth.skrbnik, ctrl.NeodvisniPodatki.Obcina.addObcina);
router.get('/obcina/:obcina_id', ctrl.NeodvisniPodatki.Obcina.getObcina);
router.post('/obcina/:obcina_id', auth.skrbnik, ctrl.NeodvisniPodatki.Obcina.obnoviObcina);
router.put('/obcina/:obcina_id', auth.skrbnik, ctrl.NeodvisniPodatki.Obcina.editObcina);
router.delete('/obcina/:obcina_id', auth.skrbnik, ctrl.NeodvisniPodatki.Obcina.delObcina);

// Controller Država
router.get('/drzava', ctrl.NeodvisniPodatki.Drzava.getDrzave);
router.get('/drzava/vse', auth.skrbnik, ctrl.NeodvisniPodatki.Drzava.getVseDrzave);
router.get('/drzava/izbrisane', auth.skrbnik, ctrl.NeodvisniPodatki.Drzava.getIzbrisaneDrzave);
router.post('/drzava', auth.skrbnik, ctrl.NeodvisniPodatki.Drzava.addDrzava);
router.get('/drzava/:drzava_id', ctrl.NeodvisniPodatki.Drzava.getDrzava);
router.post('/drzava/:drzava_id', auth.skrbnik, ctrl.NeodvisniPodatki.Drzava.obnoviDrzava);
router.put('/drzava/:drzava_id', auth.skrbnik, ctrl.NeodvisniPodatki.Drzava.editDrzava);
router.delete('/drzava/:drzava_id', auth.skrbnik, ctrl.NeodvisniPodatki.Drzava.delDrzava);

// Controller Pošta
router.get('/posta', ctrl.NeodvisniPodatki.Posta.getPoste);
router.get('/posta/vse', auth.skrbnik, ctrl.NeodvisniPodatki.Posta.getVsePoste);
router.get('/posta/izbrisane', auth.skrbnik, ctrl.NeodvisniPodatki.Posta.getIzbrisanePoste);
router.post('/posta', auth.skrbnik, ctrl.NeodvisniPodatki.Posta.addPosta);
router.get('/posta/:posta_id', ctrl.NeodvisniPodatki.Posta.getPosta);
router.post('/posta/:posta_id', auth.skrbnik, ctrl.NeodvisniPodatki.Posta.obnoviPosta);
router.put('/posta/:posta_id', auth.skrbnik, ctrl.NeodvisniPodatki.Posta.editPosta);
router.delete('/posta/:posta_id', auth.skrbnik, ctrl.NeodvisniPodatki.Posta.delPosta);

// Controller Način Študija
router.get('/nacin-studija', ctrl.NeodvisniPodatki.NacinStudija.getNacineStudija);
router.get('/nacin-studija/vsi', auth.skrbnik, ctrl.NeodvisniPodatki.NacinStudija.getVseNacineStudija);
router.get('/nacin-studija/izbrisani', auth.skrbnik, ctrl.NeodvisniPodatki.NacinStudija.getIzbrisaneNacineStudija);
router.post('/nacin-studija', auth.skrbnik, ctrl.NeodvisniPodatki.NacinStudija.addNacinStudija);
router.get('/nacin-studija/:nacin_id', ctrl.NeodvisniPodatki.NacinStudija.getNacinStudija);
router.post('/nacin-studija/:nacin_id', auth.skrbnik, ctrl.NeodvisniPodatki.NacinStudija.obnoviNacinStudija);
router.put('/nacin-studija/:nacin_id', auth.skrbnik, ctrl.NeodvisniPodatki.NacinStudija.editNacinStudija);
router.delete('/nacin-studija/:nacin_id', auth.skrbnik, ctrl.NeodvisniPodatki.NacinStudija.delNacinStudija);

// Controller Oblika Študija
router.get('/oblika-studija', ctrl.NeodvisniPodatki.OblikaStudija.getOblikeStudija);
router.get('/oblika-studija/vse', auth.skrbnik, ctrl.NeodvisniPodatki.OblikaStudija.getVseOblikeStudija);
router.get('/oblika-studija/izbrisane', auth.skrbnik, ctrl.NeodvisniPodatki.OblikaStudija.getIzbrisaneOblikeStudija);
router.post('/oblika-studija', auth.skrbnik, ctrl.NeodvisniPodatki.OblikaStudija.addOblikaStudija);
router.get('/oblika-studija/:oblika_id', ctrl.NeodvisniPodatki.OblikaStudija.getOblikaStudija);
router.post('/oblika-studija/:oblika_id', auth.skrbnik, ctrl.NeodvisniPodatki.OblikaStudija.obnoviOblikaStudija);
router.put('/oblika-studija/:oblika_id', auth.skrbnik, ctrl.NeodvisniPodatki.OblikaStudija.editOblikaStudija);
router.delete('/oblika-studija/:oblika_id', auth.skrbnik, ctrl.NeodvisniPodatki.OblikaStudija.delOblikaStudija);

// Controller Vrsta Študija
router.get('/vrsta-studija', ctrl.NeodvisniPodatki.VrstaStudija.getVrsteStudija);
router.get('/vrsta-studija/vse', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaStudija.getVseVrsteStudija);
router.get('/vrsta-studija/izbrisane', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaStudija.getIzbrisaneVrsteStudija);
router.post('/vrsta-studija', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaStudija.addVrstaStudija);
router.get('/vrsta-studija/:vrsta_id', ctrl.NeodvisniPodatki.VrstaStudija.getVrstaStudija);
router.put('/vrsta-studija/:vrsta_id', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaStudija.editVrstaStudija);
router.post('/vrsta-studija/:vrsta_id', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaStudija.obnoviVrstaStudija);
router.delete('/vrsta-studija/:vrsta_id', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaStudija.delVrstaStudija);

// Controller Vrsta Vpisa
router.get('/vrsta-vpisa', ctrl.NeodvisniPodatki.VrstaVpisa.getVrsteVpisa);
router.get('/vrsta-vpisa/valid', auth.referentka, ctrl.NeodvisniPodatki.VrstaVpisa.getValidVrsteVpisa);
router.get('/vrsta-vpisa/vse', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaVpisa.getVseVrsteVpisa);
router.get('/vrsta-vpisa/izbrisane', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaVpisa.getIzbrisaneVrsteVpisa);
router.post('/vrsta-vpisa', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaVpisa.addVrstaVpisa);
router.get('/vrsta-vpisa/:vrsta_id', ctrl.NeodvisniPodatki.VrstaVpisa.getVrstaVpisa);
router.post('/vrsta-vpisa/:vrsta_id', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaVpisa.obnoviVrstaVpisa);
router.put('/vrsta-vpisa/:vrsta_id', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaVpisa.editVrstaVpisa);
router.delete('/vrsta-vpisa/:vrsta_id', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaVpisa.delVrstaVpisa);
router.post('/vrsta-vpisa/:vrsta_id/valid', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaVpisa.makeValid);
router.delete('/vrsta-vpisa/:vrsta_id/valid', auth.skrbnik, ctrl.NeodvisniPodatki.VrstaVpisa.makeInvalid);

// Controller Študijski Program
router.get('/studijski-program', ctrl.NeodvisniPodatki.StudijskiProgram.getStudijskePrograme);
router.get('/studijski-program/vsi', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskiProgram.getVseStudijskePrograme);
router.get('/studijski-program/izbrisani', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskiProgram.getIzbrisaneStudijskePrograme);
router.post('/studijski-program', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskiProgram.addStudijskiProgram);
router.get('/studijski-program/:program_id', ctrl.NeodvisniPodatki.StudijskiProgram.getStudijskiProgram);
router.post('/studijski-program/:program_id', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskiProgram.obnoviStudijskiProgram);
router.put('/studijski-program/:program_id', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskiProgram.editStudijskiProgram);
router.delete('/studijski-program/:program_id', auth.skrbnik, ctrl.NeodvisniPodatki.StudijskiProgram.delStudijskiProgram);

// Controller Del Predmetnika
router.get('/del-predmetnika', ctrl.NeodvisniPodatki.DelPredmetnika.getDele);
router.get('/del-predmetnika/vse', auth.skrbnik, ctrl.NeodvisniPodatki.DelPredmetnika.getVseDele);
router.get('/del-predmetnika/izbrisane', auth.skrbnik, ctrl.NeodvisniPodatki.DelPredmetnika.getIzbrisaneDele);
router.post('/del-predmetnika', auth.skrbnik, ctrl.NeodvisniPodatki.DelPredmetnika.addDel);
router.get('/del-predmetnika/:delPredmetnika_id', ctrl.NeodvisniPodatki.DelPredmetnika.getDel);
router.post('/del-predmetnika/:delPredmetnika_id', auth.skrbnik, ctrl.NeodvisniPodatki.DelPredmetnika.obnoviDel);
router.put('/del-predmetnika/:delPredmetnika_id', auth.skrbnik, ctrl.NeodvisniPodatki.DelPredmetnika.editDel);
router.delete('/del-predmetnika/:delPredmetnika_id', auth.skrbnik, ctrl.NeodvisniPodatki.DelPredmetnika.delDel);





// Controller Predmet
router.get('/predmet', ctrl.NeodvisniPodatki.Predmet.getPredmete);
router.get('/predmet/zaposlen', ctrl.NeodvisniPodatki.Predmet.predmetiZaposlenega);
router.get('/predmet/vse', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.getVsePredmete);
router.get('/predmet/izbrisane', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.getIzbrisanePredmete);
router.post('/predmet', auth.skrbnik, auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.addPredmet);
router.get('/predmet/:predmet_id', ctrl.NeodvisniPodatki.Predmet.getPredmet);
router.post('/predmet/:predmet_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.obnoviPredmet);
router.put('/predmet/:predmet_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.editPredmet);
router.delete('/predmet/:predmet_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.delPredmet);

// Vzdrževanje kombinacij izvedb predmeta
router.get('/predmet/:predmet_id/kombinacija', ctrl.NeodvisniPodatki.Predmet.getKombinacijeIzvajalcev);
router.get('/predmet/:predmet_id/kombinacija/vse', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.getKombinacijeIzvajalcev);
router.post('/predmet/:predmet_id/kombinacija', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.addKombinacijaIzvajalcev);
router.delete('/predmet/:predmet_id/kombinacija/:kombinacija_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.izbrisiKombinacijaIzvajalcev);
router.post('/predmet/:predmet_id/kombinacija/:kombinacija_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.obnoviKombinacijaIzvajalcev);
router.post('/predmet/:predmet_id/kombinacija/:kombinacija_id/izvajalec', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.addIzvajalcaKombinaciji);
router.delete('/predmet/:predmet_id/kombinacija/:kombinacija_id/izvajalec/:izvajalec_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.delIzvajalcaKombinaciji);

// Vzdrževanje izvedb predmeta
router.post('/predmet/:predmet_id/izvedba', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.addIzvedbaPredmeta);
router.delete('/predmet/:predmet_id/izvedba/:studijskoLeto_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmet.delIzvedbaPredmeta);







// Controller Letnik
router.get('/letnik', ctrl.NeodvisniPodatki.Letnik.getLetnike);
router.get('/letnik/vsi', auth.skrbnik, ctrl.NeodvisniPodatki.Letnik.getVseLetnike);
router.get('/letnik/izbrisani', auth.skrbnik, ctrl.NeodvisniPodatki.Letnik.getIzbrisaneLetnike);
router.post('/letnik', auth.skrbnik, ctrl.NeodvisniPodatki.Letnik.addLetnik);
router.get('/letnik/:letnik_id', ctrl.NeodvisniPodatki.Letnik.getLetnik);
router.post('/letnik/:letnik_id', auth.skrbnik, ctrl.NeodvisniPodatki.Letnik.obnoviLetnik);
router.put('/letnik/:letnik_id', auth.skrbnik, ctrl.NeodvisniPodatki.Letnik.editLetnik);
router.delete('/letnik/:letnik_id', auth.skrbnik, ctrl.NeodvisniPodatki.Letnik.delLetnik);

// Controller Predmetnik
router.get('/predmetnik', ctrl.NeodvisniPodatki.Predmetnik.getPredmetnike);
router.get('/predmetnik/vsi', auth.skrbnik, ctrl.NeodvisniPodatki.Predmetnik.getVsePredmetnike);
router.get('/predmetnik/izbrisani', auth.skrbnik, ctrl.NeodvisniPodatki.Predmetnik.getIzbrisanePredmetnike);
router.post('/predmetnik', auth.skrbnik, ctrl.NeodvisniPodatki.Predmetnik.addPredmetnik);
router.get('/predmetnik/:predmetnik_id', ctrl.NeodvisniPodatki.Predmetnik.getPredmetnik);
router.post('/predmetnik/:predmetnik_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmetnik.obnoviPredmetnik);
router.put('/predmetnik/:predmetnik_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmetnik.editPredmetnik);
router.delete('/predmetnik/:predmetnik_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmetnik.delPredmetnik);
router.post('/predmetnik/:predmetnik_id/predmet', auth.skrbnik, ctrl.NeodvisniPodatki.Predmetnik.dodajPredmet);
router.delete('/predmetnik/:predmetnik_id/predmet/:predmet_id', auth.skrbnik, ctrl.NeodvisniPodatki.Predmetnik.odstraniPredmet);

// Controller Zaposlen
router.get('/zaposlen', auth.skrbnik, ctrl.NeodvisniPodatki.Zaposlen.getZaposlene);
router.get('/zaposlen/vsi', auth.skrbnik, ctrl.NeodvisniPodatki.Zaposlen.getVseZaposlene);
router.get('/zaposlen/izbrisani', auth.skrbnik, ctrl.NeodvisniPodatki.Zaposlen.getIzbrisaneZaposlene);
router.post('/zaposlen', auth.skrbnik, ctrl.NeodvisniPodatki.Zaposlen.addZaposlenega);
router.get('/zaposlen/:zaposlen_id', ctrl.NeodvisniPodatki.Zaposlen.getZaposlenega);
router.post('/zaposlen/:zaposlen_id', auth.skrbnik, ctrl.NeodvisniPodatki.Zaposlen.obnoviZaposlenega);
router.put('/zaposlen/:zaposlen_id', ctrl.NeodvisniPodatki.Zaposlen.editZaposlenega);
router.delete('/zaposlen/:zaposlen_id', auth.skrbnik, ctrl.NeodvisniPodatki.Zaposlen.delZaposlenega);

module.exports = router;