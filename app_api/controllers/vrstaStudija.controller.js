var mongoose = require("mongoose");
var callNext = require("./_include/callNext");
var VrstaStudija = mongoose.model('VrstaStudija');


/* GET home page. */
module.exports.getVrsteStudija = function(req, res) {
  VrstaStudija
    .find({ valid: true })
    .limit(0)
    .sort("opis")
    .exec(function(err, vrsteStudija) {
      if(err || !vrsteStudija) {
        return res.status(404).json({ message: "Ne najdem vrst študija" });
      }
      res.status(200).json(vrsteStudija);
    });
};
module.exports.getVseVrsteStudija = function(req, res) {
  VrstaStudija
    .find()
    .limit(0)
    .sort("opis")
    .exec(function(err, vrsteStudija) {
      if(err || !vrsteStudija) {
        return res.status(404).json({ message: "Ne najdem vrst študija" });
      }
      res.status(200).json(vrsteStudija);
    });
};
module.exports.getIzbrisaneVrsteStudija = function(req, res) {
  VrstaStudija
    .find({ valid: false })
    .limit(0)
    .sort("opis")
    .exec(function(err, vrsteStudija) {
      if(err || !vrsteStudija) {
        return res.status(404).json({ message: "Ne najdem vrst študija" });
      }
      res.status(200).json(vrsteStudija);
    });
};
module.exports.getVrstaStudija = function(req, res) {
  callNext(req, res, [ najdiVrstaStudijaId, vrniVrstaStudija ]);
};
module.exports.addVrstaStudija = function(req, res) {
  if(!req.body || !req.body.sifra || !req.body.opis || !req.body.klasiusSRV || !req.body.predpona)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje vrste študija" });
  
  callNext(req, res, [ najdiVrstaStudijaSifra, createVrstaStudija ]);
};
module.exports.editVrstaStudija = function(req, res) {
  if(!req.body || (!req.body.sifra && !req.body.opis && !req.body.klasiusSRV && !req.body.predpona)) {
    return res.status(400).json({ message: "Nobenega podatka vrste študija ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiVrstaStudijaId, najdiVrstaStudijaSifra, urediVrstaStudija, vrniVrstaStudija ]);
};
module.exports.delVrstaStudija = function(req, res) {
  callNext(req, res, [ najdiVrstaStudijaId, izbrisiVrstaStudija, vrniVrstaStudija ]);
};
module.exports.obnoviVrstaStudija = function(req, res) {
  callNext(req, res, [ najdiVrstaStudijaId, obnoviVrstaStudija, vrniVrstaStudija ]);
};


/* Funkcije */
function najdiVrstaStudijaSifra(req, res, next) {
  if(!req.body.sifra)
    return callNext(req, res, next);
  
  VrstaStudija.findOne({ sifra: req.body.sifra }, function(err, vrstaStudija) {
    if(err)
    {
      console.log("---najdiVrstaStudijaSifra:\n" + err);
      return res.status(400).json({ message: "Napaka pri pregledu podvojene šifre vrste študija"});
    }
    
    if(vrstaStudija && !(req.params && req.params.vrsta_id && vrstaStudija._id.equals(req.params.vrsta_id)))
      return res.status(400).json({ message: "Vrsta študija s podano šifro že obstaja" });
    
    callNext(req, res, next);
  });
}
function createVrstaStudija(req, res, next) {
  VrstaStudija.create({
    sifra: req.body.sifra,
    opis: req.body.opis,
    klasiusSRV: req.body.klasiusSRV,
    predpona: req.body.predpona
  }, function(err, vrstaStudija) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( vrstaStudija );
  });
}
function najdiVrstaStudijaId(req, res, next) {
  VrstaStudija.findById(req.params.vrsta_id, function(err, vrstaStudija) {
    if(err || !vrstaStudija) {
      return res.status(404).json({ message: "Ne najdem želene vrste študija" });
    }
    req.vrstaStudija = vrstaStudija;
    
    callNext(req, res, next);
  });
}
function vrniVrstaStudija(req, res) {
  res.status(200).json(req.vrstaStudija);
}
function urediVrstaStudija(req, res, next) {
  if(req.body.sifra)
    req.vrstaStudija.sifra = req.body.sifra;
  if(req.body.opis)
    req.vrstaStudija.opis = req.body.opis;
  if(req.body.klasiusSRV)
    req.vrstaStudija.klasiusSRV = req.body.klasiusSRV;
  if(req.body.predpona)
    req.vrstaStudija.predpona = req.body.predpona;
  
  req.vrstaStudija.save(function(err, vrstaStudija) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju vrste študija" });
    
    req.vrstaStudija = vrstaStudija;
    
    callNext(req, res, next);
  });
}

function izbrisiVrstaStudija(req, res, next) {
  req.vrstaStudija.valid = false;
  
  req.vrstaStudija.save(function(err, vrstaStudija) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju vrste študija" });
    }
    req.vrstaStudija = vrstaStudija;
    
    callNext(req, res, next);
  });
}
function obnoviVrstaStudija(req, res, next) {
  req.vrstaStudija.valid = true;
  req.vrstaStudija.save(function(err, vrstaStudija) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju vrste študija" });
    
    req.vrstaStudija = vrstaStudija;
    
    callNext(req, res, next);
  });
}