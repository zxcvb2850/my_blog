var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('./logs/log');

mongoose.connect('mongodb://localhost/my_blog');

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected success.")
});
mongoose.connection.on("error", () => {
  console.log("MongoDB connected fail.")
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connected disconnected.")
});

var index = require('./routes/admin/index');
var users = require('./routes/admin/users');
const api = require('./routes/index/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

log4js.use(app);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//访问静态资源文件 这里是访问所有dist目录下的静态资源文件
/*
 app.use(express.static(path.resolve(__dirname, '../dist')));
 app.get('*', (req, res) => {
 const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
 res.send(html);
 })
 */

app.use(api);
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404', {title: "404 NO FOUND"});
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
