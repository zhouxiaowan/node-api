const { Sequelize } = require('sequelize');
const { MYSQL_HOST,MYSQL_USER,MYSQL_PWD,MYSQL_DB } = require('../config/config.default')
// 方法 1: 传递一个连接 URI
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql'
});

/**
 *  测试是否连接成功
 **/
// seq
//   .authenticate()
//   .then(()=>{
//   console.log("数据库连接成功");
// })
//   .catch(()=>{
//   console.log("数据库连接失败");
// })

module.exports = seq
