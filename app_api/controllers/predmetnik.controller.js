var mongoose = require("mongoose");
var callNext = require("./_include/callNext");

var StudijskoLeto = mongoose.model('StudijskoLeto');
var Letnik = mongoose.model('Letnik');
var StudijskiProgram = mongoose.model('StudijskiProgram');
var DelPredmetnika = mongoose.model('DelPredmetnika');
var Predmetnik = mongoose.model('Predmetnik');
var Predmet = mongoose.model('Predmet');

/* GET home page. */
module.exports.getPredmetnike = function(req, res) {
  Predmetnik
    .find({ valid: true })
    .limit(0)
    .populate([
      {
        path: "studijski_program",
        populate: "vrstaStudija"
      },
      {
        path: "studijsko_leto"
      },
      {
        path: "letnik"
      },
      {
        path: "del_predmetnika predmeti"
      }
    ])
    .exec(function(err, predmetniki) {
      if(err || !predmetniki) {
        return res.status(404).json({ message: "Ne najdem predmetnikov" });
      }
      res.status(200).json(predmetniki);
    });
};
module.exports.getVsePredmetnike = function(req, res) {
  Predmetnik
    .find()
    .limit(0)
    .populate([
      {
        path: "studijski_program",
        populate: "vrstaStudija"
      },
      {
        path: "studijsko_leto"
      },
      {
        path: "letnik"
      },
      {
        path: "del_predmetnika predmeti"
      }
    ])
    .exec(function(err, predmetniki) {
      if(err || !predmetniki) {
        return res.status(404).json({ message: "Ne najdem predmetnikov" });
      }
      res.status(200).json(predmetniki);
    });
};
module.exports.getIzbrisanePredmetnike = function(req, res) {
  Predmetnik
    .find({ valid: false })
    .limit(0)
    .populate([
      {
        path: "studijski_program",
        populate: "vrstaStudija"
      },
      {
        path: "studijsko_leto"
      },
      {
        path: "letnik"
      },
      {
        path: "del_predmetnika predmeti"
      }
    ])
    .exec(function(err, predmetniki) {
      if(err || !predmetniki) {
        return res.status(404).json({ message: "Ne najdem predmetnikov" });
      }
      res.status(200).json(predmetniki);
    });
};
module.exports.getPredmetnik = function(req, res) {
  callNext(req, res, [ najdiPredmetnikId, vrniPredmetnik ]);
};
module.exports.addPredmetnik = function(req, res) {
  if(!req.body || !req.body.studijski_program || !req.body.studijsko_leto || !req.body.letnik || !req.body.del_predmetnika)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje predmetnika" });
  
  callNext(req, res, [ validateStudijskiProgram, validateLetnik, validateDelPredmetnika, validateStudijskoLeto, createPredmetnik ]);
};
module.exports.editPredmetnik = function(req, res) {
  if(!req.body || (!req.body.studijski_program && !req.body.studijsko_leto && !req.body.letnik && ! req.body.del_predmetnika || !req.body.ime)) {
    return res.status(400).json({ message: "Nobenega podatka predmetnika ne spreminjaš" });
  }
  
  callNext(req, res,[
    najdiPredmetnikId,
    validateStudijskiProgram, validateLetnik, validateStudijskoLeto, validateDelPredmetnika,
    urediPredmetnik, vrniPredmetnik
  ]);
};
module.exports.delPredmetnik = function(req, res) {
  callNext(req, res, [ najdiPredmetnikId, izbrisiPredmetnik, vrniPredmetnik ]);
};
module.exports.obnoviPredmetnik = function(req, res) {
  callNext(req, res, [ najdiPredmetnikId, obnoviPredmetnik, vrniPredmetnik ]);
};

module.exports.dodajPredmet = function(req, res) {
  //console.log("req body: ", req.body);
  if(!req.body || !req.body.predmet) {
    return res.status(400).json({ message: "Ni podanega predmeta" });
  }
  
  callNext(req, res, [ najdiPredmetnikId, validatePredmet, dodajPredmet, vrniPredmetnik ]);
};
module.exports.odstraniPredmet = function(req, res) {
  callNext(req, res, [ najdiPredmetnikId, odstraniPredmet, vrniPredmetnik ]);
};

