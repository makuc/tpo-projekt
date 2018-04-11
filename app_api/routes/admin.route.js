var express = require('express');
var router = express.Router();

var ctrl = {
    other: require('../controllers/other.controller'),
    populate: require('../controllers/populate.controller'),
    obcina: require("../controllers/obcina.controller"),
    studenti: require("../controllers/studenti.controller"),
    
    ctrlStudent: require("../controllers/student.controller")
};







module.exports = router;