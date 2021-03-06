var mongoose = require('mongoose');
var callNext = require("./_include/callNext");

let debug = require("debug")("vpis");

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
    najdiStudentaId, izberiZeton, pridobiVseOpravljanePredmete, pripraviPredmetnike, validateVrstoVpisa,
    pripraviPredmetePonavljanje, odstejPrejsnjaRednaPolaganja,
    pripraviVpisniList, pripraviVpisniListPonavljanje,
    porabiZeton,
    vrniVpisniListId
  ]);
};
module.exports.najdiVpisniList = function(req, res) {
  callNext(req, res, [ najdiStudentaId, najdiVpisniListId, pridobiVseOpravljanePredmete, pripraviPredmetnike, vrniVpisniList ]);
};
module.exports.urediVpisniList = function(req, res) {
  if(!req.body || !req.body.oblika_studija) {
    return res.status(400).json({ message: "Ni vseh potrebnih podatkov"});
  }
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, preveriNeoddan, validateOblikaStudija, urediVpisniList,
    shraniVpisniList, vrniVpisniList
  ]);
};
module.exports.oddajVpisniList = function(req, res) {
  callNext(req, res, [
    najdiVpisniListId, najdiStudentaId, preveriNeoddan, preveriVeljavnostPredmetov, zdruziPredmete, oddajaVpisnegaLista, porabiVseZetone, vrniUspesnoOddano
  ]);
};

module.exports.oddaniVpisi = function(req, res) {
  models.Vpis
    .find({
      valid: true,
      potrjen: false
    })
    .populate("student studijsko_leto letnik studijski_program vrsta_studija vrsta_vpisa studijsko_leto_prvega_vpisa_v_ta_program nacin_studija oblika_studija")
    .exec(function(err, vpisniListi) {
      if(err || !vpisniListi)
      {
        console.log("---oddaniVpisi:\n" + err);
        return res.status(404).json({ message: "Ne najdem oddanih vpisov"});
      }
      
      res.status(200).json(vpisniListi);
    });
};
module.exports.vsiVpisi = function(req, res) {
  models.Vpis
    .find()
    .populate("student studijsko_leto letnik studijski_program vrsta_studija vrsta_vpisa studijsko_leto_prvega_vpisa_v_ta_program nacin_studija oblika_studija")
    .exec(function(err, vpisniListi) {
      if(err || !vpisniListi) {
        console.log("---vsiVpisi:\n" + err);
        return res.status(404).json({ message: "Ne najdem vpisnih listov"});
      }
      
      res.status(200).json(vpisniListi);
    });
};
module.exports.potrdiVpis = function(req, res) {
  callNext(req, res, [
    najdiVpisniListId, najdiStudentaId, prijaviStudenta, potrdiVpisniList, vrniVpisniList
  ]);
};

module.exports.dodajSplosniIzbirni = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, preveriNeoddan, pridobiVseOpravljanePredmete, pripraviPredmetnike,
    
    validatePredmet, dodajSplosniIzbirni,
    
    shraniVpisniList, vrniPredmetiPosodobljeni
  ]);
};
module.exports.odstraniSplosniIzbirni = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, preveriNeoddan, pridobiVseOpravljanePredmete, pripraviPredmetnike,
    
    odstraniSplosniIzbirni,
    
    shraniVpisniList, vrniPredmetiPosodobljeni
  ]);
};
module.exports.dodajStrokovniIzbirni = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, preveriNeoddan, pridobiVseOpravljanePredmete, pripraviPredmetnike,
    
    validatePredmet, dodajStrokovniIzbirni,
    
    shraniVpisniList, vrniPredmetiPosodobljeni
  ]);
};
module.exports.odstraniStrokovniIzbirni = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, preveriNeoddan, pridobiVseOpravljanePredmete, pripraviPredmetnike,
    
    odstraniStrokovniIzbirni,
    
    shraniVpisniList, vrniPredmetiPosodobljeni
  ]);
};
module.exports.dodajModulniIzbirni = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, preveriNeoddan, pridobiVseOpravljanePredmete, pripraviPredmetnike,
    
    validatePredmet, dodajModulniIzbirni,
    
    shraniVpisniList, vrniPredmetiPosodobljeni
  ]);
};
module.exports.odstraniModulniIzbirni = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, preveriNeoddan, pridobiVseOpravljanePredmete, pripraviPredmetnike,
    
    odstraniModulniIzbirni,
    
    shraniVpisniList, vrniPredmetiPosodobljeni
  ]);
};
module.exports.dodajModul = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, preveriNeoddan, pridobiVseOpravljanePredmete, pripraviPredmetnike,
    
    validateModul, dodajModul,
    
    shraniVpisniList, vrniModuliPosodobljeni
  ]);
};
module.exports.odstraniModul = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, najdiVpisniListId, preveriNeoddan, pridobiVseOpravljanePredmete, pripraviPredmetnike,
    
    odstraniModul,
    
    shraniVpisniList, vrniModuliPosodobljeni
  ]);
};

