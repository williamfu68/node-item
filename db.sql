-- 存储sql语句

create database goods charset utf8mb4;
-- 1.商品表
CREATE TABLE goods_list(
    g_id int(11) not null primary key AUTO_INCREMENT,
    g_name VARCHAR(30) not null,
    g_weight VARCHAR(6) not null,
    g_price VARCHAR(8) not null,
    g_date VARCHAR(15) not null,
    g_type VARCHAR(10) not null,
    g_num int(8) not null
);
alter table goods_list add column g_face varchar(128) not null after g_name;
alter table goods_list add column g_brand varchar(15) not null after g_type;
INSERT INTO goods_list(g_name,g_face,g_weight,g_price,g_date,g_type,g_brand,g_num)
VALUES
('山东宝源，冲施肥，含腐殖酸','/img/01.jpg','20','98','2020-05-25','化肥','富田日和','56');
INSERT INTO goods_list(g_name,g_face,g_weight,g_price,g_date,g_type,g_brand,g_num)
VALUES
('河南 莲花“金养地” 保健型亲土有机肥','/img/02.jpg','25','105','2020-02-24','化肥','胜德龙','3');
INSERT INTO goods_list(g_name,g_face,g_weight,g_price,g_date,g_type,g_brand,g_num)
VALUES
('复合肥料','/img/03.jpg','30','90','2020-02-24','复合肥','胜德龙','89'),
('超级特精小麦粉','/img/04.jpg','25','90','2019-02-24','小麦粉','富田日和','88'),
('EDTN MA','/img/05.jpg','30','90','2020-09-24','化肥','胜德龙','89'),
('塑料通用色母粒','/img/06.jpg','25','85','2020-02-27','化肥','胜德龙','89'),
('普通复合肥料','/img/07.jpg','30','90','2020-02-24','复合肥','胜德龙','89'),
('微量元素复合肥料','/img/08.jpg','24','99','2020-02-24','复合肥','富田日和','999');
INSERT INTO goods_list(g_name,g_face,g_weight,g_price,g_date,g_type,g_brand,g_num)
VALUES
('萝卜种子','/img/09.jpg','0.5','9.9','2020-08-24','种子','绿宝园林','789');
UPDATE goods_list SET g_face = '/img/02.jpg,/img/01-1.jpg,/img/01-2.jpg,/img/01-3.jpg' WHERE g_id = 3;
UPDATE goods_list SET g_face = '/img/03.jpg,/img/01-1.jpg,/img/01-2.jpg,/img/01-3.jpg' WHERE g_id = 4;
UPDATE goods_list SET g_face = '/img/04.jpg,/img/01-1.jpg,/img/01-2.jpg,/img/01-3.jpg' WHERE g_id = 5;
UPDATE goods_list SET g_face = '/img/05.jpg,/img/01-1.jpg,/img/01-2.jpg,/img/01-3.jpg' WHERE g_id = 6;
UPDATE goods_list SET g_face = '/img/06.jpg,/img/01-1.jpg,/img/01-2.jpg,/img/01-3.jpg' WHERE g_id = 7;
UPDATE goods_list SET g_face = '/img/07.jpg,/img/01-1.jpg,/img/01-2.jpg,/img/01-3.jpg' WHERE g_id = 8;
UPDATE goods_list SET g_face = '/img/08.jpg,/img/01-1.jpg,/img/01-2.jpg,/img/01-3.jpg' WHERE g_id = 9;
UPDATE goods_list SET g_face = '/img/09.jpg,/img/01-1.jpg,/img/01-2.jpg,/img/01-3.jpg' WHERE g_id = 10;
-- 2.用户表
CREATE TABLE user(
    uid int AUTO_INCREMENT not null PRIMARY key,
    u_name VARCHAR(10) not null UNIQUE,
    pwd VARCHAR(32) not null,
    telephone VARCHAR(20) not null,
    qq_mail VARCHAR(20) not null,
    address VARCHAR(50) not null,
    registTime datetime default now()
);

