var mongoose = require("mongoose");
var Student = mongoose.model("Student");

var returnJson = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.ustvariStudenta = function(req, res){
    var student = req.body.data;
    
    var studentDB = new Student ({
        vpisna_stevilka: student.vpisna_stevilka,
        priimek: student.priimek,
        ime: student.ime,
        datum_rojstva: student.datum_rojstva,
        kraj_rojstva: student.kraj_rojstva,
        drzava_rojstva: student.drzava_rojstva,
        obcina_rojstva: student.obcina_rojstva,
        drzavljanstvo: student.drzavljanstvo,
        spol: student.spol,
        emso: student.emso,
        davcna_stevilka: student.davcna_stevilka,
        e_posta: student.e_posta,
        prenosni_telefon: student.prenosni_telefon,
        stalno_bivalisce_naslov: student.stalno_bivalisce_naslov,
        stalno_bivalisce_posta: student.stalno_bivalisce_posta,
        stalno_bivalisce_drzava_obcina: student.stalno_bivalisce_drzava_obcina,
        stalno_bivalisce_vrocanje:  student.stalno_bivalisce_vrocanje,
        zacasno_bivalisce_naslov: student.zacasno_bivalisce_naslov,
        zacasno_bivalisce_posta: student.zacasno_bivalisce_posta,
        zacasno_bivalisce_drzava_obcina: student.zacasno_bivalisce_drzava_obcina,
        zacasno_bivalisce_vrocanje: student.zacasno_bivalisce_vrocanje
    });
    
    studentDB.save(function(err){
        var saved = (err ? false : true);
        returnJson(res, 200, saved);
    });
};

module.exports.pridobiStudente = function(req, res){
    Student.find().sort("priimek")
    .exec(function(err, result){
        if(err){
            console.log(err);
        }
        returnJson(res, 200, result);
    });
};

module.exports.pridobiStudenta = function(req, res){
    Student
        .findById(req.params.idStudenta)
        .exec(
            function(napaka, student) {
                if(!student){
                    returnJson(res, 404, {"sporočilo": "Ne najdem študenta."});
                    return;
                } else if(napaka){
                    returnJson(res, 404, napaka);
                    return;
                }
                returnJson(res, 200, student);
            }
        );
};

module.exports.posodobiStudenta = function(req, res){
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
};
