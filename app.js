require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const url = require('url');
const http = require('http');
// var index = require('./routes/index');
// var users = require('./routes/users');

var api = require('./api');
var apiFims = require('./api-fims');

var app = express();

var Raven = require('raven');
Raven.config(`https://${process.env.SENTRY_KEY}@sentry.io/228199`).install();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'client/build/img', 'favicon.ico')));
// app.use(morgan('combined'));

app.use(
  bodyParser.json({
    parameterLimit: 1000000,
    limit: '50mb'
  })
);
app.use(
  bodyParser.urlencoded({
    parameterLimit: 1000000,
    limit: '50mb',
    extended: true
  })
);

app.use(cookieParser());

// app.use('/static', express.static(path.join(__dirname, 'public')))

// app.use('/', index);
// app.use('/users', users);

app.use('/api', api);
app.use('/api-fims', apiFims);

app.use(
  express.static(path.join(__dirname, 'client/build'), {  })
);
app.use('/static', express.static('client/build/static'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
