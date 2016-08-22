/**
 * Created by lio on 16/8/7.
 */
var http = require('http');

exports.find = function(reqs,success){

  var headers = reqs.headers;
  headers.host = 'webhooks.yesdust.com/';
  var options = {
    host: 'webhooks.yesdust.com/',
    port: 80,
    path: '/',
    method: 'GET',
    headers: headers
  };
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
      var datas = JSON.parse(data);
      success(res,datas);
    });
  });
  req.on('error', function(e){
    console.log("auth_user error: " + e.message);
  });
  req.end();
};
