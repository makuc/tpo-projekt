var Utils = require("./_include/utils");
var callNext = require("./_include/callNext");;

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Student = mongoose.model('Student');
var User = mongoose.model('User');

var request = require('request');
var apiParameters = {
  server: "http://localhost:" + process.env.PORT
};
/*
if(process.env.NODE_ENV === 'production') {
  apiParameters.server = "https://aa-novels.herokuapp.com/";
}
*/

/*var requestParameters, path, forwardedData;
path = '/api/v1/uporabnik';

forwardedData = {
    student: student,
    email: generiranEmail,
    password: generiranoGeslo,
    opombe: generiranoGeslo
};
requestParameters = {
    url: apiParameters.server + path,
    method: 'POST',
    json: forwardedData
};
request(
    requestParameters,
    function(err, answer, token) {
        if(err) {
            // Prišlo je do napake, do something
        }
        if(answer.statusCode == 201) {
            // Uporabnik je ustvarjen
        } else {
            // Prišlo je do napake
        }
    }
);
*/

module.exports.uvoziStudente = function(req, res) {
    uvoziStudente(req, res);
};
module.exports.getStudente = function(req, res) {
  pridobiStudente(req, res);
};
module.exports.getStudenta = function(req, res) {
    pridobiStudenta(req, res);
};
module.exports.createStudent = function(req, res) {
    if(!req.body || !req.body.vpisna_stevilka || !req.body.priimek || !req.body.ime || !req.body.email)
        return res.status(400).json({ message: "Manjkajo podatki za kreiranje študenta" });
    
    if(!Utils.isEmail(req.body.email))
        return res.status(400).send({ message: "Neveljaven email maslov" });
    
    checkEmailAlreadyExists(req, res, [ ustvariStudenta, vrniStudenta ]);
};
module.exports.updateStudenta = function(req, res){
    
};

function pridobiStudente(req, res) {
    Student
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
    Student
        .findById(req.params.student_id)
        .populate([
            {
                path: "drzava_rojstva",
                select: "slovenski_naziv -_id"
            },
            // Stalno bivališče
            {
                path: "stalno_bivalisce_posta",
                select: "naziv -_id"
            },
            {
                path: "stalno_bivalisce_obcina",
                select: "ime -_id"
            },
            {
                path: "stalno_bivalisce_drzava",
                select: "slovenski_naziv -_id"
            },
            // Začasno bivališče
            {
                path: "zacasno_bivalisce_posta",
                select: "naziv -_id"
            },
            {
                path: "zacasno_bivalisce_obcina",
                select: "ime -_id"
            },
            {
                path: "zacasno_bivalisce_drzava",
                select: "slovenski_naziv -_id"
            }
        ])
        .exec(
            function(err, student) {
                if(err || !student){
                    return req.status(404).json({ "message": "Ni študenta s tem ID"});
                }
                res.status(200).json(student);
            }
        );
}
function ustvariStudenta(req, res, next) {
    var student = req.body;
    
    Student.create({
        vpisna_stevilka: student.vpisna_stevilka,
        priimek: student.priimek,
        ime: student.ime,
        e_posta: student.email
    }, function(err, student){
        if(err) {
            console.log(err);
            return callNext(req, res, next);
        }
        
        req.student = student;
        callNext(req, res, next);
    });
}
function posodobiStudenta(req, res, next) {
    Student
        .findById(req.params.idStudenta)
        .exec(
            function(napaka, student) {
                if(!student){
                    returnJson(res, 404, {"sporočilo": "Ne najdem igralca."});
                    return;
                } else if(napaka){
                    returnJson(res, 400, napaka);
                }
                student.vpisna_stevilka = req.body.data.vpisna_stevilka;
                student.priimek = req.body.data.priimek;
                student.ime = req.body.data.ime;
                student.datum_rojstva = req.body.data.datum_rojstva;
                student.kraj_rojstva = req.body.data.kraj_rojstva;
                student.drzava_rojstva = req.body.data.drzava_rojstva;
                student.obcina_rojstva = req.body.data.obcina_rojstva;
                student.drzavljanstvo = req.body.data.drzavljanstvo;
                student.spol = req.body.data.spol;
                student.emso = req.body.data.emso;
                student.davcna_stevilka = req.body.data.davcna_stevilka;
                student.e_posta = req.body.data.e_posta;
                student.prenosni_telefon = req.body.data.prenosni_telefon;
                student.stalno_bivalisce_naslov = req.body.data.stalno_bivalisce_naslov;
                student.stalno_bivalisce_posta = req.body.data.stalno_bivalisce_posta;
                student.stalno_bivalisce_drzava_obcina = req.body.data.stalno_bivalisce_drzava_obcina;
                student.stalno_bivalisce_vrocanje = req.body.data.stalno_bivalisce_vrocanje;
                student.zacasno_bivalisce_naslov = req.body.data.zacasno_bivalisce_naslov;
                student.zacasno_bivalisce_posta = req.body.data.zacasno_bivalisce_posta;
                student.zacasno_bivalisce_drzava_obcina = req.body.data.zacasno_bivalisce_drzava_obcina;
                student.zacasno_bivalisce_vrocanje = req.body.data.zacasno_bivalisce_vrocanje;
                student.save(function(napaka, student) {
                    if(napaka){
                        returnJson(res, 404, napaka);
                    } else {
                        returnJson(res, 200, student);
                    }
                });
            });
}
function vrniStudenta(req, res) {
    if(!req.student)
        return res.status(400).json({ message: "Dodajanje študenta ni uspelo" });
    return res.status(201).json( req.student );
}


