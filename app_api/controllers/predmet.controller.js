var mongoose = require("mongoose");
var callNext = require("./_include/callNext");

var Predmet = mongoose.model('Predmet');
var StudijskoLeto = mongoose.model('StudijskoLeto');
var Zaposlen = mongoose.model('Zaposlen');
var Student = mongoose.model('Student');


/* GET home page. */
module.exports.predmetiZaposlenega = function(req, res) {
  if(!req.user || !req.user.zaposlen)
    return res.status(403).json({ message: "Nisi prijavljen oziroma nisi zaposlen"});
  
  callNext(req, res, [ najdiPredmeteZaposlenega, odstraniOstalaStudijskaLeta, vrniPredmete ]);
};
module.exports.getPredmete = function(req, res) {
  Predmet
    .find({ valid: true })
    .limit(0)
    .sort("naziv")
    .exec(function(err, predmeti) {
      if(err || !predmeti) {
        return res.status(404).json({ message: "Ne najdem predmetov" });
      }
      res.status(200).json(predmeti);
    });
};
module.exports.getVsePredmete = function(req, res) {
  Predmet
    .find()
    .limit(0)
    .sort("naziv")
    .exec(function(err, predmeti) {
      if(err || !predmeti) {
        return res.status(404).json({ message: "Ne najdem predmetov" });
      }
      res.status(200).json(predmeti);
    });
};
module.exports.getIzbrisanePredmete = function(req, res) {
  Predmet
    .find({ valid: false })
    .limit(0)
    .sort("naziv")
    .exec(function(err, predmeti) {
      if(err || !predmeti) {
        return res.status(404).json({ message: "Ne najdem predmetov" });
      }
      res.status(200).json(predmeti);
    });
};
module.exports.getPredmet = function(req, res) {
  callNext(req, res, [ najdiPredmetId, vrniPredmet ]);
};
module.exports.addPredmet = function(req, res) {
  if(!req.body || !req.body.sifra || !req.body.naziv)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje predmeta" });
  
  callNext(req, res, [ najdiPredmetSifra, createPredmet ]);
};
module.exports.editPredmet = function(req, res) {
  if(!req.body || (!req.body.sifra && !req.body.naziv && !req.body.opis && !req.body.KT)) {
    return res.status(400).json({ message: "Nobenega podatka predmeta ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiPredmetId, najdiPredmetSifra, urediPredmet, vrniPredmet ]);
};
module.exports.delPredmet = function(req, res) {
  callNext(req, res, [ najdiPredmetId, izbrisiPredmet, vrniPredmet ]);
};
module.exports.obnoviPredmet = function(req, res) {
  callNext(req, res, [ najdiPredmetId, obnoviPredmet, vrniPredmet ]);
};

module.exports.addIzvedbaPredmeta = function(req, res) {
  if(!req.body || !req.body.studijsko_leto) {
    return res.status(400).json({ message: "Ni podanega študijskega leta" });
  }
  
  najdiPredmetId(req, res, [
    validateStudijskoLeto, ustvariIzvedboPredmeta, vrniPredmet
  ]);
};
module.exports.delIzvedbaPredmeta = function(req, res) {
  najdiPredmetId(req, res, [
    najdiIzvedboPredmeta, odstraniIzvedboPredmeta, vrniPredmet
  ]);
};
module.exports.addIzvajalcaIzvedbiPredmeta = function(req, res) {
  if(!req.body || !req.body.izvajalec) {
    return res.status(400).json({ message: "Ni podanega izvajatelja za izvedbo predmeta" });
  }
  
  najdiPredmetId(req, res, [
    validateIzvajalca, najdiIzvedboPredmeta, preveriIzvajalecZeIzvajaIzvedboPredmeta, dodajIzvajalcaIzvedbiPredmeta, vrniPredmet
  ]);
};
module.exports.delIzvajalcaIzvedbiPredmeta = function(req, res) {
  najdiPredmetId(req, res, [
    validateIzvajalca, najdiIzvedboPredmeta, odstraniIzvajalcaIzvedbiPredmeta, vrniPredmet
  ]);
};

module.exports.getIzvedbeStudijskegaLeta = function(req, res) {
  callNext(req, res, [ validateStudijskoLeto, najdiTrenutnoStudijskoLeto, najdiPredmetId, filtrirajIzvedbe, vrniIzvedbe ]);
};
module.exports.getStudenteStudijskegaLeta = function(req, res) {
  callNext(req, res, [
    validateStudijskoLeto, najdiTrenutnoStudijskoLeto, najdiPredmetId,
    
    najdiStudentePredmeta,
    
    vrniPredmet
  ]);
};

/* Funkcije */
function najdiPredmetSifra(req, res, next) {
  if(!req.body.sifra)
    return callNext(req, res, next);
  
  Predmet.findOne({ sifra: req.body.sifra }, function(err, predmet) {
    if(err)
    {
      console.log("---najdiPredmetSifra:\n" + err);
      return res.status(400).json({ message: "Napaka pri pregled podvojene šifre predmeta"});
    }
    
    if(predmet && !(req.params && req.params.predmet_id && predmet._id.equals(req.params.predmet_id)))
      return res.status(400).json({ message: "Predmet s podano šifro že obstaja" });
    
    callNext(req, res, next);
  });
}
function createPredmet(req, res, next) {
  Predmet.create({
    sifra: req.body.sifra,
    naziv: req.body.naziv,
    opis: req.body.opis,
    KT: req.body.KT
  }, function(err, predmet) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( predmet );
  });
}
function najdiPredmetId(req, res, next) {
  Predmet
    .findById(req.params.predmet_id)
    .populate([
      {
        path: "izvedbe_predmeta.studijsko_leto"
      },
      {
        path: "izvedbe_predmeta.izvajalci"
      }
    ])
    .exec(function(err, predmet) {
      if(err || !predmet) {
        return res.status(404).json({ message: "Ne najdem želenega predmeta" });
      }
      req.predmet = predmet;
      
      callNext(req, res, next);
    });
}
function vrniPredmet(req, res) {
  res.status(200).json(req.predmet);
}
function urediPredmet(req, res, next) {
  if(req.body.sifra)
    req.predmet.sifra = req.body.sifra;
  if(req.body.naziv)
    req.predmet.naziv = req.body.naziv;
  if(req.body.KT)
    req.predmet.KT = req.body.KT;
  if(req.body.opis)
    req.predmet.opis = req.body.opis;
  
  req.predmet.save(function(err, predmet) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju predmeta" });
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}

function izbrisiPredmet(req, res, next) {
  req.predmet.valid = false;
  
  req.predmet.save(function(err, predmet) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju predmeta" });
    }
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}
function obnoviPredmet(req, res, next) {
  req.predmet.valid = true;
  req.predmet.save(function(err, predmet) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju predmeta" });
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}

// Dodatne funkcionalnost
function pridobiIzvedbo(req, res) {
  var koncniObject = {};
  var studijskoLeto_id = req.params.studijskoLeto_id;
  var predmet_id = req.params.predmet_id;
  Predmet
    .find().limit(0)
    .exec(function(err, predmeti) {
      if(err || !predmeti) {
        return res.status(404).send({ message: "Predmeti not found 1" });
      }
      
      koncniObject.predmeti = predmeti;
      return res.status(200).json(koncniObject);
  });
}

// Funkcije za upravljanje izvedb
function validateStudijskoLeto(req, res, next) {
  var studijsko_leto = req.params.studijskoLeto_id || req.body.studijsko_leto;
  
  if(studijsko_leto)
  {
    StudijskoLeto.findById(studijsko_leto, function(err, studijskoLeto) {
      if(err || !studijskoLeto) {
        //console.log(err);
        return res.status(404).json({ message: "Izbrano študijsko leto ne obstaja" });
      }
      
      req.studijskoLeto = studijskoLeto;
      
      callNext(req, res, next);
    });
  }
  else
  {
    callNext(req, res, next);
  }
}
function najdiIzvedboPredmeta(req, res, next) {
  req.izvedbaPredmeta = req.predmet.izvedbe_predmeta.id(req.params.izvedba_id);
  /*
  for(var i = 0; i < izvedbePredmeta.length; i++) {
    if(izvedbePredmeta[i].studijsko_leto.equals(req.studijskoLeto)) {
      req.izvedbaPredmeta = izvedbePredmeta[i];
      break;
    }
  }
  */
  console.log("Izvedba: " + req.params.izvedba_id + "\n" + req.izvedbaPredmeta);
  if(!req.izvedbaPredmeta)
    return res.status(404).json({ message: "Ne najdem izbrane izvedbe predmeta"});
  
  callNext(req, res, next);
}
function ustvariIzvedboPredmeta(req, res, next) {
  if(req.izvedbaPredmeta) {
    console.log(req.izvedbaPredmeta);
    return res.status(409).json({ message: "Izvedba predmeta za izbrano šolsko leto že obstaja" });
  }
  
  req.predmet.izvedbe_predmeta.push({
    studijsko_leto: req.studijskoLeto
  });
  req.predmet.save(function(err, predmet) {
    if(err || !predmet) {
      //console.log(err);
      return res.status(400).send({ message: "Napaka pri dodajanju izvedbe predmeta" });
    }
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}
function odstraniIzvedboPredmeta(req, res, next) {
  if(!req.izvedbaPredmeta) {
    return res.status(404).json({ message: "Ne najdem izvedbe predmeta za želeno študijsko leto" });
  }
  
  req.izvedbaPredmeta.remove();
  req.predmet.save(function(err, predmet) {
    if(err || !predmet) {
      console.log(err);
      return res.status(400).json({ message: "Napaka pri odstranjevanju izvedbe predmeta" });
    }
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}

function dodajIzvajalcaIzvedbiPredmeta(req, res, next) {
  if(!req.izvedbaPredmeta) {
    return res.status(404).json({ message: "Ne najdem izbrane izvedbe predmeta" });
  }
  if(req.izvedbaPredmeta.izvajalci.length >= 3) {
    return res.status(400).json({ message: "Izvedba predmeta ima lahko največ 3 izvajalce" });
  }
  
  req.izvedbaPredmeta.izvajalci.push(req.izvajalec);
  
  req.predmet.save(function(err, predmet) {
    if(err || !predmet) {
      return res.status(400).json({ message: "Napaka pri dodajanju izvajalca predmeta" });
    }
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}
function odstraniIzvajalcaIzvedbiPredmeta(req, res, next) {
  if(!req.izvedbaPredmeta) {
    return res.status(404).json({ message: "Ne najdem izbrane izvedbe predmeta" });
  }
  if(!req.izvajalec) {
    return res.status(404).json({ message: "Ne najdem izbranega izvajalca predmeta" });
  }
  
  req.izvedbaPredmeta.izvajalci.pull(req.izvajalec);
  
  req.predmet.save(function(err, predmet) {
    if(err || !predmet) {
      return res.status(400).json({ message: "Napaka pri odstranjevanju izvajalca predmeta" });
    }
    
    req.predmet = predmet;
    
    callNext(req, res, next);
  });
}
function validateIzvajalca(req, res, next) {
  var izvajalec = req.body.izvajalec || req.params.izvajalec_id;
  
  Zaposlen
    .findById(izvajalec, function(err, izvajalec) {
      if(err || !izvajalec) {
        return res.status(404).json({ message: "Ne nadjem izbranega izvajalca" });
      }
      
      req.izvajalec = izvajalec;
      
      callNext(req, res, next);
    });
}
function preveriIzvajalecZeIzvajaIzvedboPredmeta(req, res, next) {
  if(!req.izvedbaPredmeta) {
    return res.status(404).json({ message: "Ne najdem izbrane izvedbe predmeta" });
  }
  if(!req.izvajalec) {
    return res.status(404).json({ message: "Ne najdem izbranega izvajalca predmeta" });
  }
  
  for(var i = 0; i < req.izvedbaPredmeta.izvajalci.length; i++) {
    if(req.izvedbaPredmeta.izvajalci[i].equals(req.izvajalec)) {
      return res.status(400).json({ message: "Ta izvajalec že izvaja ta predmet v izbrani izvedbi predmeta" });
    }
  }
  
  callNext(req, res, next);
}

// Najde in procesira predmete zaposlenega
function najdiPredmeteZaposlenega(req, res, next) {
  Predmet
    .find({
      "izvedbe_predmeta.izvajalci": req.user.zaposlen,
      valid: true
    })
    .exec(function(err, predmeti) {
      if(err || !predmeti)
      {
        console.log("---najdiPredmeteZaposlenega:\n" + err);
        return res.status(404).json({ message: "Ne najdem predmetov zaposlenega"});
      }
      
      req.predmeti = predmeti;
      
      callNext(req, res, next);
    });
}
function odstraniOstalaStudijskaLeta(req, res, next) {
  for( var i = 0; i < req.predmeti.length; i++)
  {// Obdelaj vse predmete
    var predmet = req.predmeti[i].toObject();
    
    for(var j = 0; j < predmet.izvedbe_predmeta.length; j++)
    {// Obdelaj vse izvedbe predmeta
      var izvedba = predmet.izvedbe_predmeta[j];
      var found = false;
      
      for(var x = 0; x < izvedba.izvajalci.length; x++)
      {
        if(izvedba.izvajalci[x].equals(req.user.zaposlen))
        {
          found = true;
          break;
        }
      }
      
      if(!found) {
        predmet.izvedbe_predmeta.splice(j, 1);
        j--;
      }
    }
  }
  callNext(req, res, next);
}
function vrniPredmete(req, res, next) {
  res.status(200).json(req.predmeti);
}

function najdiTrenutnoStudijskoLeto(req, res, next) {
  if(req.leto)
  {
    callNext(req, res, next);
  }
  else
  {
    StudijskoLeto.findOne({
      trenutno: true
    }, function(err, leto) {
      if(err || !leto)
      {
        console.log("---pridobiTrenutnoStudijskoLeto:\n" + err);
        return res.status(404).json({ message: "Ne najdem trenutnega študijskega leta"});
      }
      
      req.leto = leto;
      
      callNext(req, res, next);
    });
  }
}

function filtrirajIzvedbe(req, res, next) {
  req.izvedbe = [];
  
  if(req.studijskoLeto)
    req.leto = req.studijskoLeto;
  
  for(var i = 0; i < req.predmet.izvedbe_predmeta.length; i++)
  {
    if(req.leto._id.equals(req.predmet.izvedbe_predmeta[i].studijsko_leto._id))
    {
      req.izvedbe.push(req.predmet.izvedbe_predmeta[i]);
    }
  }
  
  callNext(req, res, next);
}
function vrniIzvedbe(req, res) {
  res.status(200).json(req.izvedbe);
}

// Iskanje študentov predmeta
function najdiStudentePredmeta(req, res, next) {
  Student
    .find({
      "studijska_leta_studenta.studijsko_leto": req.studijskoLeto,
      "studijska_leta_studenta.predmeti.predmet": req.predmet
    })
    .populate()
    .exec(function(err, studenti) {
      if(err || !studenti)
      {
        console.log("---najdiStudentePredmeta:\n" + err);
        return res.status(404).json({ message: "Ne najdem študentov za izbrano leto"});
      }
      
      
      var obdelani = [];
      
      
      req.predmet = req.predmet.toObject();
      
      for(var i = 0; i < studenti.length; i++)
      {
        var student = studenti[i].toObject();
        for(var j = 0; j < student.studijska_leta_studenta.length; j++)
        {
          var leto = student.studijska_leta_studenta[j];
          if(leto.studijsko_leto.equals(req.studijskoLeto._id))
          {
            // Študijsko leto je pravo, zdej samo še odstrani ostale predmete
            for(var k = 0; k < leto.predmeti.length; k++)
            {
              var predmet = leto.predmeti[k];
              
              if(!predmet.predmet.equals(req.predmet._id))
              {
                leto.predmeti.splice(k, 1);
                k--;
              }
            }
            
          }
          else
          {
            student.studijska_leta_studenta.splice(j, 1);
            j--;
          }
        }
        
        obdelani.push(student);
      }
      
      req.predmet.vpisani = {
        studenti: obdelani,
        studijsko_leto: req.studijskoLeto
      };
      
      callNext(req, res, next);
    });
}