var express = require('express');
var router = express.Router();
var orderController = require('../controllers/orderController');

// list
router.get('/list', orderController.list);
router.get('/state', orderController.state);
router.get('/del', orderController.del);
router.get('/detail', orderController.detail);

module.exports = router;