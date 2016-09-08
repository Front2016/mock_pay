var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var url = require('url');
var request = require('request');
var connection = require('../model/DB');
var httpEngine = require('../model/HttpEngine');
var bodyParser = require('body-parser');
var multer = require('multer'); 

var app = new express();


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(multer()); 

router.all('/',function(req, res, next){
    var data = {};
    connection.query('SELECT name,create_time from user where id = "'+req.session.uid+'" ', function (err, rows, fields) {
        data['name'] = rows[0]['name'];
        data['create_time'] = rows[0]['create_time'];
        res.render('index',data);
    })
})
module.exports = router;
