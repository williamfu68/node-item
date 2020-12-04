var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var infoRouter = require('./routes/info');

var goodsListRouter = require('./routes/goods-list');
var myOrderRouter = require('./routes/my-order');

var serveRouter = require('./routes/service');

var followRouter = require('./routes/follow');

var assetsRouter = require('./routes/assets');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// session配置
app.use(session({
    secret: 'secret', // 对 sessionId进行签名
    name: 'sign', // 指定浏览器端生成的 cookie名字
    cookie: {
        maxAge: 1000 * 60 * 60 // 客户端 cookie过期时间
    },
    saveUninitialized: false, //是否将未初始化的 session进行存储
    resave: true, //是否每次重新保存会话
    rolling: true //每隔一段时间刷新 session
}))

app.use(express.static(path.join(__dirname, 'public')));
// 路由拦截
app.all('*', function(req, res, next) {
    var regExp = /^\/users/; // 正则匹配
    if (!regExp.test(req.url)) { // 需要权限
        if (req.session.sign) { // 是否登录
            next();
        } else {
            res.redirect('/users/login'); // 重定向到登录页
        }
    } else {
        next();
    }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info', infoRouter);

app.use('/goods-list', goodsListRouter);
app.use('/myorder', myOrderRouter);

app.use('/service', serveRouter);

app.use('/myFollow',followRouter);

app.use('/assets',assetsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;