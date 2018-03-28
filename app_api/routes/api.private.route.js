var express = require('express');
var router = express.Router();
//var ctrlLokacije = require('../controllers/lokacije');

router.get('/', function(req, res) {
    res.status(404);
});

module.exports = router;