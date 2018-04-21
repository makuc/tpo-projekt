var mongoose = require("mongoose");
var callNext = require("./_include/callNext");
var OblikaStudija = mongoose.model('OblikaStudija');


/* GET home page. */
module.exports.getOblikeStudija = function(req, res) {
  OblikaStudija
    .find({ valid: true })
    .limit(0)
    .sort("naziv")
    .exec(function(err, oblikeStudija) {
      if(err || !oblikeStudija) {
        return res.status(404).json({ message: "Ne najdem oblik študija" });
      }
      res.status(200).json(oblikeStudija);
    });
};
module.exports.getVseOblikeStudija = function(req, res) {
  OblikaStudija
    .find()
    .limit(0)
    .sort("naziv")
    .exec(function(err, oblikeStudija) {
      if(err || !oblikeStudija) {
        return res.status(404).json({ message: "Ne najdem oblik študija" });
      }
      res.status(200).json(oblikeStudija);
    });
};
module.exports.getIzbrisaneOblikeStudija = function(req, res) {
  OblikaStudija
    .find({ valid: false })
    .limit(0)
    .sort("naziv")
    .exec(function(err, oblikeStudija) {
      if(err || !oblikeStudija) {
        return res.status(404).json({ message: "Ne najdem oblik študija" });
      }
      res.status(200).json(oblikeStudija);
    });
};
module.exports.getOblikaStudija = function(req, res) {
  callNext(req, res, [ najdiOblikaStudijaId, vrniOblikaStudija ]);
};
module.exports.addOblikaStudija = function(req, res) {
  if(!req.body || !req.body.sifra || !req.body.naziv)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje oblike študija" });
  
  callNext(req, res, [ najdiOblikaStudijaSifra, createOblikaStudija ]);
};
module.exports.editOblikaStudija = function(req, res) {
  if(!req.body || (!req.body.sifra && !req.body.naziv)) {
    return res.status(400).json({ message: "Nobenega podatka oblike študija ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiOblikaStudijaId, najdiOblikaStudijaSifra, urediOblikaStudija, vrniOblikaStudija ]);
};
module.exports.delOblikaStudija = function(req, res) {
  callNext(req, res, [ najdiOblikaStudijaId, izbrisiOblikaStudija, vrniOblikaStudija ]);
};
module.exports.obnoviOblikaStudija = function(req, res) {
  callNext(req, res, [ najdiOblikaStudijaId, obnoviOblikaStudija, vrniOblikaStudija ]);
};


/* Funkcije */
function najdiOblikaStudijaSifra(req, res, next) {
  if(!req.body.sifra)
    return callNext(req, res, next);
  
  OblikaStudija.findOne({ sifra: req.body.sifra }, function(err, oblikaStudija) {
    if(err)
      return console.log(err);
    
    if(oblikaStudija && (req.params && req.params.oblika_id && oblikaStudija._id != req.params.oblika_id))
      return res.status(400).json({ message: "Oblika študija s podano šifro že obstaja" });
    
    callNext(req, res, next);
  });
}
function createOblikaStudija(req, res, next) {
  OblikaStudija.create({
    sifra: req.body.sifra,
    naziv: req.body.naziv
  }, function(err, oblikaStudija) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( oblikaStudija );
  });
}
function najdiOblikaStudijaId(req, res, next) {
  OblikaStudija.findById(req.params.oblika_id, function(err, oblikaStudija) {
    if(err || !oblikaStudija) {
      return res.status(404).json({ message: "Ne najdem želene oblike študija" });
    }
    req.oblikaStudija = oblikaStudija;
    
    callNext(req, res, next);
  });
}
function vrniOblikaStudija(req, res) {
  res.status(200).json(req.oblikaStudija);
}
function urediOblikaStudija(req, res, next) {
  if(req.body.sifra)
    req.oblikaStudija.sifra = req.body.sifra;
  if(req.body.naziv)
    req.oblikaStudija.naziv = req.body.naziv;
  
  req.oblikaStudija.save(function(err, oblikaStudija) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju oblike študija" });
    
    req.oblikaStudija = oblikaStudija;
    
    callNext(req, res, next);
  });
}

function izbrisiOblikaStudija(req, res, next) {
  req.oblikaStudija.valid = false;
  
  req.oblikaStudija.save(function(err, oblikaStudija) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju oblike študija" });
    }
    req.oblikaStudija = oblikaStudija;
    
    callNext(req, res, next);
  });
}
function obnoviOblikaStudija(req, res, next) {
  req.oblikaStudija.valid = true;
  req.oblikaStudija.save(function(err, oblikaStudija) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju oblike študija" });
    
    req.oblikaStudija = oblikaStudija;
    
    callNext(req, res, next);
  });
}