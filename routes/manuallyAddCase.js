var express = require ('express');
var router = express.Router ();
// 引入我们自定义的controller
const ManuallyAddCase = require('../controllers/ManuallyAddCase');
router.post ('/', ManuallyAddCase.add);
module.exports = router;