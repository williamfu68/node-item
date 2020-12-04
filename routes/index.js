var express = require('express');
var router = express.Router();
var findPwdController = require('../controllers/findPwdController');
var mailController = require('../controllers/mailController');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: '商品服务分类' });
});
router.get('/home', function(req, res) {
    res.render('home', { title: '首页' });
});

// 唐玺
// 页面渲染
router.get('/findpwd', function(req, res) {
    res.render('findPassword', { title: '找回密码' });
});
// 控制器
router.get('/createdyzm', findPwdController.createdCode);
router.post('/testyzm', findPwdController.testCode);
// 完成更新密码
router.post('/subpwd', findPwdController.submitPwd);
router.get('/getcode', mailController.getCode);
router.post('/checkCode', mailController.checkCode);
module.exports = router;

// 陈袁旭
router.get('/chang', function(req, res) {
    res.render('chang', {
        title: '厂家直供',
        position: '厂家直供'
    });
});
router.get('/ce', function(req, res) {
    res.render('ce', {
        title: '测土配肥',
        position: '测土配肥'
    });
});
router.get('/hai', function(req, res) {
    res.render('hai', {
        title: '海外购',
        position: '海外购'
    });
});

// 杨文康 
router.get('/goods-list', function(req, res) {
    res.render('goods-list', {
      title: '商品列表',
      position: '商品列表'
    });
  });
router.get('/detail', function(req, res) {
  res.render('goods-detail',{
    title: '商品详情',
    position: '商品详情'
  });
});
router.get('/myorder', function(req, res) {
  res.render('my-order',{
    title: '我的订单',
    position: '我的订单'
  });
});

router.get('/order-detail', function(req, res) {
  res.render('order-detail',{
    title: '订单详情',
    position: '订单详情'
  });
});

// 龙宇
router.get('/person', function(req, res) {
    res.render('person', { 
        title: '个人资料' 
    });
});

router.get('/account', function(req, res) {
    res.render('account', { 
        title: '账号信息' 
    });
});

router.get('/farm', function(req, res) {
    res.render('farm', { 
        title: '农场信息' 
    });
});

router.get('/address', function(req, res) {
    res.render('address', { 
        title: '收货地址' 
    });
});

// 林涛
