var mongoose = require("mongoose");
var Predmet = mongoose.model('Premdet');

module.exports.pridobiPredmete = function(req, res) {
  pridobiPredmete(req, res);
};
    
function pridobiPredmete(req, res)
{
    var koncniObject = {};
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