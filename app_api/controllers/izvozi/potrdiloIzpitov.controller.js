var Utils = require("../_include/utils");
var callNext = require("../_include/callNext");
var Pug = require("pug");
var pdf = require('html-pdf');
var pdftk = require('node-pdftk');
var path = require('path');
var PassThrough = require('stream').PassThrough;



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
    
    NarociloIzpitov: mongoose.model('NarociloIzpitov'),
    
    User: mongoose.model('User')
};

module.exports.pdf = function(req, res) {
  models.NarociloIzpitov
    .findById(req.params.narocilo)
    .populate([
      {
        path: "student ",
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
          },
          {
            path: "studijsko_leto_prvega_vpisa_v_ta_program"
          },
          {
            path: "nacin_studija"
          },
          {
            path: "oblika_studija"
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
            path: "studijska_leta_studenta.oblika_studija"
          },
          {
            path: "studijska_leta_studenta.vrsta_studija"
          },
          {
            path: "studijska_leta_studenta.nacin_studija"
          }
        ]
      }
    ])
    .exec(function(err, narocilo) {
      if(err || !narocilo) {
        return res.status(404).json({ message: "Ne najdem študenta" });
      }
      
      var base = path.join(__dirname, 'views');
      base = base.replace(new RegExp(/\\/, 'g'), "/");
      base = 'file:\/\/' + base;
      
      var data = {
        narocilo: narocilo,
        base: base
      };
      
      var vpisniList = Pug.renderFile(__dirname + '/views/potrdiloIzpitov.view.pug', data);
      
      var options = {
        "format": 'A4',
        "base": base
      };
      
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