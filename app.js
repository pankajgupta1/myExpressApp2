var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myappdatabase', { useNewUrlParser: true });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var User = require('./schemas/userSchema');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/data', (req, res, next) => {
  var newUser = new User({
    name: 'Chris',
    username: 'sevilayha1',
    password: 'password'
  });


  newUser.save(function (err) {
    console.log('err', err);
    if (err) {
      next(err)
      res.status(500)
      res.render('error', { error: err })
    } else {
      console.log('User created!');
      res.send('User created')
    }
  });
})

  app.use('/updateData', (req, res, next) => {
    User.findOneAndUpdate({ username: 'sevilayha12' }, { username: 'starlord88' }, function(err, user) {
      if (err) throw err;
    
      // we have the updated user returned to us
      console.log(user);
      res.send('2')

    });
  })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
