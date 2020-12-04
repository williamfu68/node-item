var query = require('../models/index');


var orderController = {
    list: async function(req, res) {
        try {
            console.log('get请求参数：', req.query);
            var sql = 'select * from  orders';
            var sql1 = 'select * from orders o,goods_list g where o.g_id = g.g_id';
            var sql2 = 'select * from orders o, user u where o.uid = u.uid';
            var result = await query(sql, null);
            sql1 = await query(sql1,null);
            res.json({
                msg: '数据查询成功',
                state: 200,
                data: {
                    list: result,
                    face: sql1,
                    user: sql2
                }
            })
        } catch (err) {
            console.log(err);
        }
    },
    state: async function(req, res) {
        try {
            console.log('get请求参数：', req.query);
            var sql = 'select * from  orders where state = ?';
            var sql1 = 'select * from orders o,goods_list g where o.g_id = g.g_id';
            var sql2 = 'select * from orders o, user u where o.uid = u.uid';
            var result = await query(sql, req.query.state);
            sql1 = await query(sql1,null);
            res.json({
                msg: '数据查询成功',
                state: 200,
                data: {
                    list: result,
                    face: sql1,
                    user: sql2
                }
            })
        } catch (err) {
            console.log(err);
        }
    },
    del: async function(req, res) {
        try {
            console.log('get请求参数：', req.query.id);
            var sql = 'delete from orders where o_id = ?';
            sql = await query(sql,req.query.id);
            res.json({
                msg: '数据删除成功',
                tip: '取消订单成功',
                state: 200
            })
        } catch (err) {
            console.log(err);
        }
    },
    detail: async function(req, res) {
        try {
            console.log('get请求参数：', req.query.id);
            var sql = 'select *  from orders where o_id = ?';
            var sql1 = 'select * from orders o,address a where o.detail_address = a.detail_address';
            sql = await query(sql,req.query.id);
            sql1 = await query(sql1,null);
            res.json({
                msg: '数据查询成功',
                state: 200,
                data: {
                    list: sql,
                    ad: sql1
                }
            })
        } catch (err) {
            console.log(err);
        }
    },
}

module.exports = orderController;