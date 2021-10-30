const Router = require('koa-router')
const router = new Router({prefix:'/goods'})
const { auth,hadAdminPermission } = require('../middleware/user.middleware')
const { verifyGoods } = require('../middleware/goods.middleware')
const { upload,create,updated,remove,restore,findAndCountAll } = require('../controller/goods.controller')
const { validator } = require('../middleware/goods.middleware')
// 上传图片
router.post('/upload',auth,hadAdminPermission,upload)

// 发布商品
router.post('/create',validator,auth,hadAdminPermission,create)

// 修改商品
router.post('/update',validator,auth,hadAdminPermission,verifyGoods,updated)

// 删除商品
router.delete('/delete/:id',auth,hadAdminPermission,remove)

// 下架商品
router.post('/off/:id',auth,hadAdminPermission,remove)

// 上架商品
router.post('/on/:id',auth,hadAdminPermission,restore)

// 查询商品列表
router.post('/',findAndCountAll)


module.exports = router
