var mongoose = require("mongoose");
var callNext = require("./_include/callNext");
var StudijskoLeto = mongoose.model('StudijskoLeto');


/* GET home page. */
module.exports.getStudijskaLeta = function(req, res) {
  StudijskoLeto
    .find({ valid: true })
    .limit(0)
    .sort("studijsko_leto")
    .exec(function(err, leta) {
      if(err || !leta) {
        return res.status(404).json({ message: "Ne najdem študijskih let" });
      }
      res.status(200).json(leta);
    });
};
module.exports.getVseStudijskaLeta = function(req, res) {
  StudijskoLeto
    .find()
    .limit(0)
    .sort("studijsko_leto")
    .exec(function(err, leta) {
      if(err || !leta) {
        return res.status(404).json({ message: "Ne najdem študijskih let" });
      }
      res.status(200).json(leta);
    });
};
module.exports.getIzbrisaneStudijskaLeta = function(req, res) {
  StudijskoLeto
    .find({ valid: false })
    .limit(0)
    .sort("studijsko_leto")
    .exec(function(err, leta) {
      if(err || !leta) {
        return res.status(404).json({ message: "Ne najdem študijskih let" });
      }
      res.status(200).json(leta);
    });
};
module.exports.getStudijskoLeto = function(req, res) {
  callNext(req, res, [ najdiStudijskoLetoId, vrniStudijskoLeto ]);
};
module.exports.addStudijskoLeto = function(req, res) {
  if(!req.body || !req.body.studijsko_leto)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje študijskega leta" });
  
  callNext(req, res, [ najdiStudijskoLetoIme, createStudijskoLeto ]);
};
module.exports.editStudijskoLeto = function(req, res) {
  if(!req.body || (!req.body.studijsko_leto)) {
    return res.status(400).json({ message: "Nobenega podatka študijskega leta ne spreminjaš" });
  }
  
  callNext(req, res,[ najdiStudijskoLetoId, najdiStudijskoLetoIme, urediStudijskoLeto, vrniStudijskoLeto ]);
};
module.exports.delStudijskoLeto = function(req, res) {
  callNext(req, res, [ najdiStudijskoLetoId, izbrisiStudijskoLeto, vrniStudijskoLeto ]);
};
module.exports.obnoviStudijskoLeto = function(req, res) {
  callNext(req, res, [ najdiStudijskoLetoId, obnoviStudijskoLeto, vrniStudijskoLeto ]);
};

module.exports.pridobiTrenutnoStudijskoLeto = function(req, res) {
  StudijskoLeto.findOne({
    trenutno: true
  }, function(err, leto) {
    if(err || !leto)
    {
      console.log("---pridobiTrenutnoStudijskoLeto:\n" + err);
      return res.status(404).json({ message: "Ne najdem trenutnega študijskega leta"});
    }
  });
};
module.exports.oznaciTrenutnoStudijskoLeto = function(req, res) {
  if(!req.body || !req.body.studijsko_leto)
    return res.status(400).json({ message: "Ni podanega študijskega leta"});
  
  callNext(req, res, [
    najdiTrenutnoStudijskoLeto, resetThem, najdiStudijskoLetoId, makeItDefault, shraniLeto, vrniStudijskoLeto
  ]);
};


/* Funkcije */
function najdiStudijskoLetoIme(req, res, next) {
  if(!req.body.studijsko_leto)
    return callNext(req, res, next);
  
  StudijskoLeto.findOne({ studijsko_leto: req.body.studijsko_leto }, function(err, leto) {
    if(err)
    {
      console.log("---najdiStudijskoLetoIme:\n" + err);
      return res.status(400).json({ message: "Napaka pri preverjanju podvojenega imena študijskega leta"});
    }
    
    if(leto && !(req.params && req.params.leto_id && leto._id.equals(req.params.leto_id)))
      return res.status(400).json({ message: "Študijsko leto s podanim imenom že obstaja" });
    
    callNext(req, res, next);
  });
}
function createStudijskoLeto(req, res, next) {
  StudijskoLeto.create({
    studijsko_leto: req.body.studijsko_leto
  }, function(err, leto) {
    if(err) {
      //console.log(err);
      return res.status(403).send({ message: "Nepravilni podatki" });
    }
    
    res.status(201).send( leto );
  });
}
function najdiStudijskoLetoId(req, res, next) {
  var leto_id = req.params.leto_id || req.body.studijsko_leto;
  
  StudijskoLeto.findById(leto_id, function(err, leto) {
    if(err || !leto) {
      return res.status(404).json({ message: "Ne najdem želenega študijskega leta" });
    }
    req.leto = leto;
    
    callNext(req, res, next);
  });
}
function vrniStudijskoLeto(req, res) {
  res.status(200).json(req.leto);
}
function urediStudijskoLeto(req, res, next) {
  if(req.body.studijsko_leto)
    req.leto.studijsko_leto = req.body.studijsko_leto;
  
  req.leto.save(function(err, leto) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju študijskega leta" });
    
    req.leto = leto;
    
    callNext(req, res, next);
  });
}

function izbrisiStudijskoLeto(req, res, next) {
  req.leto.valid = false;
  
  req.leto.save(function(err, leto) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Nekaj šlo narobe pri brisanju študijskega leta" });
    }
    req.leto = leto;
    
    callNext(req, res, next);
  });
}
function obnoviStudijskoLeto(req, res, next) {
  req.leto.valid = true;
  
  req.leto.save(function(err, leto) {
    if(err)
      return res.status(400).json({ message: "Nekaj šlo narobe pri obnavljanju študijskega leta" });
    
    req.leto = leto;
    
    callNext(req, res, next);
  });
}

function najdiTrenutnoStudijskoLeto(req, res, next) {
  StudijskoLeto.find({
    trenutno: true
  }, function(err, leta) {
    if(err || !leta) {
      return res.status(404).json({ message: "Napaka pri pridobivanju trenutnih študijskih let"});
    }
    
    req.leta = leta;
    
    callNext(req, res, next);
  });
}
function resetThem(req, res, next) {
  if(next) {
    req.myNext = next;
  }
  
  if(req.leta.length > 0)
  {
    req.leto = req.leta.shift();
    req.leto.trenutno = false;
    
    callNext(req, res, [ shraniLeto, resetThem ]);
  }
  else
  {
    next = req.myNext;
    req.myNext = undefined;
    
    callNext(req, res, next);
  }
}
function makeItDefault(req, res, next) {
  
  console.log(req.leto);
  
  req.leto.trenutno = true;
  
  callNext(req, res, next);
}
function shraniLeto(req, res, next) {
  req.leto.save(function(err, leto) {
    if(err || !leto)
    {
      console.log("---shraniLeto:\n" + err);
      return res.status(400).json({ message: "Napaka pri shranjevanju leta"});
    }
    
    req.leto = leto;
    
    callNext(req, res, next);
  });
}