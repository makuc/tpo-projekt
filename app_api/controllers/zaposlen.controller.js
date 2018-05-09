var Utils = require("./_include/utils");
var callNext = require("./_include/callNext");

var mongoose = require('mongoose');
mongoose.Promise = Promise;

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

module.exports.getZaposlene = function(req, res) {
  models.User
    .find({
      valid: true,
      zaposlen: { $ne: null }
    })
    .limit(0)
    .populate("zaposlen")
    .sort({ "priimek" : 1, "ime" : 1 })
    .exec(function(err, zaposleni) {
      if(err || !zaposleni) {
        return res.status(404).json({ message: "Ne najdem zaposlenih" });
      }
      res.status(200).json(zaposleni);
    });
};
module.exports.getVseZaposlene = function(req, res) {
  models.User
    .find({
      zaposlen: { $ne: null }
    })
    .limit(0)
    .populate("zaposlen")
    .sort({ "priimek" : 1, "ime" : 1 })
    .exec(function(err, zaposleni) {
      if(err || !zaposleni) {
        return res.status(404).json({ message: "Ne najdem zaposlenih" });
      }
      res.status(200).json(zaposleni);
    });
};
module.exports.getIzbrisaneZaposlene = function(req, res) {
  models.User
    .find({
      valid: false,
      zaposlen: { $ne: null }
    })
    .limit(0)
    .populate("zaposlen")
    .sort({ "priimek" : 1, "ime" : 1 })
    .exec(function(err, zaposleni) {
      if(err || !zaposleni) {
        return res.status(404).json({ message: "Ne najdem zaposlenih" });
      }
      res.status(200).json(zaposleni);
    });
};
module.exports.getZaposlenega = function(req, res) {
    najdiUserjaZaposlenega(req, res, [ vrniUserja ]);
};
module.exports.addZaposlenega = function(req, res) {
    if(!req.body || !req.body.priimek || !req.body.ime || !req.body.email || !req.body.naziv)
        return res.status(400).json({ message: "Manjkajo podatki za kreiranje zaposlenega" });
    
    if(!Utils.isEmail(req.body.email))
        return res.status(400).send({ message: "Neveljaven email maslov" });
    
    validateEmail(req, res, [ ustvariZaposlenega, ustvariUserja, vrniUserja ]);
};
module.exports.editZaposlenega = function(req, res){
    if(!req.body || (!req.body.priimek && !req.body.ime && !req.body.naziv && !req.body.email && !req.body.skrbnik && !req.body.password))
        return res.status(400).json({ message: "Ni podatkov za urejanje" });
    
    callNext(req, res, [ najdiZaposlenegaId, najdiUserjaZaposlenega, validateEmail, posodobiZaposlenega, posodobiUserja, vrniUserja ]);
};
module.exports.delZaposlenega = function(req, res) {
  callNext(req, res, [ najdiZaposlenegaId, najdiUserjaZaposlenega, izbrisiZaposlenega, izbrisiUserja, vrniUserja ]);
};
module.exports.obnoviZaposlenega = function(req, res) {
  callNext(req, res, [ najdiZaposlenegaId, najdiUserjaZaposlenega, obnoviZaposlenega, obnoviUserja, vrniUserja ]);
};


