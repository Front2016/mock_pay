/**
 * Created by lio on 16/8/15.
 */

var JsonFactory = function(){

  this.config = {
    'ERROR_BINDCARD':'绑卡失败'
  };

  this.result = {
    'error_code':'OK',
    'error_msg':'NUll'
  };

  this.data = {};

  this.insert_data = function(key,val){
    this.data.key = val;
  };

  this.set_error_code = function(error_code){
    this.result.error_code = error_code;
    if(this.config.hasOwnProperty(error_code)){
      this.result.error_msg = this.config[error_code]
    }
  };

  this.set_error_data = function(error_msg){
    this.result.error_msg = error_msg;
  };

  this.JsonReturn = function(){
    return {
      'result': this.result,
      'data': this.data
    }
  }
};

module.exports = JsonFactory;
