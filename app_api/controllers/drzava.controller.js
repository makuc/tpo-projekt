var callNext = require("./_include/callNext");
var mongoose = require('mongoose');
var Drzava = mongoose.model('Drzava');

/* GET home page. */
module.exports.getDrzave = function(req, res) {
  Drzava
    .find()
    .limit(0)
    .sort("slovenski_naziv")
    .exec(function(err, drzave) {
      if(err || !drzave) {
        return res.status(404).json({ message: "Ne najdem drćav" });
      }
      res.status(200).json(drzave);
    });
};



/* Funkcije */
