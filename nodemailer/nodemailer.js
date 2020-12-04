var nodemailer = require('nodemailer');

function sendMail(mail) {
  return new Promise ((resolve, reject) => {
    const config = {
      host: 'smtp.qq.email',
      service: 'qq',
      secure: true, // 安全方式发送
      port: 465,
      auth: {
        user: '1940275173@qq.com', //自己的邮箱账号
        pass: 'icldrdxzrgrdbgdg' //邮箱的授权码
      }
    };
    
    // 创建一个SMTP客户端对象
    const transporter = nodemailer.createTransport(config);
    
    // 发送邮件
    transporter.sendMail(mail, function(error, info){
      if(error) {
        return reject(error);
      }
      resolve(info);
    });
  })
}

module.exports = sendMail;
