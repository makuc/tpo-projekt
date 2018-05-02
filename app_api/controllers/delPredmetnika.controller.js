var callNext = require("./_include/callNext");
var mongoose = require('mongoose');
var DelPredmetnika = mongoose.model('DelPredmetnika');

/* GET home page. */
module.exports.getDele = function(req, res) {
  DelPredmetnika
    .find({ valid: true })
    .limit(0)
    .sort("naziv")
    .exec(function(err, delPredmetnika) {
      if(err || !delPredmetnika) {
        return res.status(404).json({ message: "Ne najdem delov predmetnika" });
      }
      res.status(200).json(delPredmetnika);
    });
};
module.exports.getVseDele = function(req, res) {
  DelPredmetnika
    .find()
    .limit(0)
    .sort("naziv")
    .exec(function(err, delPredmetnika) {
      if(err || !delPredmetnika) {
        return res.status(404).json({ message: "Ne najdem delov predmetnika" });
      }
      res.status(200).json(delPredmetnika);
    });
};
module.exports.getIzbrisaneDele = function(req, res) {
  DelPredmetnika
    .find({ valid: false })
    .limit(0)
    .sort("naziv")
    .exec(function(err, delPredmetnika) {
      if(err || !delPredmetnika) {
        return res.status(404).json({ message: "Ne najdem delov predmetnika" });
      }
      res.status(200).json(delPredmetnika);
    });
};
module.exports.getDel = function(req, res) {
  callNext(req, res, [ najdiDelId, vrniDel ]);
};
module.exports.addDel = function(req, res) {
  if(!req.body || !req.body.sifra || !req.body.naziv || !req.body.obvezen)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje dela predmetnika" });
  
  callNext(req, res, [ najdiDelSifra, createDel ]);
};
module.exports.editDel = function(req, res) {
  if(!req.body || (!req.body.sifra && !req.body.naziv && !req.body.obvezen && !req.body.strokovni && !req.body.modul)) {
    return res.status(400).json({ message: "Nobenega podatka dela predmetnika ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiDelId, najdiDelSifra, urediDel, vrniDel ]);
};
module.exports.delDel = function(req, res) {
  callNext(req, res, [ najdiDelId, izbrisiDel, vrniDel ]);
};
module.exports.obnoviDel = function(req, res) {
  callNext(req, res, [ najdiDelId, obnoviDel, vrniDel ]);
};

/* Funkcije */
function najdiDelSifra(req, res, next) {
  if(!req.body.sifra)
    return callNext(req, res, next);
  
  DelPredmetnika.findOne({ sifra: req.body.sifra }, function(err, delPredmetnika) {
    if(err)
      return console.log(err);
    
    if(delPredmetnika && (req.params && req.params.delPredmetnika_id && delPredmetnika._id != req.params.delPredmetnika_id))
      return res.status(400).json({ message: "Del predmetnika s podano šifro že obstaja" });
    
    callNext(req, res, next);
  });
}
function createDel(req, res, next) {
  DelPredmetnika.create({
    sifra: req.body.sifra,
    naziv: req.body.naziv,
    obvezen: req.body.obvezen,
    strokovni: req.body.strokovni,
    modul: req.body.modul
  }, function(err, delPredmetnika) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( delPredmetnika );
  });
}
function najdiDelId(req, res, next) {
  DelPredmetnika.findById(req.params.delPredmetnika_id, function(err, delPredmetnika) {
    if(err || !delPredmetnika) {
      return res.status(404).json({ message: "Ne najdem želenega dela predmetnika" });
    }
    req.delPredmetnika = delPredmetnika;
    
    callNext(req, res, next);
  });
}
function vrniDel(req, res) {
  res.status(200).json(req.delPredmetnika);
}
function urediDel(req, res, next) {
  if(req.body.sifra)
    req.delPredmetnika.sifra = req.body.sifra;
  if(req.body.naziv)
    req.delPredmetnika.naziv = req.body.naziv;
  if(req.body.obvezen)
    req.delPredmetnika.obvezen = req.body.obvezen;
  if(req.body.strokovni)
    req.delPredmetnika.strokovni = req.body.strokovni;
  if(req.body.modul)
    req.delPredmetnika.modul = req.body.modul;
  
  req.delPredmetnika.save(function(err, delPredmetnika) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju dela predmetnika" });
    
    req.delPredmetnika = delPredmetnika;
    
    callNext(req, res, next);
  });
}

function izbrisiDel(req, res, next) {
  req.delPredmetnika.valid = false;
  
  req.delPredmetnika.save(function(err, delPredmetnika) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju dela predmetnika" });
    }
    req.delPredmetnika = delPredmetnika;
    
    callNext(req, res, next);
  });
}
function obnoviDel(req, res, next) {
  req.delPredmetnika.valid = true;
  req.delPredmetnika.save(function(err, delPredmetnika) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju dela predmetnika" });
    
    req.delPredmetnika = delPredmetnika;
    
    callNext(req, res, next);
  });
}