function checkEmailAlreadyExists(req, res, next) {
    // Check if user with this email already exists
    Student.findOne({ e_posta: req.body.email }, function(err, student) {
        if(err) {
            //console.log(err);
            return res.status(404).send({ message: "Napaka pri pregledu obstoja tega email naslova" });
        }
        if(student) return res.status(409).send({ message: "Ta email naslov je že v uporabi" });
        
        callNext(req, res, next);
    });
}

function uvoziStudente(req, res) {
    // najprej dobi zaporedno vpisno - ce ni studentov nastavi zaporedno na 0
    Student.findOne().sort('-vpisna_stevilka').exec(function(err, student) 
    {
        req.zaporednaVpisna = -1;
        if(err) 
        {
            req.zaporednaVpisna = 0;
            //return res.status(400).json({ message: "Ne najdem zadnjega vnešenega studenta - Je baza prazna?" });
        }
        else
        {
            req.zaporednaVpisna = student.vpisna_stevilka;
            req.zaporednaVpisna = parseInt(req.zaporednaVpisna.toString().slice(-4).replace(/^0+/, ''));
        }
        req.koncniObject = {};
        req.sprejeti = [];
        req.zavrnjeni = [];
        req.reqSplit = req.body.Podatki.split(/[\r\n]+/);
        if(req.reqSplit.length < 4)
        {
            return res.status(400).json({ message: "Ni podatkov za kreiranje studenta" });
        }
        else
        {
            uvoziNextStudent(req, res);
        }
    });
}

function uvoziNextStudent(req, res) {
    //console.log("Rek klicana");

    var counter = 0;
    var studentObj = {};
    studentObj.ime = req.reqSplit.shift();
    studentObj.priimek = req.reqSplit.shift();
    studentObj.program = req.reqSplit.shift();
    studentObj.email = req.reqSplit.shift();

    // check if email is valid
    if(Utils.isEmail(studentObj.email))
    {
        // je veljaven in ga lahko dodamo
        req.zaporednaVpisna++;
        studentObj.studentMail = getStudentMail(studentObj.ime, studentObj.priimek);
        studentObj.password = getMailGeslo();
        studentObj.vpisna_stevilka = getVpisnaStevilka((new Date()).getFullYear(), req.zaporednaVpisna);
        req.sprejeti.push(studentObj);
        var studentDB = new Student ({
            vpisna_stevilka: studentObj.vpisna_stevilka,
            priimek: studentObj.priimek,
            ime: studentObj.ime,
            e_posta: studentObj.email
        });
        
        studentDB.save(function(err)
        {
            if(err)
            {
                // iz baze odstrani dodanega - TODO
                req.zaporednaVpisna--;
                var studentObjErr = {};
                studentObjErr.ime = studentObj.ime;
                studentObjErr.priimek = studentObj.priimek;
                studentObjErr.program = studentObj.program;
                studentObjErr.email = studentObj.email;
                req.zavrnjeni.push((studentObjErr));
                console.log("Failed to save Student in studenti.controller.js : uvozSprejetih");
                //console.log(err);
            }
            else
            {
                User.create(
                {
                    student: studentDB,
                    email: studentObj.studentMail,
                    password: studentObj.password,
                    opombe: studentObj.password
                }, function(err, user) {
                    if(err) 
                    {
                        // iz baze odstrani dodanega - TODO
                        req.zaporednaVpisna--;
                        var studentObjErr = {};
                        studentObjErr.ime = studentObj.ime;
                        studentObjErr.priimek = studentObj.priimek;
                        studentObjErr.program = studentObj.program;
                        studentObjErr.email = studentObj.email;
                        req.zavrnjeni.push((studentObjErr));
                        console.log("Failed to save Student in studenti.controller.js : uvozSprejetih");
                    }
                    else
                    {
                        //req.sprejeti.push(studentObj);
                        req.studentDB = studentDB;
                        req.user = user;
                    }
                });
                
                
                //req.sprejeti.push(studentObj);
            }
            //var saved = (err ? false : true);
            //returnJson(res, 200, saved);
        });
        
        // kreiraj novega userja
    }
    else
    {
        req.zavrnjeni.push(studentObj);
    }
    
    if(req.reqSplit.length < 4)
    {
        req.koncniObject.sprejeti = req.sprejeti;
        req.koncniObject.zavrnjeni = req.zavrnjeni;
        return res.status(200).json(req.koncniObject);
    }
    else
    {
        uvoziNextStudent(req, res);
    }
}

