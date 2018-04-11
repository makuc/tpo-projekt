var callNext = require("./_include/callNext");
var mongoose = require('mongoose');
var Obcina = mongoose.model('Obcina');

/* GET home page. */
module.exports.addObcinaTest = function(req, res) {
  if(req.body && req.body.sifra && req.body.ime)
    return createObcina(req.body.sifra, req.body.ime, vrniObcino);
  
};



/* Funkcije */
function vrniObcino(req, res) {
  res.status(200)
}
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