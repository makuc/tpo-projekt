var mongoose = require("mongoose");
var Predmet = mongoose.model('Predmet');
var Student = mongoose.model("Student");

module.exports.pridobiStudente = function(req, res)
{
    pridobiStudente(req, res);
};
    
function pridobiStudente(req, res)
{
    var koncniObject = {};
    var studijskoLeto_id = req.params.studijskoLeto_id;
    var predmet_id = req.params.predmet_id;
    Predmet
        .find().limit(0)
        .exec(function(err, predmeti) {
            if(err) {
                return res.status(404).send({ message: "Predmeti not found 1" });
            }
            if(!predmeti) return res.status(404).send({ message: "Predmeti not found 2" });
            
            koncniObject.predmeti = predmeti;
            return res.status(200).json(koncniObject);
    });
};