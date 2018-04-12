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

// Uporabniki - povezave
router.post("/prijava", ctrl.users.login);
router.post("/odjava", ctrl.users.logout);

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
router.get('/student/:student_id/vpisni-list', ctrl.izvozi.vpisniList.pdfVpisniList);

// Ostalo
router.get('/obcina', ctrl.obcina.getObcine);
router.get('/drzava', ctrl.drzava.getDrzave);
router.get('/posta', ctrl.posta.getPoste);


module.exports = router;