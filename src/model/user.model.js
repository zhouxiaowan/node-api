const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = seq.define('zd_user', {
  // id 会自动创建
  // 在这里定义模型属性
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    comment:'用户名，唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:0,
    comment:'是否管理员，0否，1是'
  }
});

// 强制同步数据库
// User.sync({ force: true });

module.exports = User
