let mongoose = require("mongoose");
let callNext = require("./_include/callNext");

let Predmet = mongoose.model('Predmet');
let StudijskoLeto = mongoose.model('StudijskoLeto');
let Zaposlen = mongoose.model('Zaposlen');
let Izpit = mongoose.model('Izpit');
let Student = mongoose.model('Student');

let debug = require("debug")("izpit");


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
  callNext(req, res, [ najdiIzpit, filtrirajPolagalce, vrniIzpit ]);
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
    res.status(400).json({ message: "Nobenega podatka izpita ne spreminjaš" });
  }
  else
  {
    req.sprememba = 1;
    
    callNext(req, res,[
      najdiIzpit, preveriLahkoUreja, validateDatumIzvedbe, preveriIzvedboPredmeta,
      
      // Popravi izpit
      nastaviSpremembo, shraniIzpit, preveriStrinjanje, spremeniIzpit,
      
      vrniIzpit
    ]);
  }
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
module.exports.pocistiSpremembo = function(req, res) {
  callNext(req, res,[
    najdiIzpit,
    
    // Popravi izpit
    pocistiSpremembo, shraniIzpit,
    
    vrniIzpit
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
module.exports.getMozneIzpiteStudentaReferentka = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, pripraviDateDanes, najdiNeopravljenePredmete, najdiMozneIzpiteStudentaReferentka, filtrirajPolaganja, vrniIzpite
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
    res.status(400).json({ message: "Ni izbranega študenta za prijavo"});
  }
  else
  {
    req.force = true;
    req.opozorila = "<ul>";
    
    callNext(req, res, [
      // Odjavi predhodne prijave
      najdiIzpit, najdiStudentaId, izberiPredmet, najdiPrijavljenIzpit, najdiPolaganje, odjaviPolagalca, nizajZaporedniPoskus, shraniIzpit, shraniStudenta,
      
      // Opravi prijavo
      najdiIzpit, pripraviDateDanes, najdiNeopravljenePredmete, najdiStudentovPredmet,
      preveriPrijavljenNaDrugIzpit, preveriPretekloDovoljDni, dodajPolagalca, visajZaporedniPoskus, shraniIzpit, shraniStudenta,
      prijavaUspesna
    ]);
  }
};
module.exports.odjavaIzIzpitaForce = function(req, res) {
  req.force = true;
  req.opozorila = "<ul>";
  
  callNext(req, res, [
    najdiIzpit, najdiStudentaId, pripraviDateDanes, najdiNeopravljenePredmete, najdiStudentovPredmet, najdiPolaganje, odjaviPolagalca,
    nizajZaporedniPoskus, shraniIzpit, shraniStudenta,
    odjavaUspesna
  ]);
};

// Vnos ocen
module.exports.addOcenoStudentu = function(req, res) {
  if(!req.body || (!req.body.tock && !req.body.koncna_ocena))
  {
    return res.status(400).json({ message: "Ni vnešene oceno, ki jo želiš vnesti"});
  }
  req.force = true;
  req.opozorila = "";
  
  callNext(req, res, [
    najdiIzpit, preveriDatumDodajanja, najdiStudentaId, izberiPredmet,
    najdiPolaganje, vnesiOcenoPodIzpit, vnesiOcenoStudentu,
    
    // Shrani spremembe
    shraniIzpit, shraniStudenta, vrniIzpit
  ]);
};
module.exports.individualniVnosOcene = function(req, res) {
  if(!req.body || !req.body.studijsko_leto || !req.body.predmet || !req.body.datum_izvajanja || !req.body.izvedba_predmeta)
  {
    res.status(400).json({ message: "Ni dovolj podatkov za individualni vnos ocene"});
  }
  else if(!req.body.koncna_ocena)
  {
    res.status(400).json({ message: "Ni vnešene končne ocene izpita"});
  }
  else
  {
    debug("Izvedi: Individualni vnos ocene");
    
    debug(req.body);
    
    req.force = true;
    req.opozorila = "";
    
    validateStudijskoLeto(req, res, [
      validatePredmet, duplPredmet, validateDatumIzvedbe, validateIzvedboPredmeta, preveriIzvedboPredmeta,
      najdiStudentaId,
      studentovPredmet,
      
      // Preveri, če je že opravil izpit pozitivno
      najdiOpravljanIzpit, obdelajPrijavoNaIzpit,
      
      // Dodaj izpitni rok...
      validatePredmet, validateDatumIzvedbe, validateIzvedboPredmeta, preveriIzvedboPredmeta,
      narediCustomIzpit, najdiPolaganje,
      
      // Prijavi polagalca
      studentovPredmet,
      
      // Shrani oceno
      najdiPolaganje, vnesiOcenoPodIzpit, vnesiOcenoStudentu,
      
      // Prijavi na prejsnji izpit, ce je njegova prijava nedotakljiva!
      najdiPolaganjePrejsnje, nastaviPolaganja,
      
      // Shrani spremembe
      shraniIzpit, shraniPrejsnjiIzpit, shraniStudenta, ocenaDodana
    ]);
  }
};

/* Funkcije */
function najdiVseIzpiteStudijskoLeto(req, res, next) {
  Izpit
    .find({
      valid: true,
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
      valid: true,
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
      valid: true,
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
  debug("--najdiIzpit");
  Izpit
    .findById(req.params.izpit_id)
    .populate("predmet studijsko_leto izvajalci polagalci.student")
    .exec(function(err, izpit) {
      if(err || !izpit) {
        res.status(404).json({ message: "Ne najdem zelenega izpita" });
      }
      else
      {
        req.izpit = izpit;
        req.predmet = izpit.predmet;
        
        callNext(req, res, next);
      }
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
      debug("--ustvariIzpit" + err);
      res.status(400).send({ message: "Nepravilni podatki" });
    }
    else
    {
      req.izpit = izpit;
      
      callNext(req, res, next);
    }
  });
}
function nastaviSpremembo(req, res, next) {
  if(req.sprememba == 1)
  {
    if(req.datumIzvajanja)
    {
      var newDate = new Date(req.datumIzvajanja.getFullYear(), req.datumIzvajanja.getMonth(), req.datumIzvajanja.getDate());
      var oldDate = new Date(req.izpit.datum_izvajanja.getFullYear(), req.izpit.datum_izvajanja.getMonth(), req.izpit.datum_izvajanja.getDate());
    } 
    
    if(req.body.datum_izvajanja && newDate < oldDate)
    {
      res.status(400).json({ message: "Datum izpita se ne more zamakniti nazaj" });
    }
    else
    {
      var sprememba = false;
      
      var izvajalci, datumIzvajanja;
      if(req.izvedba)
      {
        izvajalci = req.izvedba.izvajalci;
        sprememba = true;
      }
      if(req.datumIzvajanja)
      {
        if(newDate.getTime() == oldDate.getTime())
        {
          debug("Same date");
          req.izpit.datum_izvajanja = req.datumIzvajanja;
        }
        else
        {
          datumIzvajanja = req.datumIzvajanja;
          sprememba = true;
        }
      }
      
      if(sprememba)
      {
        req.izpit.obdelava = true;
        req.izpit.sprememba = req.sprememba;
        
        
        req.izpit.spremembe = {
          datum_izvajanja: datumIzvajanja,
          izvajalci: izvajalci,
          opombe: req.body.opombe,
          lokacija: req.body.lokacija
        };
        
        for(var i = 0; i < req.izpit.polagalci.length; i++)
        {
          // Ponastavi soglasja vseh študentov
          req.izpit.polagalci[i].strinjanje = false;
        }
        
      }
      else
      {
        if(req.body.opombe)
          req.izpit.opombe = req.body.opombe;
        if(req.body.lokacija)
          req.izpit.lokacija = req.body.lokacija;
      }
      
      if(req.user)
        req.izpit.spremenil = req.user.zaposlen;
      
      callNext(req, res, next);
    }
  }
  else
  {
    req.izpit.obdelava = true;
    req.izpit.sprememba = req.sprememba;
    
    for(var i = 0; i < req.izpit.polagalci.length; i++)
    {
      // Ponastavi soglasja vseh študentov
      req.izpit.polagalci[i].strinjanje = false;
    }
    
    if(req.user)
      req.izpit.spremenil = req.user.zaposlen;
    
    callNext(req, res, next);
  }
}
function spremeniIzpit(req, res, next) {
  if(!req.odobritev)
  {
    callNext(req, res, next);
  }
  else if(req.izpit.sprememba == 1)
  {
    req.izpit.obdelava = false;
    req.izpit.sprememba = 0;
    next.unshift(shraniIzpit);
    urediIzpit(req, res, next);
  }
  else if(req.izpit.sprememba == 2)
  {
    izbrisiIzpit(req, res, next);
  }
  else
  {
    callNext(req, res, next);
  }
}
function urediIzpit(req, res, next) {
  if(req.izpit.sprememba == 0)
  {
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
  }
  
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
      polagalec = req.polagalci.pop();
    }
    while(polagalec.odjavljen && req.polagalci.length > 0);
    
    if(!polagalec.odjavljen)
    {
      req.student = polagalec.student;
      
      callNext(req, res, [
        pripraviDateDanes, najdiNeopravljenePredmete, najdiStudentovPredmet, najdiPolaganje, odjaviPolagalca,
        nizajZaporedniPoskus, shraniIzpit, shraniStudenta, izbrisiIzpit
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
        debug(err);
        res.status(400).json({ message: "Nekaj šlo narobe pri brisanju izpita" });
      }
      else
      {
        req.izpit = undefined;
        
        next = req.myNext;
        req.myNext = undefined;
        
        callNext(req, res, next);
      }
    });
  }
}
function pocistiSpremembo(req, res, next) {
  req.izpit.spremembe.opombe = undefined;
  req.izpit.spremembe.izvajalci = undefined;
  req.izpit.spremembe.lokacija = undefined;
  req.izpit.spremembe.datum_izvajanja = undefined;
  req.izpit.obdelava = false;
  req.izpit.spremenil = undefined;
  
  for(var i = 0; i < req.izpit.polagalci.length; i++)
  {
    req.izpit.polagalci[i].strinjanje = false;
  }
  
  callNext(req, res, next);
}
function vrniIzpit(req, res) {
  debug("--vrniIzpit");
  res.status(200).send(req.izpit);
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
    .populate("predmet")
    .exec(function(err, izpiti) {
      if(err || !izpiti)
      {
        debug("---najdiAktualneSpremembe:\n" + err);
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
    if(polagalec.tock > 0 || polagalec.koncna_ocena > 0)
    {
      return res.status(404).json({ message: "Izpit ima že vnešene ocene, urejanje prepovedano"});
    }
  }
  
  callNext(req, res, next);
}

// Funkcije za upravljanje
function validateStudijskoLeto(req, res, next) {
  debug("--validateStudijskoLeto");
  var studijsko_leto = req.params.studijskoLeto_id || req.body.studijsko_leto;
  
  StudijskoLeto.findById(studijsko_leto, function(err, studijskoLeto) {
    if(err || !studijskoLeto) {
      debug("---validateStudijskoLeto" + err);
      res.status(404).json({ message: "Izbrano študijsko leto ne obstaja" });
    }
    else
    {
      req.studijskoLeto = studijskoLeto;
      
      callNext(req, res, next);
    }
  });
}
function validatePredmet(req, res, next) {
  debug("--validatePredmet");
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
        res.status(404).json({ message: "Ne najdem želenega predmeta" });
      }
      else
      {
        req.predmet = predmet;
        
        callNext(req, res, next);
      }
    });
}
function validateIzvedboPredmeta(req, res, next) {
  debug("--validateIzvedboPredmeta");
  req.myNext = next;
  
  callNext(req, res, [ najdiIzvedboPredmeta, validIzvedbaPredmeta ]);
}
function najdiIzvedboPredmeta(req, res, next) {
  debug("--najdiIzvedboPredmeta");
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
  debug("--validIzvedbaPredmeta");
  if(!req.izvedbaPredmeta)
  {
    res.status(400).json({ message: "Predmet se v tem solskem letu se ne izvaja" });
  }
  else
  {
    next = req.myNext;
    req.myNext = undefined;
    
    callNext(req, res, next);
  }
}