// pricakuje da request body vsebuje json objekt s spremenljivko
// Podatki katere vrednost je plaintext studentov
function uvoziStudenteOLD(req, res) {
    Student.findOne().sort('-vpisna_stevilka').exec(function(err, student) 
    {
        var zaporednaVpisna = -1
        if(err) 
        {
            zaporednaVpisna = 0;
            //return res.status(400).json({ message: "Ne najdem zadnjega vnešenega studenta - Je baza prazna?" });
        }
        else
        {
            zaporednaVpisna = student.vpisna_stevilka;
        }
        
        //var zaporednaVpisna = student.vpisna_stevilka;
        zaporednaVpisna = parseInt(zaporednaVpisna.toString().slice(-4).replace(/^0+/, ''));
        
        var koncniObject = {};
        var sprejeti = [];
        var zavrnjeni = [];
        //console.log(req.body.Podatki);
        var reqSplit = req.body.Podatki.split(/[\r\n]+/);
        var counter = 0;
        var studentObj = {};
        for (var i = 0; i < reqSplit.length; i++) {
            var currValue = reqSplit[i];
            if(counter == 0)
            {
                studentObj.ime = currValue;
            }
            else if(counter == 1)
            {
                studentObj.priimek = currValue;
            }
            else if(counter == 2)
            {
                studentObj.program = currValue;
            }
            else if(counter == 3)
            {
                studentObj.email = currValue;

                // check if object can be added
                if(isEmail(currValue))
                {
                    // je veljaven in ga lahko dodamo
                    zaporednaVpisna++;
                    studentObj.studentMail = getStudentMail(studentObj.ime, studentObj.priimek);
                    studentObj.password = getMailGeslo();
                    studentObj.vpisna_stevilka = getVpisnaStevilka((new Date()).getFullYear(), zaporednaVpisna);
                    sprejeti.push(studentObj);
                    
                    var studentDB = new Student ({
                        vpisna_stevilka: studentObj.vpisna_stevilka,
                        priimek: studentObj.priimek,
                        ime: studentObj.ime,
                        e_posta: studentObj.email
                    });
                    
                    studentDB.save(function(err){
                        if(err)
                        {
                            console.log("Failed to save Student in studenti.controller.js : uvozSprejetih");
                            console.log(err);
                        }
                        //var saved = (err ? false : true);
                        //returnJson(res, 200, saved);
                    });
                    
                    // kreiraj novega userja
                }
                else
                {
                    zavrnjeni.push(studentObj);
                }
                studentObj = {};
                counter = -1;
            }
            counter++;
        }
        // return koncni objekt
        koncniObject.sprejeti = sprejeti;
        koncniObject.zavrnjeni = zavrnjeni;
        //console.log(koncniObject);
       
        return res.status(200).json(koncniObject);
    });
}

function getVpisnaStevilka(prvoLetoVpisa, zaporednaStev) {
    return "63" + prvoLetoVpisa.toString().slice(-2) + ('0000' + zaporednaStev).substr(-4);
}

function getStudentMail(ime, priimek) {
    return ime.substr(0,1).toLowerCase() + priimek.substr(0,1).toLowerCase() + getRandomCifra(4) + "@student.uni-lj.si";
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
};

function getRandomCifra(dolzina) {
    var nabor = "0123456789";
    //var dolzina = 4;
    var geslo = "";
    for (var i = 0; i < dolzina; ++i) 
    {
        geslo += nabor.charAt(Math.floor(Math.random() * nabor.length * 12345) % nabor.length);
    }
    return geslo;
};