/* Funkcije kontrolerja */
function najdiStudentaId(req, res, next) {
  var student_id;
  
  if(req.vpisniList) {
    student_id = req.vpisniList.student._id;
  } else {
    student_id = req.user.student;
  }
  
  models.Student
    .findById(student_id)
    .populate("zetoni.letnik studijska_leta_studenta.vrsta_vpisa")
    .exec(function(err, student) {
      if(err || !student) {
        debug("--najdiStudentaId:\n" + err);
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
      return res.status(404).json({ message: "Ta žeton je že bil izkoriščen"});
    }
    
    callNext(req, res, next);
  }
}
function pripraviVpisniList(req, res, next) {
  if(req.vrstaVpisa.koda != 2)
  {
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
      obvezniPredmeti: req.obvezniPredmeti,
      
      
      prosta_izbira: req.zeton.prosta_izbira,
      
      studijsko_leto_prvega_vpisa_v_ta_program: req.zeton.studijsko_leto_prvega_vpisa_v_ta_program,
      
      kraj_izvajanja: "Ljubljana"
      
    }, function(err, vpisniList) {
      if(err || !vpisniList) {
        debug("---pripraviVpisniList:\n" + err);
        return res.status(403).json({ message: "Ne morem ustvariti novega vpisnega lista z izbranim žetonom"});
      }
      
      req.vpisniList = vpisniList;
      
      callNext(req, res, next);
    });
  }
  else
  {
    callNext(req, res, next);
  }
}
function pripraviVpisniListPonavljanje(req, res, next) {
  if(req.vrstaVpisa.koda == 2)
  {
    models.Vpis.create({
      
      student: req.student,
      
      studijsko_leto: req.zeton.studijsko_leto,
      letnik: req.zeton.letnik,
      studijski_program: req.zeton.studijski_program,
      vrsta_studija: req.zeton.vrsta_studija,
      vrsta_vpisa: req.zeton.vrsta_vpisa,
      
      nacin_studija: req.zeton.nacin_studija,
      oblika_studija: req.zeton.oblika_studija,
      
      
      neopravljeni_predmeti: req.predmetiStudenta,
      
      
      prosta_izbira: req.zeton.prosta_izbira,
      
      studijsko_leto_prvega_vpisa_v_ta_program: req.zeton.studijsko_leto_prvega_vpisa_v_ta_program,
      
      kraj_izvajanja: "Ljubljana"
      
    }, function(err, vpisniList) {
      if(err || !vpisniList) {
        debug("---pripraviVpisniList:\n" + err);
        return res.status(403).json({ message: "Ne morem ustvariti novega vpisnega lista z izbranim žetonom"});
      }
      
      req.vpisniList = vpisniList;
      
      callNext(req, res, next);
    });
  }
  else
  {
    callNext(req, res, next);
  }
}
function porabiZeton(req, res, next) {
  // Označi žeton kot porabljen
  req.zeton.izkoriscen = true;
  req.student.save(function(err, student) {
    if(err || !student) {
      debug("---porabiZeton:\n" + err);
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
      },
      {
        path: "vrsta_studija"
      },
      {
        path: "vrsta_vpisa"
      },
      {
        path: "nacin_studija"
      }
    ])
    .exec(function(err, vpisniList) {
      if(err || !vpisniList) {
        debug("---najdiVpisniListId:\n" + err);
        return res.status(404).json({ message: "Izbranega vpisnega lista ni mogoče najti"});
      }
      
      req.vpisniList = vpisniList;
      
      callNext(req, res, next);
    });
}
function urediVpisniList(req, res, next) {
  req.vpisniList.oblika_studija = req.oblikaStudija;
  
  callNext(req, res, next);
}
function preveriNeoddan(req, res, next) {
  if(req.vpisniList.valid)
    return res.status(403).json({ message: "Ta vpis je že bil oddan - ureja lahko samo skrbnik"});
  
  callNext(req, res, next);
}
function pripraviPredmetnike(req, res, next) {
  debug("--pripraviPredmetnike");
  
  if(!req.vpisniList)
    req.vpisniList = req.zeton;
  
  models.Predmetnik
    .find({
      letnik: req.vpisniList.letnik._id,
      studijsko_leto: req.vpisniList.studijsko_leto
    })
    .populate([
      {
        path: "predmeti",
        populate: {
          path: "izvedbe_predmeta.izvajalci"
        }
      },
      {
        path: "del_predmetnika"
      }
    ])
    .exec(function(err, predmetniki) {
      if(err || !predmetniki) {
        console.log("---pripraviPredmetnike [error]:\n" + err);
        return res.status(404).json({ message: "Ne najdem potrebnih predmetnikov"});
      }
      
      //console.log(predmetniki[0]);
      
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
            
            var studijsko_leto = req.vpisniList.studijsko_leto;
            if(studijsko_leto._id)
              studijsko_leto = studijsko_leto._id;
            
            if(izvedba.studijsko_leto.equals(studijsko_leto)) {
              // Če obstaja, pobriši vse ostale izvedbe predmeta in shrani samo izbrano
              predmet.izvedba_predmeta = izvedba;
              predmet.izvedbe_predmeta = undefined;
              break;
            }
          }
          
          // Poglej, če si našel veljavno izvedbo predmeta, drugače izbriši predmet
          if(!predmet.izvedba_predmeta) {
            //console.log("### Brišem predmet: " + predmet.naziv);
            predmetnik.predmeti.splice(i, 1);
            i--;
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
            req.moduli.push(predmetnik);
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
  debug("--shraniVpisniList");
  req.vpisniList.save(function(err, vpisniList) {
    if(err || !vpisniList)
    {
      debug("---shraniVpisniList:\n" + err);
      return res.status(400).json({ message: "Napaka pri shranjevanju vpisnega lista"});
    }
    
    req.vpisniList = vpisniList;
    
    callNext(req, res, next);
  });
}

function vrniVpisniList(req, res, next) {
  debug("--vrniVpisniList");
  
  if(req.vpisniList.letnik.KT_strokovnihIzbirnihPredmetov <= 0)
    req.strokovniIzbirniPredmeti = undefined;
  if(req.vpisniList.letnik.KT_izbirnihPredmetov <= 0)
    req.splosniIzbirniPredmeti = undefined;
  if(req.vpisniList.letnik.st_modulov <= 0)
  {
    req.moduli = undefined;
    req.modulniPredmeti = undefined;
  }
  
  if(req.vpisniList.vrsta_vpisa.koda == 2)
  {
    debug("Ponavlja, vrni samo vpisni list");
    
    res.status(200).json({
      vpisniList: req.vpisniList
    });
  }
  else
  {
    debug("Ostali vpisi, vrne tudi predmetnike");
    
    res.status(200).json({
      vpisniList: req.vpisniList,
      
      strokovniIzbirniPredmeti: req.strokovniIzbirniPredmeti,
      splosniIzbirniPredmeti: req.splosniIzbirniPredmeti,
      moduli: req.moduli,
      modulniPredmeti: req.modulniPredmeti
    });
  }
}

// Vpisni List ponavljanje letnika
function validateVrstoVpisa(req, res, next) {
  debug("--validateVrstoVpisa");
  
  models.VrstaVpisa.findById(req.zeton.vrsta_vpisa, function(err, vrstaVpisa) {
    if(err || !vrstaVpisa)
    {
      debug("---validateVrstoVpisa:\n" + err);
      res.status(404).json({ message: "Neveljavna vrsta vpisa"});
    }
    else
    {
      req.vrstaVpisa = vrstaVpisa;
      
      callNext(req, res, next);
    }
  });
}
function odstejPrejsnjaRednaPolaganja(req, res, next) {
  // Zdej pa še odštej polaganja, ki jih je opravil redno (v kolikor ponavlja letnik)
  debug("--odstejPrejsnjaRednaPolaganja");
  
  if(req.vrstaVpisa.koda == 2)
  {
    debug("Pripravljam predmete");
    
    var x,y,z;
    
    var predmetiStudenta = req.predmetiStudenta;
    req.predmetiStudenta = [];
    
    for(x = req.student.studijska_leta_studenta.length - 1; x >= 0 && predmetiStudenta.length > 0 ; x--)
    {
      var leto = req.student.studijska_leta_studenta[x];
      
      if(leto.vrsta_vpisa.koda == 1)
      {
        debug("V to leto je bil redno vpisan");
        
        // Pojdi skozi vse predmete, ki jih je opravljal v tem študijskem letu
        for(y = 0; y < leto.predmeti.length && predmetiStudenta.length > 0; y++)
        {
          var predmet = leto.predmeti[y];
          
          //debug("Obdelujem: " + predmet.predmet);
          
          //Zdej pa vsak predmet primerjaj še z Neopravljenimi predmeti
          for(z = 0; z < predmetiStudenta.length; z++)
          {
            var neopr = predmetiStudenta[z];
            
            //debug("Primerjaj: " + neopr.predmet + " | " + predmet.predmet);
            
            // Zdej pa najdi predmet
            if(neopr.predmet.equals(predmet.predmet))
            {
              req.predmetiStudenta.push({
                predmet: neopr.predmet,
                ocena: neopr.ocena,
                izpit: neopr.izpit,
                zaporedni_poskus: 0,
                zaporedni_poskus_skupaj: neopr.zaporedni_poskus_skupaj - predmet.zaporedni_poskus
              });
              
              predmetiStudenta.splice(z, 1);
              y--;
              break;
            }
          }
        }
      }
    }
    debug("Obdelanih predmetov: " + req.predmetiStudenta.length);
  }
  
  //return res.sendStatus(200);
  
  callNext(req, res, next);
}
function pripraviPredmetePonavljanje(req, res, next) {
  debug("--pripraviPredmetePonavljanje");
  
  if(req.vrstaVpisa.koda == 2)
  {
    var leto = req.student.studijska_leta_studenta[req.student.studijska_leta_studenta.length -1];
    
    req.predmetiStudenta = leto.predmeti;
    
    debug("Število predmetov študenta: " + req.predmetiStudenta.length);
    
    callNext(req, res, next);
  }
  else
  {
    callNext(req, res, next);
  }
}

// Izpolnjevanje vpisnega lista
function validateOblikaStudija(req, res, next) {
  debug("--validateOblikaStudija");
  
  models.OblikaStudija
    .findById(req.body.oblika_studija)
    .exec(function(err, oblikaStudija) {
      if(err) {
        debug("---validateOblikaStudija:\n" + err);
        return res.status(400).json({ message: "Neveljavna oblika študija"});
      }
      
      req.oblikaStudija = oblikaStudija;
      
      callNext(req, res, next);
    });
}
function pridobiVseOpravljanePredmete(req, res, next) {
  debug("--pridobiVseOpravljanePredmete");
  
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
          //console.log("Že opravljal ta predmet");
          break;
        }
      }
    }
  }
  
  callNext(req, res, next);
}
function opravljalPredmet(predmet, opravljaniPredmeti) {
  debug("--opravljalPredmet");
  
  for(var i = 0; i < opravljaniPredmeti.length; i++)
  {
    if(opravljaniPredmeti[i].equals(predmet))
    {
      return true;
    }
  }
  return false;
}

