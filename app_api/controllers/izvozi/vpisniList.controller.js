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
          },
          {
            path: "predhodna_izobrazba.drzava"
          },
          {
            path: "predhodna_izobrazba.najvisja_dosezena_izobrazba"
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
      },
      {
        path: "predmeti",
        populate: {
          path: "izvedbe_predmeta.izvajalci"
        }
      }
    ])
    .exec(function(err, vpis) {
      if(err || !vpis) {
        return res.status(404).json({ message: "Ne najdem vpisnega lista" });
      }
      
      var base = path.join(__dirname, 'views');
      base = base.replace(new RegExp(/\\/, 'g'), "/");
      base = 'file:\/\/' + base;
      
      vpis = vpis.toObject();
      
      for(var x = 0; x < vpis.predmeti.length; x++)
      {// Obdelaj vse predmete
        var predmet = vpis.predmeti[x];
        
        // Glej samo zadnjo izvedbo predmeta
        var izvedba = predmet.izvedbe_predmeta[predmet.izvedbe_predmeta.length - 1];
        
        for(var z = 0; z < izvedba.izvajalci.length; z++)
        {// Preglej vse izvajalce predmeta
          if(izvedba.izvajalci[z].naziv == "as.")
          {
            izvedba.izvajalci.splice(z);
          }
        }
      }
      
      var data = {
        vpis: vpis,
        base: base
      };
      
      var vpisniList = Pug.renderFile(__dirname + '/views/vpisniList.view.pug', data);
      
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