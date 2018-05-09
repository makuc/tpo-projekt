var mongoose = require("mongoose");
var callNext = require("./_include/callNext");

var Predmet = mongoose.model('Predmet');
var StudijskoLeto = mongoose.model('StudijskoLeto');
var Zaposlen = mongoose.model('Zaposlen');


/* GET home page. */
module.exports.predmetiZaposlenega = function(req, res) {
  if(!req.user || !req.user.zaposlen)
    return res.status(403).json({ message: "Nisi prijavljen oziroma nisi zaposlen"});
  
  callNext(req, res, [ najdiPredmeteZaposlenega, odstraniOstalaStudijskaLeta, vrniPredmete ]);
};
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
  
  callNext(req, res,[ najdiPredmetId, najdiPredmetSifra, urediPredmet, shraniPredmet, vrniPredmet ]);
};
module.exports.delPredmet = function(req, res) {
  callNext(req, res, [ najdiPredmetId, izbrisiPredmet, shraniPredmet, vrniPredmet ]);
};
module.exports.obnoviPredmet = function(req, res) {
  callNext(req, res, [ najdiPredmetId, obnoviPredmet, shraniPredmet, vrniPredmet ]);
};

// Manipuliranje kombinacij izvajalcev
module.exports.getKombinacijeIzvajalcev = function(req, res) {
  callNext(req, res, [ najdiPredmetId, filtrirajKombinacije, vrniKombinacije ]);
};
module.exports.getKombinacijeIzvajalcev = function(req, res) {
  callNext(req, res, [ najdiPredmetId, vrniKombinacije ]);
};
module.exports.addKombinacijaIzvajalcev = function(req, res) {
  callNext(req, res, [ najdiPredmetId, ustvariKombinacijoIzvajalcev, shraniPredmet, vrniIdKombinacijeIzvajalcev ]);
};
module.exports.izbrisiKombinacijaIzvajalcev = function(req, res) {
  callNext(req, res, [ najdiPredmetId, najdiKombinacijoIzvajalcev, izbrisiKombinacijoIzvajalcev, shraniPredmet, vrniKombinacijaSuccess ]);
};
module.exports.obnoviKombinacijaIzvajalcev = function(req, res) {
  callNext(req, res, [ najdiPredmetId, najdiKombinacijoIzvajalcev, obnoviKombinacijoIzvajalcev, shraniPredmet, vrniKombinacijaSuccess ]);
};
module.exports.addIzvajalcaKombinaciji = function(req, res) {
  if(!req.body || !req.body.izvajalec) {
    return res.status(400).json({ message: "Ni podanega izvajatelja za izvedbo predmeta" });
  }
  
  callNext(req, res, [
    najdiPredmetId,
    validateIzvajalca, najdiKombinacijoIzvajalcev, preveriIzvajalecZeVKombinaciji, dodajIzvajalcaKombinaciji,
    shraniPredmet, vrniKombinacijaSuccess
  ]);
};
module.exports.delIzvajalcaKombinaciji = function(req, res) {
  callNext(req, res, [
    najdiPredmetId,
    validateIzvajalca, najdiKombinacijoIzvajalcev, odstraniIzvajalcaKombinaciji,
    shraniPredmet, vrniKombinacijaSuccess
  ]);
};

module.exports.addIzvedbaPredmeta = function(req, res) {
  if(!req.body || !req.body.studijsko_leto) {
    return res.status(400).json({ message: "Ni podanega študijskega leta" });
  }
  
  najdiPredmetId(req, res, [
    validateStudijskoLeto, najdiIzvedboPredmeta, ustvariIzvedboPredmeta, shraniPredmet, vrniPredmet
  ]);
};
module.exports.delIzvedbaPredmeta = function(req, res) {
  najdiPredmetId(req, res, [
    validateStudijskoLeto, najdiIzvedboPredmeta, odstraniIzvedboPredmeta, shraniPredmet, vrniPredmet
  ]);
};
module.exports.dodajKombinacijoIzvedbi = function(req, res) {
  callNext(req, res, [
    validateStudijskoLeto, najdiPredmetId,
    najdiKombinacijoIzvajalcev, najdiIzvedboPredmeta, preveriKombinacijaZeVIzvedbi, dodajKombinacijoIzvedbi,
    shraniPredmet, vrniIzvedbaSuccess
  ]);
};
module.exports.odstraniKombinacijoIzvedbi = function(req, res) {
  callNext(req, res, [
    validateStudijskoLeto, najdiPredmetId,
    najdiKombinacijoIzvajalcev, najdiIzvedboPredmeta, odstraniKombinacijoIzvedbi,
    shraniPredmet, vrniIzvedbaSuccess
  ]);
};


