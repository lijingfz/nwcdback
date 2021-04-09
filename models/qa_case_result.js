// 引入Sequelize模块
const Sequelize = require('sequelize');
// 引入数据库实例
const db = require('../db');
// 定义model
const qaCaseResult = db.define('qa_case_result', {
  // 主键
  id: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true},
  case_id: {type: Sequelize.STRING(20), primaryKey: true, allowNull: false},
  measure1: {type: Sequelize.INTEGER, allowNull: false},
  measure2: {type: Sequelize.INTEGER, allowNull: false},
  measure3: {type: Sequelize.INTEGER, allowNull: false},
  measure4: {type: Sequelize.INTEGER, allowNull: false},
  measure5: {type: Sequelize.INTEGER, allowNull: false},
  measure6: {type: Sequelize.INTEGER, allowNull: false},
  measure7: {type: Sequelize.INTEGER, allowNull: false},
  measure8: {type: Sequelize.INTEGER, allowNull: false},
  measure9: {type: Sequelize.INTEGER, allowNull: false},
  measure10: {type: Sequelize.INTEGER, allowNull: false},
  measure11: {type: Sequelize.INTEGER, allowNull: false},
  measure12: {type: Sequelize.INTEGER, allowNull: false},
  measure13: {type: Sequelize.INTEGER, allowNull: false},
  measure14: {type: Sequelize.INTEGER, allowNull: false},
  measure15: {type: Sequelize.INTEGER, allowNull: false},
  measure16: {type: Sequelize.INTEGER, allowNull: false},
  measure17: {type: Sequelize.INTEGER, allowNull: false},
  measure18: {type: Sequelize.INTEGER, allowNull: false},
  measure19: {type: Sequelize.INTEGER, allowNull: false},
  measure20: {type: Sequelize.INTEGER, allowNull: false},
  review_content: {type: Sequelize.INTEGER, allowNull: false},
  review_flag: {type: Sequelize.STRING(10)},
  review_score: {type: Sequelize.INTEGER, allowNull:false},
  confirm_content: {type: Sequelize.INTEGER, allowNull: false},
}, {
  // 是否支持驼峰
  underscored: true,
  // MySQL数据库表名
  tableName: 'qa_case_result',
});
// 导出model
module.exports = qaCaseResult;