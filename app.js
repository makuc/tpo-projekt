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
  public: require('./app_api/routes/public.route'),
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
  'header.directive.js': fs.readFileSync('app_client/total/directives/header/header.directive.js', 'utf8'),
  'footer.directive.js': fs.readFileSync('app_client/total/directives/footer/footer.directive.js', 'utf8'),
  'navigation.directive.js': fs.readFileSync('app_client/total/directives/navigation/navigation.directive.js', 'utf8'),
  'student.service.js': fs.readFileSync('app_client/total/services/student.service.js', 'utf8'),
  //'login.js': fs.readFileSync('app_client/controllers/login.controller.js', 'utf8'),
  'vpisniListCtrl.js': fs.readFileSync('app_client/controllers/vpisniList.controller.js', 'utf8')
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
app.use('/api/v1', api.public);
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
