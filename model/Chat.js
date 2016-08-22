module.exports = function (app, express) {
    //会话中间件
    if (!module.parent) app.use(express.logger('dev'));
    app.use(express.cookieParser('some secret here'));
    app.use(express.session());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    //总之，就是我们编写的代码执行前过滤和处理请求
    app.response.message = function(msg){
    var sess = this.req.session;
    sess.messages = sess.messages || [];
    sess.messages.push(msg);
    return this;
    };
};