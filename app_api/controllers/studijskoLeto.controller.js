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


/* Funkcije */
function najdiStudijskoLetoIme(req, res, next) {
  if(!req.body.studijsko_leto)
    return callNext(req, res, next);
  
  StudijskoLeto.findOne({ studijsko_leto: req.body.studijsko_leto }, function(err, leto) {
    if(err)
      return console.log(err);
    
    if(leto && (req.params && req.params.leto_id && leto._id != req.params.leto_id))
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
  StudijskoLeto.findById(req.params.leto_id, function(err, leto) {
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