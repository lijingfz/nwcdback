// 引入Sequelize模块
const Sequelize = require('sequelize');
// 引入数据库实例
const db = require('../db');
// 定义model
const qaSelectionCase = db.define('qa_selection_case', {
  // 主键
  id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
  case_id: {type: Sequelize.STRING(20), allowNull: false},
  owner: {type: Sequelize.STRING(36), allowNull: false},
  support_level: {type: Sequelize.STRING(10)},
  selection_date: {type: Sequelize.DATE},
  qa_selection_casecol: {type: Sequelize.STRING(500)},
  case_title: {type: Sequelize.STRING(500)},
  if_assign: {type: Sequelize.STRING(45)}
}, {
  // 是否支持驼峰
  underscored: true,
  // MySQL数据库表名
  tableName: 'qa_selection_case',
});
// 导出model
module.exports = qaSelectionCase;