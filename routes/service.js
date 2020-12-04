var express = require('express');
var router = express.Router();
var serveCtrl = require('../controllers/serveController'); 

router.get('/list',serveCtrl.list);

router.get('/', function(req, res) {
    res.render('service', {
      title: '服务站信息'
    });
});

module.exports = router;