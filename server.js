const path = require('path');
const url = require('url');
const chalk = require('chalk');
const request = require('request');
const express = require('express');

const config = require('./config');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

var viewPath = path.join(__dirname, 'views');
// view engine setup
app.set('views', path.join(viewPath));
app.set('view engine', 'jade');
var set={
  secret: '12345',
  name: 'testapp',
  cookie: {maxAge: 80000 },
  resave: false,
  saveUninitialized: true}
  
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(session(set));

// 静态资源
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/index');
const users = require('./routes/users');
const YeePay = require('./routes/YeePay');
const Fuiou = require('./routes/Fuiou');
const UmPay = require('./routes/UmPay');
const Login = require('./routes/Login');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//环境设置
process.env.NODE_ENV = 'develop';

//var chat = require('./model/Chat')(app, express);

// development only  
// if ('development' == app.get('env')) {  
//   app.use(express.errorHandler());  
// } 

//路由中间件
//添加session初始化
app.use(function(req, res, next) {
  var urlpath = url.parse(req.url);
  // if(urlpath.pathname.toLowerCase() != '/login/login'){
  //   //res.send(urlpath.pathname.toLowerCase());
  //   if(!req.session.uid){
  //     res.redirect(301,'/Login/login');
  //   }
  // }
  next();
});

//分模块路由
app.use('/', routes);
app.use('/users', users);
app.use('/YeePay',YeePay);
app.use('/Fuiou',Fuiou);
app.use('/UmbPay',UmPay);
app.use('/Login',Login);

// app.all('/*', function (req, res, next) {
//   console.log('Accessing the secret section ...');
//   next(); // pass control to the next handler
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('404 Not Found 我们现在还没有这个页面');
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
