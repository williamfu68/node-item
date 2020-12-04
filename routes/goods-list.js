var express = require('express');
var router = express.Router();
var goodsController = require('../controllers/goodsController');

// list
router.get('/list', goodsController.list);
router.get('/type', goodsController.type);
router.get('/brand', goodsController.brand);
router.get('/detail', goodsController.detail);
router.get('/reco', goodsController.reco);

module.exports = router;
