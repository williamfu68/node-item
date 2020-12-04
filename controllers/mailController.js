var sendMail = require('../nodemailer/nodemailer');

var mailController = {
    // 生成验证码传给前台
    getCode: async function(req, res) {
        try {
            var email = req.query.mail;
            var codeNum = '';
            for (var i = 0; i < 6; i++) {
                codeNum += Math.floor(Math.random() * 10);
            }
            var mail = {
                from: '1940275173@qq.com', // 发件人
                to: email, // 收件人
                subject: '找回密码', // 邮箱主题
                html: '<strong>尊敬的用户：</strong><span>' + email + '</span><br/>您的验证码为 <span style="font-size: 22px;color: red;"> ' + codeNum + '</span>，请保存好不要随意给其他人，有效期为2分钟' // 邮件内容, HTML格式, 发送验证码
            };
            var result = await sendMail(mail, (err) => {
                if (err) {
                    console.log(err)
                }
            });
            if (result.messageId) {
                req.session.codeNum = codeNum;
                res.json({
                    msg: '验证码发送成功',
                    state: 1
                })
            } else {
                res.json({
                    msg: '验证码发送失败',
                    state: 0,
                })
            }
            console.log(req.session.codeNum)
        } catch (error) {
            console.log(error)
        }

    },
    checkCode: async function(req, res) {
        try {
            var userCode = req.body.codeNum;
            var sessionCode = req.session.codeNum;
            if (userCode === sessionCode) {
                res.json({
                    msg: 'step2验证通过',
                    state: 1
                })
            } else {
                res.json({
                    msg: 'step2验证失败',
                    state: 0
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = mailController;