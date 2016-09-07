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

router.all('*',function(req, res, next){
    console.log(chalk.red('dev server'));
    console.log(req.body);
    next();
})
module.exports = router;
