var createError = require('http-errors');
// load the express web framework
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
require('dotenv').config(); // for .env file
require('./config/database.js');
require('./config/passport.js');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var animesRouter = require('./routes/animes');
var reviewsRouter = require('./routes/reviews');
var vactorsRouter = require('./routes/vactors');
var watchlistRouter = require('./routes/watchlist');

// create the express app
const app = express();

app.set('views', path.join(__dirname, './views'));  // tell the express the location of the views folder
app.set('view engine', 'ejs');    // tell express to use ejs templating system

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next){ //next means in every subsequent request, we need to do this
   res.locals.user = req.user;  //to save the information
   next();    //go to the next function
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/animes', animesRouter);
app.use('/', reviewsRouter);
app.use('/', vactorsRouter);
app.use('/', watchlistRouter )

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