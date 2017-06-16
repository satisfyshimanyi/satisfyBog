var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var aboutMe=require('./routes/aboutMe');
var life=require('./routes/life');
var learn=require('./routes/learn');
var photo=require('./routes/photo');
var leaveWord=require('./routes/leaveWord');
var doing=require('./routes/doing');
var ueditor      = require('ueditor');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/libs/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {

    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/images';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }

    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }

    // 客户端发起其它请求
    else {

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/libs/ueditor/nodejs/config.json')
    }

}));



app.use('/', index);
app.use('/users', users);
app.use('/aboutMe',aboutMe);
app.use('/life',life);
app.use('/learn',learn);
app.use('/photo',photo);
app.use('/leaveWord',leaveWord);
app.use('/doing',doing);


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/satisfyBog",function(err){
  if(!err){
    console.log("数据可连接成功");
    app.listen(3008);
    console.log("网址为  http://127.0.0.1:3008");

  }else{
    console.log("数据库连接失败");
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
