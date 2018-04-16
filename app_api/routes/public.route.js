var express = require('express');
var router = express.Router();

var ctrl = {
    izvozi: {
        vpisniList: require("../controllers/izvozi/vpisniList.controller")
    },
    other: require('../controllers/other.controller'),
    db: require('../controllers/db.controller'),
    
    users: require("../controllers/users.controller"),
    
    obcina: require("../controllers/obcina.controller"),
    drzava: require("../controllers/drzava.controller"),
    posta: require("../controllers/posta.controller"),
    
    student: require("../controllers/student.controller"),
    
    predmet: require("../controllers/predmet.controller")
};


// Osnovne povezave
router.get('/', ctrl.other.index);
router.post('/db', ctrl.db.vnosZacetnihPodatkov);
router.delete('/db', ctrl.db.izbrisBaze);

// Predmeti povezave
router.get('/predmet/:predmet_id/:studijskoLeto_id', ctrl.predmet.pridobiStudente);
router.get('/predmet/:predmet_id', ctrl.predmet.pridobiPredmet);

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

// Vpisni list
router.get('/vpisni-list/:vpisnica_id', ctrl.izvozi.vpisniList.pdfVpisniList);

// Ostalo
// Controller Občina
router.get('/obcina', ctrl.obcina.getObcine);
router.get('/obcina/vse', ctrl.obcina.getVseObcine);
router.get('/obcina/izbrisane', ctrl.obcina.getIzbrisaneObcine);
router.post('/obcina', ctrl.obcina.addObcina);
router.get('/obcina/:obcina_id', ctrl.obcina.getObcina);
router.post('/obcina/:obcina_id', ctrl.obcina.obnoviObcina);
router.put('/obcina/:obcina_id', ctrl.obcina.editObcina);
router.delete('/obcina/:obcina_id', ctrl.obcina.delObcina);

// Controller Država
router.get('/drzava', ctrl.drzava.getDrzave);
router.get('/drzava/vse', ctrl.drzava.getVseDrzave);
router.get('/drzava/izbrisane', ctrl.drzava.getIzbrisaneDrzave);
router.post('/drzava', ctrl.drzava.addDrzava);
router.get('/drzava/:drzava_id', ctrl.drzava.getDrzava);
router.post('/drzava/:drzava_id', ctrl.drzava.obnoviDrzava);
router.put('/drzava/:drzava_id', ctrl.drzava.editDrzava);
router.delete('/drzava/:drzava_id', ctrl.drzava.delDrzava);

// Controller Pošta
router.get('/posta', ctrl.posta.getPoste);
router.get('/posta/vse', ctrl.posta.getVsePoste);
router.get('/posta/izbrisane', ctrl.posta.getIzbrisanePoste);
router.post('/posta', ctrl.posta.addPosta);
router.get('/posta/:posta_id', ctrl.posta.getPosta);
router.post('/posta/:posta_id', ctrl.posta.obnoviPosta);
router.put('/posta/:posta_id', ctrl.posta.editPosta);
router.delete('/posta/:posta_id', ctrl.posta.delPosta);


module.exports = router;