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
          },
          {
            path: "studijska_leta_studenta.predmeti.predmet"
          }
        ]
      }
    ])
    .exec(function(err, narocilo) {
      if(err || !narocilo) {
        return res.status(404).json({ message: "Ne najdem naročila potrdila o opravljenih obveznostih" });
      }
      
      var base = path.join(__dirname, 'views');
      base = base.replace(new RegExp(/\\/, 'g'), "/");
      base = 'file:\/\/' + base;
      
      //console.log(narocilo);
      narocilo = narocilo.toObject();
      
      var letniki = [];
      
      // Pripravi seznam letnikov
      var leta = narocilo.student.studijska_leta_studenta;
      for(var i = 0; i < leta.length; i++)
      {
        var leto = leta[i];
        var letnik;
        
        // Preveri, če povalja letnik
        for(var m = 0; m < letniki.length; m++)
        {
          if(letniki[m].letnik._id.equals(leto.letnik._id))
          {
            letnik = letniki[m];
            break;
          }
        }
        if(!letnik)
        {
          letnik = {
            letnik: leto.letnik,
            predmeti: []
          };
          letniki.push(letnik);
        }
        
        // Obdelaj predmete
        for(var j = 0; j < leto.predmeti.length; j++)
        {
          var predmet;
          
          for(var k = 0; k < letniki.length; k++)
          {
            // Preveri, če ta predmet spada pod predmete prejšnjega letnika
            for(var l = 0; l < letniki[k].predmeti.length; l++)
            {
              console.log(leto.predmeti[j]);
              // Če se predmet ujema
              if(leto.predmeti[j].predmet._id.equals(letniki[k].predmeti[l].predmet._id))
              {
                console.log("Predmet najden");
                predmet = (letniki[k].predmeti[l] = leto.predmeti[j]);
                break;
              }
            }
            
          }
          
          // Preveri, če predmet še ne obstaja med prejšnjimi letniki
          if(!predmet)
          {
            letnik.predmeti.push(leto.predmeti[j]);
          }
          
        }
      }
      for(var x = 0; x < letniki.length; x++)
      {
        var cur = letniki[x];
        var average = 0;
        var opravljeni = 0;
        console.log("Letnik: " + cur.letnik.naziv);
        console.log("Predmeti:");
        for(var y = 0; y < cur.predmeti.length; y++)
        {
          console.log(cur.predmeti[y].predmet.naziv);
          if(cur.predmeti[y].ocena > 5)
          {
            average += cur.predmeti[y].ocena;
            opravljeni++;
          }
        }
        average = average;
        console.log
      }
      
      
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