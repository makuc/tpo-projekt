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
  if(!req.body || !req.body.predmet || !req.body.studijsko_leto || !req.body.datum_izvajanja || !req.body.izvedba_predmeta)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje izpitnega roka" });
  
  callNext(req, res, [
    validateDatumIzvedbe,
    validatePredmet, validateStudijskoLeto, validateIzvedboPredmeta,
    
    // Najdi izvajalce predmeta
    preveriIzvedboPredmeta,
    
    ustvariIzpit, vrniIzpit
  ]);
};
module.exports.editIzpit = function(req, res) {
  if(!req.body || (!req.body.datum_izvajanja && !req.body.lokacija && !req.body.izvedba_predmeta && !req.body.opombe)) {
    return res.status(400).json({ message: "Nobenega podatka izpita ne spreminjaš" });
  }
  
  req.sprememba = 1;
  
  callNext(req, res,[
    najdiIzpit, preveriLahkoUreja, validateDatumIzvedbe, preveriIzvedboPredmeta,
    
    // Popravi izpit
    nastaviSpremembo, shraniIzpit, preveriStrinjanje, spremeniIzpit,
    
    vrniIzpit
  ]);
};
module.exports.delIzpit = function(req, res) {
  
  req.sprememba = 2;
  
  callNext(req, res, [ najdiIzpit, preveriLahkoUreja, nastaviSpremembo, shraniIzpit, preveriStrinjanje, spremeniIzpit, vrniIzpit ]);
};
module.exports.potrdiSpremembo = function(req, res) {
  callNext(req, res, [
    najdiIzpit, najdiStudentaId, najdiPolaganje, potrdiStrinjanje, preveriStrinjanje, spremeniIzpit, vrniIzpit
  ]);
};

module.exports.pridobiZahtevke = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, pripraviDateDanes, najdiNeopravljenePredmete, najdiAktualneSpremembe, vrniIzpite
  ]);
};

