var query = require('../models/index');

var serveCtrl = {
    list: async function (req, res) {
        try {
            var sql = `select province,city,county,detail_address detailAddress,tel,receiver from address`;
            var result = await query(sql,null);

            res.json({
                msg: '数据查找成功',
                state: '200',
                data:result
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = serveCtrl;