var mongoose = require('mongoose');
var callNext = require("./_include/callNext");

var models = {
  Obcina: mongoose.model('Obcina'),
  Drzava: mongoose.model('Drzava'),
  Posta: mongoose.model('Posta'),
  
  StudijskoLeto: mongoose.model('StudijskoLeto'),
  
  VrstaStudija: mongoose.model('VrstaStudija'),
  VrstaVpisa: mongoose.model('VrstaVpisa'),
  OblikaStudija: mongoose.model('OblikaStudija'),
  NacinStudija: mongoose.model('NacinStudija'),
  
  StudijskiProgram: mongoose.model('StudijskiProgram'),
  Letnik: mongoose.model('Letnik'),
  
  Zaposlen: mongoose.model('Zaposlen'),
  
  Predmet: mongoose.model('Predmet'),
  DelPredmetnika: mongoose.model('DelPredmetnika'),
  Predmetnik: mongoose.model('Predmetnik'),
  Izpit: mongoose.model('Izpit'),
  
  Student: mongoose.model('Student'),
  Vpis: mongoose.model('Vpis'),
  
  User: mongoose.model('User')
};


module.exports.pripraviVpisniList = function(req, res) {
  if(!req.body || !req.body.zeton)
    return res.status(400).json({ message: "Ni izbranega žetona"});
  callNext(req, res, [ najdiStudentaId, pripraviVpisniList, porabiZeton, vrniVpisniListId ]);
};
module.exports.najdiVpisniList = function(req, res) {
  callNext(req, res, [ najdiVpisniListId, najdiPredmetnike, vrniVpisniList ]);
};
module.exports.urediVpisniList = function(req, res) {
  if(!req.body || !req.body.oblika_studija) {
    return res.status(400).json({ message: "Ni vseh potrebnih podatkov"});
  }
  callNext(req, res, [
    validateOblikaStudija,
    vrniVpisniList
  ]);
};
module.exports.oddajVpisniList = function(req, res) {
  callNext(req, res, [
    najdiVpisniListId, oddajaVpisnegaLista, vrniVpisniList
  ]);
};



/* Funkcije kontrolerja */
function najdiStudentaId(req, res, next) {
  models.Student
    .findById(req.user.student)
    .exec(function(err, student) {
      if(err || !student) {
        return res.status(404).json({ message: "Izbrani študent ne obstaja"});
      }
      
      req.student = student;
      
      callNext(req, res, next);
    });
}
function pripraviVpisniList(req, res, next) {
  if(req.body.zeton) {
    req.zeton = req.student.zetoni.id(req.body.zeton);
    
    if(!req.zeton)
    {
      //console.log(req.student);
      return res.status(403).json({ message: "Nimaš zahtevanega žetona"});
    }
    else if(req.zeton.izkoriscen)
    {
      return res.status(404).json({ message: "Ta žeton je že bil izkoriščen"});
    }
    
    models.Vpis.create({
      
      student: req.student,
      
      studijsko_leto: req.zeton.studijsko_leto,
      letnik: req.zeton.letnik,
      studijski_program: req.zeton.studijski_program,
      vrsta_studija: req.zeton.vrsta_studija,
      vrsta_vpisa: req.zeton.vrsta_vpisa,
      
      nacin_studija: req.zeton.nacin_studija,
      oblika_studija: req.zeton.oblika_studija,
      
      neopravljeni_predmeti: req.zeton.neopravljeni_predmeti,
      
      prosta_izbira: req.zeton.prosta_izbira,
      
      studijsko_leto_prvega_vpisa_v_ta_program: req.zeton.studijsko_leto_prvega_vpisa_v_ta_program || req.zeton.studijsko_leto,
      
      kraj_izvajanja: "Ljubljana"
      
    }, function(err, vpisniList) {
      if(err || !vpisniList) {
        console.log("---pripraviVpisniList:\n" + err);
        return res.status(403).json({ message: "Ne morem ustvariti novega vpisnega lista z izbranim žetonom"});
      }
      
      req.vpisniList = vpisniList;
      
      callNext(req, res, next);
    });
  }
}
function porabiZeton(req, res, next) {
  // Označi žeton kot porabljen
  req.zeton.izkoriscen = true;
  req.student.save(function(err, student) {
    if(err || !student) {
      console.log("---porabiZeton:\n" + err);
      return res.status(403).json({ message: "Napaka pri označevanju žetona kot porabljen"});
    }
    
    req.student = student;
    
    callNext(req, res, next);
  });
  
}
function vrniVpisniListId(req, res, next) {
  res.status(201).json({ vpisniList_id: req.vpisniList._id });
}

