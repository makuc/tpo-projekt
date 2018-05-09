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

module.exports.uvoziStudente = function(req, res) {
  if(!req.body || !req.body.Podatki || typeof req.body.Podatki !== 'string' || !req.body.studijsko_leto || !req.body.nacin_studija)
    return res.status(400).json({ message: "Ni posredovanih ustreznih podatkov" });
  
  callNext(req, res, [
    pridobiZaporednoStevilko, validateStudijskoLeto, validateNacinStudija,
    parsePrejetePodatke, pripraviObjekteStudentov, obdelajStudente, ustvariStudente, ustvariStudentomZetone,
    pripraviObjekteUserjev, obdelajUserje, ustvariUserje, naloziUserjeSpremenjenim, uvozZakljucen
  ]);
};
module.exports.getStudente = function(req, res) {
  pridobiStudente(req, res);
};
module.exports.getStudenta = function(req, res) {
  pridobiStudenta(req, res);
};
module.exports.createStudenta = function(req, res) {
  if(!req.body || !req.body.vpisna_stevilka || !req.body.priimek || !req.body.ime || !req.body.email)
    return res.status(400).json({ message: "Manjkajo podatki za kreiranje študenta" });
  
  if(!Utils.isEmail(req.body.email))
    return res.status(400).send({ message: "Neveljaven email maslov" });
  
  checkEmailAlreadyExists(req, res, [ ustvariStudenta, vrniStudenta ]);
};
module.exports.updateStudenta = function(req, res){
  if(!req.body)
    return res.status(400).json({ message: "Ni podatkov za spreminjanje" });
  
  req.napake = [];
  preveriDrzavaRojstva (req, res, [
    preveriStalnoBivaliscePosta, preveriStalnoBivalisceObcina, preveriStalnoBivalisceDrzava,
    preveriZacasnoBivaliscePosta, preveriZacasnoBivalisceObcina, preveriZacasnoBivalisceDrzava,
    preveriDosezenoIzobrazbo, preveriDrzavoIzobrazbe,
    posodobiStudenta
  ]);
};

// Manipuliranje z žetoni!
module.exports.addZetonStudentu = function(req, res) {
  if(!req.body || !req.body.studijsko_leto || !req.body.letnik || !req.body.studijski_program ||
          !req.body.studijsko_leto_prvega_vpisa_v_ta_program || !req.body.vrsta_studija || !req.body.vrsta_vpisa ||
          !req.body.oblika_studija || !req.body.usmeritev || !req.body.izbirna_skupina || !req.body.kraj_izvajanja || !req.body.nacin_studija)
  {
    return res.status(400).json({ message: "Ni dovolj podatkov za kreiranje novega žetona"});
  }
  
  callNext(req, res, [ najdiStudentaId,
    validateStudijskoLeto, validateLetnik, validateStudijskiProgram, validateStudijskoLetoPrvegaVpisa, validateVrstaStudija,
    validateVrstaVpisa, validateOblikaStudija, validateNacinStudija, dodajZetonStudentu, vrniZeton
  ]);
};
module.exports.editZetonStudenta = function(req, res) {
  if(!req.body || (!req.body.studijsko_leto && !req.body.letnik && !req.body.studijski_program &&
          !req.body.studijsko_leto_prvega_vpisa_v_ta_program && !req.body.vrsta_studija && !req.body.vrsta_vpisa &&
          !req.body.oblika_studija && !req.body.usmeritev && !req.body.izbirna_skupina && !req.body.kraj_izvajanja && !req.body.nacin_studija))
  {
    return res.status(400).json({ message: "Nobenega podatka žetona ne spreminjap"});
  }
  
  callNext(req, res, [ najdiStudentaId,
    validateStudijskoLeto, validateLetnik, validateStudijskiProgram, validateStudijskoLetoPrvegaVpisa, validateVrstaStudija,
    validateVrstaVpisa, validateOblikaStudija, validateNacinStudija, najdiZetonStudenta, urediZetonStudenta, najdiZetonStudenta, vrniZeton
  ]);
};
module.exports.delZetonStudenta = function(req, res) {
  callNext(req, res, [najdiStudentaId, najdiZetonStudenta, odstraniZetonStudenta ]);
};

// Pridobivanje popolnega študentovega kartotečnega lista
module.exports.celotenKartotecniList = function(req, res) {
  callNext(req, res, [ najdiStudentaId, pripraviOsnutekKartoteke, najdiVseIzpiteStudenta, poveziIzpitePredmetom, vrniStudenta ]);
};


/****************************************/
/*********** Pomožne funkcije ***********/
/****************************************/

