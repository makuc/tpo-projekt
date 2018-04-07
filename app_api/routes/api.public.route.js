var express = require('express');
var router = express.Router();

var ctrl = {
    other: require('../controllers/other.controller'),
    populate: require('../controllers/populate.controller'),
    obcina: require("../controllers/obcina.controller"),
    studenti: require("../controllers/studenti.controller"),
    
    ctrlStudent: require("../controllers/student")
};


router.get('/', ctrl.other.index);
router.post('/db', ctrl.populate.vnosZacetnihPodatkov);
router.delete('/db', ctrl.populate.izbrisBaze);
router.get('/studenti', ctrl.studenti.getStudenti);

router.get('/vsistudenti', ctrl.ctrlStudent.pridobiStudente);


module.exports = router;