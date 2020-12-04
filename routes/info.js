var express = require('express');
var router = express.Router();
const infoController = require('../controllers/infoController');

router.get('/usInfo', infoController.usInfo);

module.exports = router;