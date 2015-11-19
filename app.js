var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var home = require('./routes/index');
var aboutMe = require('./routes/index');
var services = require('./routes/index');
var projects = require('./routes/index');
var credentials = require('./routes/index');
var contactMe = require('./routes/index');
var users = require('./routes/index');

//additions for authentication
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');

//DB Setup 
var DB = require('./config/db.js');
mongoose.connect(DB.url);
mongoose.connection.on('error', function(){
  console.error('MongoDB Connection Failed');
});

var app = express();

// passport configuration
require('./config/passport')(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'someSecret',
  saveUninitialized: true,
  resave: true
})
);

// more authentication configuration
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', home);
app.use('/aboutMe', aboutMe);
app.use('/services', services);
app.use('/projects', projects)
app.use('/credentials', credentials);
app.use('/contactMe', contactMe);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
