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

module.exports.getIzpit = function(req, res) {
  callNext(req, res, [ najdiIzpit, vrniIzpit ]);
};
module.exports.addIzpit = function(req, res) {
  if(!req.body || !req.body.predmet || !req.body.studijsko_leto || !req.body.datum_izvajanja)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje izpitnega roka" });
  
  callNext(req, res, [ validateDatumIzvedbe, validatePredmet, validateStudijskoLeto, validateIzvedboPredmeta, ustvariIzpit, vrniIzpit ]);
};
module.exports.editIzpit = function(req, res) {
  console.log(req.body);
  if(!req.body || (!req.body.datum_izvajanja)) {
    return res.status(400).json({ message: "Nobenega podatka izpita ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiIzpit, validateDatumIzvedbe, urediIzpit, shraniIzpit, vrniIzpit ]);
};
module.exports.delIzpit = function(req, res) {
  callNext(req, res, [ najdiIzpit, izbrisiIzpit, vrniIzpit ]);
};

module.exports.addIzvajalcaIzpita = function(req, res) {
  if(!req.body || !req.body.izvajalec) {
    return res.status(400).json({ message: "Ni podanega izvajatelja za izvedbo predmeta" });
  }
  
  callNext(req, res, [
    najdiIzpit, validateIzvajalca, preveriIzvajalcaIzpita, dodajIzvajalcaIzpita, shraniIzpit, vrniIzpit
  ]);
};
module.exports.delIzvajalcaIzpita = function(req, res) {
  callNext(req, res, [
    najdiIzpit, validateIzvajalca, preveriIzvajalcaIzpita, odstraniIzvajalcaIzpita, shraniIzpit, vrniIzpit
  ]);
};


// Prijave in odjave na izpite
module.exports.getMozneIzpiteStudenta = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, pripraviDateDanes, najdiNeopravljenePredmete, najdiMozneIzpiteStudenta, vrniIzpite
  ]);
};
module.exports.prijavaNaIzpitStudent = function(req, res) {
  if(!req.body || !req.body.student) {
    return res.status(400).json({ message: "Ni izbranega študenta za prijavo"});
  }
  
  callNext(req, res, [
    najdiIzpit, najdiStudentaId, pripraviDateDanes, najdiNeopravljenePredmete, najdiStudentovPredmet,
    najdiPolaganje, preveriPrijavljenNaDrugIzpit, preveriPretekloDovoljDni, dodajPolagalca, visajZaporedniPoskus, shraniIzpit, shraniStudenta,
    prijavaUspesna
  ]);
};
module.exports.odjavaIzIzpitaStudent = function(req, res) {
  callNext(req, res, [
    najdiIzpit, najdiStudentaId, pripraviDateDanes, najdiNeopravljenePredmete, najdiStudentovPredmet, najdiPolaganje,
    odjaviPolagalca, nizajZaporedniPoskus, shraniIzpit, shraniStudenta, odjavaUspesna
  ]);
};
module.exports.prijavaNaIzpitForce = function(req, res) {
  if(!req.body || !req.body.student) {
    return res.status(400).json({ message: "Ni izbranega študenta za prijavo"});
  }
  
  req.force = true;
  req.opozorila = [];
  
  callNext(req, res, [
    // Odjavi predhodne prijave
    najdiIzpit, najdiStudentaId, izberiPredmet, najdiPrijavljenIzpit, najdiPolaganje, odjaviPolagalca, nizajZaporedniPoskus, shraniIzpit,
    
    // Opravi prijavo
    najdiIzpit, pripraviDateDanes, najdiNeopravljenePredmete, najdiStudentovPredmet,
    najdiPolaganje, preveriPrijavljenNaDrugIzpit, preveriPretekloDovoljDni, dodajPolagalca, visajZaporedniPoskus, shraniIzpit, shraniStudenta,
    prijavaUspesna
  ]);
};
module.exports.odjavaIzIzpitaForce = function(req, res) {
  req.force = true;
  req.opozorila = [];
  
  callNext(req, res, [
    najdiIzpit, najdiStudentaId, pripraviDateDanes, najdiNeopravljenePredmete, najdiStudentovPredmet, najdiPolaganje, odjaviPolagalca,
    nizajZaporedniPoskus, shraniIzpit, shraniStudenta,
    odjavaUspesna
  ]);
};

