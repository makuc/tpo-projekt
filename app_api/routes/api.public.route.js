var express = require('express');
var router = express.Router();

var ctrl = {
    other: require('../controllers/other.controller')
};


router.get('/', ctrl.other.index);

module.exports = router;