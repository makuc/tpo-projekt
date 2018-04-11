var express = require('express');
var router = express.Router();

var ctrl = {
    other: require('../controllers/other.controller'),
    populate: require('../controllers/populate.controller'),
    
    users: require("../controllers/users.controller"),
    
    obcina: require("../controllers/obcina.controller"),
    studenti: require("../controllers/studenti.controller"),
    uvozSprejetih: require("../controllers/studenti.controller"),
    ctrlStudent: require("../controllers/student.controller"),
    
    predmet: require("../controllers/predmet.controller")
};


// Osnovne povezave
router.get('/', ctrl.other.index);
router.post('/db', ctrl.populate.vnosZacetnihPodatkov);
router.delete('/db', ctrl.populate.izbrisBaze);

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
router.get('/studenti', ctrl.studenti.getStudenti);
router.post('/uvozSprejetih', ctrl.studenti.uvoziStudente);

router.get('/vsistudenti', ctrl.ctrlStudent.pridobiStudente);
router.get('/student/:idStudenta', ctrl.ctrlStudent.izbrisStudenta);
router.post('/shranistudenta', ctrl.ctrlStudent.ustvariStudenta);
router.put('/posodobistudenta/:idStudenta', ctrl.ctrlStudent.posodobiStudenta);

module.exports = router;