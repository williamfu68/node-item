var query = require('../models/index');
var crypto = require('crypto'); // 导入 node自带的加密模块

var infoController = {
    usInfo: async function(req, res) {
        try {
            console.log('请求参数：', req.query);
            res.json({
                data: req.query,
                state: 200
            })

        } catch (err) {
            console.log(err);
            res.json({
                msg: '服务器错误！',
                state: 500
            })
        }
    }
}

module.exports = infoController;