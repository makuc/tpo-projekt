var express = require('express');
var router = express.Router();

var ctrl = {
    other: require('../controllers/other.controller'),
    obcina: require("../controllers/obcina.controller")
};


router.get('/', ctrl.other.index);
router.get('/test', ctrl.obcina.addObcinaTest);

module.exports = router;