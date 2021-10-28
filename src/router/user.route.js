const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const { register,login } = require('../controller/user.controller')
const { userValidator,verifyUser,bcryptPassword } = require('../middleware/user.middleware')
router.get('/',(ctx,next)=>{
  ctx.body = 'hello users'
})
// 先测试参数是否为空，然后再校验用户是否存在，都通过后再走注册接口
router.post('/register',userValidator,verifyUser,bcryptPassword,register)
router.post('/login',login)
module.exports = router