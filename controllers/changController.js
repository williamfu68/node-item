var query = require('../models/index');

var changController = {
    list: async function (req, res) {
      console.log(req.query);
      var startCount = (parseInt(req.query.currentPage) - 1) * parseInt(req.query.pageSize);
      var pageSize = parseInt(req.query.pageSize);
      try {
        var sql = `SELECT * from goods_list limit ?,?`;
        var count = `select count(*) as cnt from goods_list`;
        var type = `select distinct g_type from goods_list;`
        var brand = `select distinct g_brand from goods_list;`
        type = await query(type);
        brand = await query(brand);
        var cnt = await query(count);
        console.log(cnt);
        var result = await query(sql, [startCount,pageSize]);
        res.json({
          msg: '数据查找成功',
          state: '200',
          data: {
            list: result,
            count: cnt,
            type: type,
            brand: brand
          }
        });
      } catch(err) {
        console.log(err);
      }
    },
    type: async function (req,res) {
      console.log(req.query);
      var startCount = (parseInt(req.query.currentPage) - 1) * parseInt(req.query.pageSize);
      var pageSize = parseInt(req.query.pageSize);
      try {
        var sql = `SELECT * from goods_list where g_type = ? limit ?,?`;
        var count = `select count(*) as cnt from goods_list where g_type = ?`;
        var type = `select distinct g_type from goods_list;`
        var brand = `select distinct g_brand from goods_list;`
        type = await query(type);
        brand = await query(brand);
        var cnt = await query(count,req.query.type);
        var result = await query(sql, [req.query.type,startCount,pageSize]);

        res.json({
          msg: '数据查找成功',
          state: '200',
          data: {
            list: result,
            count: cnt,
            type: type,
            brand: brand
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    brand: async function(req,res) {
      var startCount = (parseInt(req.query.currentPage) - 1) * parseInt(req.query.pageSize);
      var pageSize = parseInt(req.query.pageSize);
      try {
        var sql = `SELECT * from goods_list where g_brand = ? limit ?,?`;
        var count = `select count(*) as cnt from goods_list where g_brand = ?`;
        var type = `select distinct g_type from goods_list;`
        var brand = `select distinct g_brand from goods_list;`
        type = await query(type);
        brand = await query(brand);
        var cnt = await query(count,req.query.brand);
        var result = await query(sql, [req.query.brand,startCount,pageSize]);

        res.json({
          msg: '数据查找成功',
          state: '200',
          data: {
            list: result,
            count: cnt,
            type: type,
            brand: brand
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    detail: async function(req,res) {
      try {
        var sql = `SELECT * from goods_list where g_id = ?`;
        var result = await query(sql, req.query.id);

        res.json({
          msg: '数据查找成功',
          state: '200',
          data: result
        });
      } catch (err) {
        console.log(err);
      }
    },
    reco: async function(req,res) {
      console.log(req.query.type);
      try {
        var sql = `SELECT * from goods_list where g_type = ?`;
        var result = await query(sql, req.query.type);

        res.json({
          msg: '数据查找成功',
          state: '200',
          data: result
        });
      } catch (err) {
        console.log(err);
      }
    }
}

  module.exports = changController;