var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Student = mongoose.model('Student');

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

function uvoziStudente(req, res) {
    req = `Robert
Barachini
BUN RI
r.b@gmail.com
Janez
Novak
ISRM
janovaksomemail.com
`;
    //console.log(req);
    var koncniObject = {};
    var sprejeti = [];
    var zavrnjeni = [];
    var reqSplit = req.split(/[\r\n]+/);
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
                sprejeti.push(studentObj);
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
    console.log(getVpisnaStevilka(15, 45));
    console.log(getStudentMail('robert', 'barachini'));
    console.log(getMailGeslo());
    console.log(getMailGeslo());
    console.log(getMailGeslo());
    console.log(getMailGeslo());
    console.log(getMailGeslo());
    return res.status(200).json(koncniObject);
};

// Check if provided string is formatted as a proper EMAIL
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
};

function getVpisnaStevilka(prvoLetoVpisa, zaporednaStev)
{
    return "63" + prvoLetoVpisa + ('0000' + zaporednaStev).substr(-4);
};

function getStudentMail(ime, priimek)
{
    return ime.substr(0,1).toLowerCase() + priimek.substr(0,1).toLowerCase() + "XXXX" + "@student.uni-lj.si";
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
}