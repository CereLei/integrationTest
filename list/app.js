require('./db');//加载db.js
var createError = require('http-errors');
var express = require('express');//引入express库
var path = require('path');//path对象，规范连接和解析路径
var cookieParser = require('cookie-parser');//解析cookie
var logger = require('morgan');//http请求日志记录器

var indexRouter = require('./routes/index');//加载路由
var usersRouter = require('./routes/users');
var ejs=require('ejs');
var app = express();//写一个服务

//------------引擎模块 S---------//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');
//------------引擎模块 E----------//

///======= 使用中间件 S===========//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
///======= 使用中间件 E===========//

///=======路由信息 （接口地址）S ===========//
//存放在./routes目录下
app.use('/', indexRouter);//在app中注册routes接口
app.use('/users', usersRouter);//app中注册users接口
///=======路由信息 （接口地址）E ===========//


// catch 404 and forward to error handler
//捕获404错误，并转向错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});



///======= error handlers  错误处理程序  S========//
// error handler
// development error handler(开发者错误处理程序)
// will print stacktrace(将会打印堆栈跟踪)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
///======= error handlers  错误处理程序  E========//
module.exports = app;
