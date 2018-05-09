var mongoose = require("mongoose");
var callNext = require("./_include/callNext");
var NacinStudija = mongoose.model('NacinStudija');


/* GET home page. */
module.exports.getNacineStudija = function(req, res) {
  NacinStudija
    .find({ valid: true })
    .limit(0)
    .sort("naziv")
    .exec(function(err, nacinStudija) {
      if(err || !nacinStudija) {
        return res.status(404).json({ message: "Ne najdem načinov študija" });
      }
      res.status(200).json(nacinStudija);
    });
};
module.exports.getVseNacineStudija = function(req, res) {
  NacinStudija
    .find()
    .limit(0)
    .sort("naziv")
    .exec(function(err, naciniStudija) {
      if(err || !naciniStudija) {
        return res.status(404).json({ message: "Ne najdem načinov študija" });
      }
      res.status(200).json(naciniStudija);
    });
};
module.exports.getIzbrisaneNacineStudija = function(req, res) {
  NacinStudija
    .find({ valid: false })
    .limit(0)
    .sort("naziv")
    .exec(function(err, naciniStudija) {
      if(err || !naciniStudija) {
        return res.status(404).json({ message: "Ne najdem načinov študija" });
      }
      res.status(200).json(naciniStudija);
    });
};
module.exports.getNacinStudija = function(req, res) {
  callNext(req, res, [ najdiNacinStudijaId, vrniNacinStudija ]);
};
module.exports.addNacinStudija = function(req, res) {
  if(!req.body || !req.body.sifra || !req.body.naziv)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje načina študija" });
  
  callNext(req, res, [ najdiNacinStudijaSifra, createNacinStudija ]);
};
module.exports.editNacinStudija = function(req, res) {
  if(!req.body || (!req.body.sifra && !req.body.naziv)) {
    return res.status(400).json({ message: "Nobenega podatka načina študija ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiNacinStudijaId, najdiNacinStudijaSifra, urediNacinStudija, vrniNacinStudija ]);
};
module.exports.delNacinStudija = function(req, res) {
  callNext(req, res, [ najdiNacinStudijaId, izbrisiNacinStudija, vrniNacinStudija ]);
};
module.exports.obnoviNacinStudija = function(req, res) {
  callNext(req, res, [ najdiNacinStudijaId, obnoviNacinStudija, vrniNacinStudija ]);
};


/* Funkcije */
function najdiNacinStudijaSifra(req, res, next) {
  if(!req.body.sifra)
    return callNext(req, res, next);
  
  NacinStudija.findOne({ sifra: req.body.sifra }, function(err, nacinStudija) {
    if(err)
    {
      console.log("---najdiNacinStudijaSifra:\n" + err);
      return res.status(400).json({ message: "Napaka pri pregledu podvojene šifre"});
    }
    
    if(nacinStudija && !(req.params && req.params.nacin_id && nacinStudija._id.equals(req.params.nacin_id)))
      return res.status(400).json({ message: "Način študija s podano šifro že obstaja" });
    
    callNext(req, res, next);
  });
}
function createNacinStudija(req, res, next) {
  NacinStudija.create({
    sifra: req.body.sifra,
    naziv: req.body.naziv
  }, function(err, nacinStudija) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( nacinStudija );
  });
}
function najdiNacinStudijaId(req, res, next) {
  NacinStudija.findById(req.params.nacin_id, function(err, nacinStudija) {
    if(err || !nacinStudija) {
      return res.status(404).json({ message: "Ne najdem želenega načina študija" });
    }
    req.nacinStudija = nacinStudija;
    
    callNext(req, res, next);
  });
}
function vrniNacinStudija(req, res) {
  res.status(200).json(req.nacinStudija);
}
function urediNacinStudija(req, res, next) {
  if(req.body.sifra)
    req.nacinStudija.sifra = req.body.sifra;
  if(req.body.naziv)
    req.nacinStudija.naziv = req.body.naziv;
  
  req.nacinStudija.save(function(err, nacinStudija) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju načina študija" });
    
    req.nacinStudija = nacinStudija;
    
    callNext(req, res, next);
  });
}

function izbrisiNacinStudija(req, res, next) {
  req.nacinStudija.valid = false;
  
  req.nacinStudija.save(function(err, nacinStudija) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju načina študija" });
    }
    req.nacinStudija = nacinStudija;
    
    callNext(req, res, next);
  });
}
function obnoviNacinStudija(req, res, next) {
  req.nacinStudija.valid = true;
  req.nacinStudija.save(function(err, nacinStudija) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju načina študija" });
    
    req.nacinStudija = nacinStudija;
    
    callNext(req, res, next);
  });
}