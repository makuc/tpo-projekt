var mongoose = require('mongoose');
var callNext = require("./_include/callNext");

var Vpis = mongoose.model("Vpis");
var Letnik = mongoose.model("Letnik");
var VrstaVpisa = mongoose.model("VrstaVpisa");
var Izpit = mongoose.model("Izpit");
var StudijskoLeto = mongoose.model("StudijskoLeto");

module.exports.ustvariZetone = function(req, res) {
  init(req, res, [ najdiStudijskoLeto, najdiVpise, najdiVrstoVpisa, najdiNaslednjeStudijskoLeto, najdiNaslednjiLetnik, ustvariZetone, vrniRezultat ]);
};
module.exports.ustvariZeton = function(req, res) {
  if(req.body && req.body.studijski_program && req.body.letnik)
    return init(req, res, [ najdiStudijskoLeto, najdiVpis, najdiVrstoVpisa, najdiNaslednjeStudijskoLeto, najdiNaslednjiLetnik, ustvariZetone, vrniRezultat ]);
  else
    res.status(400).json({ message: "Podana morata biti študijski program in letnik" });
};
module.exports.urediZeton = function(req, res) {
  res.status(403).json({ message: "Funkcija ni vzpostavljena" });
};
module.exports.izbrisZetona = function(req, res) {
  res.status(403).json({ message: "Funkcija ni vzpostavljena" });
};
module.exports.pridobiZetoneStudenta = function(req, res) {
  res.status(403).json({ message: "Funkcija ni vzpostavljena" });
};

/* Funkcije kontrolerja */
function init(req, res, next) {
  console.log("---init");
  req.students = [];
  req.obdelani = [];
  
  if(!req.body || req.body.minimalno_KT || req.body.vrsta_vpisa)
    callNext(req, res, next);
  else
    res.status(400).json({ message: "Ni podanih potrebnih podatkov za generiranje žetona : 'minimalno točk' in 'vvrsto vpisa'" });
}
function najdiStudijskoLeto(req, res, next) {
  console.log("---najdiStudijskoLeto");
  StudijskoLeto
    .findOne()
    .sort("-studijsko_leto")
    .skip(1)
    .exec(function(err, leto) {
      if(err || leto) {
        return res.status(400).json({ message: "Ne najdem študijskega leta!" });
      }
      
      req.studijsko_leto = leto;
      callNext(req, res, next);
    });
}
function najdiNaslednjeStudijskoLeto(req, res, next) {
  console.log("---najdiNaslednjeStudijskoLeto");
  StudijskoLeto
    .findOne()
    .sort("-studijsko_leto")
    .exec(function(err, leto) {
      if(err || leto) {
        return res.status(400).json({ message: "Ne najdem študijskega leta!" });
      }
      
      req.naslednje_studijsko_leto = leto;
      callNext(req, res, next);
    });
}
function najdiVpis(req, res, next) {
  console.log("---najdiVpis");
  Vpis
    .findOne({
      student: req.params.student_id
    })
    .sort("-vpisan")
    .populate([
        {
          path: "student",
          select: "-__v",
          populate: ""
        }
      ])
    .exec(function(err, vpis) {
      if(err) {
        //console.log(err)
      }
      req.vpisi.push(vpis);
      
      req.letnik = vpis.letnik;
      
      callNext(req, res, next);
    });
}
function najdiVpise(req, res, next) {
  console.log("---najdiVpise");
  Vpis
    .find({
      studijski_program: req.body.studijski_program,
      letnik: req.body.letnik,
      studijsko_leto: req.studijsko_leto
    })
    .populate([
        {
          path: "student",
          select: "-__v",
          populate: ""
        }
      ])
    .exec(function(err, vpisi) {
      if(err) {
        //console.log(err);
      }
      
      req.vpisi = vpisi;
      
      req.letnik = vpisi[0].letnik;
      
      callNext(req, res, next);
    });
}
function najdiVrstoVpisa(req, res, next) {
  console.log("---najdiVrstoVpisa");
  VrstaVpisa
    .findById(req.body.vrsta_vpisa)
    .exec(function(err, vrsta) {
      if(err || !vrsta)
        return res.status(400).json({ message: "Ne najdem izbrane vrste vpisa" });
      
      req.vrsta_vpisa = vrsta;
      
      callNext(req, res, next);
    });
}
function najdiNaslednjiLetnik(req, res, next) {
  console.log("---najdiNaslednjiLetnik");
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
function ustvariZetone(req, res, next) {
  console.log("---ustvariZetone");
  if(req.vpisi.length > 0) {
    req.vpis = req.vpis.shift();
    obdelajVpis(req, res, next);
  } else {
    callNext(req, res, next);
  }
}
function vrniRezultat(req, res) {
  console.log("---vrniRezultat");
  res.status(201).json( req.obdelani );
}

// Postopna izdelava žetona
function obdelajVpis(req, res, next) {
  console.log("------obdelajVpis");
  var stud_leta = req.student.studijsko_leto_studenta;
  var trenutno_leto = stud_leta[stud_leta.length - 1];
  
  req.vpisNaslednjiLetnik = true; // Se lahko vpiše v naslednji letnik?
  
  req.neopravljeni_predmeti = [];
  req.queuePredmetov = trenutno_leto.predmeti.slice(0);
  
  preveriOpravljenostPredmeta(req, res, next);
}
function preveriOpravljenostPredmeta(req, res, next) {
  console.log("------preveriOpravljenostPredmeta");
  if(req.queuePredmetov.length > 0) {
    var predmet = req.queuePredmetov.shift();
    Izpit
      .findOne({
        studijsko_leto: req.studijsko_leto,
        predmet: predmet.predmet,
        "polagalci.student": req.vpis.student
      })
      .sort("-datum_izvajanja")
      .exec(function(err, izpit) {
        if(err) {
          //console.log(err);
        }
        if(!izpit) {
          req.neopravljeni_predmeti.push(req.predmet);
          
          return preveriOpravljenostPredmeta(req, res, next);
          
        } else {
          for(var i = 0; i < izpit.polagalci.length; i++) {
            if(izpit.polagalci[i].student == req.vpis.student._id) {
              
              req.predmet.ocena = izpit.polagalci[i].ocena;
              
              if(izpit.polagalci[i].ocena < 6)
                req.neopravljeni_predmeti.push(req.predmet);
              
              break;
            }
          }
          
          return preveriOpravljenostPredmeta(req, res, next);
          
        }
        
        
      });
  } else {
    // Nadaljuj s kreiranjem žetona
    kreirajZeton(req, res, next);
  }
}
function kreirajZeton(req, res, next) {
  var prosta_izbira = false;
  
  req.vpis.zeton.push({
    studijsko_leto: req.naslednje_studijsko_leto,
    letnik: req.naslednji_letnik,
    studijski_program: req.vpis.studijski_program,
    vrsta_studija: req.vpis.vrsta_studija,
    vrsta_vpisa: req.vpis.vrsta_vpisa,
    
    nacin_studija: req.vpis.nacin_studija,
    oblika_studija: req.vpis.oblika_studija,
    
    neopravljeni_predmeti: req.neopravljeni_predmeti,
    
    prosta_izbira: prosta_izbira
  });
  
  req.vpis.save(function(err, vpis) {
    if(err) {
      return res.status(400).send({ message: "Nekaj je šlo narobe" });
    }
    
    req.obdelani.push(vpis);
    
    callNext(req, res, next);
  });
}