function validatePredmet(req, res, next) {
  debug("--validatePredmet");
  
  models.Predmet
    .findById(req.body.predmet)
    .exec(function(err, predmet) {
      if(err || !predmet)
      {
        debug("---validatePredmet:\n" + err);
        return res.status(404).json({ message: "Ne najdem izbranega predmeta"});
      }
      
      req.predmet = predmet;
      
      callNext(req, res, next);
    });
}
function validateModul(req, res, next) {
  debug("--validateModul");
  
  models.Predmetnik
    .findById(req.body.modul)
    .exec(function(err, modul) {
      if(err || !modul)
      {
        debug("---validatePredmetnik:\n" + err);
        return res.status(404).json({ message: "Ne najdem izbranega modula"});
      }
      
      req.modul = modul;
      
      callNext(req, res, next);
    });
}

function dodajSplosniIzbirni(req, res, next) {
  debug("--dodajSplosniIzbirni");
  
  if(req.splosniIzbirniPredmeti.length == 0 || req.vpisniList.letnik.KT_izbirnihPredmetov <= 0)
    return res.status(400).json({ message: "Ne moreš izbirati splošnih izbirnih predmetov"});
  
  // Preveri med splošnimi izbirnimi predmeti
  for(var i = 0; i < req.splosniIzbirniPredmeti.length; i++)
  {
    if(req.splosniIzbirniPredmeti[i]._id.equals(req.predmet._id))
    {// Predmet najden
      
      var j;
      for(j = 0; j < req.vpisniList.splosniIzbirniPredmeti.length; j++)
      {
        if(req.vpisniList.splosniIzbirniPredmeti[j]._id.equals(req.predmet._id))
          return res.status(400).json({ message: "Ta predmet je že bil dodan"});
      }
      
      var sumKT = 0;
      
      for(j = 0; j < req.vpisniList.splosniIzbirniPredmeti.length; j++)
      {// Poglej skupno vsoto KT splošnih izbirnih predmetov
        sumKT += req.vpisniList.splosniIzbirniPredmeti[j].KT;
      }
      
      if(sumKT + req.predmet.KT > req.vpisniList.letnik.KT_izbirnihPredmetov) {
        return res.status(400).json({ message: "Prekoračuješ dovoljeno število KT za splošne izbirne predmete"});
      }
      
      req.vpisniList.splosniIzbirniPredmeti.push(req.predmet);
      
      callNext(req, res, next);
      
      return;
    }
  }
  
  // Preveri med strokovnimi izbirnimi predmeti
  for(var i = 0; i < req.strokovniIzbirniPredmeti.length; i++)
  {
    if(req.strokovniIzbirniPredmeti[i]._id.equals(req.predmet._id))
    {// Predmet najden
      
      var j;
      for(j = 0; j < req.vpisniList.splosniIzbirniPredmeti.length; j++)
      {// Preveri, če že bil dodan splošnim izbirnim predmetom
        if(req.vpisniList.splosniIzbirniPredmeti[j]._id.equals(req.predmet._id))
          return res.status(400).json({ message: "Ta predmet je izbran kot splošni izbirni predmet"});
      }
      for(j = 0; j < req.vpisniList.strokovniIzbirniPredmeti.length; j++)
      {// Preveri, če že bil dodan strokovnim izbirnim predmetom
        if(req.vpisniList.strokovniIzbirniPredmeti[j]._id.equals(req.predmet._id))
          return res.status(400).json({ message: "Ta predmet je že izbran kot strokovni izbirni predmet"});
      }
      
      var sumKT = 0;
      
      for(j = 0; j < req.vpisniList.splosniIzbirniPredmeti.length; j++)
      {// Poglej skupno vsoto KT splošnih izbirnih predmetov
        sumKT += req.vpisniList.splosniIzbirniPredmeti[j].KT;
      }
      
      if(sumKT + req.predmet.KT > req.vpisniList.letnik.KT_izbirnihPredmetov) {
        return res.status(400).json({ message: "Prekoračuješ dovoljeno število KT za splošne izbirne predmete"});
      }
      
      req.vpisniList.splosniIzbirniPredmeti.push(req.predmet);
      
      callNext(req, res, next);
      
      return;
    }
  }
  return res.status(400).json({ message: "Ne moreš izbrati izbranega splošnega izbirnega predmeta"});
}
function odstraniSplosniIzbirni(req, res, next) {
  debug("--odstraniSplosniIzbirni");
  
  for(var i = 0; i < req.vpisniList.splosniIzbirniPredmeti.length; i++)
  {
    if(req.vpisniList.splosniIzbirniPredmeti[i]._id.equals(req.params.predmet_id))
    {
      req.vpisniList.splosniIzbirniPredmeti.pull(req.params.predmet_id);
      callNext(req, res, next);
      return;
    }
  }
  res.status(400).json({ message: "Ta predmet še ni bil dodan"});
}
function dodajStrokovniIzbirni(req, res, next) {
  debug("--dodajStrokovniIzbirni");
  
  if(req.strokovniIzbirniPredmeti.length == 0 || req.vpisniList.letnik.KT_strokovnihIzbirnihPredmetov <= 0)
    return res.status(400).json({ message: "Ne moreš izbirati strokovnih izbirnih predmetov"});
  
  for(var i = 0; i < req.strokovniIzbirniPredmeti.length; i++)
  {
    if(req.strokovniIzbirniPredmeti[i]._id.equals(req.predmet._id))
    {// Predmet najden
      
      var j;
      for(j = 0; j < req.vpisniList.splosniIzbirniPredmeti.length; j++)
      {// Preveri, če je že bil dodan splošnim izbirnim predmetom
        if(req.vpisniList.splosniIzbirniPredmeti[j]._id.equals(req.predmet._id))
          return res.status(400).json({ message: "Ta predmet je izbran kot splošni izbirni predmet"});
      }
      for(j = 0; j < req.vpisniList.strokovniIzbirniPredmeti.length; j++)
      {// Preveri, če je že bil dodan strokovnim izbirnim predmetom
        if(req.vpisniList.strokovniIzbirniPredmeti[j]._id.equals(req.predmet._id))
          return res.status(400).json({ message: "Ta predmet je že izbran kot strokovni izbirni predmet"});
      }
      
      var sumKT = 0;
      
      for(j = 0; j < req.vpisniList.strokovniIzbirniPredmeti.length; j++)
      {// Poglej skupno vsoto KT splošnih izbirnih predmetov
        sumKT += req.vpisniList.strokovniIzbirniPredmeti[j].KT;
      }
      
      if(sumKT + req.predmet.KT > req.vpisniList.letnik.KT_strokovnihIzbirnihPredmetov) {
        return res.status(400).json({ message: "Prekoračuješ dovoljeno število KT za strokovne izbirne predmete"});
      }
      
      req.vpisniList.strokovniIzbirniPredmeti.push(req.predmet);
      
      callNext(req, res, next);
      
      return;
    }
  }
  return res.status(400).json({ message: "Ne moreš izbrati izbranega strokovnega izbirnega predmeta"});
}
function odstraniStrokovniIzbirni(req, res, next) {
  debug("--odstraniStrokovniIzbirni");
  
  for(var i = 0; i < req.vpisniList.strokovniIzbirniPredmeti.length; i++)
  {
    if(req.vpisniList.strokovniIzbirniPredmeti[i]._id.equals(req.params.predmet_id))
    {
      req.vpisniList.strokovniIzbirniPredmeti.pull(req.params.predmet_id);
      callNext(req, res, next);
      return;
    }
  }
  res.status(400).json({ message: "Ta predmet še ni bil dodan"});
}
function dodajModulniIzbirni(req, res, next) {
  debug("--dodajModulniIzbirni");
  
  if(req.modulniPredmeti.length == 0 || req.vpisniList.letnik.st_modulov <= 0 || !req.vpisniList.prosta_izbira)
    return res.status(400).json({ message: "Ne moreš izbirati modulnih predmetov"});
  
  for(var i = 0; i < req.modulniPredmeti.length; i++)
  {
    if(req.modulniPredmeti[i]._id.equals(req.predmet._id))
    {// Predmet najden
      
      var j;
      for(j = 0; j < req.vpisniList.modulniPredmeti.length; j++)
      {
        if(req.vpisniList.modulniPredmeti[j]._id.equals(req.predmet._id))
          return res.status(400).json({ message: "Ta predmet je že bil dodan"});
      }
      
      if(req.vpisniList.modulniPredmeti.length + 1 > req.vpisniList.letnik.st_modulov * 3) {
        return res.status(400).json({ message: "Prekoračuješ dovoljeno število modulnih izbirnih predmetov"});
      }
      
      req.vpisniList.modulniPredmeti.push(req.predmet);
      
      callNext(req, res, next);
      
      return;
    }
  }
  return res.status(400).json({ message: "Ne moreš izbrati izbranega modulnega predmeta"});
}
function odstraniModulniIzbirni(req, res, next) {
  debug("--odstraniModulniIzbirni");
  
  for(var i = 0; i < req.vpisniList.modulniPredmeti.length; i++)
  {
    if(req.vpisniList.modulniPredmeti[i]._id.equals(req.params.predmet_id))
    {
      req.vpisniList.modulniPredmeti.pull(req.params.predmet_id);
      callNext(req, res, next);
      return;
    }
  }
  res.status(400).json({ message: "Ta predmet še ni bil dodan"});
}
function dodajModul(req, res, next) {
  debug("--dodajModul");
  
  if(req.moduli.length == 0 || req.vpisniList.letnik.st_modulov <= 0)
    return res.status(400).json({ message: "Ne moreš izbirati modulnih predmetov"});
  
  for(var i = 0; i < req.moduli.length; i++)
  {
    if(req.moduli[i]._id.equals(req.modul._id))
    {// Predmet najden
      
      var j;
      for(j = 0; j < req.vpisniList.moduli.length; j++)
      {
        if(req.vpisniList.moduli[j]._id.equals(req.modul._id))
          return res.status(400).json({ message: "Ta modul je že bil dodan"});
      }
      
      if(req.vpisniList.moduli.length + 1 > req.vpisniList.letnik.st_modulov) {
        return res.status(400).json({ message: "Prekoračuješ dovoljeno število modulov"});
      }
      
      req.vpisniList.moduli.push(req.modul);
      
      callNext(req, res, next);
      
      return;
    }
  }
  return res.status(400).json({ message: "Ne moreš izbrati izbranega modula"});
}
function odstraniModul(req, res, next) {
  debug("--odstraniModul");
  
  for(var i = 0; i < req.vpisniList.moduli.length; i++)
  {
    if(req.vpisniList.moduli[i]._id.equals(req.params.modul_id))
    {
      req.vpisniList.moduli.pull(req.params.modul_id);
      callNext(req, res, next);
      return;
    }
  }
  res.status(400).json({ message: "Ta modul še ni bil dodan"});
}

