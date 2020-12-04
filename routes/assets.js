var express = require('express');
var router = express.Router();
var balanceCtrl = require('../controllers/balanceCtrl');//引入控制器
var successCtrl = require('../controllers/successCtrl');//引入控制器


router.get('/commission', function(req, res, next) {
    res.render('commission', { title: '我的佣金' });
  });

  router.get('/fail', function(req, res) {
    res.render('fail', { title: '充值失败' });
  });

  router.get('/balance', function(req, res) {
    res.render('my_balance', { title: '我的余额' });
  });

  router.get('/redEnvelope', function(req, res) {
    res.render('my_red_envelope', { title: '我的红包' });
  });

  router.get('/redOverdue', function(req, res) {
    res.render('my_red_overdue', { title: '我的红包' });
  });

  router.get('/redUse', function(req, res) {
    res.render('my_red_use', { title: '我的红包' });
  });

  router.get('/success', function(req, res) {
    res.render('success', { title: '充值成功' });
  });
  
  // 查询余额
  router.get('/show', successCtrl.show);

module.exports = router;