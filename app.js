var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
mongoose = require('mongoose');
Task = require('./models/model');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var cors = require('cors');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://jayant:123@ds119018.mlab.com:19018/otpverification', {
  useMongoClient: true,
});
promise.then(function(db) {
    console.log("Connected to uberdatabase database!!!");
}, function(err){
    console.log("Error in connecting database " + err);
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

require('./routes/index')(app);
require('dotenv').config();
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  return res.status(404).json({success:0,msg:'404 Page Not Found'});

  next(err);
});
app.use(cors());
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