function vrniPredmetiPosodobljeni(req, res, next) {
  debug("--vrniPredmetiPosodobljeni");
  
  res.status(200).json({ message: "Predmeti uspešno posodobljeni"});
}
function vrniModuliPosodobljeni(req, res, next) {
  debug("--vrniModuliPosodobljeni");
  
  res.status(200).json({ message: "Moduli uspešno posodobljeni"});
}

// Oddaj vpisni list
function oddajaVpisnegaLista(req, res, next) {
  debug("--oddajaVpisnegaLista");
  
  req.vpisniList.valid = true;
  req.vpisniList.vpisan = new Date();
  
  req.vpisniList.save(function(err, vpisniList) {
    if(err || !vpisniList) {
      debug("---oddajaVpisnegaLista:\n" + err);
      return res.status(400).json({ message: "Napaka pri oddaji vpisnega lista"});
    }
    
    req.vpisniList = vpisniList;
    
    callNext(req, res, next);
  });
}
function preveriVeljavnostPredmetov(req, res, next) {
  debug("--preveriVeljavnostPredmetov");
  
  if(req.vpisniList.vrsta_vpisa.koda != 2)
  {
    var KTSplosnihPredmetov = 0;
    var KTStrokovnihPredmetov = 0;
    
    var STModulov = req.vpisniList.moduli.length;
    var STModulnihPredmetov = req.vpisniList.modulniPredmeti.length;
    
    var i;
    for(i = 0; i < req.vpisniList.splosniIzbirniPredmeti.length; i++)
    {// Seštej KT splođnih izbirnih predmetov
      KTSplosnihPredmetov += req.vpisniList.splosniIzbirniPredmeti[i].KT;
    }
    
    if(KTSplosnihPredmetov < req.vpisniList.letnik.KT_izbirnihPredmetov)
      return res.status(400).json({ message: "Izbrani splošni izbirni predmeti ne dosegajo dovolj kreditnih točk"});
    
    
    for(i = 0; i < req.vpisniList.strokovniIzbirniPredmeti.length; i++)
    {// Seštej KT splođnih izbirnih predmetov
      KTStrokovnihPredmetov += req.vpisniList.strokovniIzbirniPredmeti[i].KT;
    }
    
    if(KTStrokovnihPredmetov < req.vpisniList.letnik.KT_strokovnihIzbirnihPredmetov)
      return res.status(400).json({ message: "Izbrani strokovni izbirni predmeti ne dosegajo dovolj kreditnih točk"});
    
    if(req.vpisniList.prosta_izbira)
    {
      if(STModulnihPredmetov / 3 < req.vpisniList.letnik.st_modulov)
      {
        return res.status(400).json({ message: "Ni izbranih dovolj modulnih predmetov"});
      }
    }
    else
    {
      if(STModulov < req.vpisniList.letnik.st_modulov)
      {
        return res.status(400).json({ message: "Ni izbranih dovolj modulov"});
      }
    }
  }
  else
  {
    debug("Ponavlja letnik, ni treba preverjat veljavnosti predmetov");
  }
  
  callNext(req, res, next);
}
function zdruziPredmete(req, res, next) {
  debug("--zdruziPredmete");
  
  req.skupnoPredmetiStudenta = [];
  req.skupnoPredmeti = [];
  
  var i;
  
  // Dodaj obvezne predmete
  for(i = 0; i < req.vpisniList.obvezniPredmeti.length; i++) {
    req.skupnoPredmeti.push(req.vpisniList.obvezniPredmeti[i]);
  }
  
  // Dodaj strokovne izbirne predmete
  for(i = 0; i < req.vpisniList.strokovniIzbirniPredmeti.length; i++) {
    req.skupnoPredmeti.push(req.vpisniList.strokovniIzbirniPredmeti[i]);
  }
  
  // Dodaj splošne izbirne predmete
  for(i = 0; i < req.vpisniList.splosniIzbirniPredmeti.length; i++) {
    req.skupnoPredmeti.push(req.vpisniList.splosniIzbirniPredmeti[i]);
  }
  
  // Dodaj modulne predmete (če ima prosto izbiro predmetov)
  for(i = 0; i < req.vpisniList.modulniPredmeti.length; i++) {
    req.skupnoPredmeti.push(req.vpisniList.modulniPredmeti[i]);
  }
  
  // Še moduli v samostojne predmete in jih dodaj
  for(i = 0; i < req.vpisniList.moduli.length; i++) {
    var modul = req.vpisniList.moduli[i];
    
    debug(modul);
    
    for(var j = 0; j < modul.predmeti.length; j++) {
      debug(modul.predmeti[j]);
      req.skupnoPredmeti.push(modul.predmeti[j]);
    }
  }
  
  debug(req.skupnoPredmeti);
  
  req.vpisniList.predmeti = req.skupnoPredmeti;
  
  callNext(req, res, next);
}