// Prijave in odjave na izpite
module.exports.getMozneIzpiteStudenta = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, pripraviDateDanes, najdiNeopravljenePredmete, najdiMozneIzpiteStudenta, filtrirajPolaganja, vrniIzpite
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
    preveriPrijavljenNaDrugIzpit, preveriPretekloDovoljDni, dodajPolagalca, visajZaporedniPoskus, shraniIzpit, shraniStudenta,
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
  if(req.izpit) {
    callNext(req, res, next);
    return;
  }
  
  Izpit
    .findById(req.params.izpit_id)
    .populate("predmet studijsko_leto izvajalci polagalci.student")
    .exec(function(err, izpit) {
      if(err || !izpit) {
        return res.status(404).json({ message: "Ne najdem zelenega izpita" });
      }
      
      req.izpit = izpit;
      req.predmet = izpit.predmet;
      
      callNext(req, res, next);
    });
}
function ustvariIzpit(req, res, next) {
  Izpit.create({
    predmet: req.predmet,
    studijsko_leto: req.studijskoLeto,
    datum_izvajanja: req.datumIzvajanja,
    
    lokacija: req.body.lokacija,
    opombe: req.body.opombe,
    
    izvajalci: req.izvedba.izvajalci
  }, function(err, izpit) {
    if(err) {
      console.log(err);
      return res.status(400).send({ message: "Nepravilni podatki" });
    }
    
    req.izpit = izpit;
    
    callNext(req, res, next);
  });
}
function nastaviSpremembo(req, res, next) {
  req.izpit.obdelava = true;
  req.izpit.sprememba = req.sprememba;
  
  
  if(req.body.datum_izvajanja) {
    if(req.datumIzvajanja < req.izpit.datum_izvajanja)
      return res.status(400).json({ message: "Izpitni datum se lahko spremeni samo na kasnejsi datum" });
    
    req.izpit.datum_izvajanja = req.datumIzvajanja;
  }
  
  var izvajalci, datumIzvajanja;
  if(req.izvedba)
    izvajalci = req.izvedba.izvajalci;
  if(req.datumIzvajanja)
    datumIzvajanja = req.datumIzvajanja;
  
  req.izpit.spremembe = {
    datum_izvajanja: datumIzvajanja,
    izvajalci: izvajalci,
    opombe: req.body.opombe,
    lokacija: req.body.lokacija
  };
  
  if(req.user)
    req.izpit.spremenil = req.user.zaposlen;
  
  for(var i = 0; i < req.izpit.polagalci.length; i++)
  {
    // Ponastavi soglasja vseh študentov
    req.izpit.polagalci[i].strinjanje = false;
  }
  
  callNext(req, res, next);
}
function spremeniIzpit(req, res, next) {
  if(!req.odobritev)
  {
    callNext(req, res, next);
  }
  else if(req.izpit.sprememba == 1)
  {
    req.izpit.obdelava = false;
    next.unshift(shraniIzpit);
    urediIzpit(req, res, next);
  }
  else
  {
    izbrisiIzpit(req, res, next);
  }
}
function urediIzpit(req, res, next) {
  if(req.izpit.spremembe.datum_izvajanja)
    req.izpit.datum_izvajanja = req.izpit.spremembe.datum_izvajanja;
    
  if(req.izpit.spremembe.opombe)
    req.izpit.opombe = req.izpit.spremembe.opombe;
  
  if(req.izpit.spremembe.izvajalci)
    req.izpit.izvajalci = req.izvedba.izvajalci;
  
  if(req.izpit.spremembe.lokacija)
    req.izpit.lokacija = req.izpit.spremembe.lokacija;
  
  req.izpit.spremembe.opombe = undefined;
  req.izpit.spremembe.izvajalci = undefined;
  req.izpit.spremembe.lokacija = undefined;
  req.izpit.spremembe.datum_izvajanja = undefined;
  
  callNext(req, res, next);
}
function izbrisiIzpit(req, res, next) {
  if(next)
  {
    req.myNext = next;
    req.force = true;
    req.opozorila = [];
    req.polagalci = req.izpit.polagalci.slice(0);
  }
  
  if(req.polagalci.length > 0)
  {
    // Odjavi vse študente !!!
    var polagalec;
    
    do {
      polagalec = req.izpit.polagalci.pop();
    }
    while(polagalec.odjavljen && req.polagalci.length > 0);
    
    if(!polagalec.odjavljen)
    {
      req.student = polagalec.student;
      
      callNext(req, res, [
        pripraviDateDanes, najdiNeopravljenePredmete, najdiStudentovPredmet, najdiPolaganje, odjaviPolagalca,
        nizajZaporedniPoskus, shraniIzpit, shraniStudenta
      ]);
    }
    else
    {
      izbrisiIzpit(req, res);
    }
  }
  else
  {
    req.opozorila = undefined;
    req.izpit.remove(function(err, izpit) {
      if(err) {
        //console.log(err);
        return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju izpita" });
      }
      req.izpit = undefined;
      
      next = req.myNext;
      req.myNext = undefined;
      
      callNext(req, res, next);
    });
  }
}
function vrniIzpit(req, res) {
  console.log("--vrniIzpit");
  res.status(200).json(req.izpit);
}

