var express = require('express');
var router = express.Router();
const followController = require('../controllers/followController');

//显示页面关注的商品
router.get('/followShop',function(req,res){
    res.render('followShop')
})
//获取商品关注的数据
router.post('/getfollowshopdata',followController.followdata)
//删除和加入购物车路由
router.post('/deloraddcar',followController.deloraddcar)


//显示关注的店铺
router.get('/followBrand',function(req,res){
    res.render('followBrand')
})
//获取关注店铺数据
router.post('/getfollowBranddata',followController.branddata)


//大客户认证页面打印,开始页面
router.get('/vipstrat',function(req,res){
    res.render('vipApply')
})
//基础信息界面打印
router.get('/vipBasics',function(req,res){
    res.render('vipBasics')
})
//调用数据库添加基础信息后端
router.post('/addjichuxx',followController.addjichuxx)


//服务站页面打印
router.get('/vipsite',function(req,res){
    res.render('vipsite')
})
//服务信息添加
router.post('/addvipsitedata',followController.addvipsitedata);

module.exports = router;