var Utils = require("../_include/utils");
var callNext = require("../_include/callNext");
var Pug = require("pug");
var pdf = require('html-pdf');
var path = require('path');



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

module.exports.pdfVpisniList = function(req, res) {
  models.Vpis
    .findById(req.params.vpisnica_id)
    .populate([
      {
        path: "student ",
        populate: [
          {
              path: "drzava_rojstva",
              select: "slovenski_naziv"
          },
          // Stalno bivališče
          {
              path: "stalno_bivalisce_posta"
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
              path: "zacasno_bivalisce_posta"
          },
          {
              path: "zacasno_bivalisce_obcina",
              select: "ime"
          },
          {
              path: "zacasno_bivalisce_drzava",
              select: "slovenski_naziv"
          }
        ]
      },
      {
        path: "studijsko_leto"
      },
      {
        path: "letnik"
      },
      {
        path: "studijski_program"
      },
      {
        path: "vrsta_studija"
      },
      {
        path: "vrsta_vpisa"
      },
      {
        path: "studijsko_leto_prvega_vpisa_v_ta_program"
      },
      {
        path: "nacin_studija"
      },
      {
        path: "oblika_studija"
      }
    ])
    .exec(function(err, vpis) {
      if(err || !vpis) {
        return res.status(404).json({ message: "Ne najdem vpisnega lista" });
      }
      
      console.log("Vpis: " + vpis);
      var vpisniList = Pug.renderFile(__dirname + '/views/vpisniList.view.pug', vpis);
      
      var base = path.join(__dirname, 'views');
      base = base.replace(new RegExp("/", 'g'), "\\");
      base = 'file:\/\/'+base;
      
      base = "file:///home/ubuntu/workspace/tpo-projekt/app_api/controllers/izvozi/views";
      
      var options = {
        "format": 'A4',
        "base": base
      };
      
      //return res.status(200).send(vpisniList);
      
      pdf.create(vpisniList, options).toStream((err, pdfStream) => {
        if (err) {   
          // handle error and return a error response code
          console.log(err);
          return res.sendStatus(403);
        } else {
          // send a status code of 200 OK
          res.statusCode = 200;
          
          // once we are done reading end the response
          pdfStream.on('end', () => {
            // done reading
            return res.end();
          });
    
          // pipe the contents of the PDF directly to the response
          pdfStream.pipe(res);
        }
      });
      
    });
};