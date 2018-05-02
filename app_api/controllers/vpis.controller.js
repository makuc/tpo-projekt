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
  callNext(req, res, [ najdiStudentaId, pripraviVpisniList, porabiZeton, vrniVpisniList ]);
};



/* Funkcije kontrolerja */
function najdiStudentaId(req, res, next) {
  models.Student
    .findById(req.params.student_id)
    .exec(function(err, student) {
      if(err || !student) {
        return res.status(404).json({ message: "Izbrani študent ne obstaja"});
      }
      
      req.student = student;
      
      callNext(req, res, next);
    });
}
function pripraviVpisniList(req, res, next) {
  if(req.params.zeton_id) {
    req.zeton = req.student.zetoni.id(req.params.zeton_id);
    
    if(!req.zeton) {
      return res.status(403).json({ message: "Nimaš zahtevanega žetona"});
    } else if(req.zeton.izkoriscen) {
      return res.status(404).json({ message: "Ta žeton je že bil izkoriščen"});
    }
    
    req.vpisniList = new models.Vpis({
      
      student: req.student,
      
      studijsko_leto: req.zeton.studijsko_leto,
      letnik: req.zeton.letnik,
      studijski_program: req.zeton.studijski_program,
      vrsta_studija: req.zeton.vrsta_studija,
      vrsta_vpisa: req.zeton.vrsta_vpisa,
      
      nacin_studija: req.zeton.nacin_studija,
      oblika_studija: req.zeton.oblika_studija,
      
      neopravljeni_predmeti: req.zeton.neopravljeni_predmeti,
      
      prosta_izbira: req.zeton.prosta_izbira
      
    });
    
    callNext(req, res, next);
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

function vrniVpisniList(req, res, next) {
  res.status(200).json(req.vpisniList);
}