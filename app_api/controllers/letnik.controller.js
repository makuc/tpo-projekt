var mongoose = require("mongoose");
var callNext = require("./_include/callNext");

var Letnik = mongoose.model('Letnik');
var StudijskiProgram = mongoose.model('StudijskiProgram');


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
  if(!req.body || (!req.body.naziv && !req.body.pogoj_letnik && !req.body.studijski_program)) {
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


/* Funkcije */
function createLetnik(req, res, next) {
  Letnik.create({
    naziv: req.body.naziv,
    studijskiProgram: req.studijskiProgram,
    pogoj_letnik: req.pogojLetnik
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