function potrdiStrinjanje(req, res, next) {
  if(req.polaganje)
  {
    req.polaganje.strinjanje = true;
  }
  
  callNext(req, res, next);
}
function preveriStrinjanje(req, res, next) {
  req.odobritev = true;
  
  for(var i = 0; i < req.izpit.polagalci.length; i++)
  {
    var polaganje = req.izpit.polagalci[i];
    if(!polaganje.odjavljen)
    {
      // Študent je prijavljen
      if(!polaganje.strinjanje)
        req.odobritev = false;
    }
  }
  
  callNext(req, res, next);
}
function najdiAktualneSpremembe(req, res, next) {
  var predmeti = [];
  for(var i = 0; i < req.neopravljeniPredmeti.length; i++) {
    predmeti.push(req.neopravljeniPredmeti[i].predmet);
  }
  
  Izpit
    .find({
      predmet: { $in: predmeti },
      datum_izvajanja: { $gt: new Date(Date.now()) },
      obdelava: true,
      polagalci: {
        $elemMatch: {
          student: req.student,
          odjavljen: false
        }
      }
    })
    .populate()
    .exec(function(err, izpiti) {
      if(err || !izpiti)
      {
        console.log("---najdiAktualneSpremembe:\n" + err);
        return res.status(404).json({ message: "Ne najdem nobenih obvestil"});
      }
      
      var izp = [];
      
      for(var i = 0; i < izpiti.length; i++)
      {
        var izpit = izpiti[i].toObject();
        izpit.polagalci = undefined;
        
        izp.push(izpit);
      }
      
      req.izpiti = izp;
      
      callNext(req, res, next);
    });
}
function preveriLahkoUreja(req, res, next) {
  for(var i = 0; i < req.izpit.polagalci.length; i++)
  {
    // Preveri za vse polagalce
    var polagalec = req.izpit.polagalci[i];
    if(polagalec.tock > 0 || polagalec.ocena > 0 || polagalec.koncna_ocena > 0)
    {
      return res.status(404).json({ message: "Izpit ima že vnešene ocene, urejanje prepovedano"});
    }
  }
  
  callNext(req, res, next);
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
  if(req.body.datum_izvajanja)
  {
    req.datumIzvajanja = new Date(req.body.datum_izvajanja);
    
    //console.log(req.datumIzvajanja);
    //console.log(req.datumIzvajanja.getDay());
    
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
    
  }
  
  callNext(req, res, next);
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
          valid: true,
          polagalci: {
            $elemMatch: {
              student: req.student,
              koncna_ocena: {$lte: 0}
            }
          }
        },
        {
          predmet: { $in: predmeti },
          datum_izvajanja: { $gt: req.danes },
          valid: true,
          "polagalci.student": {$ne: req.student._id}
        },
        {
          predmet: { $in: predmeti },
          valid: true,
          polagalci: {
            $elemMatch: {
              student: req.student,
              ocena: {$lte: 0},
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
function filtrirajPolaganja(req, res, next) {
  console.log("--filtrirajPolaganja");
  var izpiti = [];
  while(req.izpiti.length > 0)
  {
    var izpit = req.izpiti.shift().toObject();
    var polaganje = undefined;
    for(var i = 0; i < izpit.polagalci.length; i++)
    {
      // Obdelaj vse polagalce
      if(req.student._id.equals(izpit.polagalci[i].student) && !izpit.polagalci[i].odjavljen)
      {
        polaganje = izpit.polagalci[i];
        break;
      }
    }
    
    if(polaganje)
    {
      // To je veljavno polaganje tega študenta
      izpit.polagalci = [ polaganje ];
      izpit.prijavljen = true;
    }
    else
    {
      izpit.polagalci = [];
      izpit.prijavljen = false;
    }
    izpiti.push(izpit);
  }
  
  req.izpiti = izpiti;
  
  callNext(req, res, next);
}

function najdiStudentovPredmet(req, res, next) {
  for(var i = 0; i < req.neopravljeniPredmeti.length; i++) {
    if(req.neopravljeniPredmeti[i].predmet.equals(req.izpit.predmet._id)) {
      //console.log("Najden!");
      
      req.predmet = req.neopravljeniPredmeti[i];
      
      callNext(req, res, next);
      return;
    }
  }
  
  res.status(404).json({ message: "Ta študent je ta predmet že opravil!"});
}

function najdiPolaganje(req, res, next) {
  console.log("--najdiPolaganje");
  if(!req.izpit) {
    callNext(req, res, next);
    return;
  }
  
  for(var i = 0; i < req.izpit.polagalci.length; i++) {
    if(req.izpit.polagalci[i].student._id.equals(req.student._id) && !req.izpit.polagalci[i].odjavljen)
    {
      req.polaganje = req.izpit.polagalci[i];
      break;
    }
  }
  
  callNext(req, res, next);
}

function dodajPolagalca(req, res, next) {
  console.log("--dodajPolagalca");
  if(!req.polaganje) {
    
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
    
    req.izpit.polagalci.push({
      student: req.student,
      zaporedni_poskus: req.predmet.zaporedni_poskus + 1,
      zaporedni_poskus_skupaj: req.predmet.zaporedni_poskus_skupaj + 1,
      
      placano: req.placano,
    });
  }
  
  callNext(req, res, next);
}
function odjaviPolagalca(req, res, next) {
  if(!req.izpit) {
    callNext(req, res, next);
    return
  }
  
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
  req.polaganje.tock = -1;
  req.polaganje.ocena = -1;
  req.polaganje.koncna_ocena = -1;
  
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
  console.log("--visajZaporedniPoskus");
  
  req.predmet.zaporedni_poskus++;
  req.predmet.zaporedni_poskus_skupaj++;
  req.predmet.izpit = req.izpit;
  
  callNext(req, res, next);
}
function nizajZaporedniPoskus(req, res, next) {
  if(!req.izpit) {
    callNext(req, res, next);
    return;
  }
  
  req.predmet.zaporedni_poskus--;
  req.predmet.zaporedni_poskus_skupaj--;
  req.predmet.izpit = undefined;
  req.predmet.ocena = -1;
  
  callNext(req, res, next);
}
function shraniStudenta(req, res, next) {
  console.log("--shraniStudenta");
  
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
  console.log("--shraniIzpit");
  if(!req.izpit) {
    callNext(req, res, next);
    return;
  }
  
  req.izpit.save(function(err, izpit) {
    if(err || !izpit) {
      console.log("---shraniIzpit:\n" + err);
      return res.status(400).json({ message: "Napaka pri spreminjanju izpita" });
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
  console.log("--vnesiOcenoPodIzpit");
  
  if(req.body.ocena)
  {
    req.body.ocena = parseInt(req.body.ocena, 10);
    if(req.body.ocena > 100 || req.body.ocena < 0)
      return res.status(400).json({ message: "Ocena pisnega izpita mora biti med 0 in 10"});
    
    req.polaganje.ocena = req.body.ocena;
  }
  if(req.body.tock)
  {
    req.body.tock = parseInt(req.body.tock, 10);
    if(req.body.tock > 100 || req.body.tock < 0)
      return res.status(400).json({ message: "Točke pisnega izpita morajo biti med 0 in 100"});
    
    req.polaganje.tock = req.body.tock;
  }
  if(req.body.koncna_ocena)
  {
    req.body.koncna_ocena = parseInt(req.body.koncna_ocena, 10);
    if(req.body.koncna_ocena > 10 || req.body.koncna_ocena < 0)
      return res.status(400).json({ message: "Končna ocena predmeta mora biti med 0 in 10"});
    
    req.polaganje.koncna_ocena = req.body.koncna_ocena;
  }
  
  callNext(req, res, next);
}
function vnesiOcenoStudentu(req, res, next) {
  console.log("--vnesiOcenoStudentu");
  
  req.predmet.ocena = req.body.koncna_ocena;
  
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

function preveriIzvedboPredmeta(req, res, next) {
  if(!req.body || !req.body.izvedba_predmeta)
  {
    callNext(req, res, next);
  }
  else
  {
    req.izvedba = req.predmet.izvedbe_predmeta.id(req.body.izvedba_predmeta);
    
    if(!req.izvedba)
    {
      return res.status(404).json({ message: "Ne najdem izbrane izvedbe predmeta za ta predmet"});
    }
    
    callNext(req, res, next);
  }
}