/** Funkcije za manipulacijo zaposlenih **/
function najdiZaposlenegaId(req, res, next) {
  models.Zaposlen
    .findById(req.params.zaposlen_id, function(err, zaposlen) {
      if(err || !zaposlen){
        return res.status(404).json({ "message": "Ta zaposlen ne obstaja"});
      }
      
      req.zaposlen = zaposlen;
      
      callNext(req, res, next);
    });
}
function ustvariZaposlenega(req, res, next) {
    models.Zaposlen.create({
        priimek: req.body.priimek,
        ime: req.body.ime,
        email: req.body.email,
        naziv: req.body.naziv
    }, function(err, zaposlen){
        if(err) {
            //console.log(err);
            return callNext(req, res, next);
        }
        
        req.zaposlen = zaposlen;
        callNext(req, res, next);
    });
}
function ustvariUserja(req, res, next) {
  if(!req.zaposlen)
    return callNext(req, res, next);
  
  console.log("Skrbnik: " + req.body.skrbnik);
  
  if(req.body.skrbnik === "true") {
    req.body.skrbnik = true;
  } else if(typeof req.body.skrbnik !== 'boolean') {
    req.body.skrbnik = undefined;
  }
  
  var geslo = genGeslo();
  
  models.User.create({
    zaposlen: req.zaposlen,
    skrbnik: req.body.skrbnik,
    email: req.body.email,
    password: geslo,
    opombe: geslo
  }, function(err, user) {
    if(err) {
      //console.log(err);
      return callNext(req, res, next);
    }
    
    req.user = user;
      callNext(req, res, next);
  });
}
function posodobiZaposlenega(req, res, next) {
  models.Zaposlen
    .findById(req.params.zaposlen_id, function(err, zaposlen) {
      if(err || !zaposlen){
        //console.log(err);
        return res.status(404).json({ message: "Ne najdem želenega zaposlenega" });
      }
      
      if(typeof req.body.priimek === 'string')
        zaposlen.priimek = req.body.priimek;
      if(typeof req.body.ime === 'string')
        zaposlen.ime = req.body.ime;
      if(typeof req.body.naziv === 'string')
        zaposlen.naziv = req.body.naziv;
      if(typeof req.body.email === 'string')
        zaposlen.email = req.body.email;
        
      zaposlen.save(function(err, zaposlen) {
        if(err){
          return res.status(400).json({ message: "Napaka pri urejanju zaposlenega" });
        }
        
        req.zaposlen = zaposlen;
        
        callNext(req, res, next);
      });
    });
}
function posodobiUserja(req, res, next) {
  if(req.body.email || req.body.skrbnik || req.body.password) {
    models.User
      .findOne({ zaposlen: req.zaposlen}, function(err, user) {
        if(err || !user){
          //console.log(err);
          return res.status(404).json({ message: "Ne najdem želenega uporabnika zaposlenega" });
        }
        
        // Dejansko uredi podatke
        if(typeof req.body.skrbnik === 'string')
          user.skrbnik = req.body.skrbnik;
        if(typeof req.body.email === 'string')
          user.email = req.body.email;
        if(typeof req.body.password === 'string')
          user.password = req.body.password;
        
        // Shrani urejene podatke
        user.save(function(err, user) {
          if(err){
            return res.status(400).json({ message: "Napaka pri urejanju uporabnika zaposlenega" });
          }
          
          req.user = user;
          
          callNext(req, res, next);
        });
      });
  } else {
    callNext(req, res, next);
  }
}
function vrniUserja(req, res) {
    if(!req.user)
        return res.status(400).json({ message: "Dodajanje zaposlenega ni uspelo" });
    
    if(req.zaposlen)
      req.user.zaposlen = req.zaposlen;
    return res.status(201).json( req.user );
}

function najdiUserjaZaposlenega(req, res, next) {
  models.User
    .findOne({
      zaposlen: req.params.zaposlen_id
    })
    .populate("zaposlen")
    .exec(function(err, user) {
      if(err || !user) {
        //console.log(err);
        return res.status(404).json({ message: "Ne najdem uporabnika želenega zaposlenega" });
      }
      
      req.user = user;
      
      callNext(req, res, next);
    });
}

function izbrisiZaposlenega(req, res, next) {
  req.zaposlen.valid = false;
  
  req.zaposlen.save(function(err, zaposlen) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju zaposlenega" });
    }
    req.zaposlen = zaposlen;
    
    callNext(req, res, next);
  });
}
function obnoviZaposlenega(req, res, next) {
  req.zaposlen.valid = true;
  
  req.zaposlen.save(function(err, zaposlen) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju zaposlenega" });
    
    req.zaposlen = zaposlen;
    
    callNext(req, res, next);
  });
}
function izbrisiUserja(req, res, next) {
  req.user.valid = false;
  
  req.user.save(function(err, user) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju uporabnika zaposlenega" });
    }
    req.user = user;
    
    callNext(req, res, next);
  });
}
function obnoviUserja(req, res, next) {
  req.user.valid = true;
  
  req.user.save(function(err, user) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju uporabnika zaposlenega" });
    
    req.user = user;
    
    callNext(req, res, next);
  });
}

function validateEmail(req, res, next) {
  if(!req.body.email)
    return callNext(req, res, next);
  
  models.Zaposlen.findOne({ email: req.body.email }, function(err, zaposlen) {
    if(err) {
      console.log("---validateEmail:\n" + err);
      return res.status(400).send({ message: "Napaka pri preverjanju podvojene e-pošte" });
    }
    
    if(zaposlen && !(req.params && req.params.zaposlen_id && zaposlen._id.equals(req.params.zaposlen_id)))
      return res.status(409).json({ message: "Zaposlen s podano e-pošto že obstaja" });
    
    callNext(req, res, next);
  });
}

/* Dodatne Funkcije */
function genGeslo() {
    var nabor = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    var dolzina = 12;
    var geslo = "";
    for (var i = 0; i < dolzina; ++i) 
    {
        geslo += nabor.charAt(Math.floor(Math.random() * nabor.length * 12345) % nabor.length);
    }
    return geslo;
}