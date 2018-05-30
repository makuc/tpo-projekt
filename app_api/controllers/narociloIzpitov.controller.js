var mongoose = require('mongoose');
var callNext = require("./_include/callNext");


let Student = mongoose.model("Student");
let NarociloIzpitov = mongoose.model("NarociloIzpitov");

module.exports.naroci = function(req, res) {
  if(!req.user || !req.user.student)
  {
    res.status(401).json({ message: "Ni prijavljenega študenta"});  
  }
  else
  {
    callNext(req, res, [ najdiStudenta, create, narociloOddano ]);
  }
};
module.exports.potrdi = function(req, res) {
  callNext(req, res, [ najdiNarocilo, potrdi, shraniNarocilo, narodiloZakljuceno ]);
};
module.exports.getNarocila = function(req, res) {
  pridobiNarocila(req, res);
};


// Controller
function najdiStudenta(req, res, next) {
  Student
    .findById(req.user.student)
    .populate([
      {
        path: "drzava_rojstva",
        select: "slovenski_naziv"
      },
      {
        path: "obcina_rojstva",
        select: "ime"
      },
      // Stalno bivališče
      {
        path: "stalno_bivalisce_posta",
        select: "naziv"
      },
      {
        path: "stalno_bivalisce_obcina",
        select: "ime"
      },
      {
        path: "stalno_bivalisce_drzava",
        select: "slovenski_naziv"
      },
      // Začasno bivališče
      {
        path: "zacasno_bivalisce_posta",
        select: "naziv"
      },
      {
        path: "zacasno_bivalisce_obcina",
        select: "ime"
      },
      {
        path: "zacasno_bivalisce_drzava",
        select: "slovenski_naziv"
      },
      {
        path: "studijska_leta_studenta.studijsko_leto",
        select: "studijsko_leto"
      },
      {
        path: "studijska_leta_studenta.letnik",
        populate: {
          path: "studijskiProgram",
          select: "sifra naziv sifraEVS"
        }
      },
      {
        path: "studijska_leta_studenta.vrsta_studija",
        select: "sifra opis klasiusSRV predpona"
      },
      {
        path: "studijska_leta_studenta.vrsta_vpisa",
        select: "koda naziv opis"
      },
      {
        path: "studijska_leta_studenta.nacin_studija",
        select: "sifra naziv"
      },
      {
        path: "studijska_leta_studenta.oblika_studija",
        select: "sifra naziv"
      },
      {
        path: "studijska_leta_studenta.predmeti.predmet",
        select: "sifra naziv opis KT izvedbe_predmeta"
      },
      {
        path: "studijska_leta_studenta.predmeti.izpit"
      },
      {
        path: "predhodna_izobrazba.drzava",
        select: "slovenski_naziv"
      },
      {
        path: "predhodna_izobrazba.najvisja_dosezena_izobrazba",
        select: "opis"
      }
    ])
    .exec(
      function(err, student) {
        if(err || !student){
          return res.status(404).json({ "message": "Ni študenta s tem ID"});
        }
        
        req.student = student;
        
        callNext(req, res, next);
      }
    );
}
function najdiNarocilo(req, res, next) {
  NarociloIzpitov
    .findById(req.params.narocilo)
    .populate({
      path: "student"
    })
    .exec(function(err, narocilo) {
      if(err || !narocilo)
      {
        console.log("---najdiNarocilo:\n" + err);
        res.status(404).json({ message: "Ne najdem izbranega naročila potrdil izpitov"});
      }
      else
      {
        req.narocilo = narocilo;
        callNext(req, res, next);
      }
    });
}
function pridobiNarocila(req, res) {
  NarociloIzpitov
    .find()
    .sort("opravljeno datum")
    .populate({
      path: "student",
      select: "-zetoni -sklepi -studijska_leta_studenta -predhodna_izobrazba -datum_registracije -__v",
      populate: [
        {
          path: "drzava_rojstva",
          select: "slovenski_naziv"
        },
        {
          path: "obcina_rojstva",
          select: "ime"
        },
        // Stalno bivališče
        {
          path: "stalno_bivalisce_posta",
          select: "naziv"
        },
        {
          path: "stalno_bivalisce_obcina",
          select: "ime"
        },
        {
          path: "stalno_bivalisce_drzava",
          select: "slovenski_naziv"
        },
        // Začasno bivališče
        {
          path: "zacasno_bivalisce_posta",
          select: "naziv"
        },
        {
          path: "zacasno_bivalisce_obcina",
          select: "ime"
        },
        {
          path: "zacasno_bivalisce_drzava",
          select: "slovenski_naziv"
        },
        {
          path: "studijska_leta_studenta.studijsko_leto",
          select: "studijsko_leto"
        },
        {
          path: "studijska_leta_studenta.letnik",
          populate: {
            path: "studijskiProgram",
            select: "sifra naziv sifraEVS"
          }
        },
        {
          path: "studijska_leta_studenta.vrsta_studija",
          select: "sifra opis klasiusSRV predpona"
        },
        {
          path: "studijska_leta_studenta.vrsta_vpisa",
          select: "koda naziv opis"
        },
        {
          path: "studijska_leta_studenta.nacin_studija",
          select: "sifra naziv"
        },
        {
          path: "studijska_leta_studenta.oblika_studija",
          select: "sifra naziv"
        },
        {
          path: "studijska_leta_studenta.predmeti.predmet",
          select: "sifra naziv opis KT izvedbe_predmeta"
        },
        {
          path: "studijska_leta_studenta.predmeti.izpit"
        },
        {
          path: "predhodna_izobrazba.drzava",
          select: "slovenski_naziv"
        },
        {
          path: "predhodna_izobrazba.najvisja_dosezena_izobrazba",
          select: "opis"
        }
      ]
    })
    .exec(function(err, narocila) {
      if(err || !narocila)
      {
        console.log("---pridobiNarocila:\n" + err);
        res.status(404).json({ message: "Ne najdem nobenih naročil potrdil opravljenih izpitov"});
      }
      else
      {
        res.status(200).json(narocila);
      }
    });
}

function create(req, res, next) {
  var izvodov = parseInt(req.body.izvodov, 10) || 1;
  
  if(izvodov > 10)
  {
    res.status(400).json({ message: "Maksimalno število izvodov je 10." });
  }
  else
  { 
    NarociloIzpitov.create({
      student: req.student,
      izvodov: izvodov
    }, function(err, narocilo) {
      if(err || !narocilo)
      {
        console.log("---create:\n" + err);
        res.status(400).json({ message: "Napaka pri oddaji naročila potrdila o opravljenih izpitih"});
      }
      else
      {
        req.narocilo = narocilo;
        callNext(req, res, next);
      }
    });
  }
}
function narociloOddano(req, res) {
  res.status(201).json({ message: "Naročilo potrdila o opravljenih izpitih uspešno oddano"});
}

function potrdi(req, res, next) {
  req.narocilo.opravljeno = true;
  
  callNext(req, res, next);
}
function shraniNarocilo(req, res, next) {
  req.narocilo.save(function(err, narocilo) {
    if(err || !narocilo)
    {
      console.log(err);
      res.status(400).json({ message: "Nekaj šlo narobe pri shranjevanju naročila"});
    }
    else
    {
      req.narocilo = narocilo;
      callNext(req, res, next);
    }
  });
}
function narodiloZakljuceno(req, res) {
  res.status(200).json({ message: "Naročilo uspešno zaključeno"});
}