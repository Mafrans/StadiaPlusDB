var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var cors = require('cors');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile');
var pingRouter = require('./routes/api/ping');
var lfgApiRouter = require('./routes/api/lfg');
var userApiRouter = require('./routes/api/user');
var profileApiRouter = require('./routes/api/profile');

var database = require('./Database');
const StadiaGameDB = require('./StadiaGameDB');
database.connect('localhost:27017/stadiaplus');

var app = express();

StadiaGameDB.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret: "test secret"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/api/ping', pingRouter);
app.use('/api/lfg', lfgApiRouter);
app.use('/api/user', userApiRouter);
app.use('/api/profile', profileApiRouter);

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
  console.error(err.stack)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