function validateDatumIzvedbe(req, res, next) {
  debug("--validateDatumIzvedbe");
  
  if(req.body.datum_izvajanja)
  {
    req.datumIzvajanja = new Date(req.body.datum_izvajanja);
    
    //console.log(req.datumIzvajanja);
    //console.log(req.datumIzvajanja.getDay());
    
    if(req.datumIzvajanja.getDay() == 0 || req.datumIzvajanja.getDay() == 6)
    {
      res.status(400).json({ message: "Izpit se ne more izvajati na vikend" });
    }
    else
    {
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
      {
        res.status(400).json({ message: "Izpit se ne more izvajati na praznik ali dela prost dan" });
      }
      else
        callNext(req, res, next);
    }
  }
  else
    callNext(req, res, next);
}

// Prijave/odjave na izpit
function najdiStudentaId(req, res, next) {
  debug("--najdiStudentaId");
  
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
        debug(err);
        res.status(404).json({ message: "Ne najdem izbranega študenta"});
      }
      else
      {
        req.student = student;
        
        callNext(req, res, next);
      }
    });
}
function najdiNeopravljenePredmete(req, res, next) {
  debug("--najdiNeopravljenePredmete");
  req.neopravljeniPredmeti = [];
  
  req.studijskoLeto = req.student.studijska_leta_studenta[req.student.studijska_leta_studenta.length - 1];
  
  if(!req.studijskoLeto) {
    res.status(404).json({ message: "Izbrani študent nima veljavnih študijskih let"});
  }
  else
  {
    for(var i = 0; i < req.studijskoLeto.predmeti.length; i++) {
      if(req.studijskoLeto.predmeti[i].ocena <= 5) {
        req.neopravljeniPredmeti.push(req.studijskoLeto.predmeti[i]);
      }
    }
    
    //debug(req.neopravljeniPredmeti);
    
    callNext(req, res, next);
  }
}
function najdiMozneIzpiteStudentaReferentka(req, res, next) {
  var predmeti = [];
  for(var i = 0; i < req.neopravljeniPredmeti.length; i++) {
    predmeti.push(req.neopravljeniPredmeti[i].predmet);
  }
  
  var zacDatum = new Date();
  zacDatum = zacDatum.setMonth(zacDatum.getMonth() -6);
  Izpit
    .find({
      $or: [
        {
          predmet: { $in: predmeti },
          datum_izvajanja: { $gt: zacDatum },
          valid: true,
          polagalci: {
            $elemMatch: {
              student: req.student,
              odjavljen: false,
              koncna_ocena: {$lte: 0}
            }
          }
        },
        {
          predmet: { $in: predmeti },
          datum_izvajanja: { $gt: zacDatum },
          valid: true,
          polagalci: {
            $not: {
              $elemMatch: {
                student: req.student,
                odjavljen: false,
                koncna_ocena: {$gt: 0}
              }
            }
          }
        },
        {
          predmet: { $in: predmeti },
          valid: true,
          polagalci: {
            $elemMatch: {
              student: req.student,
              koncna_ocena: {$lte: 0},
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
        debug("---najdiMozneIzpiteStudentaReferentka" + err);
        res.status(404).json({ message: "Napaka pri pridobivanju izpitov"});
      }
      else
      {
        req.izpiti = izpiti;
        
        callNext(req, res, next);
      }
    });
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
          datum_izvajanja: { $gt: new Date() },
          valid: true,
          polagalci: {
            $elemMatch: {
              student: req.student,
              odjavljen: false,
              koncna_ocena: {$lte: 0}
            }
          }
        },
        {
          predmet: { $in: predmeti },
          datum_izvajanja: { $gt: new Date() },
          valid: true,
          polagalci: {
            $not: {
              $elemMatch: {
                student: req.student,
                odjavljen: false,
                koncna_ocena: {$gt: 0}
              }
            }
          }
        },
        {
          predmet: { $in: predmeti },
          valid: true,
          polagalci: {
            $elemMatch: {
              student: req.student,
              koncna_ocena: {$lte: 0},
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
        debug("---najdiMozneIzpiteStudenta" + err);
        res.status(404).json({ message: "Napaka pri pridobivanju izpitov"});
      }
      else
      {
        req.izpiti = izpiti;
        
        callNext(req, res, next);
      }
    });
}
function filtrirajPolaganja(req, res, next) {
  debug("--filtrirajPolaganja");
  
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
function filtrirajPolagalce(req, res, next) {
  debug("--filtrirajPolagalce");
  
  if(req.izpit)
  {
    req.izpit = req.izpit.toObject();
    
    for(var i = 0; i < req.izpit.polagalci.length; i++)
    {
      var polaganje = req.izpit.polagalci[i];
      if(polaganje.odjavljen == true)
      {
        req.izpit.polagalci.splice(i, 1);
        i--;
      }
    }
  }
  callNext(req, res, next);
}

function najdiStudentovPredmet(req, res, next) {
  debug("--najdiStudentovPredmet");
  
  for(var i = 0; i < req.neopravljeniPredmeti.length; i++) {
    if(req.neopravljeniPredmeti[i].predmet.equals(req.izpit.predmet._id)) {
      //console.log("Najden!");
      
      req.predmet = req.neopravljeniPredmeti[i];
      break;
    }
  }
  
  if(req.predmet) {
    callNext(req, res, next);
  }
  else
    res.status(404).json({ message: "Ta študent je ta predmet že opravil!"});
}

function najdiPolaganje(req, res, next) {
  debug("--najdiPolaganje");
  
  if(!req.izpit) {
    callNext(req, res, next);
  }
  else
  {
    for(var i = 0; i < req.izpit.polagalci.length; i++) {
      if(req.izpit.polagalci[i].student._id.equals(req.student._id) && !req.izpit.polagalci[i].odjavljen)
      {
        req.polaganje = req.izpit.polagalci[i];
        break;
      }
    }
    
    callNext(req, res, next);
  }
}

function dodajPolagalca(req, res, next) {
  debug("--dodajPolagalca");
  
  if(req.danes > req.izpit.datum_izvajanja && !req.force) {
    res.status(403).json({ message: "Rok za prijavo potekel"});
  }
  else
  {
    if(req.danes > req.izpit.datum_izvajanja)
      req.opozorila += "<li>Rok za prijavo je potekel</li>";
    
    req.placano = true;
    
    
    if(req.predmet.zaporedni_poskus_skupaj + 1 > 6 && !req.force)
    {
      res.status(400).json({ message: "Izpitov za ta predmet ne moreš več opravljati"});
    }
    else
    {
      if(req.predmet.zaporedni_poskus_skupaj +1 > 6)
        req.opozorila += "<li>Izpitov za ta predmet ne more več opravljati</li>";
      
      if(req.predmet.zaporedni_poskus_skupaj + 1 > 3)
        req.placano = false;
      
      
      if(req.predmet.zaporedni_poskus +1 > 3 && !req.force)
      {
        res.status(400).json({ message: "Izpit za ta predmet si že opravljal 3x"});
      }
      else
      {
        if(req.predmet.zaporedni_poskus +1 > 3)
          req.opozorila += "<li>Izpit za ta predmet je že opravljal 3x</li>";
        
        
        req.izpit.polagalci.push({
          student: req.student,
          zaporedni_poskus: req.predmet.zaporedni_poskus + 1,
          zaporedni_poskus_skupaj: req.predmet.zaporedni_poskus_skupaj + 1,
          
          placano: req.placano,
        });
        
        callNext(req, res, next);
      }
      
    }
  }
}
function odjaviPolagalca(req, res, next) {
  debug("--odjaviPolagalca");
  
  if(!req.izpit) {
    callNext(req, res, next);
  }
  else
  {
    if(req.danes > req.izpit.datum_izvajanja && !req.force)
    {
      res.status(403).json({ message: "Rok za odjavo potekel"});
    }
    else
    {
      if(req.danes > req.izpit.datum_izvajanja)
        req.opozorila += "<li>Rok za odjavo potekel</li>";
      
      if(!req.polaganje || req.polaganje.odjavljen) {
        res.status(400).json({ message: "Izbrani študent ni prijavljen na izbran izpit"});
      }
      else
      {
        req.polaganje.odjavljen = true;
        req.polaganje.cas_odjave = Date.now();
        req.polaganje.tock = -1;
        req.polaganje.koncna_ocena = -1;
        
        if(req.user && req.user.zaposlen)
          req.polaganje.odjavil = req.user.zaposlen;
        
        debug("Polagalec odjavljen");
        
        callNext(req, res, next);
      }
    }
  }
}

function prijavaUspesna(req, res) {
  if(req.opozorila)
  {
    if(req.opozorila == "<ul>")
      req.opozorila = undefined;
    else
      req.opozorila += "</ul>";
  }
  var message = "Prijava na izpit uspešna";
  if(req.opozorila)
    message = req.opozorila;
  
  res.status(201).json({
    message: message,
    moraPlacati: !req.placano
  });
}
function odjavaUspesna(req, res) {
  if(req.opozorila)
  {
    if(req.opozorila == "<ul>")
      req.opozorila = undefined;
    else
      req.opozorila += "</ul>";
  }
  
  var message = "Odjava iz izpita uspešna";
  if(req.opozorila)
    message = req.opozorila;
  
  res.status(201).json({
    message: message,
    opozorila: req.opozorila
  });
}

function visajZaporedniPoskus(req, res, next) {
  debug("--visajZaporedniPoskus");
  
  req.predmet.zaporedni_poskus++;
  req.predmet.zaporedni_poskus_skupaj++;
  req.predmet.izpit = req.izpit;
  
  callNext(req, res, next);
}
function nizajZaporedniPoskus(req, res, next) {
  debug("--nizajZaporedniPoskus");
  
  if(req.izpit) {
    req.predmet.zaporedni_poskus--;
    req.predmet.zaporedni_poskus_skupaj--;
    
    req.predmet.izpit = undefined;
    req.predmet.ocena = -1;
  }
  callNext(req, res, next);
}
function shraniStudenta(req, res, next) {
  debug("--shraniStudenta");
  
  req.student.save(function(err, student) {
    if(err || !student) {
      debug("---shraniStudenta:\n" + err);
      res.status(404).json({ message: "Napaka pri shranjevanju študenta"});
    }
    else
    {
      req.student = student;
      
      callNext(req, res, next);
    }
  });
}
function shraniIzpit(req, res, next) {
  debug("--shraniIzpit");
  if(!req.izpit) {
    callNext(req, res, next);
  }
  else
  {
    req.izpit.save(function(err, izpit) {
      if(err || !izpit) {
        debug("---shraniIzpit:\n" + err);
        res.status(400).json({ message: "Napaka pri spreminjanju izpita" });
      }
      else
      {
        req.izpit = izpit;
        
        callNext(req, res, next);
      }
    });
  }
}

function pripraviDateDanes(req, res, next) {
  debug("--pripraviDateDanes");
  var cur = new Date();
  req.danes = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 2);
  
  callNext(req, res, next);
}

function preveriPrijavljenNaDrugIzpit(req, res, next) {
  debug("--preveriPrijavljenNaDrugIzpit");
  Izpit.findOne({
    predmet: req.izpit.predmet,
    studijsko_leto: req.izpit.studijsko_leto,
    polagalci: {
      $elemMatch: {
        student: req.student,
        odjavljen: false,
        koncna_ocena: {$lte: 0}
      }
    }
  }, function(err, izpit) {
    if(err) {
      debug("---preveriPrijavljenNaDrugIzpit:\n" + err);
      res.status(404).json({ message: "Napaka pri pridobivanju izpitov, na katere je že prijavljen"});
    }
    else
    {
      if(izpit && !req.force) {
          res.status(400).json({ message: "Si že prijavljen na izpit za ta predmet,"});
      }
      else
      {
        if(izpit)
          req.opozorila += "<li>Študent je že prijavljen na en drug izpit za ta predmet</li>";
        
        callNext(req, res, next);
      }
    }
  });
}
function preveriPretekloDovoljDni(req, res, next) {
  debug("--preveriPretekloDovoljDni");
  //  Preveri za prijavo, pri kateri še ni preteklo dovolj dni od zadnjega polaganja.
  var d = req.izpit.datum_izvajanja;
  var datum = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 13);
  
  Izpit.findOne({
    predmet: req.izpit.predmet,
    studijsko_leto: req.izpit.studijsko_leto,
    datum_izvajanja: {
      $gt: datum.toISOString(),
      $lte: d.toISOString()
    },
    polagalci: {
      $elemMatch: {
        student: req.student,
        odjavljen: false,
        koncna_ocena: {$gt: 0}
      }
    }
  }, function(err, izpit) {
    if(err) {
      debug("---preveriPretekloDovoljDni:\n" + err);
      res.status(404).json({ message: "Napaka pri pridobivanju izpita preden je preteklo dovolj dni"});
    }
    else
    {
      if(izpit && !req.force) {
        res.status(400).json({ message: "Ni še preteklo dovolj dni od prejšnjega polaganja izpita za ta predmet"});
      }
      else
      {
        if(izpit)
          req.opozorila += "<li>Ni še preteklo dovolj dni od prejšnjega polaganja izpita za ta predmet</li>";
        
        callNext(req, res, next);
      }
    }
  });
}

// Vnos ocene
function vnesiOcenoPodIzpit(req, res, next) {
  debug("--vnesiOcenoPodIzpit");
  
  if(req.body.tock)
  {
    req.body.tock = parseInt(req.body.tock, 10);
    if(req.body.tock > 100 || req.body.tock < -1)
      return res.status(400).json({ message: "Točke pisnega izpita morajo biti med -1 in 100, pri čemer -1 pomeni ni točk izpita"});
    
    req.polaganje.tock = req.body.tock;
  }
  
  if(req.body.koncna_ocena)
  {
    req.body.koncna_ocena = parseInt(req.body.koncna_ocena, 10);
    if(req.body.koncna_ocena > 10 || req.body.koncna_ocena < -1)
      return res.status(400).json({ message: "Končna ocena predmeta mora biti med -1 in 10, pri čemer -1 pomeni ni ocene"});
    
    req.polaganje.koncna_ocena = req.body.koncna_ocena;
  }
  
  callNext(req, res, next);
}
function vnesiOcenoStudentu(req, res, next) {
  debug("--vnesiOcenoStudentu");
  
  if(!req.prejsnjiIzpit)
  {
    req.predmet.ocena = req.body.koncna_ocena;
    req.predmet.izpit = req.izpit;
  }
  
  //debug(req.predmet);
  
  callNext(req, res, next);
}

function izberiStudijskoLeto(req, res, next) {
  StudijskoLeto.findOne({
    trenutno: true
  }, function(err, leto) {
    if(err || !leto)
    {
      debug("---izberiStudijskoLeto:\n" + err);
      res.status(404).json({ message: "Ne najdem trenutnega študijskega leta"});
    }
    else
    {
      req.leto = leto;
      
      callNext(req, res, next);
    }
  });
}
function izberiPredmet(req, res, next) {
  debug("--izberiPredmet");
  
  for(var i = 0; i < req.student.studijska_leta_studenta.length; i++)
  {
    if(req.student.studijska_leta_studenta[i].studijsko_leto.equals(req.izpit.studijsko_leto))
    {
      var leto = req.student.studijska_leta_studenta[i];
      
      for(var j = 0; j < leto.predmeti.length; j++)
      {
        if(leto.predmeti[j].predmet.equals(req.izpit.predmet._id))
        {
          req.predmet = leto.predmeti[j];
          break;
        }
      }
      break;
    }
  }
  
  if(!req.predmet)
    res.status(404).json({message: "Študent v tem letu ne obiskuje tega predmeta"});
  else
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
          koncna_ocena: {$lte: 0}
        }
      }
    })
    .populate("predmet studijsko_leto izvajalci polagalci.student")
    .exec(function(err, izpit) {
      if(err) {
        debug("---preveriPrijavljenNaDrugIzpit:\n" + err);
        res.status(404).json({ message: "Napaka pri pridobivanju izpitov, na katere je že prijavljen"});
      }
      else
      {
        if(izpit && !req.force)
        {
          res.status(403).json({ message: "Si že prijavljen na drug izpit za ta predmet"});
        }
        else
        {
          if(izpit)
          {
            req.opozorila += "<li>Bil že prijavljen na drug izpit</li>";
          }
          req.izpit = izpit;
          
          callNext(req, res, next);
        }
      }
    });
}

