var callNext = require("./_include/callNext");
var mongoose = require('mongoose');
var Obcina = mongoose.model('Obcina');

/* GET home page. */
module.exports.getObcine = function(req, res) {
  Obcina
    .find()
    .limit(0)
    .sort("ime")
    .exec(function(err, obcine) {
      if(err || !obcine) {
        return res.status(404).json({ message: "Ne najdem občin" });
      }
      res.status(200).json(obcine);
    });
};



/* Funkcije */

function createObcina(req, res, next) {
  Obcina.create({
    sifra: req.body.sifra,
    ime: req.body.ime
  }, function(err, obcina) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Incorrect data" });
    }
    
    res.status(201).send( obcina );
  });
}