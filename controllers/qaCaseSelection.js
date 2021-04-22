// 引入公共方法
const Common = require ('./common');
// 引入admin表的model
const AdminModel = require ('../models/qa_selection_case');
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
      
      if(req.query.reviewer){
        whereCondition.qa_selection_casecol = req.query.reviewer;
      }
      if(req.query.case_id){
        whereCondition.case_id = req.query.case_id;
      }
      if(req.query.owner){
        whereCondition.owner = req.query.owner;
      }
      if(req.query.if_assign){
        whereCondition.if_assign = req.query.if_assign;
      }
      if(req.query.if_reviewed){
        whereCondition.if_reviewed = req.query.if_reviewed;
      }
      console.log(whereCondition,req.query.case_id)
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
              case_title: v.case_title,
              if_assign: v.if_assign,
              if_reviewed: v.if_reviewed
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
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams (req.params, ['id'], cb);
    },
    // 查询方法，依赖校验参数方法
    query: ['checkParams', (results, cb) => {
      // 使用admin的model中的方法查询
      AdminModel
        .findByPk (req.params.id)
        .then (function (result) {
          // 查询结果处理
          // 如果查询到结果
          if(result){
            // 将查询到的结果给返回对象赋值
            resObj.data = {
              id: result.id,
              case_id: result.case_id,
              owner: result.owner,
              support_level: result.support_level,
              selection_date: dateFormat (result.selection_date, 'yyyy-mm-dd HH:MM:ss'),
              qa_selection_casecol: result.qa_selection_casecol,
              case_title: result.case_title
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

// 修改管理员方法
function update (req, res) {
  // 定义一个返回对象
  console.log('jingamz0319:',req.body)
  const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {

      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams (req.body, ['case_id', 'value', 'if_assign', 'if_reviewed'], cb);
    },
    // 更新方法，依赖校验参数方法
    update: cb => {
      // 使用admin的model中的方法更新
      AdminModel
        .update ({
          qa_selection_casecol: req.body.value,
          if_assign: req.body.if_assign,
          if_reviewed: req.body.if_reviewed
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