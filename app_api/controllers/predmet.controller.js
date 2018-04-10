var mongoose = require("mongoose");
var Predmet = mongoose.model('Predmet');

var Student = mongoose.model("Student");


module.exports.pridobiStudente = function(req, res) {
    var studijskoLeto_id = req.params.studijskoLeto_id;
    var predmet_id = req.params.predmet_id;
}