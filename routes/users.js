var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});
router.get('/login', function(req, res) {
    res.render('login', {
        title: '某商城 - 登录'
    });
});
router.get('/regist', function(req, res) {
    res.render('regist', {
        title: '某商城 - 注册'
    });
});
router.get('/forgetPassword', function(req, res) {
    res.render('forgetPassword', {
        title: '某商城 - 忘记密码'
    });
});
router.get('/registProtocol', function(req, res) {
    res.render('registProtocol', {
        title: '某商城 - 注册协议'
    });
});
router.get('/registSuccess', function(req, res) {
    res.render('registSuccess', {
        title: '某商城 - 注册成功'
    });
});
router.get('/registProtocol', function(req, res) {
    res.render('registProtocol', {
        title: '用户注册协议'
    });
});
router.get('/info/us', function(req, res) {
    res.render('us', {
        title: 'US完善资料'
    });
});
router.get('/info/vs', function(req, res) {
    res.render('vs', {
        title: 'VS完善资料'
    });
});
router.get('/info/lc', function(req, res) {
    res.render('lc', {
        title: 'LC完善资料'
    });
});
router.get('/info/se', function(req, res) {
    res.render('se', {
        title: 'SE完善资料'
    });
});
router.get('/info/complete', function(req, res) {
    res.render('complete', {
        title: '完善完毕'
    });
});
router.post('/tologin', loginController.login);
router.get('/logout', loginController.logout);
router.post('/toforgetPassword', loginController.forgetPassword);
router.post('/toregist', loginController.regist);

module.exports = router;