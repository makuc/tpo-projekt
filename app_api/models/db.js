var mongoose = require('mongoose');

/*  Referenca na ustvarjene modele  */
require("./drzava.model");
require("./obcina.model");
require("./posta.model");
require("./user.model");
require("./student.model");


/*  Poveži se s podatkovno bazo  */
var dbURI = process.env.DB_HOST_DEV;
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MLAB_URI; // Bi bilo boljše nastaviti: config.prodDB ??
}
mongoose.connect(dbURI, { useMongoClient: true });

/*  Spremljanje dogodkov pri povezovanju na podatkovno bazo  */
mongoose.connection.on('connected', function() {
  console.log('Mongoose je povezan na ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose napaka pri povezavi: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose je zaprl povezavo');
});

/*  Spremljanje dogodkov pri zapiranju povezav na podatkovno bazo  */
var pravilnaUstavitev = function(sporocilo, povratniKlic) {
  mongoose.connection.close(function() {
    console.log('Mongoose je zaprl povezavo preko ' + sporocilo);
    povratniKlic();
  });
};

// Pri ponovnem zagonu nodemon
process.once('SIGUSR2', function() {
  pravilnaUstavitev('nodemon ponovni zagon', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Pri izhodu iz aplikacije
process.on('SIGINT', function() {
  pravilnaUstavitev('izhod iz aplikacije', function() {
    process.exit(0);
  });
});

// Pri izhodu iz aplikacije na Heroku
process.on('SIGTERM', function() {
  pravilnaUstavitev('izhod iz aplikacije na Heroku', function() {
    process.exit(0);
  });
});