// Vnos ocen
module.exports.addOcenoStudentu = function(req, res) {
  if(!req.body || (!req.body.ocena && !req.body.tock))
  {
    return res.status(400).json({ message: "Ni vnešene oceno, ki jo želiš vnesti"});
  }
  
  req.force = true;
  req.opozorila = [];
  
  callNext(req, res, [
    najdiIzpit, najdiStudentaId, najdiPrijavljenIzpit,
    najdiIzpit, izberiPredmet,
    najdiPolaganje, dodajPolagalca, visajZaporedniPoskus,
    
    // Dodaj študentu oceno
    najdiPolaganje, vnesiOcenoPodIzpit, vnesiOcenoStudentu,
    
    // Shrani spremembe
     shraniIzpit, shraniStudenta, vrniIzpit
  ]);
};
module.exports.addOceneStudentom = function(req, res) {
  
  req.force = true;
  req.opozorila = [];
  
  callNext(req, res, [
    
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
  if(req.izpit)
    return callNext(req, res, next);
  
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
    opombe: req.body.opombe
  }, function(err, izpit) {
    if(err) {
      console.log(err);
      return res.status(400).send({ message: "Nepravilni podatki" });
    }
    
    req.izpit = izpit;
    
    callNext(req, res, next);
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
  
  callNext(req, res, next);
}
function izbrisiIzpit(req, res, next) {
  if(req.izpit.polagalci.length > 0) {
    return res.status(400).json({ message: "Obstajajo prijavljeni polagalci izpita" });
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
function filtrirajPrijave(req, res, next) {
  req.izpit = req.izpit.toObject();
  
  for(var i = 0; i < req.izpit.polagalci.length; i++) {
    if(req.izpit.polagalci[i].odjavljen) {
      req.izpit.polagalci.splice(i, 1);
      i--;
    }
  }
  
  callNext(req, res, next);
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


// Prijave/odjave na izpit
function najdiStudentaId(req, res, next) {
  var student_id = req.params.student_id || req.body.student;
  Student
    .findById(student_id)
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
      req.neopravljeniPredmeti.push(req.studijskoLeto.predmeti[i]);
    }
  }
  
  callNext(req, res, next);
}
function najdiMozneIzpiteStudenta(req, res, next) {
  var predmeti = [];
  for(var i = 0; i < req.neopravljeniPredmeti.length; i++) {
    predmeti.push(req.neopravljeniPredmeti[i].predmet);
  }
  
  Izpit
    .find({
      $or: [
        {
          predmet: { $in: predmeti },
          datum_izvajanja: { $gt: req.danes },
          valid: true
        },
        {
          predmet: { $in: predmeti },
          valid: true,
          polagalci: {
            $elemMatch: {
              student: req.student,
              ocena: 0,
              odjavljen: false,
              valid: true
            }
          }
        }
      ]
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

function najdiStudentovPredmet(req, res, next) {
  for(var i = 0; i < req.neopravljeniPredmeti.length; i++) {
    if(req.neopravljeniPredmeti[i].predmet.equals(req.izpit.predmet._id)) {
      //console.log("Najden!");
      
      req.predmet = req.neopravljeniPredmeti[i];
      
      return callNext(req, res, next);
    }
  }
  
  res.status(404).json({ message: "Ta študent je ta predmet že opravil!"});
}

function najdiPolaganje(req, res, next) {
  if(!req.izpit)
    return callNext(req, res, next);
  
  for(var i = 0; i < req.izpit.polagalci.length; i++) {
    if(req.izpit.polagalci[i].student._id.equals(req.student._id))
    {
      req.polaganje = req.izpit.polagalci[i];
      break;
    }
  }
  
  callNext(req, res, next);
}

function dodajPolagalca(req, res, next) {
  if(req.danes > req.izpit.datum_izvajanja) {
    if(!req.force)
      return res.status(403).json({ message: "Rok za prijavo potekel"});
    req.opozorila.push("Rok za prijavo je potekel");
  }
  
  req.placano = true;
  
  if(req.predmet.zaporedni_poskus_skupaj + 1 > 3)
  {
    req.placano = false;
  }
  else if(req.predmet.zaporedni_poskus_skupaj + 1 > 6)
  {
    if(!req.force)
      return res.status(400).json({ message: "Izpitov za ta predmet ne moreš več opravljati"});
    req.opozorila.push("Izpitov za ta predmet ne more več opravljati");
  }
  if(req.predmet.zaporedni_poskus +1 > 3)
  {
    if(!req.force)
      return res.status(400).json({ message: "Izpit za ta predmet si že opravljal 3x"});
    req.opozorila.push("Izpit za ta predmet je že opravljal 3x");
  }
  
  if(!req.polaganje) {
    req.izpit.polagalci.push({
      student: req.student,
      zaporedni_poskus: req.predmet.zaporedni_poskus + 1,
      zaporedni_poskus_skupaj: req.predmet.zaporedni_poskus_skupaj + 1,
      
      placano: req.placano,
    });
    
    callNext(req, res, next);
  }
  else {
    if(!req.polaganje.odjavljen) {
      if(!req.force)
        return res.status(400).json({ message: "Izbrani študent že prijavljen na izbran izpit"});
      req.opozorila.push("Izbrani študent že prijavljen na izbran predmet");
      req.predmet.zaporedni_poskus--;
      req.predmet.zaporedni_poskus_skupaj--;
    }
    
    req.polaganje.odjavljen = false;
    req.polaganje.odjavil = undefined;
    req.polaganje.cas_odjave = undefined;
    req.polaganje.zaporedni_poskus = req.predmet.zaporedni_poskus + 1;
    req.polaganje.zaporedni_poskus_skupaj = req.predmet.zaporedni_poskus_skupaj + 1;
    req.polaganje.placano = req.placano;
    
    callNext(req, res, next);
  }
}
function odjaviPolagalca(req, res, next) {
  if(!req.izpit)
    return callNext(req, res, next);
  
  if(req.danes > req.izpit.datum_izvajanja) {
    if(!req.force)
      return res.status(403).json({ message: "Rok za odjavo potekel"});
    req.opozorila.push("Rok za odjavo potekel");
  }
  
  if(!req.polaganje || req.polaganje.odjavljen) {
    return res.status(400).json({ message: "Izbrani študent ni prijavljen na izbran izpit"});
  }
  
  req.polaganje.odjavljen = true;
  req.polaganje.cas_odjave = Date.now();
  
  if(req.user && req.user.zaposlen)
    req.polaganje.odjavil = req.user.zaposlen;
  
  callNext(req, res, next);
}

function prijavaUspesna(req, res) {
  res.status(201).json({
    message: "Prijava na izpit uspešna",
    moraPlacati: !req.placano,
    opozorila: req.opozorila
  });
}
function odjavaUspesna(req, res) {
  res.status(201).json({
    message: "Odjava iz izpita uspešna",
    opozorila: req.opozorila
  });
}

function visajZaporedniPoskus(req, res, next) {
  req.predmet.zaporedni_poskus++;
  req.predmet.zaporedni_poskus_skupaj++;
  req.predmet.izpit = req.izpit;
  
  callNext(req, res, next);
}
function nizajZaporedniPoskus(req, res, next) {
  if(!req.izpit) {
    return callNext(req, res, next);
  }
  
  req.predmet.zaporedni_poskus--;
  req.predmet.zaporedni_poskus_skupaj--;
  req.predmet.izpit = undefined;
  req.predmet.ocena = -1;
  
  callNext(req, res, next);
}
function shraniStudenta(req, res, next) {
  req.student.save(function(err, student) {
    if(err || !student) {
      console.log("---shraniStudenta:\n" + err);
      return res.status(404).json({ message: "Napaka pri shranjevanju študenta"});
    }
    
    req.student = student;
    
    callNext(req, res, next);
  });
}
function shraniIzpit(req, res, next) {
  if(!req.izpit)
    return callNext(req, res, next);
  
  req.izpit.save(function(err, izpit) {
    if(err || !izpit) {
      return res.status(400).json({ message: "Napaka pri odstranjevanju izvajalca izpita" });
    }
    
    req.izpit = izpit;
    
    callNext(req, res, next);
  });
}

function pripraviDateDanes(req, res, next) {
  var cur = new Date(Date.now());
  req.danes = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 2);
  
  callNext(req, res, next);
}

function preveriIzvajalcaIzpita(req, res, next) {
  if(!req.izvajalec) {
    return res.status(404).json({ message: "Ne najdem izbranega izvajalca"});
  }
  
  for(var i = 0; i < req.izpit.izvajalci.length; i++) {
    if(req.izpit.izvajalci[i].equals(req.izvajalec)) {
      req.izvajaIzpit = true;
    }
  }
  
  callNext(req, res, next);
}
function dodajIzvajalcaIzpita(req, res, next) {
  if(req.izvajaIzpit) {
    return res.status(400).json({ message: "Ta izvajalec že izvaja izbran izpit"});
  }
  if(req.izpit.izvajalci.length >= 3) {
    return res.status(400).json({ message: "Izpit ima lahko največ 3 izvajalce" });
  }
  
  req.izpit.izvajalci.push(req.izvajalec);
  
  callNext(req, res, next);
}
function odstraniIzvajalcaIzpita(req, res, next) {
  if(!req.izvajaIzpit) {
    return res.status(400).json({ message: "Ta izvajalec ne izvaja izbranega izpita"});
  }
  
  req.izpit.izvajalci.pull(req.izvajalec);
  
  callNext(req, res, next);
}

function preveriPrijavljenNaDrugIzpit(req, res, next) {
  Izpit.findOne({
    predmet: req.izpit.predmet,
    studijsko_leto: req.izpit.studijsko_leto,
    polagalci: {
      $elemMatch: {
        student: req.student,
        odjavljen: false,
        ocena: {$lte: 0},
        valid: true
      }
    }
  }, function(err, izpit) {
    if(err) {
      console.log("---preveriPrijavljenNaDrugIzpit:\n" + err);
      return res.status(404).json({ message: "Napaka pri pridobivanju izpitov, na katere je že prijavljen"});
    }
    if(izpit) {
      if(!req.force)
        return res.status(400).json({ message: "Si že prijavljen na izpit za ta predmet,"});
      req.opozorila.push("Študent je že prijavljen na en drug izpit za ta predmet");
    }
    
    callNext(req, res, next);
  });
}
function preveriPretekloDovoljDni(req, res, next) {
  //  Preveri za prijavo, pri kateri še ni preteklo dovolj dni od zadnjega polaganja.
  var d = req.izpit.datum_izvajanja;
  
  Izpit.findOne({
    predmet: req.izpit.predmet,
    studijsko_leto: req.izpit.studijsko_leto,
    datum_izvajanja: {
      $gt: new Date(d.getFullYear(), d.getMonth(), d.getDate() - 10),
      $lt: d
    },
    polagalci: {
      $elemMatch: {
        student: req.student,
        valid: true,
        odjavljen: false,
        ocena: {$gte: 0}
      }
    }
  }, function(err, izpit) {
    if(err) {
      console.log("---preveriPretekloDovoljDni:\n" + err);
      return res.status(404).json({ message: "Napaka pri pridobivanju izpita preden je preteklo dovolj dni"});
    }
    
    if(izpit) {
      if(!req.force)
        return res.status(400).json({ message: "Ni še preteklo dovolj dni od prejšnjega polaganja izpita za ta predmet"});
      req.opozorila.push("Ni še preteklo dovolj dni od prejšnjega polaganja izpita za ta predmet");
    }
    
    callNext(req, res, next);
  });
}

// Vnos ocene
function vnesiOcenoPodIzpit(req, res, next) {
  if(req.body.ocena)
    req.polaganje.ocena = req.body.ocena;
  if(req.body.tock)
    req.polaganje.tock = req.body.tock;
  
  callNext(req, res, next);
}
function vnesiOcenoStudentu(req, res, next) {
  req.predmet.ocena = req.body.ocena;
  
  callNext(req, res, next);
}

function izberiStudijskoLeto(req, res, next) {
  StudijskoLeto.findOne({
    trenutno: true
  }, function(err, leto) {
    if(err || !leto)
    {
      console.log("---izberiStudijskoLeto:\n" + err);
      return res.status(404).json({ message: "Ne najdem trenutnega študijskega leta"});
    }
    
    req.leto = leto;
    
    callNext(req, res, next);
  });
}
function izberiPredmet(req, res, next) {
  for(var i = 0; i < req.student.studijska_leta_studenta.length; i++)
  {
    if(req.student.studijska_leta_studenta[i].studijsko_leto.equals(req.izpit.studijsko_leto))
    {
      var leto = req.student.studijska_leta_studenta[i];
      
      for(var j = 0; j < leto.predmeti.length; j++)
      {
        console.log("Primerjaj: " + leto.predmeti[i].predmet + " | " + req.izpit.predmet._id);
        if(leto.predmeti[i].predmet.equals(req.izpit.predmet._id))
        {
          req.predmet = leto.predmeti[i];
          break;
        }
      }
      break;
    }
  }
  
  if(!req.predmet)
    return res.status(404).json({message: "Študent v tem letu ne obiskuje tega predmeta"});
  
  callNext(req, res, next);
}

function najdiPrijavljenIzpit(req, res, next) {
  Izpit
    .findOne({
      predmet: req.izpit.predmet,
      studijsko_leto: req.izpit.studijsko_leto,
      polagalci: {
        $elemMatch: {
          student: req.student,
          odjavljen: false,
          ocena: {$lte: 0},
          valid: true
        }
      }
    })
    .populate("predmet studijsko_leto izvajalci polagalci.student")
    .exec(function(err, izpit) {
      if(err) {
        console.log("---preveriPrijavljenNaDrugIzpit:\n" + err);
        return res.status(404).json({ message: "Napaka pri pridobivanju izpitov, na katere je že prijavljen"});
      }
      
      req.izpit = izpit;
      
      callNext(req, res, next);
    });
}