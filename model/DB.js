/**
 * Created by lio on 16/8/7.
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qwe123',
  database:'test', // 前面建的user表位于这个数据库中
  port: 3306
});

connection.connect();


module.exports = connection;

