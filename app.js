require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uglifyJs = require('uglify-js');
var fs = require('fs');

require('./app_api/models/db');

var server = {
  indexRouter: require('./app_server/routes/index'),
  usersRouter: require('./app_server/routes/users')
};
var api = {
  public: {
    other: require('./app_api/routes/public.route'),
    sifranti: require("./app_api/routes/sifranti.route")
  },
  private: require('./app_api/routes/private.route'),
  admin: require('./app_api/routes/admin.route'),
  auth: require('./app_api/controllers/auth/authentication.controller.js')
};


/*************************************************/
/*            Priprava datotek za SPA            */
/*************************************************/
var zdruzeno = uglifyJs.minify({
  // Dopiši vse datoteke, ki jih želiš združiti v SPA eno datoteko!
  'app.js': fs.readFileSync('app_client/app.client.js', 'utf8'),
  'vpisniListCtrl.js': fs.readFileSync('app_client/controllers/vpisniList.controller.js', 'utf8'),
  
  //directives
  'header.directive.js': fs.readFileSync('app_client/total/directives/header/header.directive.js', 'utf8'),
  'footer.directive.js': fs.readFileSync('app_client/total/directives/footer/footer.directive.js', 'utf8'),
  'navigation.directive.js': fs.readFileSync('app_client/total/directives/navigation/navigation.directive.js', 'utf8'),
  
  //services
  'student.service.js': fs.readFileSync('app_client/total/services/student.service.js', 'utf8'),
  'predmet.service.js': fs.readFileSync('app_client/total/services/predmet.service.js', 'utf8'),
  'izpitniRok.service.js': fs.readFileSync('app_client/total/services/izpitniRok.service.js', 'utf8'),
  
  //controllers
  'urediPredmeteCtrl.js': fs.readFileSync('app_client/controllers/urediPredmete.controller.js', 'utf8'),
  'urediPredmetCtrl.js': fs.readFileSync('app_client/controllers/urediPredmet.controller.js', 'utf8'),
  'dodajPredmetCtrl.js': fs.readFileSync('app_client/controllers/dodajPredmet.controller.js', 'utf8'),
  'urediNacineStudijaCtrl.js': fs.readFileSync('app_client/controllers/urediNacineStudija.controller.js', 'utf8'),
  'urediNacinStudijaCtrl.js': fs.readFileSync('app_client/controllers/urediNacinStudija.controller.js', 'utf8'),
  'dodajNacinStudijaCtrl.js': fs.readFileSync('app_client/controllers/dodajNacinStudija.controller.js', 'utf8'),
  'urediVrsteStudijaCtrl.js': fs.readFileSync('app_client/controllers/urediVrsteStudija.controller.js', 'utf8'),
  'urediVrstoStudijaCtrl.js': fs.readFileSync('app_client/controllers/urediVrstoStudija.controller.js', 'utf8'),
  'dodajVrstoStudijaCtrl.js': fs.readFileSync('app_client/controllers/dodajVrstoStudija.controller.js', 'utf8'),
  'urediOblikeStudijaCtrl.js': fs.readFileSync('app_client/controllers/urediOblikeStudija.controller.js', 'utf8'),
  'urediOblikoStudijaCtrl.js': fs.readFileSync('app_client/controllers/urediOblikoStudija.controller.js', 'utf8'),
  'dodajOblikoStudijaCtrl.js': fs.readFileSync('app_client/controllers/dodajOblikoStudija.controller.js', 'utf8'),
  'urediStudijskeProgrameCtrl.js': fs.readFileSync('app_client/controllers/urediStudijskePrograme.controller.js', 'utf8'),
  'urediStudijskiProgramCtrl.js': fs.readFileSync('app_client/controllers/urediStudijskiProgram.controller.js', 'utf8'),
  'dodajStudijskiProgramCtrl.js': fs.readFileSync('app_client/controllers/dodajStudijskiProgram.controller.js', 'utf8'),
  'urediStudijskaLetaCtrl.js': fs.readFileSync('app_client/controllers/urediStudijskaLeta.controller.js', 'utf8'),
  'urediStudijskoLetoCtrl.js': fs.readFileSync('app_client/controllers/urediStudijskoLeto.controller.js', 'utf8'),
  'dodajStudijskoLetoCtrl.js': fs.readFileSync('app_client/controllers/dodajStudijskoLeto.controller.js', 'utf8'),
  'urediPredmetnikeCtrl.js': fs.readFileSync('app_client/controllers/urediPredmetnike.controller.js', 'utf8'),
  'urediPredmetnikCtrl.js': fs.readFileSync('app_client/controllers/urediPredmetnik.controller.js', 'utf8'),
  'dodajPredmetnikCtrl.js': fs.readFileSync('app_client/controllers/dodajPredmetnik.controller.js', 'utf8'),
  'dodajIzpitniRokCtrl.js': fs.readFileSync('app_client/controllers/dodajIzpitniRok.controller.js', 'utf8'),
  'prikaziVseIzpitneRokeCtrl.js': fs.readFileSync('app_client/controllers/prikaziVseIzpitneRoke.controller.js', 'utf8'),
  'dodajIzvajalcaIzpitCtrl.js': fs.readFileSync('app_client/controllers/dodajIzvajalcaIzpitniRok.controller.js', 'utf8')
  //'login.js': fs.readFileSync('app_client/controllers/login.controller.js', 'utf8'),
  //'vpisniListCtrl.js': fs.readFileSync('app_client/controllers/vpisniList.controller.js', 'utf8')
});
  
fs.writeFile('public/angular/spa.min.js', zdruzeno.code, function(err) {
  if (err)
    console.log(err);
  else
    console.log('Skripta je zgenerirana in shranjena v "public/angular/spa.min.js"');
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use('/', server.indexRouter);
app.use('/users', server.usersRouter);
/* API here */
// Servev API
app.use(api.auth.authenticate);
app.use('/api/v1', api.public.other);
app.use('/api/v1', api.public.sifranti);
app.use(api.auth.private);
app.use('/api/v1', api.private);
app.use(api.auth.admin);
app.use('/api/v1', api.admin);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index-orig.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
