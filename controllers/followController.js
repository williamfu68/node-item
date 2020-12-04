var query = require('../models/index');

var followController = {
    followdata: async function(req, res) {
        try{
            var toppage = parseInt(req.body.toppage),
            bottompage = parseInt(req.body.bottompage)
            var sql1 = `select * from goods_list inner join follow_shop on goods_list.g_id = follow_shop.g_id LIMIT ?,?`;
            var sql2 = `select * from goods_list inner join follow_shop on goods_list.g_id = follow_shop.g_id`;
            var result = await Promise.all([query(sql1,[toppage-1,bottompage]),query(sql2,null)])
            res.json({
                state:'200',
                data: result
            })
        } catch(err){
            console.log(err);
        }
    },
    branddata: async function(req,res){
        try{
            var toppage = parseInt(req.body.toppage),
            bottompage = parseInt(req.body.bottompage)
            var sql1 = `SELECT * FROM follow_shop LIMIT ?,?`;
            var sql2 = `select * from follow_shop`;
            var result = await Promise.all([query(sql1,[toppage-1,bottompage]),query(sql2,null)])
            res.json({
                state:'200',
                data:result
            })
            
        } catch(err){
            console.log(err)
        }
    },
    deloraddcar:async function(req,res){
        try{
            var inx = parseInt(req.body.inx);
            var snum = parseInt(req.body.snum);
            if(req.body.adddelstate === 'del'){
                //触发取消关注
                var sql = `delete from follow_shop where fo_id = ?`;
                result = await query(sql,[inx]);
                res.json({
                    state:'del200'
                })
            }else{
                var sql = `insert into shopcar (uid,s_num,g_id) values (?,?,?)`;
                result = await query(sql,[1,snum,req.body.gid]);
                res.json({
                    state:'add200'
                })
            }
        }catch(err){
            console.log(err)
        }
    },

    //基础信息后端
    addjichuxx:async function(req,res){
        try{
            var sql = `insert into jcxinxi(j_name, j_sfz, j_dz, j_zzw, j_yhlx, j_skhh, j_skh, j_skhrname, j_sprovince, j_ssity, j_sarea) value(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            var ssfz = parseInt(req.body.ssfz);
            var skh = parseInt(req.body.skh);
            result = await query(sql,[req.body.sname, ssfz, req.body.sdz, req.body.szzw,req.body.syhlx,
                req.body.skhh, skh, req.body.skhrname, req.body.sprovince, req.body.ssity, req.body.sarea])
            res.json({
                state:'200'
            })
            console.log(req.body,'前端数据')
        }catch(err){
            console.log(err)
        }
    },
    addvipsitedata:async function(req,res){
        try{
            console.log(req.body.siteisadd,'前端数据')
            console.log(req.body.sitebh,'数就覅我二')
            var sitestate
            sitestate = req.body.siteisadd
            if(sitestate == 'true'){
                var titenum = parseInt(req.body.titenum);
                var titephone = parseInt(req.body.titephone);
                var sql1 = `insert into vipsite(vip_province,vip_sity,vip_area,vip_titenum,vip_titephone) value(?,?,?,?,?)`;
                result = await query(sql1,[req.body.province, req.body.sity, req.body.area, titenum,titephone,]);
                res.json({
                    state:'200'
                })
            }else{
                var sitebh = parseInt(req.body.sitebh);
                var sql3 = `select vip_titenum,vip_titephone from vipsite where vip_titenum = ?`;
                resule = await query(sql3,[sitebh])
                res.json({
                    data:resule,
                    state:'100'
                })
            }
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = followController;