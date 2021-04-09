// 引入公共方法
const Common = require ('./common');
// 引入常量
const Constant = require ('../constant/constant');
// 引入dateformat包
const dateFormat = require ('dateformat');

const AWS = require("aws-sdk");
// 配置对象
let exportObj = {
  add
  // remove
};
// 导出对象，供其它模块调用
module.exports = exportObj;


AWS.config.update({region: 'cn-northwest-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// 添加管理员方法
function add (req, res) {
    // 定义一个返回对象
    // console.log(req.body)
    const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
    // 定义一个async任务
    let tasks = {
      // 校验参数方法
      checkParams: (cb) => {
        // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
        Common.checkParams (req.body, ['caseid'], cb);
      },
      // 添加方法，依赖校验参数方法
      add: cb => {
        var params = {
            TableName: 'SelectionCase',
            Item: {
              'caseid' : {N: req.body.caseid}
            }
          };
          ddb.putItem(params, function(err, data) {
            if (err) {
              console.log("Error", err);
              cb (Constant.DEFAULT_ERROR);
            } else {
              console.log("Success", data);
              cb (null);
            }
          });
      }
    };
    // 执行公共方法中的autoFn方法，返回数据
    Common.autoFn (tasks, res, resObj)
  }





