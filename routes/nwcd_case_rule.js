// 引入Express对象
var express = require ('express');
// 引入路由对象
var router = express.Router ();
// 引入我们自定义的controller
const caseRuleController = require('../controllers/caseRule');
// 定义许愿列表路由，GET请求
router.get ('/', caseRuleController.list);
// 定义单条许愿路由，GET请求
router.get ('/:id', caseRuleController.info);
// 定义添加许愿路由，POST请求
router.post ('/', caseRuleController.add);
// 定义修改许愿路由，PUT请求
router.put ('/', caseRuleController.update);
// 定义删除许愿路由，DELETE请求
router.delete ('/', caseRuleController.remove);
// 导出路由，供app.js文件调用
module.exports = router;