function prijaviStudenta(req, res, next) {
  debug("--prijaviStudenta");
  
  req.skupnoPredmetiStudenta = req.vpisniList.neopravljeni_predmeti.slice(0);
  
  var i;
  // Dodaj predmete študentu
  for(i = 0; i < req.vpisniList.predmeti.length; i++) {
    req.skupnoPredmetiStudenta.push({
      predmet: req.vpisniList.predmeti[i]
    });
  }
  
  req.student.studijska_leta_studenta.push({
    studijsko_leto: req.vpisniList.studijsko_leto,
    letnik: req.vpisniList.letnik,
    predmeti: req.skupnoPredmetiStudenta,
    
    kraj_izvajanja: req.vpisniList.kraj_izvajanja,
    oblika_studija: req.vpisniList.oblika_studija,
    vrsta_studija: req.vpisniList.vrsta_studija,
    nacin_studija: req.vpisniList.nacin_studija,
    vrsta_vpisa: req.vpisniList.vrsta_vpisa,
  });
  
  req.student.save(function(err, student) {
    if(err || !student) {
      debug("---prijaviStudenta:\n" + err);
      return res.status(404).json({ message: "Napaka pri prijavi študenta v študijsko leto"});
    }
    
    req.student = student;
    
    callNext(req, res, next);
  });
}
function potrdiVpisniList(req, res, next) {
  debug("--potrdiVpis");
  
  req.vpisniList.valid = true;
  req.vpisniList.potrjen = true;
  
  req.vpisniList.predmeti = req.skupnoPredmeti;
  
  req.vpisniList.save(function(err, vpisniList) {
    if(err || !vpisniList) {
      debug("---potrdiVpisniList:\n" + err);
      return res.status(404).json({ message: "Ne morem potrditi vpisnega lista"});
    }
    
    req.vpisniList = vpisniList;
    
    callNext(req, res, next);
  });
}

function porabiVseZetone(req, res, next) {
  debug("--porabiVseZetone");
  
  for(var i = 0; i < req.student.zetoni.length; i++)
  {
    req.student.zetoni[i].izkoriscen = true;
  }
  
  req.student.save(function(err, student) {
    if(err || !student)
    {
      debug("---porabiVseZetone:\n" + err);
      return res.status(400).json({ message: "Napaka pri shranjevanju študenta"});
    }
    
    req.student = student;
    
    callNext(req, res, next);
  });
}
function vrniUspesnoOddano(req, res) {
  debug("--vrniUspesnoOddano");
  
  res.status(201).json({ message: "Vpisnica uspešno oddana"});
}