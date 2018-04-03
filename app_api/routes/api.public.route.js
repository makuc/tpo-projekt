var express = require('express');
var router = express.Router();

var ctrl = {
    other: require('../controllers/other.controller'),
    populate: require('../controllers/populate.controller'),
    obcina: require("../controllers/obcina.controller")
};


router.get('/', ctrl.other.index);
router.post('/db', ctrl.populate.vnosZacetnihPodatkov);
router.delete('/db', ctrl.populate.izbrisBaze);

module.exports = router;