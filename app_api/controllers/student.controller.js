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
    if(!req.body || !req.body.Podatki || typeof req.body.Podatki !== 'string')
        return res.status(400).json({ message: "Ni posredovanih ustreznih podatkov" });
    callNext(req, res, [
        pridobiZaporednoStevilko, parsePrejetePodatke, pripraviObjekteStudentov, obdelajStudente, ustvariStudente,
        pripraviObjekteUserjev, obdelajUserje, ustvariUserje, uvozZakljucen
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
        posodobiStudenta
    ]);
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
            console.log(req.body);
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
                console.log(req.body.davcna_stevilka);
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
            
            student.save(function(err, student) {
                if(err){
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
    
    req.uvozeniPodatki = req.body.Podatki.split(/[\r\n]+/);
    
    callNext(req, res, next);
}

function pripraviObjekteStudentov(req, res, next) {
    var studentObj;
    while(req.uvozeniPodatki.length >= 4) {
        studentObj = {};
        studentObj.ime = req.uvozeniPodatki.shift();
        studentObj.priimek = req.uvozeniPodatki.shift();
        studentObj.program = req.uvozeniPodatki.shift();
        studentObj.email = req.uvozeniPodatki.shift();
        studentObj.vpisna_stevilka = "ni vpisne";
        studentObj.password = "";
        
        req.queueStudentov.push(studentObj);
    }
    if (req.uvozeniPodatki.length !== 0) {
        studentObj = {
            ime: "",
            priimek: "",
            program: "",
            email: "",
            razlog: ""
        };
        if(req.uvozeniPodatki.length > 0)
            studentObj.ime = req.uvozeniPodatki.shift();
        else
            studentObj.razlog += "Ime ni podano, ";
        
        if(req.uvozeniPodatki.length > 0)
            studentObj.priimek = req.uvozeniPodatki.shift();
        else
            studentObj.razlog += "Priimek ni podan, ";
        
        if(req.uvozeniPodatki.length > 0)
            studentObj.program = req.uvozeniPodatki.shift();
        else
            studentObj.razlog += "Program ni podan, ";
        
        if(req.uvozeniPodatki.length > 0)
            studentObj.email = req.uvozeniPodatki.shift();
        else
            studentObj.razlog += "E-pošta ni podana, ";
        
        if(studentObj.razlog.length > 2)
            studentObj.razlog = studentObj.razlog.substr(0, studentObj.razlog.length - 2);
        
        req.zavrnjeni.push(studentObj);
    }
    
    callNext(req, res, next);
}
function obdelajStudente(req, res, next) {
    if(req.queueStudentov.length > 0) {
        req.studentObj = req.queueStudentov.pop();
        
        validateEmail(req, res, next);
    } else {
        req.queueStudentov = req.sprejeti.splice(0); // Da ustvari kopijo arraya in ne samo reference
        req.sprejeti = [];
        callNext(req, res, next);
    }
}
function ustvariStudente(req, res, next) {
    
    if(req.queueStudentov.length > 0) {
        models.Student.create(req.queueStudentov, function(err, studenti) {
            if(err) {
                return console.log(err);
            }
            req.sprejeti = studenti;
            
            callNext(req, res, next);
        });
    } else {
        callNext(req, res, next);
    }
}
function pripraviObjekteUserjev(req, res, next) {
    if(req.sprejeti.length > 0) {
        req.queueUsers = [];
        for(var i = 0; i < req.sprejeti.length; i++) {
            var geslo = getMailGeslo();
            req.userObj = {};
            req.userObj.student = req.sprejeti[i];
            req.userObj.password = geslo;
            req.userObj.opombe = geslo;
            req.queueUsers.push(req.userObj);
        }
        req.tmpUsers = [];
        callNext(req, res, next);
    } else {
        uvozZakljucen(req, res);
    }
}
function obdelajUserje(req, res, next) {
    if(req.queueUsers.length > 0) {
        req.userObj = req.queueUsers.pop();
        
        genStudentEmail(req, res, next);
    } else {
        req.queueUsers = req.tmpUsers.splice(0);
        req.tmpUsers = [];
        
        return callNext(req, res, next);
    }
}
function ustvariUserje(req, res, next) {
    models.User.create(req.queueUsers, function(err, users) {
        if(err) {
            console.log(err);
        }
        req.users = users;
        callNext(req, res, next);
    });
}
function uvozZakljucen(req, res) {
    if(req.sprejeti.length > 0)
        res.status(201).json({ uporabniki: req.users, studenti: req.sprejeti, zavrnjeni: req.zavrnjeni });
    else
        res.status(200).json({ zavrnjeni: req.zavrnjeni });
}

function validateEmail(req, res, next) {
    if(!Utils.isEmail(req.studentObj.email)) {
        req.studentObj.razlog = "Neveljaven email";
        req.zavrnjeni.push(req.studentObj);
        return obdelajStudente(req, res, next);
    }
    
    models.Student.findOne({ email: req.studentObj.email }, function(err, student) {
        if(!err && student) {
            // Ta email je že v uporabi -> Zavrni ga
            req.studentObj.razlog = "Email že v uporabi";
            req.zavrnjeni.push(req.studentObj);
            return obdelajStudente(req, res, next);
        }
        najdiStudijskiProgram(req, res, next);
    });
}
function najdiStudijskiProgram(req, res, next) {
    models.StudijskiProgram.findOne({ sifra: req.studentObj.program }, function(err, program) {
        if(err || !program) {
            req.studentObj.razlog = "Neveljaven program";
            req.zavrnjeni.push(req.studentObj);
            return obdelajStudente(req, res, next);
        }
        
        req.studentObj.program = program;
        
        genVpisnaStevilka(req, res, next);
    });
}
function genVpisnaStevilka(req, res, next) {
    req.zaporednaVpisna += 1;
    var letoVpisa = (new Date).getFullYear().toString();
    req.studentObj.vpisna_stevilka = "63" + letoVpisa.slice(-2) + ('0000' + req.zaporednaVpisna).substr(-4);
    
    req.sprejeti.push(req.studentObj);
    
    obdelajStudente(req, res, next);
}
function genStudentEmail(req, res, next) {
    var initials = req.userObj.student.ime.substr(0,1).toLowerCase() + req.userObj.student.priimek.substr(0,1).toLowerCase();
    
    models.User.findOne({ "email" : { $regex: initials + "[0-9]{4}@student.uni-lj.si", $options: "gi" }, "student": {$exists: true} })
        .sort("-email")
        .exec(function(err, user) {
            if(err || !user) {
                req.userObj.email = initials + "0000@student.uni-lj.si";
                
                req.tmpUsers.push(req.userObj);
                
                obdelajUserje(req, res, next);
            } else {
                var zaporedna = user.email.substr(2, 4);
                zaporedna = parseInt(zaporedna, 10);
                zaporedna += 1;
                zaporedna = '0000' + zaporedna;
                zaporedna = zaporedna.substr(-4);
                
                req.userObj.email = initials + zaporedna + "@student.uni-lj.si";
                
                req.tmpUsers.push(req.userObj);
                
                obdelajUserje(req, res, next);
            }
        });
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