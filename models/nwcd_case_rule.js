// 引入Sequelize模块
const Sequelize = require('sequelize');
// 引入数据库实例
const db = require('../db');
// 定义model
const nwcdqa_case_rule = db.define('nwcdqa_case_rule', {
  // 主键
  id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
  // content
  content: {type: Sequelize.STRING(1000), allowNull: false},
  // case score
  score: {type: Sequelize.INTEGER, allowNull: false}
}, {
  // 是否支持驼峰
  underscored: true,
  // MySQL数据库表名
  tableName: 'nwcdqa_case_rule',
});
// 导出model
module.exports = nwcdqa_case_rule;