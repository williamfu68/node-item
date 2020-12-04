var query = require('../models/index');
var crypto = require('crypto'); // 导入 node自带的加密模块

var loginController = {
    login: async function(req, res) {
        try {
            console.log('登录请求参数：', req.body);
            var sql = 'select * from  user where u_name = ?';
            var result = await query(sql, [req.body.username]);
            var md5 = crypto.createHash('md5');
            var encryptPass = md5.update(req.body.password).digest('hex');
            console.log(result);
            if (result.length > 0) {
                if (result[0].pwd == encryptPass) {
                    req.session.sign = true;
                    res.json({
                        msg: '登录成功！',
                        state: 200,
                    })
                } else {
                    res.json({
                        msg: '密码错误！',
                        state: 500
                    })
                }
            } else {
                res.json({
                    msg: '帐号不存在！',
                    state: 500
                })
            }
        } catch (err) {
            console.log(err);
            res.json({
                msg: '服务器错误！',
                state: 500
            })
        }
    },
    logout: function(req, res) {
        // req.session.sign = false;
        req.session.destroy();
        res.redirect('/users/login');
    },
    forgetPassword: async function(req, res) {
        try {
            console.log('忘记密码请求参数：', req.body);
            var sql = 'select * from user where u_name = ? and telephone = ?';
            var result = await query(sql, [req.body.username, req.body.telephone]);
            console.log(result);
            if (result.length > 0) {
                var sql2 = 'update user set pwd = ? where u_name = ?';
                var md5 = crypto.createHash('md5');
                var encryptPass = md5.update(req.body.password).digest('hex');
                var result2 = await query(sql2, [encryptPass, req.body.username]);
                console.log(result2);
                res.json({
                    msg: '修改成功！',
                    state: 200,
                })
            } else {
                res.json({
                    msg: '帐号不存在或电话号码错误！',
                    state: 500
                })
            }
        } catch (err) {
            console.log(err);
            res.json({
                msg: '服务器错误！',
                state: 500
            })
        }
    },
    regist: async function(req, res) {
        try {
            console.log('注册请求参数：', req.body);
            var sql = 'select * from  user where u_name = ?';
            var result = await query(sql, [req.body.username]);
            if (result.length > 0) {
                res.json({
                    msg: '帐号已被注册！',
                    state: 500
                })
            } else {
                var md5 = crypto.createHash('md5');
                var encryptPass = md5.update(req.body.password).digest('hex'); // 加密密码 32位哈希值  hex和 base64都为可逆加密
                console.log('加密后的密码：', encryptPass);
                var sql2 = 'insert into user (u_name,pwd,telephone,qq_mail,address) values (?,?,?,?,?)';
                var result2 = await query(sql2, [req.body.username, encryptPass, req.body.telephone, req.body.email, req.body.address]);
                console.log('注册成功:', result2);
                var sql3 = 'select * from user where u_name = ?';
                var result3 = await query(sql3, [req.body.username]); // 注册成功的用户数据
                res.json({
                    msg: '注册成功！',
                    state: 200,
                    data: result3
                })
            }
        } catch (err) {
            console.log(err);
            res.json({
                msg: '服务器错误！',
                state: 500
            })
        }
    },
}

module.exports = loginController;