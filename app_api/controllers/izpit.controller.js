var mongoose = require("mongoose");
var callNext = require("./_include/callNext");

var Predmet = mongoose.model('Predmet');
var StudijskoLeto = mongoose.model('StudijskoLeto');
var Zaposlen = mongoose.model('Zaposlen');
var Izpit = mongoose.model('Izpit');
var Student = mongoose.model('Student');


/* GET home page. */
module.exports.getIzpiteStudijskoLeto = function(req, res) {
  callNext(req, res, [
    validateStudijskoLeto, najdiVseIzpiteStudijskoLeto, vrniIzpite
  ]);
};
module.exports.getIzpitePredmet = function(req, res) {
  callNext(req, res, [
    validatePredmet, najdiVseIzpitePredmet, vrniIzpite
  ]);
};
module.exports.getIzpiteStudijskoLetoPredmet = function(req, res) {
  callNext(req, res, [
    validateStudijskoLeto, validatePredmet, najdiVseIzpiteStudijskoLetoPredmet, vrniIzpite
  ]);
};

module.exports.getMozneIzpiteStudenta = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, najdiNeopravljenePredmete, najdiMozneIzpiteStudenta, vrniIzpite
  ]);
};

module.exports.getIzpit = function(req, res) {
  callNext(req, res, [ najdiIzpit, vrniIzpit ]);
};
module.exports.addIzpit = function(req, res) {
  if(!req.body || !req.body.predmet || !req.body.studijsko_leto || !req.body.datum_izvajanja || !req.body.izvajalci)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje izpitnega roka" });
  
  callNext(req, res, [ validateDatumIzvedbe, validatePredmet, validateStudijskoLeto, validateIzvedboPredmeta, validateIzvajalce, ustvariIzpit ]);
};
module.exports.editIzpit = function(req, res) {
  console.log(req.body);
  if(!req.body || (!req.body.datum_izvajanja && !req.body.izvajalci)) {
    return res.status(400).json({ message: "Nobenega podatka izpita ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiIzpit, validateDatumIzvedbe, validateIzvajalce, urediIzpit, vrniIzpit ]);
};
module.exports.delIzpit = function(req, res) {
  callNext(req, res, [ najdiIzpit, izbrisiIzpit, vrniIzpit ]);
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
function najdiVseIzpiteStudijskoLeto(req, res, next) {
  Izpit
    .find({
      studijsko_leto: req.studijskoLeto
    })
    .limit(0)
    .sort("datum_izvajanja")
    .populate("predmet studijsko_leto izvajalci polagalci.student")
    .exec(function(err, izpiti) {
      if(err || !izpiti) {
        return res.status(404).json({ message: "Ne najdem izpitov" });
      }
      req.izpiti = izpiti;
      
      callNext(req, res, next);
    });
}
function najdiVseIzpitePredmet(req, res, next) {
  Izpit
    .find({
      predmet: req.predmet
    })
    .limit(0)
    .sort("datum_izvajanja")
    .populate("predmet studijsko_leto izvajalci polagalci.student")
    .exec(function(err, izpiti) {
      if(err || !izpiti) {
        return res.status(404).json({ message: "Ne najdem izpitov" });
      }
      req.izpiti = izpiti;
      
      callNext(req, res, next);
    });
}
function najdiVseIzpiteStudijskoLetoPredmet(req, res, next) {
  Izpit
    .find({
      predmet: req.predmet,
      studijsko_leto: req.studijskoLeto
    })
    .limit(0)
    .sort("datum_izvajanja")
    .populate("predmet studijsko_leto izvajalci polagalci.student")
    .exec(function(err, izpiti) {
      if(err || !izpiti) {
        return res.status(404).json({ message: "Ne najdem izpitov" });
      }
      req.izpiti = izpiti;
      
      callNext(req, res, next);
    });
}
function vrniIzpite(req, res) {
  res.status(200).json(req.izpiti);
}

function najdiIzpit(req, res, next) {
  Izpit
    .findById(req.params.izpit_id)
    .populate("predmet studijsko_leto izvajalci polagalci.student")
    .exec(function(err, izpit) {
      if(err || !izpit) {
        return res.status(404).json({ message: "Ne najdem zelenega izpita" });
      }
      
      req.izpit = izpit;
      
      callNext(req, res, next);
    });
}
function ustvariIzpit(req, res, next) {
  Izpit.create({
    predmet: req.predmet,
    studijsko_leto: req.studijskoLeto,
    datum_izvajanja: req.datumIzvajanja,
    izvajalci: req.izvajalci,
    opombe: req.body.opombe
  }, function(err, izpit) {
    if(err) {
      console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send(izpit);
  });
}
function urediIzpit(req, res, next) {
  if(req.body.datum_izvajanja) {
    if(req.datumIzvajanja < req.izpit.datum_izvajanja)
      return res.status(400).json({ message: "Izpitni datum se lahko spremeni samo na kasnejsi datum" });
    
    req.izpit.datum_izvajanja = req.datumIzvajanja;
  }
  if(req.body.opombe)
    req.izpit.opombe = req.body.opombe;
  if(req.body.izvajalci)
    req.izpit.izvajalci = req.izvajalci;
  
  req.izpit.save(function(err, izpit) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju izpita" });
    
    req.izpit = izpit;
    
    callNext(req, res, next);
  });
}
function izbrisiIzpit(req, res, next) {
  if(req.izpit.polagalci.length > 0) {
    return res.status(403).json({ message: "Obstajajo prijavljeni polagalci izpita" });
  }
  
  req.izpit.remove(function(err, izpit) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju izpita" });
    }
    req.izpit = undefined;
    
    callNext(req, res, next);
  });
}
function vrniIzpit(req, res) {
  res.status(200).json(req.izpit);
}

// Funkcije za upravljanje
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
function validatePredmet(req, res, next) {
  var predmet = req.params.predmet_id || req.body.predmet;
  
  Predmet
    .findById(predmet)
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
function validateIzvedboPredmeta(req, res, next) {
  req.next = next;
  callNext(req, res, [ najdiIzvedboPredmeta, validIzvedbaPredmeta ]);
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
function validIzvedbaPredmeta(req, res, next) {
  if(!req.izvedbaPredmeta)
    return res.status(400).json({ message: "Predmet se v tem solskem letu se ne izvaja" });
  
  next = req.next;
  req.next = undefined;
  
  callNext(req, res, next);
}

function validateDatumIzvedbe(req, res, next) {
  req.datumIzvajanja = new Date(req.body.datum_izvajanja);
  
  console.log(req.datumIzvajanja);
  console.log(req.datumIzvajanja.getDay());
  
  if(req.datumIzvajanja.getDay() == 0 || req.datumIzvajanja.getDay() == 6)
    return res.status(400).json({ message: "Izpit se ne more izvajati na vikend" });
  
  // Preveri, ce je praznik ali dela prost dan
  var praznik = false;
  if(req.datumIzvajanja.getMonth() == 0 && (req.datumIzvajanja.getDate() == 0 || req.datumIzvajanja.getDate() == 1))
    praznik = true;
  if(req.datumIzvajanja.getMonth() == 1 && (req.datumIzvajanja.getDate() == 7))
    praznik = true;
  if(req.datumIzvajanja.getMonth() == 3 && (req.datumIzvajanja.getDate() == 26))
    praznik = true;
  if(req.datumIzvajanja.getMonth() == 4 && (req.datumIzvajanja.getDate() == 0 || req.datumIzvajanja.getDate() == 1))
    praznik = true;
  if(req.datumIzvajanja.getMonth() == 5 && (req.datumIzvajanja.getDate() == 7 || req.datumIzvajanja.getDate() == 24))
    praznik = true;
  if(req.datumIzvajanja.getMonth() == 7 && (req.datumIzvajanja.getDate() == 16 || req.datumIzvajanja.getDate() == 14))
    praznik = true;
  if(req.datumIzvajanja.getMonth() == 8 && (req.datumIzvajanja.getDate() == 14))
    praznik = true;
  if(req.datumIzvajanja.getMonth() == 9 && (req.datumIzvajanja.getDate() == 24 || req.datumIzvajanja.getDate() == 30))
    praznik = true;
  if(req.datumIzvajanja.getMonth() == 10 && (req.datumIzvajanja.getDate() == 0 || req.datumIzvajanja.getDate() == 22))
    praznik = true;
  if(req.datumIzvajanja.getMonth() == 11 && (req.datumIzvajanja.getDate() == 24 || req.datumIzvajanja.getDate() == 25))
    praznik = true;
  
  
  if(praznik)
    return res.status(400).json({ message: "Izpit se ne more izvajati na praznik ali dela prost dan" });
  
  callNext(req, res, next);
}

function validateIzvajalce(req, res, next) {
  if(!Array.isArray(req.izvajalci)) {
    req.izvajalci = [];
    req.next = next; // Shrani sledece funkcije za nadaljnjo uporabo!!
  } else if(req.izvajalec) {
    req.izvajalci.push(req.izvajalec);
  }
  
  if(req.body.izvajalci.length > 0) {
    req.body.izvajalec = req.body.izvajalci.shift();
    
    validateIzvajalca(req, res, validateIzvajalce);
    
  } else {
    next = req.next; // Nalozi prej shranjene sledece funkcije za uporabo!!
    req.next = undefined; // Pobrisem podatke za seboj, da ne bom pomesal v naprej
    
    callNext(req, res, next);
  }
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

function najdiStudentaId(req, res, next) {
  Student
    .findById(req.params.student_id)
    .populate([
      {
        path: "studijska_leta_studenta.studijsko_leto"
      },
      {
        path: "studijska_leta_studenta.letnik",
        populate: {
          path: "studijskiProgram"
        }
      },
      {
        path: "studijska_leta_studenta.vrsta_studija"
      },
      {
        path: "studijska_leta_studenta.vrsta_vpisa"
      },
      {
        path: "studijska_leta_studenta.nacin_studija"
      },
      {
        path: "studijska_leta_studenta.oblika_studija"
      }
    ])
    .exec(function(err, student) {
      if(err || !student) {
        console.log(err);
        return res.status(404).json({ message: "Ne najdem izbranega študenta"});
      }
      
      req.student = student;
      
      callNext(req, res, next);
    });
}
function najdiNeopravljenePredmete(req, res, next) {
  req.neopravljeniPredmeti = [];
  
  req.studijskoLeto = req.student.studijska_leta_studenta[req.student.studijska_leta_studenta.length - 1];
  
  if(!req.studijskoLeto) {
    return res.status(404).json({ message: "Izbrani študent nima veljavnih študijskih let"});
  }
  
  for(var i = 0; i < req.studijskoLeto.predmeti.length; i++) {
    if(req.studijskoLeto.predmeti[i].ocena <= 5) {
      req.neopravljeniPredmeti.push(req.studijskoLeto.predmeti[i].predmet);
    }
  }
  
  callNext(req, res, next);
}
function najdiMozneIzpiteStudenta(req, res, next) {
  var cur = new Date(Date.now());
  
  var datum = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 2);
  console.log(datum);
  Izpit
    .find({
      predmet: { $in: req.neopravljeniPredmeti },
      datum_izvajanja: { $gt: datum }
    })
    .sort("datum_izvajanja")
    .populate("predmet izvajalci studijsko_leto")
    .exec(function(err, izpiti) {
      if(err || !izpiti) {
        console.log(err);
        return res.status(404).json({ message: "Napaka pri pridobivanju izpitov"});
      }
      
      req.izpiti = izpiti;
      
      callNext(req, res, next);
    });
}