var express = require('express');
var router = express.Router();

var auth = require("../controllers/auth/authentication.controller");

var ctrl = {
    izvozi: {
        vpisniList: require("../controllers/izvozi/vpisniList.controller"),
        potrdiloVpisa: require("../controllers/izvozi/potrdiloVpisa.controller")
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
router.get('/student/:student_id/cel', ctrl.student.celotenKartotecniList);
router.put('/student/:student_id', ctrl.student.updateStudenta);
router.get('/student/:student_id/izpit', ctrl.Izpit.getMozneIzpiteStudenta);
router.post('/student/:student_id/izpit/:izpit_id', ctrl.Izpit.addOcenoStudentu);
//router.post('/student/:student_id/izpit/:izpit_id', ctrl.Izpit.addOcenoStudentu);

// Controller Izpiti
router.get('/izpit/leto/:studijskoLeto_id', ctrl.Izpit.getIzpiteStudijskoLeto);
router.get('/izpit/predmet/:predmet_id', ctrl.Izpit.getIzpitePredmet);
router.get('/izpit/leto/:studijskoLeto_id/predmet/:predmet_id', ctrl.Izpit.getIzpiteStudijskoLetoPredmet);
router.get('/izpit/:izpit_id', ctrl.Izpit.getIzpit);
router.post('/izpit', ctrl.Izpit.addIzpit);
router.delete('/izpit/:izpit_id', ctrl.Izpit.delIzpit);
router.put('/izpit/:izpit_id', ctrl.Izpit.editIzpit);
// Prijave na izpit
router.post('/izpit/:izpit_id/prijava', ctrl.Izpit.prijavaNaIzpitStudent);
router.delete('/izpit/:izpit_id/odjava/:student_id', ctrl.Izpit.odjavaIzIzpitaStudent);
router.post('/izpit/:izpit_id/prijava/force', ctrl.Izpit.prijavaNaIzpitForce);
router.delete('/izpit/:izpit_id/odjava/:student_id/force', ctrl.Izpit.odjavaIzIzpitaForce);
// Odobritev spremembe
router.post('/izpit/:izpit_id/potrdi', ctrl.Izpit.potrdiSpremembo);

// Žetoni
router.post('/zeton', ctrl.zeton.ustvariZetone);
router.get('/student/:student_id/zeton', ctrl.student.osnutekZetona);
router.post('/student/:student_id/zeton', ctrl.student.addZetonStudentu);
router.put('/student/:student_id/zeton/:zeton_id', ctrl.student.editZetonStudenta);
router.delete('/student/:student_id/zeton/:zeton_id', ctrl.student.delZetonStudenta);

/* VPIS */
// Referentka nadzor vpisov
router.get('/vpis', ctrl.vpis.oddaniVpisi);
router.get('/vpis/vsi', ctrl.vpis.vsiVpisi);
router.post('/vpis/:vpisniList_id/potrdi', ctrl.vpis.potrdiVpis);
// Vpisi v šolo
router.post('/vpis/zeton', ctrl.vpis.pripraviVpisniList);
router.get('/vpis/:vpisniList_id', ctrl.vpis.najdiVpisniList);
router.put('/vpis/:vpisniList_id', ctrl.vpis.urediVpisniList);
router.post('/vpis/:vpisniList_id', ctrl.vpis.oddajVpisniList);
// Upravljanje splošnih izbirnih predmetov
router.post('/vpis/:vpisniList_id/splosni-izbirni', ctrl.vpis.dodajSplosniIzbirni);
router.delete('/vpis/:vpisniList_id/splosni-izbirni/:predmet_id', ctrl.vpis.odstraniSplosniIzbirni);
// Upravljanje strokovnih izbirnih predmetov
router.post('/vpis/:vpisniList_id/strokovni-izbirni', ctrl.vpis.dodajStrokovniIzbirni);
router.delete('/vpis/:vpisniList_id/strokovni-izbirni/:predmet_id', ctrl.vpis.odstraniStrokovniIzbirni);
// Upravljanje modulnih izbirnih predmetov
router.post('/vpis/:vpisniList_id/modulni-izbirni', ctrl.vpis.dodajModulniIzbirni);
router.delete('/vpis/:vpisniList_id/modulni-izbirni/:predmet_id', ctrl.vpis.odstraniModulniIzbirni);
// Upravljanje modulov
router.post('/vpis/:vpisniList_id/moduli', ctrl.vpis.dodajModul);
router.delete('/vpis/:vpisniList_id/moduli/:modul_id', ctrl.vpis.odstraniModul);


/* IZPISI */
// Vpisni list
router.get('/vpisni-list/:vpisnica_id', ctrl.izvozi.vpisniList.pdfVpisniList);
router.get('/potrdilo-vpisa/:vpisnica_id', ctrl.izvozi.potrdiloVpisa.pdfPotrdiloVpisa);
//router.get('/potrdilo-vpisa/:vpisnica_id/:N', ctrl.izvozi.potrdiloVpisa.pdfPotrdiloVpisa);


module.exports = router;