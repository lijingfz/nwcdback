// 引入公共方法
const Common = require ('./common');
// 引入admin表的model
const AdminModel = require ('../models/qa_case_result');
// 引入常量
const Constant = require ('../constant/constant');
// 引入dateformat包
const dateFormat = require ('dateformat');
// 配置对象
let exportObj = {
  list,
  info,
  add,
  update,
  remove
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 获取管理员列表方法
function list (req, res) {
  // 定义一个返回对象
  const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams (req.query, ['page', 'rows'], cb);
    },
    // 查询方法，依赖校验参数方法
    query: ['checkParams', (results, cb) => {
      // 根据前端提交参数计算SQL语句中需要的offset，即从多少条开始查询
      let offset = req.query.rows * (req.query.page - 1) || 0;
      // 根据前端提交参数计算SQL语句中需要的limit，即查询多少条
      let limit = parseInt (req.query.rows) || 20;
      // 设定一个查询条件对象
      let whereCondition = {};
      // 如果查询用户名存在，查询对象增加用户名
      if(req.query.username){
        whereCondition.username = req.query.username;
      }
      // 通过offset和limit使用admin的model去数据库中查询，并按照创建时间排序
      AdminModel
        .findAndCountAll ({
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [['created_at', 'DESC']],
        })
        .then (function (result) {
          // 查询结果处理
          // 定义一个空数组list，用来存放最终结果
          let list = [];
          // 遍历SQL查询出来的结果，处理后装入list
          result.rows.forEach ((v, i) => {
            let obj = {
              id: v.id,
              case_id: v.case_id,
              owner: v.owner,
              support_level: v.support_level,
              selection_date: dateFormat (v.selection_date, 'yyyy-mm-dd HH:MM:ss'),
              qa_selection_casecol: v.qa_selection_casecol,
              case_title: v.case_title
            };
            list.push (obj);
          });
          // 给返回结果赋值，包括列表和总条数
          resObj.data = {
            list,
            count: result.count
          };
          // 继续后续操作
          cb (null);
        })
        .catch (function (err) {
          // 错误处理
          // 打印错误日志
          console.log (err);
          // 传递错误信息到async最终方法
          cb (Constant.DEFAULT_ERROR);
        });

    }]
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn (tasks, res, resObj)

}

// 获取单条管理员方法
function info (req, res) {
  // 定义一个返回对象
  const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
  console.log(req.query)
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams (req.query, ['id'], cb);
    },
    // 查询方法，依赖校验参数方法
    query: ['checkParams', (results, cb) => {
      // 使用admin的model中的方法查询
      AdminModel
        .findByPk (req.query.id)
        .then (function (result) {
          // 查询结果处理
          // 如果查询到结果
          if(result){
            // 将查询到的结果给返回对象赋值
            resObj.data = {
              id: result.id,
              case_id: result.case_id,
              measure1: result.measure1,
              measure2: result.measure2,
              measure3: result.measure3,
              measure4: result.measure4,
              measure5: result.measure5,
              measure6: result.measure6,
              measure7: result.measure7,
              measure8: result.measure8,
              measure9: result.measure9,
              measure10: result.measure10,
              measure11: result.measure11,
              measure12: result.measure12,
              measure13: result.measure13,
              measure14: result.measure14,
              measure15: result.measure15,
              measure16: result.measure16,
              measure17: result.measure17,
              measure18: result.measure18,
              review_flag: result.review_flag,
              review_content: result.review_content,
              review_score: result.review_score
            };
            // 继续后续操作
            cb(null);
          }else{
            // 查询失败，传递错误信息到async最终方法
            cb (Constant.ADMIN_NOT_EXSIT);
          }
        })
        .catch (function (err) {
          // 错误处理
          // 打印错误日志
          console.log (err);
          // 传递错误信息到async最终方法
          cb (Constant.DEFAULT_ERROR);
        });

    }]
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn (tasks, res, resObj)

}

// 添加管理员方法
function add (req, res) {
  // 定义一个返回对象
  const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams (req.body, ['username', 'password', 'name', 'role'], cb);
    },
    // 添加方法，依赖校验参数方法
    add: cb => {
      // 使用admin的model中的方法插入到数据库
      AdminModel
        .create ({
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          role: req.body.role
        })
        .then (function (result) {
          // 插入结果处理
          // 继续后续操作
          cb (null);
        })
        .catch (function (err) {
          // 错误处理
          // 打印错误日志
          console.log (err);
          // 传递错误信息到async最终方法
          cb (Constant.DEFAULT_ERROR);
        });
    }
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn (tasks, res, resObj)
}

// NWCDQA 更新 ！！ 
function update (req, res) {
  // 定义一个返回对象
  console.log('jingamz0323:',req.body)
  const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {

      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      let parambody = ['case_id', 'review_score', 'review_flag','remark']
      Common.checkParams (req.body, parambody, cb);
    },
    // 更新方法，依赖校验参数方法
    update: cb => {
      // 使用admin的model中的方法更新
      AdminModel
        .update ({
          measure1: req.body.measure1,
          measure2: req.body.measure2,
          measure3: req.body.measure3,
          measure4: req.body.measure4,
          measure5: req.body.measure5,
          measure6: req.body.measure6,
          measure7: req.body.measure7,
          measure8: req.body.measure8,
          measure9: req.body.measure9,
          measure10: req.body.measure10,
          measure11: req.body.measure11,
          measure12: req.body.measure12,
          measure13: req.body.measure13,
          measure14: req.body.measure14,
          measure15: req.body.measure15,
          measure16: req.body.measure16,
          measure17: req.body.measure17,
          measure18: req.body.measure18,
          review_flag: req.body.review_flag,
          review_content: req.body.remark,
          review_score: req.body.review_score
          // qa_selection_casecol: req.body.value
        }, {
          where: {
            case_id: req.body.case_id
          }
        })
        .then (function (result) {
          // 更新结果处理
          if(result[0]){
            // 如果更新成功
            // 继续后续操作
            cb (null);
          }else{
            // 更新失败，传递错误信息到async最终方法
            cb (Constant.ADMIN_NOT_EXSIT);
          }
        })
        .catch (function (err) {
          // 错误处理
          // 打印错误日志
          console.log (err);
          // 传递错误信息到async最终方法
          cb (Constant.DEFAULT_ERROR);
        });
    }
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn (tasks, res, resObj)
}

// 删除管理员方法
function remove (req, res) {
  // 定义一个返回对象
  const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams (req.body, ['id'], cb);
    },
    remove: cb => {
      // 使用admin的model中的方法更新
      AdminModel
        .destroy ({
          where: {
            id: req.body.id
          }
        })
        .then (function (result) {
          // 删除结果处理
          if(result){
            // 如果删除成功
            // 继续后续操作
            cb (null);
          }else{
            // 删除失败，传递错误信息到async最终方法
            cb (Constant.ADMIN_NOT_EXSIT);
          }
        })
        .catch (function (err) {
          // 错误处理
          // 打印错误日志
          console.log (err);
          // 传递错误信息到async最终方法
          cb (Constant.DEFAULT_ERROR);
        });
    }
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn (tasks, res, resObj)
}