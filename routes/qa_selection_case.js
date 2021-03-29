// 引入Express对象
var express = require ('express');
// 引入路由对象
var router = express.Router ();
// 引入我们自定义的controller
const qaCaseSelectionControl = require('../controllers/qaCaseSelection');
// 定义管理员列表路由，GET请求
router.get ('/list', qaCaseSelectionControl.list);
// 定义单条管理员路由，GET请求
router.get ('/:id', qaCaseSelectionControl.info);
// 定义添加管理员路由，POST请求
router.post ('/', qaCaseSelectionControl.add);
// 定义修改管理员路由，PUT请求
router.put ('/', qaCaseSelectionControl.update);
// 定义删除管理员路由，DELETE请求
router.delete ('/', qaCaseSelectionControl.remove);
// 导出路由，供app.js文件调用
module.exports = router;