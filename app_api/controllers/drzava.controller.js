var callNext = require("./_include/callNext");
var mongoose = require('mongoose');
var Drzava = mongoose.model('Drzava');

/* GET home page. */
module.exports.getDrzave = function(req, res) {
  Drzava
    .find({ valid: true })
    .limit(0)
    .sort("slovenski_naziv")
    .exec(function(err, drzave) {
      if(err || !drzave) {
        return res.status(404).json({ message: "Ne najdem drćav" });
      }
      res.status(200).json(drzave);
    });
};
module.exports.getVseDrzave = function(req, res) {
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
module.exports.getIzbrisaneDrzave = function(req, res) {
  Drzava
    .find({ valid: false })
    .limit(0)
    .sort("slovenski_naziv")
    .exec(function(err, drzave) {
      if(err || !drzave) {
        return res.status(404).json({ message: "Ne najdem drćav" });
      }
      res.status(200).json(drzave);
    });
};
module.exports.getDrzava = function(req, res) {
  callNext(req, res, [ najdiDrzavaId, vrniDrzava ]);
};
module.exports.addDrzava = function(req, res) {
  if(!req.body || !req.body.dvomestna_koda || !req.body.trimestna_koda || !req.body.numericna_oznaka || !req.body.ISO_naziv || !req.body.slovenski_naziv)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje države" });
  
  callNext(req, res, [
    najdiDrzavaDvomestna, najdiDrzavaTrimestna, najdiDrzavaNumericna, najdiDrzavaISO,
    createDrzava
  ]);
};
module.exports.editDrzava = function(req, res) {
  if(!req.body || (!req.body.dvomestna_koda && !req.body.trimestna_koda && !req.body.numericna_oznaka && !req.body.ISO_naziv && !req.body.slovenski_naziv)) {
    return res.status(400).json({ message: "Nobenega podatka ne spreminjaš" });
  }
  
  callNext(req, res,[
    najdiDrzavaId,
    najdiDrzavaDvomestna, najdiDrzavaTrimestna, najdiDrzavaNumericna, najdiDrzavaISO,
    urediDrzava, vrniDrzava
  ]);
};
module.exports.delDrzava = function(req, res) {
  callNext(req, res, [ najdiDrzavaId, izbrisiDrzava, vrniDrzava ]);
};
module.exports.obnoviDrzava = function(req, res) {
  callNext(req, res, [ najdiDrzavaId, obnoviDrzava, vrniDrzava ]);
};

/* Funkcije */
function najdiDrzavaDvomestna(req, res, next) {
  if(!req.body.dvomestna_koda)
    return callNext(req, res, next);
  
  Drzava.findOne({ dvomestna_koda: req.body.dvomestna_koda }, function(err, drzava) {
    if(err)
      return console.log(err);
    if(drzava && (req.params && req.params.drzava_id && drzava._id != req.params.drzava_id))
      return res.status(400).json({ message: "Država s podano dvomestno kodo že obstaja" });
    
    callNext(req, res, next);
  });
}
function najdiDrzavaTrimestna(req, res, next) {
  if(!req.body.trimestna_koda)
    return callNext(req, res, next);
  
  Drzava.findOne({ trimestna_koda: req.body.trimestna_koda }, function(err, drzava) {
    if(err)
      return console.log(err);
    if(drzava && (req.params && req.params.drzava_id && drzava._id != req.params.drzava_id))
      return res.status(400).json({ message: "Država s podano trimestno kodo že obstaja" });
    
    callNext(req, res, next);
  });
}
function najdiDrzavaNumericna(req, res, next) {
  if(!req.body.numericna_oznaka)
    return callNext(req, res, next);
  
  Drzava.findOne({ numericna_oznaka: req.body.numericna_oznaka }, function(err, drzava) {
    if(err)
      return console.log(err);
    if(drzava && (req.params && req.params.drzava_id && drzava._id != req.params.drzava_id))
      return res.status(400).json({ message: "Država s podano numerično oznako že obstaja" });
    
    callNext(req, res, next);
  });
}
function najdiDrzavaISO(req, res, next) {
  if(!req.body.ISO_naziv)
    return callNext(req, res, next);
  
  Drzava.findOne({ ISO_naziv: req.body.ISO_naziv }, function(err, drzava) {
    if(err)
      return console.log(err);
    if(drzava && (req.params && req.params.drzava_id && drzava._id != req.params.drzava_id))
      return res.status(400).json({ message: "Država s podanim ISO nazivom že obstaja" });
    
    callNext(req, res, next);
  });
}
function createDrzava(req, res, next) {
  Drzava.create({
    dvomestna_koda: req.body.dvomestna_koda,
    trimestna_koda: req.body.trimestna_koda,
    numericna_oznaka: req.body.numericna_oznaka,
    ISO_naziv: req.body.ISO_naziv,
    slovenski_naziv: req.body.slovenski_naziv,
    opomba: req.body.opomba
  }, function(err, drzava) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( drzava );
  });
}
function najdiDrzavaId(req, res, next) {
  Drzava.findById(req.params.drzava_id, function(err, drzava) {
    if(err || !drzava) {
      return res.status(404).json({ message: "Ne najdem želene države" });
    }
    req.drzava = drzava;
    
    callNext(req, res, next);
  });
}
function vrniDrzava(req, res) {
  res.status(200).json(req.drzava);
}
function urediDrzava(req, res, next) {
  if(req.body.dvomestna_koda)
    req.drzava.dvomestna_koda = req.body.dvomestna_koda;
  if(req.body.trimestna_koda)
    req.drzava.trimestna_koda = req.body.trimestna_koda;
  if(req.body.numericna_oznaka)
    req.drzava.numericna_oznaka = req.body.numericna_oznaka;
  if(req.body.ISO_naziv)
    req.drzava.ISO_naziv = req.body.ISO_naziv;
  if(req.body.slovenski_naziv)
    req.drzava.slovenski_naziv = req.body.slovenski_naziv;
  if(req.body.opomba)
    req.drzava.opomba = req.body.opomba;
    
  req.drzava.save(function(err, drzava) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju države" });
    
    req.drzava = drzava;
    
    callNext(req, res, next);
  });
}

function izbrisiDrzava(req, res, next) {
  req.drzava.valid = false;
  
  req.drzava.save(function(err, drzava) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju države" });
    }
    req.drzava = drzava;
    
    callNext(req, res, next);
  });
}
function obnoviDrzava(req, res, next) {
  req.drzava.valid = true;
  req.drzava.save(function(err, drzava) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju države" });
    
    req.obcina = drzava;
    
    callNext(req, res, next);
  });
}