function najdiVpisniListId(req, res, next) {
  models.Vpis
    .findOne({
      student: req.user.student,
      _id: req.params.vpisniList_id
    })
    .populate([
      {
        path: "student"
      },
      {
        path: "studijsko_leto"
      },
      {
        path: "letnik"
      },
      {
        path: "studijski_program"
      },
      {
        path: "studijsko_leto_prvega_vpisa_v_ta_program"
      }
    ])
    .exec(function(err, vpisniList) {
      if(err || !vpisniList) {
        return res.status(404).json({ message: "Izbranega vpisnega lista ni mogoče najti"});
      }
      
      req.vpisniList = vpisniList;
      
      callNext(req, res, next);
    });
}
function najdiPredmetnike(req, res, next) {
  models.Predmetnik
    .find({
      letnik: req.vpisniList.letnik
    })
    .populate("predmeti del_predmetnika")
    .exec(function(err, predmetniki) {
      if(err || !predmetniki) {
        console.log("---najdiPredmetnike:\n" + err);
        return res.status(404).json({ message: "Ne najdem potrebnih predmetnikov"});
      }
      
      req.obvezniPredmeti = [];
      req.izbirniPredmeti = [];
      req.strokovniIzbirniPredmeti = [];
      req.moduliPredmetniki = [];
      
      var predmetnik;
      
      while(predmetniki.length > 0) {
        predmetnik = predmetniki.shift().toObject();
        
        var predmet;
        
        // Prikaži samo izvedbo predmeta za izbrano študijsko leto, ostale izbriši/skrij
        for(var i = 0; i < predmetnik.predmeti.length; i++) {
          predmet = predmetnik.predmeti[i];
          
          // Preveri, če obstaja izvedba predmeta za trenutno študijsko leto
          while(predmet.izvedbe_predmeta.length > 0) {
            var izvedba = predmet.izvedbe_predmeta.shift();
            
            if(izvedba.studijsko_leto.equals(req.vpisniList.studijsko_leto._id)) {
              // Če obstaja, pobriši vse ostale izvedbe predmeta in shrani samo izbrano
              predmet.izvedba_predmeta = izvedba;
              predmet.izvedbe_predmeta = undefined;
              break;
            }
          }
          
          // Poglej, če si našel veljavno izvedbo predmeta, drugače izbriši predmet
          if(!predmet.izvedba_predmeta) {
            predmetnik.predmeti.splice(i, 1);
          }
        }
        
        // Prerazporedi predmete iz predmetnikov v ustrezne kategorije!
        if(predmetnik.del_predmetnika.obvezen) {
          while(predmetnik.predmeti.length > 0) {
            predmet = predmetnik.predmeti.shift();
            req.obvezniPredmeti.push(predmet);
          }
        }
        else if(predmetnik.del_predmetnika.modul) {
          req.moduliPredmetniki.push(predmetnik);
        }
        else if(predmetnik.del_predmetnika.strokovni) {
          while(predmetnik.predmeti.length > 0) {
            predmet = predmetnik.predmeti.shift();
            req.strokovniIzbirniPredmeti.push(predmet);
          }
        }
        else {
          while(predmetnik.del_predmetnika.predmeti.length > 0) {
            predmet = predmetnik.predmeti.shift();
            req.izbirniPredmeti.push(predmet);
          }
        }
      }
      
      callNext(req, res, next);
    });
}

function vrniVpisniList(req, res, next) {
  res.status(200).json({
    vpisniList: req.vpisniList,
    
    obvezniPredmeti: req.obvezniPredmeti,
    strokovniIzbirniPredmeti: req.strokovniIzbirniPredmeti,
    izbirniPredmeti: req.izbirniPredmeti,
    
    moduliPredmetniki: req.moduliPredmetniki
  });
}

// Izpolnjevanje vpisnega lista
/*
oblika_studija

modulniPredmeti
strokovniIzbirniPredmeti
splosniIzbirniPredmeti
obvezniPredmeti
*/
function validateOblikaStudija(req, res, next) {
  models.OblikaStudija
    .findById(req.body.oblika_studija)
    .exec(function(err, oblikaStudija) {
      if(err) {
        return res.status(400).json({ message: "Neveljavna oblika študija"});
      }
      
      req.oblikaStudija = oblikaStudija;
      
      callNext(req, res, next);
    });
}
function validatePredmet(req, res, next) {
  models.Predmet
    .findById(req.predmet)
    .exec(function(err, predmet) {
      if(err || !predmet) {
        return res.status(404).json({ message: "Izbran neveljaven predmet"});
      }
      
      req.predmet = predmet;
      
      callNext(req, res, next);
    });
}

function pridobiVseOpravljenePredmete(req, res, next) {
  
}

function moduleVModulnePredmete(req, res, next) {
  if(!req.vpisniList.prosta_izbira) {
    // Pretvori module v dejanske predmete
  } else {
    callNext(req, res, next);
  }
}


// Oddaj vpisni list
function oddajaVpisnegaLista(req, res, next) {
  req.vpisniList.valid = true;
  req.vpisniList.vpisan = Date.now();
  
  req.vpisniList.save(function(err, vpisniList) {
    if(err || "vpisniList") {
      return res.status(400).json({ message: "Napaka pri oddaji vpisnega lista"});
    }
    
    req.vpisniList = vpisniList;
    
    callNext(req, res, next);
  });
}