/** Funkcije za manipulacijo študentov **/
function pridobiStudente(req, res) {
  models.Student
    .find().limit(0)
    .sort({ "priimek" : 1, "ime" : 1 })
    .exec(function(err, studenti) {
      if(err || !studenti) {
        return res.status(404).send({ message: "Študentov ne najdem" });
      }
      return res.status(200).json(studenti);
    });
}
function pridobiStudenta(req, res) {
  models.Student
    .findById(req.params.student_id)
    .populate([
      {
        path: "drzava_rojstva",
        select: "slovenski_naziv"
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
        path: "studijska_leta_studenta.studijsko_leto"
      },
      {
        path: "studijska_leta_studenta.letnik",
        populate: {
          path: "studijskiProgram"
        }
      },
      {
        path: "studijska_leta_studenta.vrsta_studija"
      },
      {
        path: "studijska_leta_studenta.vrsta_vpisa"
      },
      {
        path: "studijska_leta_studenta.nacin_studija"
      },
      {
        path: "studijska_leta_studenta.oblika_studija"
      },
      {
        path: "studijska_leta_studenta.predmeti.predmet"
      },
      {
        path: "studijska_leta_studenta.predmeti.izpit"
      }
    ])
    .exec(
      function(err, student) {
        if(err || !student){
          return res.status(404).json({ "message": "Ni študenta s tem ID"});
        }
        res.status(200).json(student);
      }
    );
}
function najdiStudentaId(req, res, next) {
  models.Student
    .findById(req.params.student_id)
    .populate([
      {
        path: "drzava_rojstva",
        select: "slovenski_naziv"
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
        path: "studijska_leta_studenta.studijsko_leto"
      },
      {
        path: "studijska_leta_studenta.letnik",
        populate: {
          path: "studijskiProgram"
        }
      },
      {
        path: "studijska_leta_studenta.vrsta_studija"
      },
      {
        path: "studijska_leta_studenta.vrsta_vpisa"
      },
      {
        path: "studijska_leta_studenta.nacin_studija"
      },
      {
        path: "studijska_leta_studenta.oblika_studija"
      },
      {
        path: "studijska_leta_studenta.predmeti.predmet"
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
function ustvariStudenta(req, res, next) {
  var student = req.body;
  
  models.Student.create({
    vpisna_stevilka: student.vpisna_stevilka,
    priimek: student.priimek,
    ime: student.ime,
    email: student.email
  }, function(err, student){
    if(err) {
      console.log(err);
      return callNext(req, res, next);
    }
    
    req.student = student;
    callNext(req, res, next);
  });
}
function posodobiStudenta(req, res) {
  models.Student
    .findById(req.params.student_id)
    .exec(function(err, student) {
      if(err || !student){
        console.log(err);
        console.log(student);
        return res.status(404).json({ message: "Ne najdem tega študenta" });
      }
      
      if(typeof req.body.priimek === 'string')
        student.priimek = req.body.priimek;
      if(typeof req.body.ime === 'string')
        student.ime = req.body.ime;
      if(typeof req.body.datum_rojstva === 'string')
        student.datum_rojstva = req.body.datum_rojstva;
      if(req.body.kraj_rojstva)
        student.kraj_rojstva = req.body.kraj_rojstva;
      if(req.body.drzava_rojstva)
        student.drzava_rojstva = req.body.drzava_rojstva;
      if(req.body.obcina_rojstva)
        student.obcina_rojstva = req.body.obcina_rojstva;
      if(typeof req.body.drzavljanstvo === 'string')
        student.drzavljanstvo = req.body.drzavljanstvo;
      if(typeof req.body.spol === 'string')
        student.spol = req.body.spol;
      if(typeof req.body.emso === 'string')
        student.emso = req.body.emso;
      if(req.body.davcna_stevilka) {
        //console.log(req.body.davcna_stevilka);
        if(typeof req.body.davcna_stevilka === 'string')
          student.davcna_stevilka = req.body.davcna_stevilka;
        else
          req.napake.push("Napačna davčna številka");
      }
      if(typeof req.body.email === 'string')
        student.email = req.body.email;
      if(typeof req.body.prenosni_telefon === 'string')
        student.prenosni_telefon = req.body.prenosni_telefon;
      if(typeof req.body.stalno_bivalisce_naslov === 'string')
        student.stalno_bivalisce_naslov = req.body.stalno_bivalisce_naslov;
      if(req.body.stalno_bivalisce_posta)
        student.stalno_bivalisce_posta = req.body.stalno_bivalisce_posta;
      if(req.body.stalno_bivalisce_obcina)
        student.stalno_bivalisce_obcina = req.body.stalno_bivalisce_obcina;
      if(req.body.stalno_bivalisce_drzava)
        student.stalno_bivalisce_drzava = req.body.stalno_bivalisce_drzava;
      if(typeof req.body.stalno_bivalisce_vrocanje === 'boolean')
        student.stalno_bivalisce_vrocanje = req.body.stalno_bivalisce_vrocanje;
      if(typeof req.body.zacasno_bivalisce_naslov === 'string')
        student.zacasno_bivalisce_naslov = req.body.zacasno_bivalisce_naslov;
      if(req.body.zacasno_bivalisce_posta)
        student.zacasno_bivalisce_posta = req.body.zacasno_bivalisce_posta;
      if(req.body.zacasno_bivalisce_obcina)
        student.zacasno_bivalisce_obcina = req.body.zacasno_bivalisce_obcina;
      if(req.body.zacasno_bivalisce_drzava)
        student.zacasno_bivalisce_drzava = req.body.zacasno_bivalisce_drzava;
      if(typeof req.body.zacasno_bivalisce_vrocanje === 'boolean')
        student.zacasno_bivalisce_vrocanje = req.body.zacasno_bivalisce_vrocanje;
      
      // Podatki o preteklem izobraževanju
      if(typeof req.body.izo_zavod === 'string')
        student.predhodna_izobrazba.zavod = req.body.izo_zavod;
      if(typeof req.body.izo_kraj === 'string')
        student.predhodna_izobrazba.kraj = req.body.izo_kraj;
      if(req.body.izo_drzava)
        student.predhodna_izobrazba.drzava = req.body.izo_drzava;
      if(typeof req.body.izo_program === 'string')
        student.predhodna_izobrazba.program = req.body.izo_program;
      if(typeof req.body.izo_leto_zakljucka === 'string')
        student.predhodna_izobrazba.leto_zakljucka = req.body.izo_leto_zakljucka;
      if(typeof req.body.izo_uspeh === 'string')
        student.predhodna_izobrazba.uspeh = req.body.izo_uspeh;
      if(typeof req.body.izo_smer_strokovna_izobrazba === 'string')
        student.predhodna_izobrazba.smer_strokovna_izobrazba = req.body.izo_smer_strokovna_izobrazba;
      if(typeof req.body.izo_nacin_koncanja === 'string')
        student.predhodna_izobrazba.nacin_koncanja = req.body.izo_nacin_koncanja;
      if(req.body.izo_najvisja_dosezena_izobrazba)
        student.predhodna_izobrazba.najvisja_dosezena_izobrazba = req.body.izo_najvisja_dosezena_izobrazba;
      
      student.save(function(err, student) {
        if(err){
          console.log("---posodobiStudenta:\n" + err);
          return res.status(400).json({ message: "Napaka pri posodabljanju študenta" });
        }
        res.status(200).json({ student: student, napake: req.napake });
      });
    });
}
function vrniStudenta(req, res) {
  if(!req.student)
    return res.status(400).json({ message: "Dodajanje študenta ni uspelo" });
  
  return res.status(201).json( req.student );
}

function preveriDrzavaRojstva(req, res, next) {
  if(req.body.drzava_rojstva) {
    models.Drzava.findById(req.body.drzava_rojstva).exec(function(err, drzava) {
      if(err || !drzava) {
        req.body.drzava_rojstva = undefined;
        req.napake.push("Napačen ID države rojstva");
      }
      
      req.body.drzava_rojstva = drzava;
      
      return callNext(req, res, next);
    });
  } else
    callNext(req, res, next);
}
function preveriStalnoBivaliscePosta(req, res, next) {
  if(req.body.stalno_bivalisce_posta) {
    models.Posta.findById(req.body.stalno_bivalisce_posta).exec(function(err, posta) {
      if(err || !posta) {
        req.body.stalno_bivalisce_posta = undefined;
        req.napake.push("Napačen ID pošte stalnega bivališča");
      }
      
      req.body.stalno_bivalisce_posta = posta;
      
      return callNext(req, res, next);
    });
  } else
    callNext(req, res, next);
}
function preveriStalnoBivalisceObcina(req, res, next) {
  if(req.body.stalno_bivalisce_obcina) {
    models.Obcina.findById(req.body.stalno_bivalisce_obcina).exec(function(err, obcina) {
      if(err || !obcina) {
        req.body.stalno_bivalisce_obcina = undefined;
        req.napake.push("Napačen ID občine stalnega bivališča");
      }
      
      req.body.stalno_bivalisce_obcina = obcina;
      
      return callNext(req, res, next);
    });
  } else
    callNext(req, res, next);
}
function preveriStalnoBivalisceDrzava(req, res, next) {
  if(req.body.stalno_bivalisce_drzava) {
    models.Drzava.findById(req.body.stalno_bivalisce_drzava).exec(function(err, drzava) {
      if(err || !drzava) {
        req.body.stalno_bivalisce_drzava = undefined;
        req.napake.push("Napačen ID države stalnega bivališča");
      }
      
      req.body.stalno_bivalisce_drzava = drzava;
      
      return callNext(req, res, next);
    });
  } else
    callNext(req, res, next);
}
function preveriZacasnoBivaliscePosta(req, res, next) {
  if(req.body.zacasno_bivalisce_posta) {
    models.Posta.findById(req.body.zacasno_bivalisce_posta).exec(function(err, posta) {
      if(err || !posta) {
        req.body.zacasno_bivalisce_posta = undefined;
        req.napake.push("Napačen ID pošte začasnega bivališča");
      }
      
      req.body.zacasno_bivalisce_posta = posta;
      
      return callNext(req, res, next);
    });
  } else
    callNext(req, res, next);
}
function preveriZacasnoBivalisceObcina(req, res, next) {
  if(req.body.zacasno_bivalisce_obcina) {
    models.Obcina.findById(req.body.zacasno_bivalisce_obcina).exec(function(err, obcina) {
      if(err || !obcina) {
        req.body.zacasno_bivalisce_obcina = undefined;
        req.napake.push("Napačen ID občine začasnega bivališča");
      }
      
      req.body.zacasno_bivalisce_obcina = obcina;
      
      return callNext(req, res, next);
    });
  } else
    callNext(req, res, next);
}
function preveriZacasnoBivalisceDrzava(req, res, next) {
  if(req.body.zacasno_bivalisce_drzava) {
    models.Drzava.findById(req.body.zacasno_bivalisce_drzava).exec(function(err, drzava) {
      if(err || !drzava) {
        req.body.zacasno_bivalisce_drzava = undefined;
        req.napake.push("Napačen ID države začasnega bivališča");
      }
      
      req.body.zacasno_bivalisce_drzava = drzava;
      
      return callNext(req, res, next);
    });
  } else
    callNext(req, res, next);
}

function checkEmailAlreadyExists(req, res, next) {
  // Check if user with this email already exists
  models.Student.findOne({ email: req.body.email }, function(err, student) {
    if(err) {
      //console.log(err);
      return res.status(404).send({ message: "Napaka pri pregledu obstoja tega email naslova" });
    }
    if(student) return res.status(409).send({ message: "Ta email naslov je že v uporabi" });
    
    callNext(req, res, next);
  });
}

/* Funkcije za uvažanje študentov */
function pridobiZaporednoStevilko(req, res, next) {
  // najprej dobi zaporedno vpisno - ce ni studentov nastavi zaporedno na 0
  models.Student.findOne().sort('-vpisna_stevilka').exec(function(err, student) 
  {
    if(err || !student) {
      req.zaporednaVpisna = -1;
    } else {
      req.zaporednaVpisna = student.vpisna_stevilka.slice(-4);
      req.zaporednaVpisna = parseInt(req.zaporednaVpisna, 10); // 10 zato, ker obdelujemo decimalna števila
    }
    
    callNext(req, res, next);
  });
}
function parsePrejetePodatke(req, res, next) {
  req.queueStudentov = [];
  req.sprejeti = [];
  req.zavrnjeni = [];
  req.spremenjeni = [];
  
  req.uvozeniPodatki = req.body.Podatki.split(/[\r\n]+/);
  
  for(var i = 0; i < req.uvozeniPodatki.length; i++) {
    if(req.uvozeniPodatki[i].trim().length <= 0)
      req.uvozeniPodatki.splice(i, 1);
  }
  
  if(req.uvozeniPodatki.length == 0)
    return res.status(400).json({ message: "Ni podanih nobenih podatkov o študentih" });
  
  callNext(req, res, next);
}

function pripraviObjekteStudentov(req, res, next) {
  var studentObj;
  while(req.uvozeniPodatki.length > 0) {
    var data = req.uvozeniPodatki.shift();
    
    studentObj = {
      ime: data.substr(0, 30).trim(),
      priimek: data.substr(30, 30).trim(),
      program: data.substr(60, 7).trim(),
      email: data.substr(67, 60).trim(),
      vpisna_stevilka: "ni vpisne",
      password: "",
      razlog: ""
    };
    
    if(studentObj.ime.length <= 0)
      studentObj.razlog += "Ime ni podano, ";
    if(studentObj.priimek.length <= 0)
      studentObj.razlog += "Priimek ni podan, ";
    if(studentObj.program.length <= 0)
      studentObj.razlog += "Program ni podan, ";
    if(studentObj.email.length <= 0)
      studentObj.razlog += "E-pošta ni podana, ";
    
    if(studentObj.razlog.length > 2) {
      req.zavrnjeni.push(studentObj);
      studentObj.razlog = studentObj.razlog.substr(0, studentObj.razlog.length - 2);
    } else
      req.queueStudentov.push(studentObj);
  }
  
  callNext(req, res, next);
}
function obdelajStudente(req, res, next) {
  if(next) {
    req.myNext = next;
  }
  
  if(req.queueStudentov.length > 0) {
    req.studentObj = req.queueStudentov.pop();
    
    callNext(req, res, [ najdiStudijskiProgram, validateEmail, genVpisnaStevilka, obdelajStudente ]);
  } else {
    req.queueStudentov = req.sprejeti.splice(0); // Da ustvari kopijo arraya in ne samo reference
    req.sprejeti = [];
    req.studenti = [];
    
    next = req.myNext;
    req.myNext = undefined;
    
    callNext(req, res, next);
  }
}
function ustvariStudente(req, res, next) {
  if(req.queueStudentov.length > 0) {
    models.Student.create(req.queueStudentov, function(err, studenti) {
      if(err) {
        console.log(err);
        return res.status(400).json({ message: "Napaka pri kreiranju študentov" });
      }
      req.studenti = studenti;
      
      callNext(req, res, next);
    });
  } else {
    callNext(req, res, next);
  }
}
function pripraviObjekteUserjev(req, res, next) {
  req.queueUsers = [];
  req.tmpUsers = [];
  req.userMails = [];
  
  if(req.sprejeti.length > 0) {
    for(var i = 0; i < req.sprejeti.length; i++) {
      var geslo = getMailGeslo();
      req.userObj = {};
      req.userObj.student = req.sprejeti[i];
      req.userObj.password = geslo;
      req.userObj.opombe = geslo;
      req.queueUsers.push(req.userObj);
    }
  }
  
  callNext(req, res, next);
}
function obdelajUserje(req, res, next) {
  if(next)
    req.myNext = next;
  
  if(req.queueUsers.length > 0) {
    req.userObj = req.queueUsers.pop();
    
    callNext(req, res, [ genStudentEmail, obdelajUserje ]);
  } else {
    req.queueUsers = req.tmpUsers.splice(0);
    req.tmpUsers = [];
    
    next = req.myNext;
    req.myNext = undefined;
    
    return callNext(req, res, next);
  }
}
function ustvariUserje(req, res, next) {
  if(req.queueUsers.length > 0) {
    models.User.create(req.queueUsers, function(err, users) {
      if(err) {
        console.log(err);
        return res.status(400).json({ message: "Napaka pri kreiranju uporabnikov študentov" });
      }
      req.users = users;
      callNext(req, res, next);
    });
  } else {
    callNext(req, res, next);
  }
}
function naloziUserjeSpremenjenim(req, res, next) {
  models.User
    .find({ student: req.spremenjeni })
    .populate("student")
    .exec(function(err, users) {
    if(err) {
      console.log(err);
      return res.status(404).json({ message: "Napaka pri iskanju uporabnikov obstoječih študentov" });
    }
    
    req.spremenjeni = users;
    
    callNext(req, res, next);
  });
}
function uvozZakljucen(req, res) {
  if(req.sprejeti.length > 0 || req.spremenjeni.length > 0)
    res.status(201).json({
      uporabniki: req.users,
      studenti: req.sprejeti,
      zavrnjeni: req.zavrnjeni,
      spremenjeni: req.spremenjeni
    });
  else
    res.status(400).json({ zavrnjeni: req.zavrnjeni });
}

function validateEmail(req, res, next) {
  if(!Utils.isEmail(req.studentObj.email)) {
    req.studentObj.razlog = "Neveljaven email";
    req.zavrnjeni.push(req.studentObj);
    return obdelajStudente(req, res);
  }
  
  models.Student.findOne({ email: req.studentObj.email }, function(err, student) {
    if(err) {
      //console.log(err);
      return res.status(400).json({ message: "Prišlo do napake pri preverjanju obstoja elektronske pošte študenta" });
    }
    if(student) {
      req.student = student;
      
      return popraviStudenta(req, res, next);
    }
    callNext(req, res, next);
  });
}
function najdiStudijskiProgram(req, res, next) {
  models.StudijskiProgram.findOne({ sifraEVS: req.studentObj.program }, function(err, program) {
    if(err || !program) {
      req.studentObj.razlog = "Neveljaven program";
      req.zavrnjeni.push(req.studentObj);
      return obdelajStudente(req, res);
    }
    
    req.studentObj.program = program;
    
    callNext(req, res, next);
  });
}
function genVpisnaStevilka(req, res, next) {
  req.zaporednaVpisna += 1;
  var letoVpisa = (new Date).getFullYear().toString();
  req.studentObj.vpisna_stevilka = "63" + letoVpisa.slice(-2) + ('0000' + req.zaporednaVpisna).substr(-4);
  
  req.sprejeti.push(req.studentObj);
  
  callNext(req, res, next);
}
function genStudentEmail(req, res, next) {
  var initials = req.userObj.student.ime.substr(0,1).toLowerCase() + req.userObj.student.priimek.substr(0,1).toLowerCase();
  
  // Check if we already generated an email using these initials !!
  for(var i = 0; i < req.userMails.length; i++) {
    if(req.userMails[i].initials == initials) {
      
      req.userMails[i].zaporedna += 1;
      
      // Pripravi Email naslov
      var zaporedna = '0000' + req.userMails[i].zaporedna;
      zaporedna = zaporedna.substr(-4);
      
      req.userObj.email = initials + zaporedna + "@student.uni-lj.si";
      
      req.tmpUsers.push(req.userObj);
      
      return callNext(req, res, next);
    }
  }
  
  // These initials haven't been used yet in this session - Look them up in the DB
  models.User.findOne({ "email" : { $regex: initials + "[0-9]{4}@student.uni-lj.si", $options: "gi" }, "student": {$exists: true} })
    .sort("-email")
    .exec(function(err, user) {
      if(err || !user) {
        req.userObj.email = initials + "0000@student.uni-lj.si";
        
        req.tmpUsers.push(req.userObj);
        
        callNext(req, res, next);
      } else {
        var zaporedna = user.email.substr(2, 4);
        zaporedna = parseInt(zaporedna, 10);
        
        zaporedna += 1;
        
        // Shrani pridobljeno zaporedno številko za nadaljno uporabo
        var emailObj = {
          zaporedna: zaporedna,
          initials: initials
        };
        req.userMails.push(emailObj);
        
        // Pripravi Email naslov
        zaporedna = '0000' + zaporedna;
        zaporedna = zaporedna.substr(-4);
        
        req.userObj.email = initials + zaporedna + "@student.uni-lj.si";
        
        req.tmpUsers.push(req.userObj);
        
        callNext(req, res, next);
      }
    });
}

function preveriDosezenoIzobrazbo(req, res, next) {
  if(req.body.izo_najvisja_dosezena_izobrazba) {
    models.VrstaStudija.findById(req.body.izo_najvisja_dosezena_izobrazba, function(err, izobrazba) {
      if(err || !izobrazba) {
        console.log("---preveriDosezenoIzobrazbo:\n" + err);
        return res.status(404).json({ message: "Ta dosežena izobrazba ne obstaja"});
      }
      
      req.body.izo_najvisja_dosezena_izobrazba = izobrazba;
      
      callNext(req, res, next);
    });
  } else
    callNext(req, res, next);
}
function preveriDrzavoIzobrazbe(req, res, next) {
  if(req.body.izo_drzava) {
    models.Drzava.findById(req.body.izo_drzava, function(err, drzava) {
      if(err || !drzava) {
        console.log("---validateDrzavoIzobrazbe:\n" + err);
        return res.status(404).json({ message: "Ta država za izobraževanje ne obstaja"});
      }
      
      req.body.izo_drzava = drzava;
      
      callNext(req, res, next);
    });
  } else
    callNext(req, res, next);
}

function getMailGeslo() {
  var nabor = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  var dolzina = 12;
  var geslo = "";
  for (var i = 0; i < dolzina; ++i) 
  {
    geslo += nabor.charAt(Math.floor(Math.random() * nabor.length * 12345) % nabor.length);
  }
  return geslo;
}

function popraviStudenta(req, res, next) {
  req.student.ime = req.studentObj.ime;
  req.student.priimek = req.studentObj.priimek;
  
  req.student.save(function(err, student) {
    if(err) {
      console.log(err);
      return res.status(400).json({ message: "Napaka pri shranjevanju študenta" });
    }
    
    req.spremenjeni.push(req.student);
    
    obdelajStudente(req, res);
  });
}

function validateStudijskoLeto(req, res, next) {
  if(req.body.studijsko_leto) {
    models.StudijskoLeto
      .findById(req.body.studijsko_leto)
      .populate()
      .exec(function(err, leto) {
        if(err || !leto) {
          console.log(err);
          return res.status(404).json({ message: "Ne najdem izbranega študijskega leta" });
        }
        
        req.studijskoLeto = leto;
        
        callNext(req, res, next);
      });
  } else
    callNext(req, res, next);
}
function validateStudijskoLetoPrvegaVpisa(req, res, next) {
  if(req.body.studijsko_leto_prvega_vpisa_v_ta_program) {
    models.StudijskoLeto
      .findById(req.body.studijsko_leto_prvega_vpisa_v_ta_program)
      .populate()
      .exec(function(err, leto) {
        if(err || !leto) {
          console.log(err);
          return res.status(404).json({ message: "Ne najdem izbranega študijskega leta" });
        }
        
        req.studijskoLetoPrvegaVpisa = leto;
        
        callNext(req, res, next);
      });
  } else
    callNext(req, res, next);
}
function validateNacinStudija(req, res, next) {
  if(req.body.nacin_studija) {
    models.NacinStudija
      .findById(req.body.nacin_studija)
      .populate()
      .exec(function(err, nacinStudija) {
        if(err || !nacinStudija) {
          //console.log(err);
          return res.status(404).json({ message: "Ne najdem izbranega načina študija" });
        }
        
        req.nacinStudija = nacinStudija;
        
        callNext(req, res, next);
      });
  } else
    callNext(req, res, next);
}
function validateLetnik(req, res, next) {
  if(req.body.letnik) {
    models.Letnik
      .findById(req.body.letnik)
      .populate()
      .exec(function(err, letnik) {
        if(err || !letnik) {
          //console.log(err);
          return res.status(404).json({ message: "Ne najdem izbranega letnika" });
        }
        
        req.letnik = letnik;
        
        callNext(req, res, next);
      });
  } else
    callNext(req, res, next);
}
function validateStudijskiProgram(req, res, next) {
  if(req.body.studijski_program) {
    models.StudijskiProgram
      .findById(req.body.studijski_program)
      .populate()
      .exec(function(err, studijskiProgram) {
        if(err || !studijskiProgram) {
          //console.log(err);
          return res.status(404).json({ message: "Ne najdem izbranega študijskega programa" });
        }
        
        req.studijskiProgram = studijskiProgram;
        
        callNext(req, res, next);
      });
  } else
    callNext(req, res, next);
}
function validateVrstaStudija(req, res, next) {
  if(req.body.vrsta_studija) {
    models.VrstaStudija
      .findById(req.body.vrsta_studija)
      .populate()
      .exec(function(err, vrstaStudija) {
        if(err || !vrstaStudija) {
          //console.log(err);
          return res.status(404).json({ message: "Ne najdem izbrane vrste študija" });
        }
        
        req.vrstaStudija = vrstaStudija;
        
        callNext(req, res, next);
      });
  } else
    callNext(req, res, next);
}
function validateOblikaStudija(req, res, next) {
  if(req.body.oblika_studija) {
    models.OblikaStudija
      .findById(req.body.oblika_studija)
      .populate()
      .exec(function(err, oblikaStudija) {
        if(err || !oblikaStudija) {
          //console.log(err);
          return res.status(404).json({ message: "Ne najdem izbrane oblike študija" });
        }
        
        req.oblikaStudija = oblikaStudija;
        
        callNext(req, res, next);
      });
  } else
    callNext(req, res, next);
}
function validateVrstaVpisa(req, res, next) {
  if(req.body.vrsta_vpisa) {
    models.VrstaVpisa
      .findById(req.body.vrsta_vpisa)
      .populate()
      .exec(function(err, vrstaVpisa) {
        if(err || !vrstaVpisa) {
          //console.log(err);
          return res.status(404).json({ message: "Ne najdem izbrane vrste vpisa" });
        }
        
        req.vrstaVpisa = vrstaVpisa;
        
        callNext(req, res, next);
      });
  } else
    callNext(req, res, next);
}

function ustvariStudentomZetone(req, res, next) {
  if(next) {
    req.myNext = next;
    req.prviLetniki = [];
  }
  
  if(req.studenti.length > 0) {
    req.student = req.studenti.shift();
    
    var studentObj = null;
    
    // Najdi ustrezen objekt študenta, iz katerega smo kreirali celoten objekt !!
    for(var i = 0; i < req.queueStudentov.length; i++) {
      if(req.queueStudentov[i].email == req.student.email) {
        studentObj = req.queueStudentov.splice(i, 1)[0];
        //console.log("Student OBJ:\n" + studentObj.ime);
        break;
      }
    }
    
    if(!studentObj) {
      console.log("## Napaka pri kreiranju žetona študentu ###");
      return res.status(400).json({ message: "Prišlo do napake pri kreiranju žetona študentu!" });
    }
    
    // Nadaljuj s kreiranjem študenta
    req.studentObj = studentObj;
    
    callNext(req, res, [ najdiPrviLetnikPrograma, ustvariZetonNovemuStudentu, ustvariStudentomZetone ]);
  } else {
    next = req.myNext;
    req.myNext = undefined;
    
    callNext(req, res, next);
  }
}
function najdiPrviLetnikPrograma(req, res, next) {
  for(var i = 0; i < req.prviLetniki.length; i++) {
    if(req.prviLetniki[i].program.equals(req.studentObj.program)) {
      req.letnik = req.prviLetniki[i].letnik;
      
      return callNext(req, res, next);
    }
  }
  
  models.Letnik
    .findOne({
      studijskiProgram: req.studentObj.program,
      pogoj_letnik : { "$exists" : false }
    }, function(err, letnik) {
      if(err) {
        //console.log(err);
        return res.status(400).json({ message: "Ne najdem prvega letnika izbranega programa" });
      }
      
      req.prviLetniki.push({
        program: req.studentObj.program,
        letnik: letnik
      });
      
      req.letnik = letnik;
      
      callNext(req, res, next);
    });
}
function ustvariZetonNovemuStudentu(req, res, next) {
  req.student.zetoni.push({
    studijsko_leto: req.studijskoLeto,
    letnik: req.letnik,
    studijski_program: req.studentObj.program,
    studijsko_leto_prvega_vpisa_v_ta_program: req.studijskoLeto,
    vrsta_studija: req.studentObj.program.vrstaStudija,
    vrsta_vpisa: "5ac8be2a7482291008d3f9f5",
    oblika_studija: "5ac8beac24ee18109953514b",
    
    usmeritev: "-",
    izbirna_skupina: "-",
    
    kraj_izvajanja: "Ljubljana",
    
    nacin_studija: req.nacinStudija
  });
  
  req.student.save(function(err, student) {
    if(err || !student) {
      console.log(err);
      return res.status(400).json({ message: "Napaka pri shranjevanju žetona" });
    }
    
    req.sprejeti.push(student);
    
    callNext(req, res, next);
  });
}

function pripraviObjektZetonaStudentu(req, res, next) {
  
}
function dodajZetonStudentu(req, res, next) {
  req.student.zetoni.push({
    studijsko_leto: req.studijskoLeto,
    letnik: req.letnik,
    studijski_program: req.studijskiProgram,
    studijsko_leto_prvega_vpisa_v_ta_program: req.studijskoLetoPrvegaVpisa || req.studijskoLeto,
    vrsta_studija: req.vrstaStudija,
    vrsta_vpisa: req.vrstaVpisa,
    oblika_studija: req.oblikaStudija,
    
    usmeritev: req.body.usmeritev,
    izbirna_skupina: req.body.izbirna_skupina,
    
    kraj_izvajanja: req.body.kraj_izvajanja,
    
    nacin_studija: req.nacinStudija
  });
  
  req.student.save(function(err, student) {
    if(err || !student) {
      console.log("---dodajZetonStudentu:\n" + err);
      return res.status(400).json({ message: "Napaka pri dodajanju žetona" });
    }
    
    req.student = student;
    
    req.zeton = req.student.zetoni[req.student.zetoni.length - 1];
    
    callNext(req, res, next);
  });
}

function najdiZetonStudenta(req, res, next) {
  req.zeton = req.student.zetoni.id(req.params.zeton_id);
  
  if(!req.zeton)
  {
    return res.status(404).json({ message: "Ne najdem izbranega žetona"});
  }
  
  callNext(req, res, next);
}
function urediZetonStudenta(req, res, next) {
  if(req.studijskoLeto)
    req.zeton.studijsko_leto = req.studijskoLeto;
  if(req.letnik)
    req.zeton.letnik = req.letnik;
  if(req.studijskiProgram)
    req.zeton.studijski_program = req.studijskiProgram;
  if(req.studijskoLetoPrvegaVpisa)
    req.zeton.studijsko_leto_prvega_vpisa_v_ta_program = req.studijskoLetoPrvegaVpisa;
  if(req.vrstaStudija)
    req.zeton.vrsta_studija = req.vrstaStudija;
  if(req.vrstaVpisa)
    req.zeton.vrsta_vpisa = req.vrstaVpisa;
  if(req.oblikaStudija)
    req.zeton.oblika_studija = req.oblikaStudija;
  if(req.nacinStudija)
    req.zeton.nacin_studija = req.nacinStudija;
  
  if(req.body.usmeritev)
    req.zeton.usmeritev = req.body.usmeritev;
  if(req.body.izbirna_skupina)
    req.zeton.izbirna_skupina = req.body.izbirna_skupina;
  if(req.body.kraj_izvajanja)
    req.zeton.kraj_izvajanja = req.body.kraj_izvajanja;
  
  req.student.save(function(err, student) {
    if(err || !student) {
      console.log("---urediZetonStudenta:\n" + err);
      return res.status(404).json({ message: "Napaka pri shranjevanju žetona"});
    }
    
    req.student = student;
    
    callNext(req, res, next);
  });
}
function odstraniZetonStudenta(req, res, next) {
  req.student.zetoni.pull(req.zeton);
  
  req.student.save(function(err, student) {
    if(err || !student)
    {
      console.log("---odstraniZetonStudenta:\n" + err);
      return res.status(404).json({ message: "Napaka pri odstranjevanju žetona8"});
    }
    
    req.student = student;
    
    return res.status(200).json({ message: "Žeton odstranjen"});
  });
}
function vrniZeton(req, res, next) {
  res.status(200).json(req.zeton);
}

// Pripravi kartotečni list
function pripraviOsnutekKartoteke(req, res, next) {
  req.student = req.student.toObject();
  
  for(var i = 0; i < req.student.studijska_leta_studenta.length; i++)
  {
    var leto = req.student.studijska_leta_studenta[i];
    
    for(var j = 0; j < leto.predmeti.length; j++)
    {
      leto.predmeti[j].izpiti = [];
    }
    
  }
  
  callNext(req, res, next);
}
function najdiVseIzpiteStudenta(req, res, next) {
  models.Izpit
    .find({
      polagalci: {
        $elemMatch: {
          student: req.student,
          odjavljen: false,
          valid: true
        }
      }
    })
    .populate("izvajalci")
    .exec(function(err, izpiti) {
      if(err || !izpiti)
      {
        console.log("---najdiVseIzpiteStudenta:\n" + err);
        return res.status(404).json({ message: "Napaka pri pridobivanju vseh izpitov študenta"});
      }
      
      req.izpiti = izpiti;
      
      callNext(req, res, next);
    });
}
function poveziIzpitePredmetom(req, res, next) {
  console.log("--poveziIzpitePredmetom");
  while(req.izpiti.length > 0)
  {// Obdelaj vse pridobljene izpite
    var izpit = req.izpiti.pop().toObject();
    
    izpit = odstraniOstalePolagalce(izpit, req.student);
    
    var leta = req.student.studijska_leta_studenta;
    
    console.log("Obdelaj izpit... Najdi študijsko leto");
    
    for(var i = 0; i < leta.length; i++)
    {// Najdi ustrezno študijsko leto
      if(leta[i].studijsko_leto._id.equals(izpit.studijsko_leto))
      {
        var leto = leta[i];
        
        console.log("Študijsko leto najdeno!");
        
        for(var x = 0; x < leto.predmeti.length; x++)
        {// Najdi ustrezen predmet
          if(leto.predmeti[x].predmet._id.equals(izpit.predmet))
          {
            var predmet = leto.predmeti[x];
            
            predmet.izpiti.push(izpit);
            break;
          }
        }
        
        break;
      }
    }
    
  }
  
  callNext(req, res, next);
}

function odstraniOstalePolagalce(izpit, student) {
  for(var i = 0; i < izpit.polagalci.length; i++)
  {
    if(student._id.equals(izpit.polagalci[i].student))
    {
      izpit.polaganje = izpit.polagalci[i];
      izpit.polagalci = undefined;
      
      break;
    }
  }
  
  return izpit;
}