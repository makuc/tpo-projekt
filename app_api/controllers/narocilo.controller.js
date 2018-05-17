var mongoose = require('mongoose');
var callNext = require("./_include/callNext");


let Student = mongoose.model("Student");
let Vpis = mongoose.model("Vpis");
let Narocilo = mongoose.model("Narocilo");

module.exports.naroci = function(req, res) {
  if(!req.user || !req.user.student)
  {
    res.status(401).json({ message: "Ni prijavljenega študenta"});  
  }
  else
  {
    callNext(req, res, [ najdiStudenta, najdiVpisniList, create, narociloOddano ]);
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
function najdiVpisniList(req, res, next) {
  Vpis
    .findOne({
      student: req.student
    })
    .sort("vpisan")
    .exec(function(err, vpis) {
      if(err || !vpis)
      {
        console.log("---najdiVpisniList:\n" + err);
        res.status(404).json({ message: "Ne najdem zadnjega vpisa izbranega študenta"});
      }
      else
      {
        req.vpisniList = vpis;
        callNext(req, res, next);
      }
    });
}
function najdiNarocilo(req, res, next) {
  Narocilo
    .findById(req.params.narocilo)
    .populate({
      path: "vpis",
      populate: {
        path: "student"
      }
    })
    .exec(function(err, narocilo) {
      if(err || !narocilo)
      {
        console.log("---najdiNarocilo:\n" + err);
        res.status(404).json({ message: "Ne najdem izbranega naročila"});
      }
      else
      {
        req.narocilo = narocilo;
        callNext(req, res, next);
      }
    });
}
function pridobiNarocila(req, res) {
  Narocilo
    .find()
    .sort("opravljeno datum")
    .populate({
      path: "vpis",
      select: "-__v -obvezniPredmeti -strokovniIzbirniPredmeti -splosniIzbirniPredmeti -moduli -modulniPredmeti -predmeti -priloge -prosta_izbira",
      populate: {
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
      }
    })
    .exec(function(err, narocila) {
      if(err || !narocila)
      {
        console.log("---pridobiNarocila:\n" + err);
        res.status(404).json({ message: "Ne najdem nobenih naročil"});
      }
      else
      {
        res.status(200).json(narocila);
      }
    });
}

function create(req, res, next) {
  Narocilo.create({
    vpis: req.vpisniList
  }, function(err, narocilo) {
    if(err || !narocilo)
    {
      console.log("---create:\n" + err);
      res.status(400).json({ message: "Napaka pri oddaji naročila potrdila o vpisu"});
    }
    else
    {
      req.narocilo = narocilo;
      callNext(req, res, next);
    }
  });
}
function narociloOddano(req, res) {
  res.status(201).json({ message: "Naročilo potrdila o vpisu uspešno oddano"});
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