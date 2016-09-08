
var express = require('express');
var router = express.Router();
var chalk = require('chalk');
var url = require('url');
var request = require('request');
var connection = require('../model/DB');
var httpEngine = require('../model/HttpEngine');

/* GET login page. */
router.route("/login").get(function(req,res){    // 到达此路径则渲染login文件，并传出title值供 login.html使用
    //res.send(req.session.user);
    res.render("login",{title:'User Login'});
}).post(function(req,res){                        // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
     //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user');  
    var uname = req.body.uname;                //获取post上来的 data数据中 uname的值
    User.findOne({name:uname},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
        if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
            res.send(500);
            console.log(err);
        }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在';
            res.send(404);                            //    状态码返回404
        //    res.redirect("/login");
        }else{ 
            if(req.body.upwd != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
                req.session.error = "密码错误";
                res.send(404);
            //    res.redirect("/login");
            }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                req.session.user = doc;
                res.send(200);
            //    res.redirect("/home");
            }
        }
    });
});
router.route('/submit').get(function(req,res){
    var urlparam = url.parse(req.url,true).query;
    res.set({
        'Content-Type':'text/plain',
        'Content-Length':'123',
        'ETag':'12345'
    });
    res.cookie('cart',{items:[1,2,3]});
    if(urlparam.name && urlparam.password){
        connection.query('SELECT id,password from user where name = "'+urlparam.name+'" ', function (err, rows, fields) {
            if (err) throw err;
            if(rows.length > 0){
                if(rows[0]['password'] == urlparam.password){
                    req.session.uid = rows[0]['id'];
                    console.log(req.session.uid);
                    res.send({
                        'res': 'success',
                        'name': urlparam.name,
                        'password': urlparam.password
                    });
                }else{
                    res.send({
                        'res':'error',
                        'error-msg':'密码不正确'
                    })
                }
            }else{
                res.send({
                    'res':'error',
                    'error-msg':'没有该用户'
                })
            }
        })
    }else{
        res.send({
            'res': '密码用户名不能为空',
        });
    }
})
module.exports = router;