-- 3.地址表
CREATE TABLE address(
    uid int not null,
    FOREIGN KEY(uid) REFERENCES user(uid),
    province VARCHAR(8),
    city VARCHAR(8),
    county VARCHAR(8),
    detail_address VARCHAR(30) UNIQUE not null,
    tel int(11) not null,
    receiver VARCHAR(6) not null,
    a_id int(11) not null primary key AUTO_INCREMENT
);
-- 4.购物车表
CREATE TABLE shopcar(
    s_id int(10) PRIMARY KEY not null,
    uid int not null,
    FOREIGN KEY(uid) REFERENCES user(uid),
    s_num int(8) not null,
    g_id int(11) not null,
    FOREIGN KEY(g_id) REFERENCES goods_list(g_id)
);
INSERT INTO address(uid,province,city,county,detail_address,tel,receiver)
VALUES
(2,'四川省','乐山市','犍为县','四川省乐山市犍为县罗成镇',1305663018,'张三');
-- 5.订单表
CREATE TABLE orders (
    o_id int(11) PRIMARY KEY not null,
    buy_date VARCHAR(20) not null,
    pay_date VARCHAR(20) null,
    pay_price VARCHAR(8) null,
    pay_id int(11) null,
    state VARCHAR(10) default('待付款') not null,
    exp_id int(11) UNIQUE null,
    detail_address VARCHAR(30) not null,
    FOREIGN KEY(detail_address) REFERENCES address(detail_address),
    cnt_price VARCHAR(8) null,
    uid int not null,
    FOREIGN KEY(uid) REFERENCES user(uid)
);
insert into orders(g_id,o_id,buy_date,pay_date,pay_price,pay_id,state,exp_id,detail_address,cnt_price,uid)
VALUES
(4,256589654,'2020-11-22 11:25:36','2020-11-22 18:44:45','45',565478894,'待收货',894785478,'四川省乐山市犍为县罗成镇','154',2),
(5,256589655,'2020-11-20 11:25:25','2020-11-21 17:44:45','45',565478892,'待收货',894785474,'四川省乐山市犍为县罗成镇','255',2),
(6,256589656,'2020-11-18 11:25:46','2020-11-19 18:41:45','55',565478891,'待收货',894785477,'四川省乐山市犍为县罗成镇','256',2),
(3,256525654,'2020-11-20 10:25:36','2020-11-20 21:54:45','98',565256894,'待收货',894785691,'四川省乐山市犍为县罗成镇','98',2);
insert into orders(g_id,o_id,buy_date,state,detail_address,uid)
VALUES
(4,266589654,'2020-11-20 11:25:36','待支付','四川省乐山市犍为县罗成镇',2),
(7,276589655,'2020-11-21 11:25:25','待支付','四川省乐山市犍为县罗成镇',2),
(8,286589656,'2020-11-22 11:25:46','待支付','四川省乐山市犍为县罗成镇',2);
insert into orders(g_id,o_id,buy_date,pay_date,state,detail_address,uid)
VALUES
(4,346589654,'2020-11-20 11:25:36','2020-11-21 11:25:36','待发货','四川省乐山市犍为县罗成镇',2),
(7,676589655,'2020-11-21 11:25:25','2020-11-22 11:25:36','待发货','四川省乐山市犍为县罗成镇',2);
insert into orders(g_id,o_id,buy_date,pay_date,pay_price,pay_id,state,exp_id,detail_address,cnt_price,uid)
VALUES
(6,566589654,'2020-11-12 11:25:36','2020-11-13 18:44:45','66',565478894,'已收货',844785478,'四川省乐山市犍为县罗成镇','154',2),
(7,246589655,'2020-11-11 11:25:25','2020-11-15 17:44:45','55',565478892,'已收货',584785474,'四川省乐山市犍为县罗成镇','255',2),
(9,236589656,'2020-11-13 11:25:46','2020-11-12 18:41:45','87',565478891,'已收货',694785477,'四川省乐山市犍为县罗成镇','256',2),
(8,456525654,'2020-11-14 10:25:36','2020-11-14 21:54:45','65',565256894,'已收货',424785691,'四川省乐山市犍为县罗成镇','98',2);
-- 6.订单详情表
CREATE TABLE orders_detail(
    od_id int(10) PRIMARY KEY not null,
    o_id int(11)  not null,
    FOREIGN KEY(o_id) REFERENCES orders(o_id),
    g_id int(11) not null,
    FOREIGN KEY(g_id) REFERENCES goods_list(g_id),
    g_weight VARCHAR(6) not null,
    g_price VARCHAR(8) not null,
    num int(8) not null,
    cnt_price VARCHAR(8) not null,
    state VARCHAR(10) NOT null
);

-- 7.关注的商品 (id，被关注商品地id)
create table follow_shop(
    fo_id int(10) PRIMARY KEY not null auto_increment,
    g_id  int(11) not null
);
insert into follow_shop(g_id) value (1),(3),(5),(6);
两表查询关注商品
select * from goods_list inner join follow_shop on goods_list.g_id = follow_shop.g_id;

-- 8.基础信息表
create table jcxinxi(
    j_id int(10) PRIMARY KEY not null auto_increment,
    j_name varchar(10) not null,
    j_sfz int not null,
    j_dz varchar(15) not null,
    j_zzw varchar(20) not null,
    j_yhlx varchar(10) not null,
    j_skhh varchar(10) not null,
    j_skh int not null,
    j_skhrname varchar(20) not null,
    j_sprovince varchar(10) not null,
    j_ssity varchar(15) not null,
    j_sarea varchar(15) not null
);
insert into jcxinxi(j_name,j_sfz, j_dz,j_zzw,j_yhlx,j_skhh,j_skh,j_skhrname,j_sprovince,j_ssity,j_sarea)
values('下澳门',123456,'河北','京东方','发反对法','废物',123,'覅今晚','f急哦','fds1','fs1');

-- 9.服务站表
create table vipsite(
    vip_province varchar(10) not null,
    vip_sity varchar(10) not null,
    vip_area varchar(10) not null,
    vip_titenum int not null,
    vip_titephone int not null
);

select vip_titenum,vip_titephone from vipsite;