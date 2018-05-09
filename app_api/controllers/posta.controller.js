var callNext = require("./_include/callNext");
var mongoose = require('mongoose');
var Posta = mongoose.model('Posta');

/* GET home page. */
module.exports.getPoste = function(req, res) {
  Posta
    .find({ valid: true })
    .limit(0)
    .sort("naziv")
    .exec(function(err, poste) {
      if(err || !poste) {
        return res.status(404).json({ message: "Ne najdem pošt" });
      }
      res.status(200).json(poste);
    });
};
module.exports.getVsePoste = function(req, res) {
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
module.exports.getIzbrisanePoste = function(req, res) {
  Posta
    .find({ valid: false })
    .limit(0)
    .sort("naziv")
    .exec(function(err, poste) {
      if(err || !poste) {
        return res.status(404).json({ message: "Ne najdem pošt" });
      }
      res.status(200).json(poste);
    });
};
module.exports.getPosta = function(req, res) {
  callNext(req, res, [ najdiPostaId, vrniPosta ]);
};
module.exports.addPosta = function(req, res) {
  if(!req.body || !req.body.postna_stevilka || !req.body.naziv)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje pošte" });
  
  callNext(req, res, [ najdiPostaPostnaStevilka, createPosta ]);
};
module.exports.editPosta = function(req, res) {
  if(!req.body || (!req.body.postna_stevilka && !req.body.naziv)) {
    return res.status(400).json({ message: "Nobenega podatka ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiPostaId, najdiPostaPostnaStevilka, urediPosta, vrniPosta ]);
};
module.exports.delPosta = function(req, res) {
  callNext(req, res, [ najdiPostaId, izbrisiPosta, vrniPosta ]);
};
module.exports.obnoviPosta = function(req, res) {
  callNext(req, res, [ najdiPostaId, obnoviPosta, vrniPosta ]);
};

/* Funkcije */
function najdiPostaPostnaStevilka(req, res, next) {
  if(!req.body.postna_stevilka)
    return callNext(req, res, next);
  
  Posta.findOne({ postna_stevilka: req.body.postna_stevilka }, function(err, posta) {
    if(err)
    {
      console.log("---najdiPostaPostnaStevilka:\n" + err);
      return res.status(400).json({ message: "Napaka pri iskanju pošt"});
    }
    
    if(posta && !(req.params && req.params.posta_id && posta._id.equals(req.params.posta_id)))
      return res.status(400).json({ message: "Pošta s podano poštno številko že obstaja" });
    
    callNext(req, res, next);
  });
}
function createPosta(req, res, next) {
  Posta.create({
    postna_stevilka: req.body.postna_stevilka,
    naziv: req.body.naziv
  }, function(err, posta) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( posta );
  });
}
function najdiPostaId(req, res, next) {
  Posta.findById(req.params.posta_id, function(err, posta) {
    if(err || !posta) {
      return res.status(404).json({ message: "Ne najdem želene pošte" });
    }
    req.posta = posta;
    
    callNext(req, res, next);
  });
}
function vrniPosta(req, res) {
  res.status(200).json(req.posta);
}
function urediPosta(req, res, next) {
  if(req.body.postna_stevilka)
    req.posta.postna_stevilka = req.body.postna_stevilka;
  if(req.body.naziv)
    req.posta.naziv = req.body.naziv;
  
  req.posta.save(function(err, posta) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju pošte" });
    
    req.posta = posta;
    
    callNext(req, res, next);
  });
}

function izbrisiPosta(req, res, next) {
  req.posta.valid = false;
  
  req.posta.save(function(err, posta) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju pošte" });
    }
    req.posta = posta;
    
    callNext(req, res, next);
  });
}
function obnoviPosta(req, res, next) {
  req.posta.valid = true;
  req.posta.save(function(err, posta) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju pošte" });
    
    req.posta = posta;
    
    callNext(req, res, next);
  });
}