var mongoose = require('mongoose');
var callNext = require("./_include/callNext");

var Letnik = mongoose.model("Letnik");
var StudijskoLeto = mongoose.model("StudijskoLeto");
var Student = mongoose.model("Student");
var Predmetnik = mongoose.model("Predmetnik");


module.exports.ustvariZetone = function(req, res) {
  if(!req.body || !req.body.minimalno_KT || !req.body.letnik || !req.body.trenutno_leto || !req.body.naslednje_leto)
    return res.status(400).json({ message: "Ni podanih vseh potrebnih podatkov za generiranje žetona" });
  
  callNext(req, res, [ init, najdiLetnik, najdiStudente,
    najdiTrenutnoStudijskoLeto, najdiNaslednjeStudijskoLeto, najdiNaslednjiLetnik,
    pridobiPredmetnikeLetnika, obdelajStudente,
    vrniRezultat
  ]);
};


/* Funkcije kontrolerja */
function init(req, res, next) {
  req.obdelani = [];
  req.zakljuceni = [];
  
  
  callNext(req, res, next);
}
function najdiLetnik(req, res, next) {
  Letnik
    .findById(req.body.letnik, function(err, letnik) {
      if(err || !letnik)
      {
        console.log("---najdiLetnik:\n" + err);
        return res.status(400).json({ message: "Ne najdem izbranega letnika"});
      }
      
      req.letnik = letnik;
      
      callNext(req, res, next);
    });
}
function najdiTrenutnoStudijskoLeto(req, res, next) {
  StudijskoLeto
    .findById(req.body.trenutno_leto)
    //.sort("-studijsko_leto")
    //.skip(1)
    .exec(function(err, leto) {
      if(err || !leto) {
        return res.status(400).json({ message: "Ne najdem izbranega trenutnega študijskega leta!" });
      }
      
      req.trenutno_leto = leto;
      callNext(req, res, next);
    });
}
function najdiNaslednjeStudijskoLeto(req, res, next) {
  StudijskoLeto
    .findById(req.body.naslednje_leto)
    //.sort("-studijsko_leto")
    //.skip(1)
    .exec(function(err, leto) {
      if(err || !leto) {
        return res.status(400).json({ message: "Ne najdem izbranega naslednjega študijskega leta!" });
      }
      
      req.naslednje_leto = leto;
      callNext(req, res, next);
    });
}
function pridobiPredmetnikeLetnika(req, res, next) {
  Predmetnik
    .find({
      letnik: req.letnik
    })
    .populate()
    .exec(function(err, predmetniki) {
      if(err || !predmetniki)
      {
        console.log("---pridobiPredmetnikeLetnika:\n" + err);
        return res.status(404).json({ message: " Napaka pri pridobivanju predmetnika"});
      }
      
      req.predmetniki = predmetniki;
      
      callNext(req, res, next);
    });
}

function najdiStudente(req, res, next) {
  Student
    .find({
      "studijska_leta_studenta.letnik": req.body.letnik
    })
    .populate("studijska_leta_studenta.predmeti.predmet studijska_leta_studenta.vrsta_vpisa")
    .exec(function(err, studenti) {
      if(err || !studenti)
      {
        console.log("---najdiStudente:\n" + err);
        return res.status(404).json({ message: "Napaka pri iskanju študentov"});
      }
      
      req.studenti = studenti;
      
      callNext(req, res, next);
    });
}

function najdiNaslednjiLetnik(req, res, next) {
  Letnik
    .findOne({
      pogoj_letnik: req.body.letnik
    })
    .exec(function(err, letnik) {
      if(err) {
        return res.status(400).json({ message: "Ne najdem naslednjega letnika" });
      }
      
      req.naslednji_letnik = letnik;
      
      callNext(req, res, next);
    });
}
function vrniRezultat(req, res) {
  res.status(201).json( req.zakljuceni );
}

function obdelajStudente(req, res, next) {
  if(next)
    req.myNext = next;
  
  if(req.studenti.length > 0)
  {
    req.student = req.studenti.pop();
    req.student.zetoni = [];
    
    callNext(req, res, [
      pridobiNeopravljenePredmete, odstejPrejsnjaRednaPolaganja,
      preveriPonavljanjeLetnika, ustvariZetonPonavljanje,
      pridobiNeopravljenePredmete, ustvariZetonNaslednjiLetnik,
      shraniStudenta,
      obdelajStudente
    ]);
  }
  else
  {
    next = req.myNext;
    req.myNext = undefined;
    
    callNext(req, res, next);
  }
}
function preveriPonavljanjeLetnika(req, res, next) {
  req.ponavljal = false;
  
  var leta = req.student.studijska_leta_studenta;
  for(var i = 0; i < leta.length; i++)
  {
    if(leta[i].vrsta_vpisa.equals("5ac8be2a7482291008d3f9f6"))
    {
      req.ponavljal = true;
    }
  }
  
  callNext(req, res, next);
}
function ustvariZetonPonavljanje(req, res, next) {
  if(!req.ponavljal)
  {// Ni še ponavljal
    
    var prej = req.student.studijska_leta_studenta[req.student.studijska_leta_studenta.length - 1];
    
    req.student.zetoni.push({
      studijsko_leto: req.naslednje_leto,
      letnik: req.letnik,
      studijski_program: req.letnik.studijskiProgram,
      vrsta_studija: prej.vrsta_studija,
      vrsta_vpisa: "5ac8be2a7482291008d3f9f6",
      kraj_izvajanja: prej.kraj_izvajanja,
      nacin_studija: prej.nacin_studija,
      oblika_studija: prej.oblika_studija,
      studijsko_leto_prvega_vpisa_v_ta_program: req.trenutno_leto,
      neopravljeni_predmeti: req.neopravljeni_predmeti
    });
  }
  
  callNext(req, res, next);
}

