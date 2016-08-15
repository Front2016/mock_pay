const path = require('path');
const url = require('url');
const chalk = require('chalk');
const request = require('request');
const express = require('express');

const config = require('./config');
const app = express();

var viewPath = path.join(__dirname, 'views');
// view engine setup
app.set('views', path.join(viewPath));
app.set('view engine', 'jade');

// 静态资源
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/index');
const users = require('./routes/users');
const YeePay = require('./routes/YeePay');

//分模块路由
app.use('/', routes);
app.use('/users', users);
app.use('/YeePay',YeePay);

//路由中间件
app.all('/*', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('404 Not Found NIMEIMEIDE');
  err.status = 404;
  next(err);
});

// catch 500 and forward to error handler
app.use(function (err, req, res, next) {
  err.status = err.status || 500;
  res.status(err.status);
  res.render('error', {
    message: err.message,
    error: {}
  });
  //res.send(err.message)
});

const port = config.port || 3000;

app.listen(port);
