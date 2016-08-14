var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var url = require('url');
var request = require('request');
var connection = require('../model/DB');
var httpEngine = require('../model/HttpEngine');


//mock
if (process.env.NODE_ENV === 'development') {
  console.log(chalk.yellow('dev server'));
  require('../data')(router)
} else if (process.env.NODE_ENV === 'api') {
  router.use('/', function (req, res, next) {
    console.log(chalk.yellow(req.method + ' ' + req.url))
    console.log('http://' + process.env.REMOTE_API + req.url)
    if (req.method.toUpperCase() === 'GET') {
      request({
        qs: req.body,
        method: req.method,
        url: 'http://' + process.env.REMOTE_API + req.url,
        headers: req.headers
      }).pipe(res);
    } else if (req.method.toUpperCase() === 'POST') {
      request({
        form: req.body,
        method: req.method,
        url: 'http://' + process.env.REMOTE_API + req.url,
        headers: req.headers
      }).pipe(res);
    }
  });
}

router.get('/', function (req, res, next) {
  //httpEngine.find(req, function (res, data) {
  //  res.render('index', {title: data});
  //});
  connection.query('SELECT * from right_table', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', JSON.stringify(rows));
    res.render('index', {title: JSON.stringify(rows)});
  });
  //connection.end();
});

//这个没反应
router.post('/api/getUser', function (req, res) {
  httpEngine.find(req, function (res, data) {
    res.contentType('json');
    res.write(JSON.stringify(data));
    res.end();
  })
});


module.exports = router;
