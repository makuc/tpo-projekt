var mongoose = require("mongoose");
var callNext = require("./_include/callNext");
var VrstaVpisa = mongoose.model('VrstaVpisa');


/* GET home page. */
module.exports.getVrsteVpisa = function(req, res) {
  VrstaVpisa
    .find({
      valid: true,
      deleted: false
    })
    .limit(0)
    .sort("naziv")
    .exec(function(err, vrsteVpisa) {
      if(err || !vrsteVpisa) {
        return res.status(404).json({ message: "Ne najdem vrst vpisa" });
      }
      res.status(200).json(vrsteVpisa);
    });
};
module.exports.getValidVrsteVpisa = function(req, res) {
  VrstaVpisa
    .find({
      valid: false,
      deleted: false
    })
    .limit(0)
    .sort("naziv")
    .exec(function(err, vrsteVpisa) {
      if(err || !vrsteVpisa) {
        return res.status(404).json({ message: "Ne najdem vrst vpisa" });
      }
      res.status(200).json(vrsteVpisa);
    });
};
module.exports.getVseVrsteVpisa = function(req, res) {
  VrstaVpisa
    .find()
    .limit(0)
    .sort("naziv")
    .exec(function(err, vrsteVpisa) {
      if(err || !vrsteVpisa) {
        return res.status(404).json({ message: "Ne najdem vrst vpisa" });
      }
      res.status(200).json(vrsteVpisa);
    });
};
module.exports.getIzbrisaneVrsteVpisa = function(req, res) {
  VrstaVpisa
    .find({ deleted: true })
    .limit(0)
    .sort("naziv")
    .exec(function(err, vrsteVpisa) {
      if(err || !vrsteVpisa) {
        return res.status(404).json({ message: "Ne najdem vrst vpisa" });
      }
      res.status(200).json(vrsteVpisa);
    });
};
module.exports.getVrstaVpisa = function(req, res) {
  callNext(req, res, [ najdiVrstaVpisaId, vrniVrstaVpisa ]);
};
module.exports.addVrstaVpisa = function(req, res) {
  if(!req.body || !req.body.koda || !req.body.naziv || !req.body.opis)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje vrste študija" });
  
  callNext(req, res, [ najdiVrstaVpisaKoda, createVrstaVpisa ]);
};
module.exports.editVrstaVpisa = function(req, res) {
  if(!req.body || (!req.body.koda && !req.body.naziv && !req.body.opis)) {
    return res.status(400).json({ message: "Nobenega podatka vrste študija ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiVrstaVpisaId, najdiVrstaVpisaKoda, urediVrstaVpisa, shrani, vrniVrstaVpisa ]);
};
module.exports.delVrstaVpisa = function(req, res) {
  callNext(req, res, [ najdiVrstaVpisaId, izbrisiVrstaVpisa, shrani, vrniVrstaVpisa ]);
};
module.exports.obnoviVrstaVpisa = function(req, res) {
  callNext(req, res, [ najdiVrstaVpisaId, obnoviVrstaVpisa, shrani, vrniVrstaVpisa ]);
};

module.exports.makeValid = function(req, res) {
  callNext(req, res, [ najdiVrstaVpisaId, valid, shrani, vrniVrstaVpisa ]);
};
module.exports.makeInvalid = function(req, res) {
  callNext(req, res, [ najdiVrstaVpisaId, invalid, shrani, vrniVrstaVpisa ]);
};



/* Funkcije */
function najdiVrstaVpisaKoda(req, res, next) {
  if(!req.body.koda)
    return callNext(req, res, next);
  
  VrstaVpisa.findOne({ sifra: req.body.koda }, function(err, vrstaVpisa) {
    if(err)
    {
      console.log("---najdiVrstaVpisaKoda:\n" + err);
      return res.status(400).json({ message: "Napaka pri pregledu podvojene kode vrste vpisa"});
    }
    
    if(vrstaVpisa && !(req.params && req.params.vrsta_id && vrstaVpisa._id.equals(req.params.vrsta_id)))
      return res.status(400).json({ message: "Vrsta vpisa s podano kodo že obstaja" });
    
    callNext(req, res, next);
  });
}
function createVrstaVpisa(req, res, next) {
  VrstaVpisa.create({
    koda: req.body.koda,
    naziv: req.body.naziv,
    opis: req.body.opis
  }, function(err, vrstaVpisa) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( vrstaVpisa );
  });
}
function najdiVrstaVpisaId(req, res, next) {
  VrstaVpisa.findById(req.params.vrsta_id, function(err, vrstaVpisa) {
    if(err || !vrstaVpisa) {
      return res.status(404).json({ message: "Ne najdem želene vrste vpisa" });
    }
    req.vrstaVpisa = vrstaVpisa;
    
    callNext(req, res, next);
  });
}
function vrniVrstaVpisa(req, res) {
  res.status(200).json(req.vrstaVpisa);
}
function urediVrstaVpisa(req, res, next) {
  if(req.body.koda)
    req.vrstaVpisa.koda = req.body.koda;
  if(req.body.naziv)
    req.vrstaVpisa.naziv = req.body.naziv;
  if(req.body.opis)
    req.vrstaVpisa.opis = req.body.opis;
  
  callNext(req, res, next);
}

function valid(req, res, next) {
  req.vrstaVpisa.valid = true;
  
  callNext(req, res, next);
}
function invalid(req, res, next) {
  req.vrstaVpisa.valid = false;
  
  callNext(req, res, next);
}

function izbrisiVrstaVpisa(req, res, next) {
  req.vrstaVpisa.deleted = false;
  
  callNext(req, res, next);
}
function obnoviVrstaVpisa(req, res, next) {
  req.vrstaVpisa.deleted = true;
  
  callNext(req, res, next);
}

function shrani(req, res, next) {
  req.vrstaVpisa.save(function(err, vrstaVpisa) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju vrste vpisa" });
    
    req.vrstaVpisa = vrstaVpisa;
    
    callNext(req, res, next);
  });
}