function duplPredmet(req, res, next) {
  req.duplPredmet = req.predmet;
  
  callNext(req, res, next);
}
function preveriIzvedboPredmeta(req, res, next) {
  debug("--preveriIzvedboPredmeta");
  if(!req.body || !req.body.izvedba_predmeta)
  {
    debug("Ni podane izvedbe predmeta");
    callNext(req, res, next);
  }
  else
  {
    req.izvedba = req.predmet.izvedbe_predmeta.id(req.body.izvedba_predmeta);
    
    if(!req.izvedba)
    {
      res.status(404).json({ message: "Ne najdem izbrane izvedbe predmeta za ta predmet"});
    }
    else
    {
      callNext(req, res, next);
    }
  }
}

function preveriDatumDodajanja(req, res, next) {
  var danes = new Date();
  var izpit = req.izpit.datum_izvajanja;
  var enMesec = izpit.setMonth(izpit.getMonth() + 1);
  
  /*
  if((req.user && req.user.referentka) || (danes > izpit && danes <= enMesec))
  {
    callNext(req, res, next);
  }
  else if(danes < izpit)
  {
    res.status(403).json({ message: "Izpit še ni potekal, vnos ocene nemogoč"});
  }
  else
  {
    res.status(403).json({ message: "Rok za vnos ocen po izpitu je potekel"});
  }
  */
  callNext(req, res, next);
}

