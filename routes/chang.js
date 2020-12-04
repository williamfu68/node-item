var express = require('express');
var router = express.Router();
var changController = require('../controllers/changController');

// list
router.get('/list', changController.list);
router.get('/type', changController.type);
router.get('/brand', changController.brand);
router.get('/detail', changController.detail);
router.get('/reco', changController.reco);

module.exports = router;