/* Funkcije */
function najdiPredmetSifra(req, res, next) {
  if(!req.body.sifra)
    return callNext(req, res, next);
  
  Predmet.findOne({ sifra: req.body.sifra }, function(err, predmet) {
    if(err)
    {
      console.log("---najdiPredmetSifra:\n" + err);
      return res.status(400).json({ message: "Napaka pri pregled podvojene šifre predmeta"});
    }
    
    if(predmet && !(req.params && req.params.predmet_id && predmet._id.equals(req.params.predmet_id)))
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
        path: "kombinacije_izvajalcev.izvajalci"
      },
      {
        path: "izvedbe_predmeta.aktivne_kombinacije.izvajalci"
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
  
  callNext(req, res, next);
}
function shraniPredmet(req, res, next) {
  if(!req.predmet)
    callNext(req, res, next);
  
  req.predmet.save(function(err, predmet) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Napaka pri shranjevanju predmeta" });
    }
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}

function izbrisiPredmet(req, res, next) {
  req.predmet.valid = false;
  
  callNext(req, res, next);
}
function obnoviPredmet(req, res, next) {
  req.predmet.valid = true;
  
  callNext(req, res, next);
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

// Najde in procesira predmete zaposlenega
function najdiPredmeteZaposlenega(req, res, next) {
  Predmet
    .find({
      "izvedbe_predmeta.izvajalci": req.user.zaposlen,
      valid: true
    })
    .populate([
      {
        path: "izvedbe_predmeta.studijsko_leto"
      },
      {
        path: "kombinacije_izvajalcev.izvajalci"
      },
      {
        path: "izvedbe_predmeta.aktivne_kombinacije.izvajalci"
      }
    ])
    .exec(function(err, predmeti) {
      if(err || !predmeti)
      {
        console.log("---najdiPredmeteZaposlenega:\n" + err);
        return res.status(404).json({ message: "Ne najdem predmetov zaposlenega"});
      }
      
      req.predmeti = predmeti;
      
      callNext(req, res, next);
    });
}
function odstraniOstalaStudijskaLeta(req, res, next) {
  for( var i = 0; i < req.predmeti.length; i++)
  {// Obdelaj vse predmete
    var predmet = req.predmeti[i].toObject();
    
    for(var j = 0; j < predmet.izvedbe_predmeta.length; j++)
    {// Obdelaj vse izvedbe predmeta
      var izvedba = predmet.izvedbe_predmeta[j];
      var found = false;
      
      for(var x = 0; x < izvedba.izvajalci.length; x++)
      {
        if(izvedba.izvajalci[x].equals(req.user.zaposlen))
        {
          found = true;
          break;
        }
      }
      
      if(!found) {
        predmet.izvedbe_predmeta.splice(j, 1);
        j--;
      }
    }
  }
  callNext(req, res, next);
}
function vrniPredmete(req, res, next) {
  res.status(200).json(req.predmeti);
}

// Dodaja novo kombinacijo predavateljev
function ustvariKombinacijoIzvajalcev(req, res, next) {
  req.predmet.kombinacije_izvajalcev.push({
    izvajalci: []
  });
  
  callNext(req, res, next);
}
function vrniIdKombinacijeIzvajalcev(req, res, next) {
  var kombinacija = req.predmet.kombinacije_izvajalcev[req.predmet.kombinacije_izvajalcev.length - 1];
  
  return res.status(201).json({ kombinacija_izvajalcev_id: kombinacija._id});
}
function najdiKombinacijoIzvajalcev(req, res, next) {
  req.kombinacija = req.predmet.kombinacije_izvajalcev.id(req.params.kombinacija_id);
  
  if(!req.kombinacija)
    return res.status(404).json({ message: "Ne najdem izbrane kombinacije izvajalcev"});
  
  callNext(req, res, next);
}
function izbrisiKombinacijoIzvajalcev(req, res, next) {
  req.kombinacija.valid = false;
  
  callNext(req, res, next);
}
function obnoviKombinacijoIzvajalcev(req, res, next) {
  req.kombinacija.valid = true;
  
  callNext(req, res, next);
}
function filtrirajKombinacije(req, res, next) {
  for(var i = 0; i < req.predmet.kombinacije_izvajalcev.length; i++)
  {
    if(!req.predmet.kombinacije_izvajalcev[i].valid)
    {
      req.predmet.kombinacije_izvajalcev.splice(i, 1);
      i--;
    }
  }
  
  callNext(req, res, next);
}

function dodajIzvajalcaKombinaciji(req, res, next) {
  if(req.kombinacija.izvajalci.length >= 3) {
    return res.status(400).json({ message: "Kombinacija izvajalcev ima največ 3 izvajalce" });
  }
  
  req.kombinacija.izvajalci.push(req.izvajalec);
  
  callNext(req, res, next);
}
function odstraniIzvajalcaKombinaciji(req, res, next) {
  if(!req.izvajalec) {
    return res.status(404).json({ message: "Ne najdem izbranega izvajalca predmeta" });
  }
  
  req.kombinacija.izvajalci.pull(req.izvajalec);
  
  callNext(req, res, next);
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
function preveriIzvajalecZeVKombinaciji(req, res, next) {
  if(!req.izvajalec) {
    return res.status(404).json({ message: "Ne najdem izbranega izvajalca predmeta" });
  }
  
  for(var i = 0; i < req.kombinacija.izvajalci.length; i++) {
    if(req.kombinacija.izvajalci[i].equals(req.izvajalec)) {
      return res.status(400).json({ message: "Ta izvajalec je že v tej kombinaciji izvajanja predmeta" });
    }
  }
  
  callNext(req, res, next);
}

function vrniKombinacijaSuccess(req, res) {
  res.status(200).json({ message: "Kombinacija uspešno posodobljena"});
}
function vrniKombinacije(req, res) {
  res.status(200).json(req.predmet.kombinacije_izvajalcev);
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
    //console.log(req.izvedbaPredmeta);
    return res.status(409).json({ message: "Izvedba predmeta za izbrano šolsko leto že obstaja" });
  }
  
  if(req.predmet.izvedbe_predmeta.length > 0)
  {
    req.predmet.izvedbe_predmeta.push(req.predmet.izvedbe_predmeta[req.predmet.izvedbe_predmeta.length - 1]);
  }
  else
  {
    req.predmet.izvedbe_predmeta.push({
      studijsko_leto: req.studijskoLeto
    });
  }
  
  callNext(req, res, next);
}
function odstraniIzvedboPredmeta(req, res, next) {
  if(!req.izvedbaPredmeta) {
    return res.status(404).json({ message: "Ne najdem izvedbe predmeta za želeno študijsko leto" });
  }
  
  req.izvedbaPredmeta.remove();
  
  callNext(req, res, next);
}

function preveriKombinacijaZeVIzvedbi(req, res, next) {
  for(var i = 0; i < req.izvedbaPredmeta.aktivne_kombinacije.length; i++)
  {
    if(req.izvedbaPredmeta.aktivne_kombinacije[i]._id.equals(req.kombinacija._id))
    {
      return res.status(400).json({ message: "Ta kombinacija izvajalcev je že v izbrani izvedbi"});
    }
  }
  
  callNext(req, res, next);
}
function dodajKombinacijoIzvedbi(req, res, next) {
  req.izvedbaPredmeta.aktivne_kombinacije.push(req.kombinacija);
  
  callNext(req, res, next);
}
function odstraniKombinacijoIzvedbi(req, res, next) {
  req.izvedbaPredmeta.aktivne_kombinacije.pull(req.kombinacija);
  
  callNext(req, res, next);
}

function vrniIzvedbaSuccess(req, res, next) {
  res.status(200).json({ message: "Izvedba predmeta posodobljena"});
}