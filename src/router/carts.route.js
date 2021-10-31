const Router = require('koa-router')
const router = new Router({prefix:'/carts'})
const { auth } = require('../middleware/user.middleware')
const { validator }= require('../middleware/carts.middleware')
const { add,findCarts,update,remove,selectAll } = require('../controller/carts.controller')

// 添加购物车
router.post('/',auth,validator({goods_id:'number'}),add)

// 获取购物车列表
router.get('/',auth,findCarts)

// 更新购物车
router.patch('/:id',auth,validator({
    number: {
        type:'number',
        required: false
    },
    selected:{
        type:'boolean',
        required:false
    }
}),update)

// 删除购物车
router.delete('/',auth,validator({ids:'array'}),remove)

// 购物车全选和取消全选
router.post('/selectAll',auth,
    validator({selected:{
            type:'boolean',
            required:true
    }}),
    selectAll)

module.exports = router
