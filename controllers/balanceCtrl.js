var query = require('../models/index');//引入函数

var balanceCtrl = {
  money: async function(req, res) {
    try{
      console.log(req.body.money, '前端数据')
      if(req.body.money){
        var sql1 = `insert into money(money) value(?)`
        query(sql1,[req.body.money]);
        res.json({
          state: '200'
        })
      }
    }catch(err){
      console.log(err)
    }
  }
}

module.exports = balanceCtrl;