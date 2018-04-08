var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Student = mongoose.model('Student');

var request = require('request');
var apiParameters = {
  server: "http://localhost:" + process.env.PORT
};
/*
if(process.env.NODE_ENV === 'production') {
  apiParameters.server = "https://aa-novels.herokuapp.com/";
}
*/

/* GET home page. */
module.exports.getStudenti = function(req, res) {
  // TEST response
  /*res.status(200).json({
    message: "Tu bodo studenti.",
  });*/
  getStudenti(req, res);
};

function getStudenti(req, res) {
    var koncniObject = {};
    Student
        .find().limit(0)
        .exec(function(err, studenti) {
            if(err) {
                return res.status(404).send({ message: "Studenti not found 1" });
            }
            if(!studenti) return res.status(404).send({ message: "Studenti not found 2" });
            
            koncniObject.studenti = studenti;
            return res.status(200).json(koncniObject);
        });
}

module.exports.uvoziStudente = function(req, res) {
    uvoziStudente(req, res);
};

// pricakuje da request body vsebuje json objekt s spremenljivko
// Podatki katere vrednost je plaintext studentov
function uvoziStudente(req, res) {
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
};

// Check if provided string is formatted as a proper EMAIL
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
};

function getVpisnaStevilka(prvoLetoVpisa, zaporednaStev)
{
    return "63" + prvoLetoVpisa.toString().slice(-2) + ('0000' + zaporednaStev).substr(-4);
};

function getStudentMail(ime, priimek)
{
    return ime.substr(0,1).toLowerCase() + priimek.substr(0,1).toLowerCase() + getRandomCifra(4) + "@student.uni-lj.si";
}

function getMailGeslo()
{
    var nabor = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    var dolzina = 12;
    var geslo = "";
    for (var i = 0; i < dolzina; ++i) 
    {
        geslo += nabor.charAt(Math.floor(Math.random() * nabor.length * 12345) % nabor.length);
    }
    return geslo;
};

function getRandomCifra(dolzina)
{
    var nabor = "0123456789";
    //var dolzina = 4;
    var geslo = "";
    for (var i = 0; i < dolzina; ++i) 
    {
        geslo += nabor.charAt(Math.floor(Math.random() * nabor.length * 12345) % nabor.length);
    }
    return geslo;
};