var mongoose = require("mongoose");
var callNext = require("./_include/callNext");
var Predmet = mongoose.model('Predmet');


/* GET home page. */
module.exports.getPredmete = function(req, res) {
  Predmet
    .find({ valid: true })
    .limit(0)
    .sort("naziv")
    .exec(function(err, predmeti) {
      if(err || !predmeti) {
        return res.status(404).json({ message: "Ne najdem predmetov" });
      }
      res.status(200).json(predmeti);
    });
};
    
module.exports.pridobiPredmet = function(req, res){
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
            return res.status(200).json(predmeti);
        });
};

module.exports.getVsePredmete = function(req, res) {
  Predmet
    .find()
    .limit(0)
    .sort("naziv")
    .exec(function(err, predmeti) {
      if(err || !predmeti) {
        return res.status(404).json({ message: "Ne najdem predmetov" });
      }
      res.status(200).json(predmeti);
    });
};

module.exports.getIzbrisanePredmete = function(req, res) {
  Predmet
    .find({ valid: false })
    .limit(0)
    .sort("naziv")
    .exec(function(err, predmeti) {
      if(err || !predmeti) {
        return res.status(404).json({ message: "Ne najdem predmetov" });
      }
      res.status(200).json(predmeti);
    });
};
module.exports.getPredmet = function(req, res) {
  callNext(req, res, [ najdiPredmetId, vrniPredmet ]);
};
module.exports.addPredmet = function(req, res) {
  if(!req.body || !req.body.sifra || !req.body.naziv)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje predmeta" });
  
  callNext(req, res, [ najdiPredmetSifra, createPredmet ]);
};
module.exports.editPredmet = function(req, res) {
  if(!req.body || (!req.body.sifra && !req.body.naziv && !req.body.opis && !req.body.KT)) {
    return res.status(400).json({ message: "Nobenega podatka predmeta ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiPredmetId, najdiPredmetSifra, urediPredmet, vrniPredmet ]);
};
module.exports.delPredmet = function(req, res) {
  callNext(req, res, [ najdiPredmetId, izbrisiPredmet, vrniPredmet ]);
};
module.exports.obnoviPredmet = function(req, res) {
  callNext(req, res, [ najdiPredmetId, obnoviPredmet, vrniPredmet ]);
};


/* Funkcije */
function najdiPredmetSifra(req, res, next) {
  if(!req.body.sifra)
    return callNext(req, res, next);
  
  Predmet.findOne({ sifra: req.body.sifra }, function(err, predmet) {
    if(err)
      return console.log(err);
    
    if(predmet && (req.params && req.params.predmet_id && predmet._id != req.params.predmet_id))
      return res.status(400).json({ message: "Predmet s podano šifro že obstaja" });
    
    callNext(req, res, next);
  });
}
function createPredmet(req, res, next) {
  Predmet.create({
    sifra: req.body.sifra,
    naziv: req.body.naziv,
    opis: req.body.opis,
    KT: req.body.KT
  }, function(err, predmet) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( predmet );
  });
}
function najdiPredmetId(req, res, next) {
  Predmet.findById(req.params.predmet_id, function(err, predmet) {
    if(err || !predmet) {
      return res.status(404).json({ message: "Ne najdem želenega predmeta" });
    }
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}
function vrniPredmet(req, res) {
  res.status(200).json(req.predmet);
}
function urediPredmet(req, res, next) {
  if(req.body.sifra)
    req.predmet.sifra = req.body.sifra;
  if(req.body.naziv)
    req.predmet.naziv = req.body.naziv;
  if(req.body.KT)
    req.predmet.KT = req.body.KT;
  if(req.body.opis)
    req.predmet.opis = req.body.opis;
  
  req.predmet.save(function(err, predmet) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju predmeta" });
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}

function izbrisiPredmet(req, res, next) {
  req.predmet.valid = false;
  
  req.predmet.save(function(err, predmet) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju predmeta" });
    }
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}
function obnoviPredmet(req, res, next) {
  req.predmet.valid = true;
  req.predmet.save(function(err, predmet) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju predmeta" });
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}

// Dodatne funkcionalnost
function pridobiIzvedbo(req, res) {
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