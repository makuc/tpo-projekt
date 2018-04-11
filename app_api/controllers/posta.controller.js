var callNext = require("./_include/callNext");
var mongoose = require('mongoose');
var Posta = mongoose.model('Posta');

/* GET home page. */
module.exports.getPoste = function(req, res) {
  Posta
    .find()
    .limit(0)
    .sort("naziv")
    .exec(function(err, poste) {
      if(err || !poste) {
        return res.status(404).json({ message: "Ne najdem pošt" });
      }
      res.status(200).json(poste);
    });
};



/* Funkcije */
