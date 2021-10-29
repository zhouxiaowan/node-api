const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const Goods = seq.define('zxw_goods',{
    goods_name:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'商品名称'
    },
    goods_price:{
        type:DataTypes.INTEGER,
        allowNull: false,
        comment: '商品价格'
    },
    goods_num:{
        type:DataTypes.INTEGER,
        allowNull: false,
        comment: '商品数量'
    },
    goods_image:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:"商品图片"
    }
},{
    paranoid: true
})
// Goods.sync({force:true})

module.exports = Goods
