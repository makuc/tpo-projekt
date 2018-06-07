var mongoose = require("mongoose");
var callNext = require("./_include/callNext");

let debug = require('debug')('letnik');

var Letnik = mongoose.model('Letnik');
var StudijskiProgram = mongoose.model('StudijskiProgram');
let Student = mongoose.model('Student');
let StudijskoLeto = mongoose.model('StudijskoLeto');


/* GET home page. */
module.exports.getLetnike = function(req, res) {
  Letnik
    .find({ valid: true })
    .limit(0)
    .sort("naziv")
    .populate([
      {
        "path": "studijskiProgram",
        populate: {
          path: "vrstaStudija"
        }
      },
      {
        "path": "pogoj_letnik"
      }
    ])
    .exec(function(err, letniki) {
      if(err || !letniki) {
        return res.status(404).json({ message: "Ne najdem letnikov" });
      }
      res.status(200).json(letniki);
    });
};
module.exports.getVseLetnike = function(req, res) {
  Letnik
    .find()
    .limit(0)
    .populate([
      {
        "path": "studijskiProgram",
        populate: {
          path: "vrstaStudija"
        }
      },
      {
        "path": "pogoj_letnik"
      }
    ])
    .sort("naziv")
    .exec(function(err, letniki) {
      if(err || !letniki) {
        return res.status(404).json({ message: "Ne najdem letnikov" });
      }
      res.status(200).json(letniki);
    });
};
module.exports.getIzbrisaneLetnike = function(req, res) {
  Letnik
    .find({ valid: false })
    .limit(0)
    .populate([
      {
        "path": "studijskiProgram",
        populate: {
          path: "vrstaStudija"
        }
      },
      {
        "path": "pogoj_letnik"
      }
    ])
    .sort("naziv")
    .exec(function(err, letniki) {
      if(err || !letniki) {
        return res.status(404).json({ message: "Ne najdem letnikov" });
      }
      res.status(200).json(letniki);
    });
};
module.exports.getLetnik = function(req, res) {
  callNext(req, res, [ najdiLetnikId, vrniLetnik ]);
};
module.exports.addLetnik = function(req, res) {
  if(!req.body || !req.body.naziv || !req.body.studijski_program)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje letnika" });
  
  callNext(req, res, [ validateStudijskiProgram, validatePogojLetnik, createLetnik ]);
};
module.exports.editLetnik = function(req, res) {
  if(!req.body || (!req.body.naziv && !req.body.pogoj_letnik && !req.body.studijski_program &&
          !req.body.KT_izbirnihPredmetov && !req.body.KT_strokovnihIzbirnihPredmetov && !req.body.st_modulov)) {
    return res.status(400).json({ message: "Nobenega podatka letnika ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiLetnikId, validateStudijskiProgram, validatePogojLetnik, urediLetnik, vrniLetnik ]);
};
module.exports.delLetnik = function(req, res) {
  callNext(req, res, [ najdiLetnikId, izbrisiLetnik, vrniLetnik ]);
};
module.exports.obnoviLetnik = function(req, res) {
  callNext(req, res, [ najdiLetnikId, obnoviLetnik, vrniLetnik ]);
};

module.exports.vpisaniVLetnikStudijskoLeto = function(req, res) {
  debug("--vpisaniVLetnikStudijskoLeto");
  
  callNext(req, res, [
    validateStudijskoLeto, validateLetnik, studentiLetnikaStudijskoLeto
  ]);
};

/* Funkcije */
function createLetnik(req, res, next) {
  Letnik.create({
    naziv: req.body.naziv,
    studijskiProgram: req.studijskiProgram,
    pogoj_letnik: req.pogojLetnik,
    
    KT_izbirnihPredmetov: req.body.KT_izbirnihPredmetov,
    KT_strokovnihIzbirnihPredmetov: req.body.KT_strokovnihIzbirnihPredmetov,
    st_modulov: req.body.st_modulov
  }, function(err, letnik) {
    if(err) {
      //console.log(err);
      return res.status(400).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( letnik );
  });
}
function najdiLetnikId(req, res, next) {
  Letnik
    .findById(req.params.letnik_id)
    .populate([
      {
        "path": "studijskiProgram"
      },
      {
        "path": "pogoj_letnik"
      }
    ])
    .exec(function(err, letnik) {
    if(err || !letnik) {
      return res.status(404).json({ message: "Ne najdem želenega letnika" });
    }
    req.letnik = letnik;
    
    callNext(req, res, next);
  });
}
function vrniLetnik(req, res) {
  res.status(200).json(req.letnik);
}
function urediLetnik(req, res, next) {
  if(req.body.naziv)
    req.letnik.naziv = req.body.naziv;
  if(req.studijskiProgram)
    req.letnik.studijskiProgram = req.studijskiProgram;
  if(req.pogojLetnik)
    req.letnik.pogoj_letnik = req.pogojLetnik;
  if(req.body.KT_izbirnihPredmetov)
    req.letnik.KT_izbirnihPredmetov = req.body.KT_izbirnihPredmetov;
  if(req.body.KT_strokovnihIzbirnihPredmetov)
    req.letnik.KT_strokovnihIzbirnihPredmetov = req.body.KT_strokovnihIzbirnihPredmetov;
  if(req.body.st_modulov)
    req.letnik.st_modulov = req.body.st_modulov;
  
  req.letnik.save(function(err, letnik) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju letnika" });
    
    req.letnik = letnik;
    
    callNext(req, res, next);
  });
}

function izbrisiLetnik(req, res, next) {
  req.letnik.valid = false;
  
  req.letnik.save(function(err, letnik) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju letnika" });
    }
    req.letnik = letnik;
    
    callNext(req, res, next);
  });
}
function obnoviLetnik(req, res, next) {
  req.letnik.valid = true;
  req.letnik.save(function(err, letnik) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju letnika" });
    
    req.letnik = letnik;
    
    callNext(req, res, next);
  });
}