/* Funkcije */
function createPredmetnik(req, res, next) {
  Predmetnik.create({
    studijsko_leto: req.studijskoLeto,
    studijski_program: req.studijskiProgram,
    letnik: req.letnik,
    del_predmetnika: req.delPredmetnika,
    
    ime: req.body.ime
  }, function(err, predmetnik) {
    if(err) {
      //console.log(err);
      return res.status(400).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( predmetnik );
  });
}
function najdiPredmetnikId(req, res, next) {
  Predmetnik
    .findById(req.params.predmetnik_id)
    .populate("studijski_program studijsko_leto letnik del_predmetnika predmeti")
    .exec(function(err, predmetnik) {
    if(err || !predmetnik) {
      return res.status(404).json({ message: "Ne najdem želenega predmetnika" });
    }
    req.predmetnik = predmetnik;
    
    callNext(req, res, next);
  });
}
function vrniPredmetnik(req, res) {
  res.status(200).json(req.predmetnik);
}
function urediPredmetnik(req, res, next) {
  if(req.studijskiProgram)
    req.predmetnik.studijski_program = req.studijskiProgram;
  if(req.letnik)
    req.predmetnik.letnik = req.letnik;
  if(req.studijskoLeto)
    req.predmetnik.studijsko_leto = req.studijskoLeto;
  if(req.delPredmetnika)
    req.predmetnik.del_predmetnika = req.delPredmetnika;
  if(req.body.ime)
    req.predmetnik.ime = req.body.ime;
  
  req.predmetnik.save(function(err, predmetnik) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju predmetnika" });
    
    req.predmetnik = predmetnik;
    
    callNext(req, res, next);
  });
}

function izbrisiPredmetnik(req, res, next) {
  req.predmetnik.valid = false;
  
  req.predmetnik.save(function(err, predmetnik) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju predmetnika" });
    }
    req.predmetnik = predmetnik;
    
    callNext(req, res, next);
  });
}
function obnoviPredmetnik(req, res, next) {
  req.predmetnik.valid = true;
  
  req.predmetnik.save(function(err, predmetnik) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju predmetnika" });
    
    req.predmetnik = predmetnik;
    
    callNext(req, res, next);
  });
}

function validateLetnik(req, res, next) {
  if(!req.body.letnik)
    return callNext(req, res, next);
  
  Letnik.findById(req.body.letnik, function(err, letnik) {
    if(err || !letnik) {
      //console.log(err);
      return res.status(400).json({ message: "Izbrani letnik ne obstaja" });
    }
    
    req.letnik = letnik;
    
    callNext(req, res, next);
  });
}
function validateStudijskiProgram(req, res, next) {
  if(!req.body.studijski_program)
    return callNext(req, res, next);
  
  StudijskiProgram.findById(req.body.studijski_program, function(err, studijskiProgram) {
    if(err || !studijskiProgram) {
      //console.log(err);
      return res.status(400).json({ message: "Izbrani študijski program ne obstaja" });
    }
    
    req.studijskiProgram = studijskiProgram;
    
    callNext(req, res, next);
  });
}
function validateDelPredmetnika(req, res, next) {
  if(!req.body.del_predmetnika)
    return callNext(req, res, next);
  
  DelPredmetnika.findById(req.body.del_predmetnika, function(err, delPredmetnika) {
    if(err || !delPredmetnika) {
      //console.log(err);
      return res.status(400).json({ message: "Izbrani del predmetnika ne obstaja" });
    }
    
    req.delPredmetnika = delPredmetnika;
    
    callNext(req, res, next);
  });
}
function validateStudijskoLeto(req, res, next) {
  if(!req.body.studijsko_leto)
    return callNext(req, res, next);
  
  StudijskoLeto.findById(req.body.studijsko_leto, function(err, studijskoLeto) {
    if(err || !studijskoLeto) {
      //console.log(err);
      return res.status(400).json({ message: "Izbrano študijsko leto ne obstaja" });
    }
    
    req.studijskoLeto = studijskoLeto;
    
    callNext(req, res, next);
  });
}

function validatePredmet(req, res, next) {
  if(!req.body.predmet)
    return callNext(req, res, next);
  
  Predmet.findById(req.body.predmet, function(err, predmet) {
    if(err || !predmet) {
      //console.log(err);
      return res.status(400).json({ message: "Izbran predmet ne obstaja" });
    }
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}

function dodajPredmet(req, res, next) {
  req.predmetnik.predmeti.push(req.predmet);
  req.predmetnik.save(function(err, predmetnik) {
    if(err || !predmetnik) {
      //console.log(err);
      return res.status(400).send({ message: "Napaka pri dodajanju predmeta" });
    }
    
    req.predmetnik = predmetnik;
    
    callNext(req, res, next);
  });
}
function odstraniPredmet(req, res, next) {
  if(req.predmetnik.predmeti.length <= 0)
    return res.status(404).send({ message: "Ni predmetov za izbris" });
  
  req.predmetnik.predmeti.pull(req.params.predmet_id);
  
  req.predmetnik.save(function(err, predmetnik) {
    if(err) {
      //console.log(err);
      return res.status(400).send({ message: "Napaka pri shranjevanju predmetnika" });
    }
    
    req.predmetnik = predmetnik;
    
    callNext(req, res, next);
  });
}