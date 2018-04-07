var express =require("express");
var router = express.Router();
var ctrlStudent = require("../controllers/student");

router.get('/vsistudenti', ctrlStudent.pridobiStudente);
router.get('/student/:idStudenta', ctrlStudent.izbrisStudenta);
router.post('/shranistudenta', ctrlStudent.ustvariStudenta);
router.put('/posodobistudenta/:idStudenta', ctrlStudent.posodobiStudenta);

module.exports = router;