var callNext = require("./_include/callNext");
var mongoose = require('mongoose');
var Obcina = mongoose.model('Obcina');

/* GET home page. */
module.exports.getObcine = function(req, res) {
  Obcina
    .find({ valid: true })
    .limit(0)
    .sort("ime")
    .exec(function(err, obcine) {
      if(err || !obcine) {
        return res.status(404).json({ message: "Ne najdem občin" });
      }
      res.status(200).json(obcine);
    });
};
module.exports.getVseObcine = function(req, res) {
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
module.exports.getIzbrisaneObcine = function(req, res) {
  Obcina
    .find({ valid: false })
    .limit(0)
    .sort("ime")
    .exec(function(err, obcine) {
      if(err || !obcine) {
        return res.status(404).json({ message: "Ne najdem občin" });
      }
      res.status(200).json(obcine);
    });
};
module.exports.getObcina = function(req, res) {
  callNext(req, res, [ najdiObcinaId, vrniObcina ]);
};
module.exports.addObcina = function(req, res) {
  if(!req.body || !req.body.sifra || !req.body.ime)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje občine" });
  
  callNext(req, res, [ najdiObcinaSifra, createObcina ]);
};
module.exports.editObcina = function(req, res) {
  if(!req.body || (!req.body.sifra && !req.body.ime)) {
    return res.status(400).json({ message: "Nobenega podatka ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiObcinaId, najdiObcinaSifra, urediObcina, vrniObcina ]);
};
module.exports.delObcina = function(req, res) {
  callNext(req, res, [ najdiObcinaId, izbrisiObcina, vrniObcina ]);
};
module.exports.obnoviObcina = function(req, res) {
  callNext(req, res, [ najdiObcinaId, obnoviObcina, vrniObcina ]);
};

/* Funkcije */
function najdiObcinaSifra(req, res, next) {
  if(!req.body.sifra)
    return callNext(req, res, next);
  
  Obcina.findOne({ sifra: req.body.sifra }, function(err, obcina) {
    if(err)
      return console.log(err);
    if(obcina && (req.params && req.params.obcina_id && obcina._id != req.params.obcina_id))
      return res.status(400).json({ message: "Občina s podano šifro že obstaja" });
    
    callNext(req, res, next);
  });
}
function createObcina(req, res, next) {
  Obcina.create({
    sifra: req.body.sifra,
    ime: req.body.ime
  }, function(err, obcina) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( obcina );
  });
}
function najdiObcinaId(req, res, next) {
  Obcina.findById(req.params.obcina_id, function(err, obcina) {
    if(err || !obcina) {
      return res.status(404).json({ message: "Ne najdem želene občine" });
    }
    req.obcina = obcina;
    
    callNext(req, res, next);
  });
}
function vrniObcina(req, res) {
  res.status(200).json(req.obcina);
}
function urediObcina(req, res, next) {
  if(req.body.sifra)
    req.obcina.sifra = req.body.sifra;
  if(req.body.ime)
    req.obcina.ime = req.body.ime;
  
  req.obcina.save(function(err, obcina) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju občine" });
    
    req.obcina = obcina;
    
    callNext(req, res, next);
  });
}

function izbrisiObcina(req, res, next) {
  req.obcina.valid = false;
  
  req.obcina.save(function(err, obcina) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju občine" });
    }
    req.obcina = obcina;
    
    callNext(req, res, next);
  });
}
function obnoviObcina(req, res, next) {
  req.obcina.valid = true;
  req.obcina.save(function(err, obcina) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju občine" });
    
    req.obcina = obcina;
    
    callNext(req, res, next);
  });
}