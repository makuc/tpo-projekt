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
  callNext(req, res, [
    najdiStudentaId, izberiZeton, pripraviVpisniList, porabiZeton, vrniVpisniListId ]);
};
module.exports.najdiVpisniList = function(req, res) {
  callNext(req, res, [ najdiStudentaId, najdiVpisniListId, pridobiVseOpravljanePredmete, pripraviPredmetnike, vrniVpisniList ]);
};
module.exports.urediVpisniList = function(req, res) {
  if(!req.body || !req.body.oblika_studija) {
    return res.status(400).json({ message: "Ni vseh potrebnih podatkov"});
  }
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, pridobiVseOpravljanePredmete, pripraviPredmetnike,
    validateOblikaStudija, validateObveznePredmete, validateStrokovneIzbirnePredmete,
    shraniVpisniList, vrniVpisniList
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
function izberiZeton(req, res, next) {
  if(req.body.zeton) {
    req.zeton = req.student.zetoni.id(req.body.zeton);
    
    if(!req.zeton)
    {
      //console.log(req.student);
      return res.status(403).json({ message: "Nimaš zahtevanega žetona"});
    }
    else if(req.zeton.izkoriscen)
    {
      //return res.status(404).json({ message: "Ta žeton je že bil izkoriščen"});
    }
    
    callNext(req, res, next);
  }
}
function pripraviVpisniList(req, res, next) {
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
    
    studijsko_leto_prvega_vpisa_v_ta_program: req.zeton.studijsko_leto_prvega_vpisa_v_ta_program,
    
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
      },
      {
        path: "moduli"
      },
      {
        path: "modulniPredmeti"
      },
      {
        path: "splosniIzbirniPredmeti"
      },
      {
        path: "strokovniIzbirniPredmeti"
      },
      {
        path: "obvezniPredmeti"
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
function pripraviPredmetnike(req, res, next) {
  console.log("--pripraviPredmetnike");
  models.Predmetnik
    .find({
      letnik: req.vpisniList.letnik
    })
    .populate("predmeti del_predmetnika")
    .exec(function(err, predmetniki) {
      if(err || !predmetniki) {
        console.log("---pripraviPredmetnike [error]:\n" + err);
        return res.status(404).json({ message: "Ne najdem potrebnih predmetnikov"});
      }
      
      req.obvezniPredmeti = [];
      req.splosniIzbirniPredmeti = [];
      req.strokovniIzbirniPredmeti = [];
      req.moduli = [];
      req.modulniPredmeti = [];
      
      var predmetnik;
      
      while(predmetniki.length > 0) {
        predmetnik = predmetniki.shift().toObject();
        
        var predmet, i;
        
        // Prikaži samo izvedbo predmeta za izbrano študijsko leto, ostale izbriši/skrij
        for(i = 0; i < predmetnik.predmeti.length; i++) {
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
        if(predmetnik.del_predmetnika.obvezen)
        {// Obvezni predmeti
          while(predmetnik.predmeti.length > 0)
          {// Obdelaj vse predmete
            predmet = predmetnik.predmeti.shift();
            
            if(!opravljalPredmet(predmet, req.opravljaniPredmeti))
            {// Predmeta še ni opravljal, dodaj ga na seznam
              req.obvezniPredmeti.push(predmet);
            }
          }
        }
        else if(predmetnik.del_predmetnika.modul)
        {// To je modul
          if(req.vpisniList.prosta_izbira)
          {// Če lahko študent prosto izbira predmete
            while(predmetnik.predmeti.length > 0)
            {// Obdelaj vse predmete
              predmet = predmetnik.predmeti.shift();
              
              if(!opravljalPredmet(predmet, req.opravljaniPredmeti))
              {// Predmeta še ni opravljal, dodaj ga na seznam
                req.modulniPredmeti.push(predmet);
              }
            }
          }
          else
          {// Drugače vse skupaj prikaži kot modul
            for(i = 0; i < predmetnik.predmeti.length; i++)
            {// Obdelaj vse predmete
              predmet = predmetnik.predmeti[i];
              
              if(opravljalPredmet(predmet, req.opravljaniPredmeti))
              {// Predmeta je že opravljal, zato ga odstrani iz seznama
                predmetnik.predmeti.splice(i, 1);
              }
            }
            req.moduliPredmetniki.push(predmetnik);
          }
        }
        else if(predmetnik.del_predmetnika.strokovni) {
          while(predmetnik.predmeti.length > 0)
          {// Obdelaj vse predmete
            predmet = predmetnik.predmeti.shift();
            
            if(!opravljalPredmet(predmet, req.opravljaniPredmeti))
            {// Predmeta še ni opravljal, dodaj ga na seznam
              req.strokovniIzbirniPredmeti.push(predmet);
            }
          }
        }
        else {
          while(predmetnik.predmeti.length > 0)
          {// Obdelaj vse predmete
            predmet = predmetnik.predmeti.shift();
            
            if(!opravljalPredmet(predmet, req.opravljaniPredmeti))
            {// Predmeta še ni opravljal, dodaj ga na seznam
              req.splosniIzbirniPredmeti.push(predmet);
            }
          }
        }
      }
      
      callNext(req, res, next);
    });
}

function shraniVpisniList(req, res, next) {
  req.vpisniList.obvezniPredmeti = req.obvezniPredmeti;
  req.vpisniList.strokovniIzbirniPredmeti = req.strokovniIzbirniPredmeti;
  req.vpisniList.splosniIzbirniPredmeti = req.splosniIzbirniPredmeti;
  req.vpisniList.moduli = req.moduli;
  req.vpisniList.modulniPredmeti = req.modulniPredmeti;
  
  req.vpisniList.save(function(err, vpisniList) {
    if(err || !vpisniList)
    {
      console.log(err);
      return res.status(400).json({ message: "Napaka pri shranjevanju vpisnega lista"});
    }
    
    req.vpisniList = vpisniList;
    
    callNext(req, res, next);
  });
}

function vrniVpisniList(req, res, next) {
  if(req.vpisniList.letnik.KT_strokovnihIzbirnihPredmetov <= 0)
    req.strokovniIzbirniPredmeti = undefined;
  if(req.vpisniList.letnik.KT_izbirnihPredmetov <= 0)
    req.splosniIzbirniPredmeti = undefined;
  if(req.vpisniList.letnik.st_modulov <= 0)
  {
    req.moduli = undefined;
    req.modulniPredmeti = undefined;
  }
  
  res.status(200).json({
    vpisniList: req.vpisniList,
    
    obvezniPredmeti: req.obvezniPredmeti,
    strokovniIzbirniPredmeti: req.strokovniIzbirniPredmeti,
    splosniIzbirniPredmeti: req.splosniIzbirniPredmeti,
    moduli: req.moduli,
    modulniPredmeti: req.modulniPredmeti
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
function validateObveznePredmete(req, res, next) {
  if(!Array.isArray(req.body.obvezniPredmeti))
    return res.status(400).json({ message: "Obvezni predmeti niso pravilno posredovani"});
  if(req.obvezniPredmeti.length != req.body.obvezniPredmeti.length)
    return res.status(400).json({ message: "Niso izbrani vsi potrebnih obvezni predmeti"});
  
  var predmet;
  
  for(var i = 0; i < req.body.obvezniPredmeti.length; i++)
    {
      for(var j = 0; j < req.obvezniPredmeti.length; j++)
      {
        predmet = req.obvezniPredmeti[i];
        if(predmet._id.equals(req.body.obvezniPredmeti[i]))
        {
          req.body.obvezniPredmeti[i] = predmet;
          break;
        }
      }
      
      if(!req.body.obvezniPredmeti[i]._id)
        return res.status(400).json({ message: "Izbran neveljaven obvezen predmet"});
      
    }
  
  req.obvezniPredmeti = req.body.obvezniPredmeti;
  
  callNext(req, res, next);
}
function validateStrokovneIzbirnePredmete(req, res, next) {
  if(req.vpisniList.letnik.KT_strokovnihIzbirnihPredmetov > 0)
  {
    if(!Array.isArray(req.body.strokovniIzbirniPredmeti))
      return res.status(400).json({ message: "Strokovni izbirni predmeti niso pravilno posredovani"});
    
    var sumKT = 0, predmet;
    
    for(var i = 0; i < req.body.strokovniIzbirniPredmeti.length; i++)
    {
      for(var j = 0; j < req.strokovniIzbirniPredmeti.length; j++)
      {
        predmet = req.strokovniIzbirniPredmeti[i];
        if(predmet._id.equals(req.body.strokovniIzbirniPredmeti[i]))
        {
          req.body.strokovniIzbirniPredmeti[i] = predmet;
          break;
        }
      }
      
      if(!req.body.strokovniIzbirniPredmeti[i]._id)
        return res.status(400).json({ message: "Izbran neveljaven strokovni izbirni predmet"});
      
      sumKT += predmet.KT;
    }
    
    if(sumKT != req.vpisniList.letnik.KT_strokovnihIzbirnihPredmetov)
      return res.status(400).json({ message: "Izbrani predmeti z napačno vsoto kreditnih točk"});
    
    req.strokovniIzbirniPredmeti = req.body.strokovniIzbirniPredmeti;
  }
  else
  {
    req.strokovniIzbirniPredmeti = [];
  }
  callNext(req, res, next);
}

function pridobiVseOpravljanePredmete(req, res, next) {
  console.log("--pridobiVseOpravljanePredmete");
  req.opravljaniPredmeti = [];
  
  var studijskoLeto, predmet;
  
  for(var i = 0; i < req.student.studijska_leta_studenta.length; i++)
  {// Obdelaj vsa študentova študijska leta
    studijskoLeto = req.student.studijska_leta_studenta[i];
    
    for(var j = 0; j < studijskoLeto.predmeti.length; j++)
    {// Obdelaj vse predmete, ki jih je študent imel v nekem študijskem letu
      predmet = studijskoLeto.predmeti[j];
      
      for(var k = 0; k < req.opravljaniPredmeti.length; k++)
      {// Dodaj predmet na seznam, v kolikor le-ta še ni na njem
        if(req.opravljaniPredmeti[k].equals(predmet)) {
          console.log("Že opravljal ta predmet");
          break;
        }
      }
    }
  }
  
  callNext(req, res, next);
}

function opravljalPredmet(predmet, opravljaniPredmeti) {
  for(var i = 0; i < opravljaniPredmeti.length; i++)
  {
    if(opravljaniPredmeti[i].equals(predmet))
    {
      return true;
    }
  }
  return false;
}

// Oddaj vpisni list
function oddajaVpisnegaLista(req, res, next) {
  req.vpisniList.valid = true;
  req.vpisniList.vpisan = Date.now();
  
  req.vpisniList.save(function(err, vpisniList) {
    if(err || !vpisniList) {
      console.log("---oddajaVpisnegaLista:\n" + err);
      return res.status(400).json({ message: "Napaka pri oddaji vpisnega lista"});
    }
    
    req.vpisniList = vpisniList;
    
    callNext(req, res, next);
  });
}