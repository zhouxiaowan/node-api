const Router = require('koa-router')
const router = new Router({prefix:'/goods'})
const { auth,hadAdminPermission } = require('../middleware/user.middleware')
const { upload,create } = require('../controller/goods.controller')
const { validator } = require('../middleware/goods.middleware')
// 上传图片
router.post('/upload',auth,hadAdminPermission,upload)
// 发布商品
router.post('/create',validator,auth,hadAdminPermission,create)
module.exports = router
