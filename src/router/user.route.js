const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const { register,login } = require('../controller/user.controller')
router.get('/',(ctx,next)=>{
  ctx.body = 'hello users'
})
router.post('/register',register)
router.post('/login',login)
module.exports = router