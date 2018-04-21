var mongoose = require("mongoose");
var callNext = require("./_include/callNext");

var Predmet = mongoose.model('Predmet');
var StudijskoLeto = mongoose.model('StudijskoLeto');
var Zaposlen = mongoose.model('Zaposlen');


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

module.exports.addIzvedbaPredmeta = function(req, res) {
  if(!req.body || !req.body.studijsko_leto) {
    return res.status(400).json({ message: "Ni podanega študijskega leta" });
  }
  
  najdiPredmetId(req, res, [
    validateStudijskoLeto, najdiIzvedboPredmeta, ustvariIzvedboPredmeta, vrniPredmet
  ]);
};
module.exports.delIzvedbaPredmeta = function(req, res) {
  najdiPredmetId(req, res, [
    validateStudijskoLeto, najdiIzvedboPredmeta, odstraniIzvedboPredmeta, vrniPredmet
  ]);
};
module.exports.addIzvajalcaIzvedbiPredmeta = function(req, res) {
  if(!req.body || !req.body.izvajalec) {
    return res.status(400).json({ message: "Ni podanega izvajatelja za izvedbo predmeta" });
  }
  
  najdiPredmetId(req, res, [
    validateStudijskoLeto, validateIzvajalca, najdiIzvedboPredmeta, preveriIzvajalecZeIzvajaIzvedboPredmeta, dodajIzvajalcaIzvedbiPredmeta, vrniPredmet
  ]);
};
module.exports.delIzvajalcaIzvedbiPredmeta = function(req, res) {
  najdiPredmetId(req, res, [
    validateStudijskoLeto, validateIzvajalca, najdiIzvedboPredmeta, odstraniIzvajalcaIzvedbiPredmeta, vrniPredmet
  ]);
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
  Predmet
    .findById(req.params.predmet_id)
    .populate([
      {
        path: "izvedbe_predmeta.studijsko_leto"
      },
      {
        path: "izvedbe_predmeta.izvajalci"
      }
    ])
    .exec(function(err, predmet) {
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
      if(err || !predmeti) {
        return res.status(404).send({ message: "Predmeti not found 1" });
      }
      
      koncniObject.predmeti = predmeti;
      return res.status(200).json(koncniObject);
  });
}

// Funkcije za upravljanje izvedb
function validateStudijskoLeto(req, res, next) {
  var studijsko_leto = req.params.studijskoLeto_id || req.body.studijsko_leto;
  
  StudijskoLeto.findById(studijsko_leto, function(err, studijskoLeto) {
    if(err || !studijskoLeto) {
      //console.log(err);
      return res.status(404).json({ message: "Izbrano študijsko leto ne obstaja" });
    }
    
    req.studijskoLeto = studijskoLeto;
    
    callNext(req, res, next);
  });
}
function najdiIzvedboPredmeta(req, res, next) {
  var izvedbePredmeta = req.predmet.izvedbe_predmeta;
  
  for(var i = 0; i < izvedbePredmeta.length; i++) {
    if(izvedbePredmeta[i].studijsko_leto.equals(req.studijskoLeto)) {
      req.izvedbaPredmeta = izvedbePredmeta[i];
      break;
    }
  }
  
  callNext(req, res, next);
}
function ustvariIzvedboPredmeta(req, res, next) {
  if(req.izvedbaPredmeta) {
    console.log(req.izvedbaPredmeta);
    return res.status(409).json({ message: "Izvedba predmeta za izbrano šolsko leto že obstaja" });
  }
  
  req.predmet.izvedbe_predmeta.push({
    studijsko_leto: req.studijskoLeto
  });
  req.predmet.save(function(err, predmet) {
    if(err || !predmet) {
      //console.log(err);
      return res.status(400).send({ message: "Napaka pri dodajanju izvedbe predmeta" });
    }
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}
function odstraniIzvedboPredmeta(req, res, next) {
  if(!req.izvedbaPredmeta) {
    return res.status(404).json({ message: "Ne najdem izvedbe predmeta za želeno študijsko leto" });
  }
  
  req.izvedbaPredmeta.remove();
  req.predmet.save(function(err, predmet) {
    if(err || !predmet) {
      console.log(err);
      return res.status(400).json({ message: "Napaka pri odstranjevanju izvedbe predmeta" });
    }
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}

function dodajIzvajalcaIzvedbiPredmeta(req, res, next) {
  if(req.izvedbaPredmeta.izvajalci.length >= 3) {
    return res.status(400).json({ message: "Izvedba predmeta ima lahko največ 3 izvajalce" });
  }
  
  req.izvedbaPredmeta.izvajalci.push(req.izvajalec);
  
  req.predmet.save(function(err, predmet) {
    if(err || !predmet) {
      return res.status(400).json({ message: "Napaka pri dodajanju izvajalca predmeta" });
    }
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}
function odstraniIzvajalcaIzvedbiPredmeta(req, res, next) {
  if(!req.izvedbaPredmeta) {
    return res.status(404).json({ message: "Ne najdem izbrane izvedbe predmeta" });
  }
  if(!req.izvajalec) {
    return res.status(404).json({ message: "Ne najdem izbranega izvajalca predmeta" });
  }
  
  req.izvedbaPredmeta.izvajalci.pull(req.izvajalec);
  
  req.predmet.save(function(err, predmet) {
    if(err || !predmet) {
      return res.status(400).json({ message: "Napaka pri odstranjevanju izvajalca predmeta" });
    }
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}
function validateIzvajalca(req, res, next) {
  var izvajalec = req.body.izvajalec || req.params.izvajalec_id;
  
  Zaposlen
    .findById(izvajalec, function(err, izvajalec) {
      if(err || !izvajalec) {
        return res.status(404).json({ message: "Ne nadjem izbranega izvajalca" });
      }
      
      req.izvajalec = izvajalec;
      
      callNext(req, res, next);
    });
}
function preveriIzvajalecZeIzvajaIzvedboPredmeta(req, res, next) {
  if(!req.izvedbaPredmeta) {
    return res.status(404).json({ message: "Ne najdem izbrane izvedbe predmeta" });
  }
  if(!req.izvajalec) {
    return res.status(404).json({ message: "Ne najdem izbranega izvajalca predmeta" });
  }
  
  for(var i = 0; i < req.izvedbaPredmeta.izvajalci.length; i++) {
    if(req.izvedbaPredmeta.izvajalci[i].equals(req.izvajalec)) {
      return res.status(400).json({ message: "Ta izvajalec že izvaja ta predmet v izbrani izvedbi predmeta" });
    }
  }
  
  callNext(req, res, next);
}
var Predmet = mongoose.model('Predmet');
var Student = mongoose.model("Student");

module.exports.pridobiStudente = function(req, res)
{
    pridobiStudente(req, res);
};
    
function pridobiStudente(req, res)
{
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
};