function studentovPredmet(req, res, next) {
  debug("--studentovPredmet");
  for(var i = 0; i < req.student.studijska_leta_studenta.length; i++)
  {
    if(req.student.studijska_leta_studenta[i].studijsko_leto.equals(req.studijskoLeto._id))
    {
      var leto = req.student.studijska_leta_studenta[i];
      
      for(var j = 0; j < leto.predmeti.length; j++)
      {
        if(leto.predmeti[j].predmet.equals(req.predmet._id))
        {
          req.predmet = leto.predmeti[j];
          break;
        }
      }
      break;
    }
  }
  
  callNext(req, res, next);
}
function obdelajPrijavoNaIzpit(req, res, next) {
  debug("--obdelajPrijavoNaIzpit");
  if(next)
  {
    req.myNext = next;
  }
  
  var datum = new Date(req.body.datum_izvajanja);
  var danes = new Date();
  
  /*
  if(danes < datum)
  {
    res.status(400).json({ message: "Izpit se še ni mogel izvajati, datum izvajanja je višji od današnjega"});
  }
  else
  {
    */
    var enakaIzvedba = false;
    if(req.izpit)
    {
      // Preveri izvedbo predmeta-izpita
      enakaIzvedba = req.izvedba.izvajalci.length == req.izpit.izvajalci.length;
      
      for(var i = 0; i < req.izvedba.izvajalci.length && enakaIzvedba; i++)
      {
        var izvajalecPredmeta = req.izvedba.izvajalci[i];
        
        for(var j = 0; j < req.izpit.izvajalci.length; j++)
        {
          var izvajalecIzpita = req.izpit.izvajalci[j];
          
          debug("Primerjaj: " + izvajalecPredmeta._id + " | " + izvajalecIzpita._id);
          
          if(!izvajalecPredmeta._id.equals(izvajalecIzpita._id))
          {
            enakaIzvedba = false;
          }
        }
      }
    }
    
    debug("Enaka izvedba? " + enakaIzvedba);
    
    if(req.izpit && req.predmet.ocena > 5)
    {
      debug("Vrni prijavo prej opravljenega izpita!");
      
      callNext(req, res,[
        najdiPolaganje,
        odjaviPolagalca, nizajZaporedniPoskus,
        
        shraniIzpit, shraniStudenta,
        ponastaviIzbranIzpita, obdelajPrijavoNaIzpit
      ]);
    }
    else if((req.izpit && datum.getTime() != req.izpit.datum_izvajanja.getTime()) || (req.izpit && !enakaIzvedba))
    {
      debug("Prijavljen je, ampak prijave ne tikaj!");
      
      req.prejsnjiIzpit = req.izpit;
      
      req.izpit = undefined;
      
      obdelajPrijavoNaIzpit(req, res, next);
    }
    else
    {
      debug("Nadaljuj z vnosom ocene");
      next = req.myNext;
      req.myNext = undefined;
      
      callNext(req, res, next);
    }
  //}
}
function najdiOpravljanIzpit(req, res, next) {
  debug("--najdiOpravljanIzpit");
  Izpit
    .findById(req.predmet.izpit)
    .populate("predmet studijsko_leto izvajalci polagalci.student")
    .exec(function(err, izpit) {
      if(err)
      {
        res.status(404).json({ message: "Napaka pri preverjanju predhodne opravljenosti izpita"});
      }
      else
      {
        req.izpit = izpit;
        
        callNext(req, res, next);
      }
    });
}
function ponastaviIzbranIzpita(req, res, next) {
  req.izpit = undefined;
  
  callNext(req, res, next);
}