function validatePogojLetnik(req, res, next) {
  if(!req.body.pogoj_letnik)
    return callNext(req, res, next);
  
  Letnik.findById(req.body.pogoj_letnik, function(err, pogojLetnik) {
    if(err || !pogojLetnik) {
      //console.log(err);
      return res.status(400).json({ message: "Izbrani letnik za pogoj ne obstaja" });
    }
    
    req.pogojLetnik = pogojLetnik;
    
    callNext(req, res, next);
  });
}
function validateStudijskiProgram(req, res, next) {
  if(!req.body.studijski_program)
    return callNext(req, res, next);
  
  StudijskiProgram.findById(req.body.studijski_program, function(err, studijskiProgram) {
    if(err || !studijskiProgram) {
      //console.log(err);
      return res.status(400).json({ message: "Izbrani študijski program ne obstaja" });
    }
    
    req.studijskiProgram = studijskiProgram;
    
    callNext(req, res, next);
  });
}

function validateLetnik(req, res, next) {
  debug("--validateLetnik");
  Letnik.findById(req.params.letnik, function(err, letnik) {
    if(err || !letnik) {
      debug("---validateLetnik", err);
      res.status(400).json({ message: "Izbrani letnik ne obstaja" });
    }
    else
    {
      req.letnik = letnik;
      debug("Letnik: ", letnik.naziv);
      
      callNext(req, res, next);
    }
  });
}
function validateStudijskoLeto(req, res, next) {
  debug("--validateStudijskoLeto");
  
  debug("Leto ID:", req.params.leto);
  StudijskoLeto.findById(req.params.leto, function(err, leto) {
    if(err || !leto) {
      debug("--validateStudijskoLeto:", err);
      res.status(400).json({ message: "Izbrano študijsko leto ne obstaja" });
    }
    else
    {
      req.leto = leto;
      debug("Študijsko leto: ", leto.studijsko_leto);
      
      callNext(req, res, next);
    }
  });
}
function studentiLetnikaStudijskoLeto(req, res, next) {
  debug("--studentiLetnikaStudijskoLeto");
  Student
    .find({
      "studijska_leta_studenta": {
        $elemMatch: {
          studijsko_leto: req.leto,
          letnik: req.letnik
        }
      }
    })
    .populate()
    .select("ime priimek vpisna_stevilka spol email prenosni_telefon")
    .exec(function(err, studenti) {
      if(err || !studenti)
      {
        debug("---studentiLetnikaStudijskoLeto:" + err);
        res.status(404).json({ message: "Ne najdem študentov"});
      }
      else
      {
        debug("Najdenih " + studenti.length + " študentov");
        res.status(200).send(studenti);
      }
    });
}