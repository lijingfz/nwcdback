var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var multipart = require('connect-multiparty');


var indexRouter = require('./routes/index');

var wishRouter = require('./routes/wish');
// 引入管理员管理模块路由文件
var adminRouter = require('./routes/admin');
// 引入 case 评定标准
var caseRuleRouter = require('./routes/nwcd_case_rule');
// 引入用户信息模块
var userRouter = require('./routes/user');
var caseSelectionRouter = require('./routes/qa_selection_case');
var caseResultRouter = require('./routes/qa_case_result');
var manuallyAddCaseRouter = require('./routes/manuallyAddCase');
// 引入Token验证中间件
const verifyMiddleware = require('./routes/middleware/verify');


var app = express();


app.set('views', path.join(__dirname, 'views'));

//用art-template引擎替换默认的jade引擎
//app.set(‘view engine’, ‘jade’);
app.engine('html', require('express-art-template'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multipart());

app.use('/api/login', indexRouter);

app.use('/api',verifyMiddleware.verifyToken, indexRouter);

app.use('/api/case', verifyMiddleware.verifyToken, caseSelectionRouter);

app.use('/api/caseresult', verifyMiddleware.verifyToken, caseResultRouter);

// 配置许愿管理模块路由path，添加Token验证中间件
// jingamz 使用不同的verify 方法， 增加对 Role的判断 verifyTokenRole2
app.use('/wish', verifyMiddleware.verifyToken, wishRouter);
// 配置管理员管理模块路由path，添加Token验证中间件
app.use('/admin', verifyMiddleware.verifyToken, adminRouter);
// jingamz 案例标准
app.use('/caserule', verifyMiddleware.verifyToken, caseRuleRouter);
// jingamz userinfo
app.use('/api/user', verifyMiddleware.verifyToken, userRouter);
// jingamz manually add case
app.use('/api/manuallyaddcase', verifyMiddleware.verifyToken, manuallyAddCaseRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // console.log(req)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log (err.message);

  // render the error page
  res.status(err.status || 500);
  res.json({
    code: err.status || 500
  });
});


module.exports = app;
