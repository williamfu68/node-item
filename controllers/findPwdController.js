var query = require('../models/index');
var crypto = require('crypto'); // 导入 node自带的加密模块

var reqCode = '';
var findPwdController = {
    // 生成验证码
    createdCode: function(req, res) {
        var code = [];
        var yzm = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
        var yzmArr = yzm.toLowerCase().split('');
        var yzmLen = yzmArr.length;
        var codeLen = 4;
        for (var i = 0; i < codeLen; i++) {
            var index = Math.floor(Math.random() * yzmLen);
            var idx = code.indexOf(yzmArr[index]);
            if (idx > -1) {
                codeLen++;
                continue;
            }
            code.push(yzmArr[index]);
        }
        code = code.join('');
        reqCode = code;
        res.json({
            msg: '验证码生产成功',
            state: '200',
            data: code
        })
    },

    // 验证验证码
    testCode: async function(req, res) {
        try {
            var userMail = req.body.mail;
            var yzm = req.body.yzm;
            var sql = 'select * from user where qq_mail=?';
            var result = await query(sql, userMail);
            var msg, state;
            if (result.length > 0 && yzm === reqCode) {
                msg = '数据查询成功';
                state = 200;
            } else if (result.length === 0) {
                msg = '没有此用户';
                state = 205;
            } else {
                msg = '验证码错误';
                state = 404;
                result = [];
            }
            res.json({
                msg: msg,
                state: state,
                data: result
            })
        } catch (err) {
            console.log(err);
        }
    },

    // 把新密码插入数据库
    submitPwd: async function(req, res) {
        try {
            var user = req.body.user;
            var pwd = req.body.pwd;
            var md5 = crypto.createHash('md5');
            var encryptPass = md5.update(pwd).digest('hex');
            pwd = encryptPass;
            var sql = 'update user set pwd = ? where qq_mail = ?';
            var result = await query(sql, [pwd, user]);
            if (result.changedRows === 1) {
                res.json({
                    msg: '密码重置成功',
                    state: 1
                })
            } else {
                res.json({
                    msg: '密码重置失败',
                    state: 0
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = findPwdController;