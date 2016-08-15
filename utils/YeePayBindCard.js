var connection = require('../model/DB');
var JsonFactory = require('./JsonFactory');
var YeePay_config = require('../config/YeePay_conf');
/**
 * Created by lio on 16/8/15.
 */

/**
 * 一包的绑卡分为两步,第一步为绑卡申请,返回参数:1.返回成功
 */
var YeePayBindCard = function(params,callback){

  var factory = new JsonFactory();
  for(var key in params){
    params[key] = params[key] ? params[key]: '0509';
  }

  var  bindCardSql = 'INSERT INTO pay_bind_card (dentityid, identitytype, requestid, cardno, idcardno, username, phone, userip, ua) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )';
  var  bindCardSql_Params = [params['dentityid'], params['identitytype'], params['requestid'], params['cardno'], params['idcardno'], params['username'], params['phone'], params['userip'], params['ua']];
  connection.query(bindCardSql,bindCardSql_Params, function (err, rows, fields) {
    if (err)throw err;
    if(params['type'] == 'success'){
      /**
       * 返回参数-成功:
       * 1.merchantaccount(商户编号)
       * 2.requestid商户编号(绑卡请求号)
       * 3.codesender(短信验证码发送方)[YEEPAY:易宝发送 BANK:银行发送 MERCHANT:商户发送]
       * 4.smscode(短信验证码对接号,为商户发送短验时会返回易宝生成 的验证码)
       * 5.sign(易宝使用自己生成的 RSA 私钥对除 参数”sign”外的其他参数进行字 母排序后串成的字符串进行签名)
       */
      var data = {
        'merchantaccount': 'MC000002',
        'requestid': 'qwe123adw',
        'codesender': 'MERCHANT',
        'smscode': 'number',
        'sign': '1231231'
      };
      factory.insert_data('res','易宝绑卡申请创建订单成功');
      callback(err,data);
    }else {
      /**
       * 返回参数-失败:
       * 1.error_code(错误码)
       * 2.error_msg(错误信息)
       * 3.sign(易宝使用自己生成的 RSA 私钥对除 参数”sign”外的其他参数进行字 母排序后串成的字符串进行签名)
       *
       */
      params['error_type'] = '600120';
      var data = {
        'error_code': params['error_type'],
        'error_msg': YeePay_config['bind_card'][params['error_type']],
        'sign': '1234123123'
      };

      //switch (params['error_type']){
      //  case '600120':
      //    data['error_code'] = '';
      //        break;
      //  case '600121':
      //        break;
      //}

      factory.set_error_code('ERROR_BINDCARD');
      callback(err,data);
    }
  });
};

module.exports = YeePayBindCard;

