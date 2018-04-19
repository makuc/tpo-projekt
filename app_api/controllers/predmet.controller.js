var mongoose = require("mongoose");
var Predmet = mongoose.model('Predmet');

module.exports.pridobiPredmet = function(req, res) {
    pridobiPredmet(req, res);
};
    
function pridobiPredmet(req, res)
{

    var sifra = req.params.predmet_id;
    Predmet
        .find({"opis": sifra})
        .exec(function(err, predmeti) {
            if(err) {
                console.log(err);
                return res.status(404).send({ message: "Predmeti not found 1" });
            }
            if(!predmeti){
                console.log("Not found");
                return res.status(404).send({ message: "Predmeti not found 2" });
            }
            console.log(predmeti)
            return res.status(200).json(predmeti);
    });
}


module.exports.pridobiStudente = function(req, res) {
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
}

