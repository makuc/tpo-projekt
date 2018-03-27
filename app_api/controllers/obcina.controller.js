var mongoose = require('mongoose');
var Obcina = mongoose.model('Obcina');

/* GET home page. */
module.exports.addObcinaTest = function(req, res) {
  Obcina.create({
    sifra: "213",
    ime: "Ankaran"
  }, function(err, obcina) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Incorrect data" });
    }
    
    res.status(201).send( obcina );
  });
};