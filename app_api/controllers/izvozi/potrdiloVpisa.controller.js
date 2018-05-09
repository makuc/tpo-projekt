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
    
    User: mongoose.model('User')
};

module.exports.pdfPotrdiloVpisa = function(req, res) {
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
        return res.status(404).json({ message: "Ne najdem vpisa" });
      }
      
      var base = path.join(__dirname, 'views');
      base = base.replace(new RegExp(/\\/, 'g'), "/");
      base = 'file:\/\/' + base;
      
      var data = {
        vpis: vpis,
        base: base
      };

      //console.log("Vpis: " + vpis);
      var vpisniList = Pug.renderFile(__dirname + '/views/potrdiloVpisa.view.pug', data);
       //console.log(vpisniList);
      
      var options = {
        "format": 'A4',
        "base": base
      };
      
      //return res.status(200).send(vpisniList);
      
      /*
      if(req.params.N) {
        req.params.N = parseInt(req.params.N, 10);
        if(req.params.N > 0)
        {
          base = path.join(__dirname, 'tmp');
          
          pdf.create(vpisniList, options).toFile(base + "/tmp.pdf", function(err, pdf) {
            if (err) {   
              // handle error and return a error response code
              console.log(err);
              return res.sendStatus(403);
            } else {
              // send a status code of 200 OK
              res.statusCode = 200;
              
              console.log(pdf.filename);
              
              var base = path.join(__dirname, 'tmp');
              var file = base + pdf.filename;
              
              pdftk
                .input({
                  A: pdf.filename
                })
                .cat('A')
                .output()
                .then(buf => {
                  res.type('application/pdf');
                  res.send(buf);
                });
            }
          });
          return;
        }
      }
      */
      
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