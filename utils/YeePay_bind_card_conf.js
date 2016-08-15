/**
 * Created by lio on 16/8/15.
 */

//易宝确认绑卡页面
/**
 *
 * @constructor
 * merchantaccount 商户编号
 * requestid 绑卡请求号
 * requestid 短信验证码
 * sign 签名
 */
var YeePay_bind_card_conf = function(){
  /**
   * 返回参数-成功:
   * 1.merchantaccount 商户编号
   * 2.requestid 原样返回商户所传
   * 3.bankcode 银行编码列表
   * 4.card_top 卡号前6位
   * 5.card_last 卡号后四位
   * 6.sign
   */


  /**
   * 返回参数-失败:
   * 1.error_code 错误码
   * 2.error_msg 错误信息
   * 3.sign 签名
   */
};



module.exports = YeePay_bind_card_conf;
