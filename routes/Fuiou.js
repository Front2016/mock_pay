/**
 * Created by lio on 16/8/14.
 */
var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var url = require('url');
var request = require('request');
var connection = require('../model/DB');
var httpEngine = require('../model/HttpEngine');
var YeePayBindCard = require('../utils/YeePayBindcard');

//mock
if (process.env.NODE_ENV === 'development') {
  console.log(chalk.yellow('dev server'));
  require('../data')(router)
} else if (process.env.NODE_ENV === 'api') {
  router.use('/', function (req, res, next) {
    console.log(chalk.yellow(req.method + ' ' + req.url));
    console.log('http://' + process.env.REMOTE_API + req.url);
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

/*****************************  绑卡  *******************************/

/**
 * 绑卡的整个流程按照易宝提供的接口文档进行模拟
 */

/**
 * 易宝绑卡申请
 */
router.get('/bindCard', function (req, res, next) {
  console.log('发起绑卡申请');
  connection.query('SELECT * from right_table', function (err, rows, fields) {
    if (err) throw err;
    var params = {
      'dentityid': req.param.dentityid,
      'identitytype': req.param.identitytype,
      'requestid': req.param.requestid,
      'cardno': req.param.cardno,
      'idcardno': req.param.idcardno,
      'username': req.param.username,
      'phone': req.param.phone,
      'userip': req.param.userip,
      'ua': req.param.ua
    };
    YeePayBindCard(params,function(err,data){
      res.send(data);
    });
  });
  //connection.end();
});


/**
 * 确认绑卡,提交短信验证码
 */
router.get('/bindCardConf', function (req, res, next) {
  console.log('确认绑卡');
  connection.query('SELECT * from right_table', function (err, rows, fields) {
    if (err) throw err;
    console.log('The envirment', process.env.NODE_ENV);
    console.log('The solution is: ', JSON.stringify(rows));
    res.render('index', {title: 'Fuiou-bindCardConf'});
  });
  //connection.end();
});


/**
 * 解绑
 */
router.get('/unBindCard', function (req, res, next) {
  console.log('解绑');
  connection.query('SELECT * from right_table', function (err, rows, fields) {
    if (err) throw err;
    console.log('The envirment', process.env.NODE_ENV);
    console.log('The solution is: ', JSON.stringify(rows));
    res.render('index', {title: 'Fuiou-unBindCard'});
  });
  //connection.end();
});


/*****************************  充值  *******************************/

router.use('/rechargewithsms', function(req, res, next){
  console.log('提交充值申请');
  connection.query('SELECT * from right_table', function (err, rows, fields) {
    if (err) throw err;
    console.log('The envirment', process.env.NODE_ENV);
    res.render('index', {title: 'Fuiou-rechargewithsms'});
  });
});

router.use('/rechargesendsms', function(req, res, next){
  console.log('发送充值验证码');
  connection.query('SELECT * from right_table', function (err, rows, fields) {
    if (err) throw err;
    console.log('The envirment', process.env.NODE_ENV);
    res.render('index', {title: 'Fuiou-rechargesendsms'});
  });
});

router.use('/rechargeconfsms', function(req, res, next){
  console.log('提交充值验证码');
  connection.query('SELECT * from right_table', function (err, rows, fields) {
    if (err) throw err;
    console.log('The envirment', process.env.NODE_ENV);
    res.render('index', {title: 'Fuiou-rechargeconfsms'});
  });
});


/*****************************  提现  *******************************/

router.use('/cashconf', function(req, res, next){
  console.log('提现');
  connection.query('SELECT * from right_table', function (err, rows, fields) {
    if (err) throw err;
    console.log('The envirment', process.env.NODE_ENV);
    res.render('index', {title: 'Fuiou-cashconf'});
  });
})


module.exports = router;
