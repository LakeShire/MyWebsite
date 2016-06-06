var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var main = require('./routes/main');
var users = require('./routes/users');
var weixin = require('./routes/weixin');
var logon = require('./routes/logon');
var register = require('./routes/register');
var index = require('./routes/index');
var logon_main = require('./routes/logon_main');
var project = require('./routes/project');
var issue = require('./routes/issue');
var option = require('./routes/option');
var notes = require('./routes/notes');
var profile = require('./routes/profile');
var admin = require('./routes/admin');
//  折扣信息
var info = require('./routes/info');
//  信息源
var source = require('./routes/source');

var image = require('./routes/image');

var ejs = require('ejs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/weixin', weixin);
app.use('/logon.html', logon);
app.use('/register.html', register);
app.use('/logon_main.html', logon_main);
app.use('/project.html', project);
app.use('/issue.html', issue);
app.use('/option', option);
app.use('/notes', notes);
app.use('/main.html', main);
app.use('/profile', profile);
app.use('/info.html', info);
app.use('/info', info);
app.use('/admin', admin);
app.use('/source.html', source);
app.use('/source', source);
app.use('/images', image);

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
