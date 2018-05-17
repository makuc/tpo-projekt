let Utils = require("./_include/utils");
let callNext = require("./_include/callNext");

let mongoose = require('mongoose');

let Student = mongoose.model('Student');

module.exports.dodaj = function(req, res) {
  if(!req.body || !req.body.datum || !req.body.organ || !req.body.besedilo)
  {
    res.status(400).json({ message: "Ni dovolj podatkov za dodajanje sklepa"});
  }
  else
  {
    callNext(req, res, [
      najdiStudentaId, dodaj, shraniStudenta, vrniStudenta
    ]);
  }
};
module.exports.uredi = function(req, res) {
  if(!req.body || (!req.body.datum && !req.body.organ && !req.body.besedilo))
  {
    res.status(400).json({ message: "Ni dovolj podatkov za urejanje sklepa"});
  }
  else
  {
    callNext(req, res, [
      najdiStudentaId, uredi, shraniStudenta, vrniStudenta
    ]);
  }
};
module.exports.izbrisi = function(req, res) {
  callNext(req, res, [
    najdiStudentaId, izbrisi, shraniStudenta, vrniStudenta
  ]);
};


// Class
function najdiStudentaId(req, res, next) {
  console.log("--najdiStudentaId");
  Student
    .findById(req.params.student_id)
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
function shraniStudenta(req, res, next) {
  console.log("--shraniStudenta");
  if(req.student)
  {
    req.student.save(function(err, student) {
      if(err || !student)
      {
        console.log("---shraniStudenta:\n" + err);
        return res.status(400).json({ message: "Napaka pri shranjevanju študenta po upravljanju s sklepi"});
      }
      
      req.student = student;
      
      callNext(req, res, next);
    });
  }
  else
  {
    callNext(req, res, next);
  }
}
function vrniStudenta(req, res) {
  console.log("--vrniStudenta");
  if(!req.student)
    return res.status(404).json({ message: "Izbranega študenta ne najdem" });
  
  return res.status(200).json( req.student );
}

function dodaj(req, res, next) {
  console.log("--dodaj");
  if(req.student)
  {
    var datum = new Date(req.body.datum);
    
    if(isNaN(datum.getTime()) )
    {
      res.status(400).json({ message: "Neveljaven datum"});
    }
    else
    {
      req.student.sklepi.push({
        organ: req.body.organ,
        besedilo: req.body.besedilo,
        datum: datum
      });
      
      callNext(req, res, next);
    }
  }
  else
  {
    callNext(req, res, next);
  }
}
function uredi(req, res, next) {
  var sklep = req.student.sklepi.id(req.params.sklep);
  
  if(!sklep)
  {
    res.status(404).json({ message: "Izbrani sklep ne obstaja"});
  }
  else
  {
    if(req.body.organ)
      sklep.organ = req.body.organ;
    if(req.body.besedilo)
      sklep.besedilo = req.body.besedilo;
    if(req.body.datum)
      sklep.datum = new Date(req.body.datum);
    
    callNext(req, res, next);
  }
}
function izbrisi(req, res, next) {
  var sklep = req.student.sklepi.pull(req.params.sklep);
  
  if(!sklep)
  {
    return res.status(404).json({ message: "Izbrani sklep ne obstaja"});
  }
  
  callNext(req, res, next);
}