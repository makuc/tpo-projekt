var mongoose = require("mongoose");
var callNext = require("./_include/callNext");

var StudijskiProgram = mongoose.model('StudijskiProgram');
var VrstaStudija = mongoose.model('VrstaStudija');


/* GET home page. */
module.exports.getStudijskePrograme = function(req, res) {
  StudijskiProgram
    .find({ valid: true })
    .limit(0)
    .sort("sifra")
    .populate("vrstaStudija")
    .exec(function(err, studijskiProgrami) {
      if(err || !studijskiProgrami) {
        return res.status(404).json({ message: "Ne najdem študijskih programov" });
      }
      res.status(200).json(studijskiProgrami);
    });
};
module.exports.getVseStudijskePrograme = function(req, res) {
  StudijskiProgram
    .find()
    .limit(0)
    .sort("sifra")
    .populate("vrstaStudija")
    .exec(function(err, studijskiProgrami) {
      if(err || !studijskiProgrami) {
        return res.status(404).json({ message: "Ne najdem študijskih programov" });
      }
      res.status(200).json(studijskiProgrami);
    });
};
module.exports.getIzbrisaneStudijskePrograme = function(req, res) {
  StudijskiProgram
    .find({ valid: false })
    .limit(0)
    .sort("sifra")
    .populate("vrstaStudija")
    .exec(function(err, studijskiProgrami) {
      if(err || !studijskiProgrami) {
        return res.status(404).json({ message: "Ne najdem študijskih programov" });
      }
      res.status(200).json(studijskiProgrami);
    });
};
module.exports.getStudijskiProgram = function(req, res) {
  callNext(req, res, [ najdiStudijskiProgramId, vrniStudijskiProgram ]);
};
module.exports.addStudijskiProgram = function(req, res) {
  if(!req.body || !req.body.sifra || !req.body.naziv || !req.body.vrstaStudija)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje študijskega programa" });
  
  callNext(req, res, [ validateVrstaStudija, createStudijskiProgram ]);
};
module.exports.editStudijskiProgram = function(req, res) {
  if(!req.body || (!req.body.sifra && !req.body.naziv && !req.body.vrstaStudija && ! req.body.semestri && !req.body.sifraEVS)) {
    return res.status(400).json({ message: "Nobenega podatka študijskega programa ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiStudijskiProgramId, validateVrstaStudija, urediStudijskiProgram, vrniStudijskiProgram ]);
};
module.exports.delStudijskiProgram = function(req, res) {
  callNext(req, res, [ najdiStudijskiProgramId, izbrisiStudijskiProgram, vrniStudijskiProgram ]);
};
module.exports.obnoviStudijskiProgram = function(req, res) {
  callNext(req, res, [ najdiStudijskiProgramId, obnoviStudijskiProgram, vrniStudijskiProgram ]);
};


/* Funkcije */
function createStudijskiProgram(req, res, next) {
  StudijskiProgram.create({
    sifra: req.body.sifra,
    naziv: req.body.naziv,
    vrstaStudija: req.vrstaStudija,
    semestri: req.body.semestri,
    sifraEVS: req.body.sifraEVS
  }, function(err, studijskiProgram) {
    if(err) {
      //console.log(err);
      return res.status(400).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( studijskiProgram );
  });
}
function najdiStudijskiProgramId(req, res, next) {
  StudijskiProgram
    .findById(req.params.program_id)
    .populate("vrstaStudija")
    .exec(function(err, studijskiProgram) {
    if(err || !studijskiProgram) {
      return res.status(404).json({ message: "Ne najdem želenega študijskega programa" });
    }
    req.studijskiProgram = studijskiProgram;
    
    callNext(req, res, next);
  });
}
function vrniStudijskiProgram(req, res) {
  res.status(200).json(req.studijskiProgram);
}
function urediStudijskiProgram(req, res, next) {
  if(typeof req.body.sifra === 'string')
    req.studijskiProgram.sifra = req.body.sifra;
  if(typeof req.body.naziv === 'string')
    req.studijskiProgram.naziv = req.body.naziv;
  if(req.body.vrstaStudija)
    req.studijskiProgram.vrstaStudija = req.body.vrstaStudija;
  if(typeof req.body.semestri === 'number' || typeof req.body.semestri === 'string')
    req.studijskiProgram.semestri = req.semestri;
  if(typeof req.body.sifraEVS === 'number' || typeof req.body.sifraEVS === 'string')
    req.studijskiProgram.sifraEVS = req.sifraEVS;
  
  req.studijskiProgram.save(function(err, studijskiProgram) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju študijskega programa" });
    
    req.studijskiProgram = studijskiProgram;
    
    callNext(req, res, next);
  });
}

function izbrisiStudijskiProgram(req, res, next) {
  req.studijskiProgram.valid = false;
  
  req.studijskiProgram.save(function(err, studijskiProgram) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju študijskega programa" });
    }
    req.studijskiProgram = studijskiProgram;
    
    callNext(req, res, next);
  });
}
function obnoviStudijskiProgram(req, res, next) {
  req.studijskiProgram.valid = true;
  
  req.studijskiProgram.save(function(err, studijskiProgram) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju študijskega programa" });
    
    req.studijskiProgram = studijskiProgram;
    
    callNext(req, res, next);
  });
}

function validateVrstaStudija(req, res, next) {
  if(!req.body.vrsta_studija)
    return callNext(req, res, next);
  
  VrstaStudija.findById(req.body.vrsta_studija, function(err, vrstaStudija) {
    if(err || !vrstaStudija) {
      //console.log(err);
      return res.status(400).json({ message: "Izbrana vrsta študija ne obstaja" });
    }
    
    req.vrstaStudija = vrstaStudija;
    
    callNext(req, res, next);
  });
}