function pridobiNeopravljenePredmete(req, res, next) {
  req.neopravljeni_predmeti = [];
  
  req.opravilKT = 0;
  req.sumOcen = 0;
  req.opravljenoPredmetov = 0;
  
  req.opravilLetnik = true;
  
  var leto = req.student.studijska_leta_studenta[req.student.studijska_leta_studenta.length - 1];
  
  for(var i = 0; i < leto.predmeti.length; i++)
  {
    if(leto.predmeti[i].ocena < 6)
    {
      req.neopravljeni_predmeti.push(leto.predmeti[i]);
    }
    else
    {
      var opravljen = leto.predmeti[i];
      
      if(preveriPredmetLetnik(req.predmetniki, opravljen.predmet))
      {
        req.opravilKT += leto.predmeti[i].predmet.KT;
        req.sumOcen += leto.predmeti[i].ocena;
        req.opravljenoPredmetov++;
      }
      
    }
  }
  
  callNext(req, res, next);
}
function odstejPrejsnjaRednaPolaganja(req, res, next) {
  // Zdej pa še odštej polaganja, ki jih je opravil redno (v kolikor ponavlja letnik)
  var x,y,z;
  
  var neopravljeni_predmeti = req.neopravljeni_predmeti;
  req.neopravljeni_predmeti = [];
  
  for(x = req.student.studijska_leta_studenta.length - 1; x >= 0 && neopravljeni_predmeti.length > 0 ; x--)
  {
    var leto = req.student.studijska_leta_studenta[x];
    
    if(leto.vrsta_vpisa.koda == 1)
    {
      // Pojdi skozi vse predmete, ki jih je opravljal v tem študijskem letu
      for(y = 0; y < leto.predmeti.length && neopravljeni_predmeti.length > 0; y++)
      {
        var predmet = leto.predmeti[y];
        
        //Zdej pa vsak predmet primerjaj še z Neopravljenimi predmeti
        for(z = 0; z < neopravljeni_predmeti.length; z++)
        {
          var neopr = neopravljeni_predmeti[z];
          
          // Zdej pa najdi predmet
          if(neopr.predmet._id.equals(predmet.predmet._id))
          {
            req.neopravljeni_predmeti.push({
              predmet: neopr.predmet,
              ocena: neopr.ocena,
              izpit: neopr.izpit,
              zaporedni_poskus: 0,
              zaporedni_poskus_skupaj: (neopr.zaporedni_poskus_skupaj - neopr.zaporedni_poskus)
            });
            
            neopravljeni_predmeti.splice(z, 1);
            y--;
            break;
          }
        }
      }
    }
  }
  
  callNext(req, res, next);
}
function preveriPredmetLetnik(predmetniki, predmet) {
  for(var i = 0; i < predmetniki.length; i++)
  {// Obdelaj VSE predmetnike
    var predmetnik = predmetniki[i];
    
    for(var j = 0; j < predmetnik.predmeti.length; j++)
    {// Najdi ustrezen predmet
      
      var pr = predmetnik.predmeti[j];
      
      if(pr.equals(predmet._id))
      {
        return true;
      }
      
    }
  }
  
  return false;
}
function ustvariZetonNaslednjiLetnik(req, res, next) {
  if(req.naslednji_letnik && req.opravilKT >= parseInt(req.body.minimalno_KT, 10))
  {// Lahko nadaljuje v višji letnik, vsaj po številu kreditnih točk
    var prosta_izbira = false;
    if(req.sumOcen / req.opravljenoPredmetov >= 8.5)
      prosta_izbira = true;
    
    var prej = req.student.studijska_leta_studenta[req.student.studijska_leta_studenta.length - 1];
    
    // Ponastavi zaporedna polaganja za to študijsko leto
    for(var i = 0; i < req.neopravljeni_predmeti.length; i++)
    {
      req.neopravljeni_predmeti[i].zaporedni_poskus = 0;
    }
    
    req.student.zetoni.push({
      studijsko_leto: req.naslednje_leto,
      letnik: req.naslednji_letnik,
      studijski_program: req.letnik.studijskiProgram,
      vrsta_studija: prej.vrsta_studija,
      vrsta_vpisa: "5ac8be2a7482291008d3f9f5",
      kraj_izvajanja: prej.kraj_izvajanja,
      nacin_studija: prej.nacin_studija,
      oblika_studija: prej.oblika_studija,
      studijsko_leto_prvega_vpisa_v_ta_program: req.naslednje_leto,
      neopravljeni_predmeti: req.neopravljeni_predmeti,
      
      prosta_izbira: prosta_izbira
    });
  }
  
  callNext(req, res, next);
}

function shraniStudenta(req, res, next) {
  req.student.save(function(err, student) {
    if(err || !student)
    {
      console.log("---shraniStudente:\n" + err);
      return res.status(400).json({ message: "Napaka pri shranjevanju študenta"});
    }
    
    req.zakljuceni.push(student);
    
    callNext(req, res, next);
  });
}