function narediCustomIzpit(req, res, next) {
  debug("--narediCustomIzpit");
  if(next)
  {
    req.myNext = next;
  }
  
  if(!req.izpit)
  {
    debug("Ustvarjam izpit...");
    
    Izpit.create({
      predmet: req.predmet,
      studijsko_leto: req.studijskoLeto,
      datum_izvajanja: req.datumIzvajanja,
      
      valid: false,
      
      lokacija: req.body.lokacija,
      opombe: req.body.opombe,
      
      izvajalci: req.izvedba.izvajalci
    }, function(err, izpit) {
      if(err) {
        debug("---narediCustomIzpit:\n" + err);
        res.status(400).send({ message: "Nepravilni podatki" });
      }
      else
      {
        req.izpit = izpit;
        
        dodajPolagalca(req, res, next);
      }
    });
  }
  else
  {
    debug("Prijava na izpit že obstaja!");
    
    next = req.myNext;
    req.myNext = undefined;
    
    callNext(req, res, next);
  }
}
function nastaviPolaganja(req, res, next) {
  debug("--nastaviPolaganja");
  
  var zaporedni_poskus = parseInt(req.body.zaporedni_poskus, 10);
  var zaporedni_poskus_skupaj = parseInt(req.body.zaporedni_poskus_skupaj, 10);
  
  if(!isNaN(zaporedni_poskus) && zaporedni_poskus > 0)
  {
    req.predmet.zaporedni_poskus = zaporedni_poskus;
    req.polaganje.zaporedni_poskus = zaporedni_poskus;
    
    if(req.prejsnjePolaganje)
    {
      debug("Popravljam prejšnje polaganje zaporedni poskus");
      
      req.predmet.zaporedni_poskus = zaporedni_poskus +1;
      req.prejsnjePolaganje.zaporedni_poskus = zaporedni_poskus +1;
    }
  }
  
  if(!isNaN(zaporedni_poskus) && zaporedni_poskus_skupaj > 0)
  {
    req.predmet.zaporedni_poskus_skupaj = zaporedni_poskus_skupaj;
    req.polaganje.zaporedni_poskus_skupaj = zaporedni_poskus_skupaj;
    
    if(req.prejsnjePolaganje)
    {
      debug("Popravljam prejšnje polaganje zaporedni poskus skupaj");
      
      req.predmet.zaporedni_poskus_skupaj = zaporedni_poskus_skupaj +1;
      req.prejsnjePolaganje.zaporedni_poskus_skupaj = zaporedni_poskus_skupaj +1;
    }
  }
  
  callNext(req, res, next);
}
function ocenaDodana(req, res) {
  res.status(200).json({ message: "Ocena dodana"});
}

function shraniPrejsnjiIzpit(req, res, next) {
  debug("--shraniPrejsnjiIzpit");
  if(!req.prejsnjiIzpit) {
    callNext(req, res, next);
  }
  else
  {
    req.prejsnjiIzpit.save(function(err, izpit) {
      if(err || !izpit) {
        debug("---shraniPrejsnjiIzpit:\n" + err);
        res.status(400).json({ message: "Napaka pri spreminjanju izpita" });
      }
      else
      {
        req.prejsnjiIzpit = izpit;
        
        callNext(req, res, next);
      }
    });
  }
}
function najdiPolaganjePrejsnje(req, res, next) {
  debug("--najdiPolaganjePrejsnje");
  
  if(!req.prejsnjiIzpit) {
    callNext(req, res, next);
  }
  else
  {
    for(var i = 0; i < req.prejsnjiIzpit.polagalci.length; i++) {
      if(req.prejsnjiIzpit.polagalci[i].student._id.equals(req.student._id) && !req.prejsnjiIzpit.polagalci[i].odjavljen)
      {
        req.prejsnjePolaganje = req.prejsnjiIzpit.polagalci[i];
        break;
      }
    }
    
    callNext(req, res, next);
  }
}