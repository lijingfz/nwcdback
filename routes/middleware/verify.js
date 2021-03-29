// 引入Token处理的controller
const Token = require ('../../controllers/token');
// 引入常量
const Constant = require ('../../constant/constant');
// 配置对象
const exportObj = {
  verifyToken,
  //jingamz 需要新的verify方法 -- 增加对role的判断
  verifyTokenRole2
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 验证Token中间件
function verifyToken (req, res, next) {
  // 如果请求路径是/login，即登录页，则跳过，继续下一步
  if ( req.path === '/login') return next();
  // 从请求头中获取参数token
  let token = req.headers.token;
  // 调用TokenController里的Token解密方法，对参数token，进行解密
  let tokenVerifyObj = Token.decrypt(token);
  if(tokenVerifyObj.token){
    // 如果Token验证通过，则继续下一步
    next()
  }else{
    // 如果Token验证不通过，则返回错误JSON
    res.json(Constant.TOKEN_ERROR)
  }
}

function verifyTokenRole2 (req, res, next) {
  // 如果请求路径是/login，即登录页，则跳过，继续下一步
  if ( req.path === '/login') return next();
  // 从请求头中获取参数token
  let token = req.headers.token;
  // 调用TokenController里的Token解密方法，对参数token，进行解密
  let tokenVerifyObj = Token.decrypt(token);
  if((tokenVerifyObj.token) && (tokenVerifyObj.data.role===2)){
    // 如果Token验证通过，则继续下一步
    console.log(tokenVerifyObj.data)
    next()
  }else{
    // 如果Token验证不通过，则返回错误JSON
    res.json(Constant.TOKEN_ERROR)
  }
}