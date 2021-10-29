const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { getUserInfo } = require('../service/user.service.js')
const { userFormateError,userAlreadyExited,userNotExited,userPasswordError,userLoginError,
  tokenExpiredError,invalidToken,hadNotAdminPermission
} = require('../constant/err.type')
// 校验参数是否为空
const userValidator = async (ctx,next)=>{
  console.log(ctx.request.body)
  // 合法性
  console.log("345",ctx.request.body)
  const { user_name,password } = ctx.request.body
  if(!user_name || !password){
    ctx.status = 401
    ctx.app.emit('error',userFormateError,ctx)
    return
  }
  await next()
}
// 校验用户是否已注册
const verifyUser = async (ctx,next)=>{
  // 合理性
  const { user_name } = ctx.request.body
  if(await getUserInfo({user_name})){
    ctx.app.emit('error',userAlreadyExited,ctx)
    return
  }
  await next()
}
// 密码加密
const bcryptPassword = async (ctx,next)=>{
  try {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
  }catch (e) {
    console.log(e)
  }
  await next()
}
// 登录验证
const verifyLogin = async (ctx,next)=>{
  const { user_name,password } = ctx.request.body
  try {
    // 1.用户必须存在，否则登录不成功
    const res = await getUserInfo({user_name})
    if(!res){
      ctx.app.emit('error',userNotExited,ctx)
      return
    }
    // 2.密码正确
    const hash = res.password
    if(!bcrypt.compareSync(password, hash)){
      ctx.app.emit('error',userPasswordError,ctx)
      return
    }
  }catch (e) {
    console.error(e)
    ctx.app.emit('error',userLoginError,ctx)
  }
  // 一定要加await
  await next()
}
// 用户认证，判断是否登录
const auth = async (ctx,next)=>{
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ','')
  try{
    const user = jwt.verify(token,JWT_SECRET)
    ctx.state.user = user
  }catch (e) {
    switch (e.name) {
      case 'TokenExpiredError':
        console.error('token已过期', e)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', e)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }
  await next()
}
// 判断是否有管理员权限
const hadAdminPermission = async (ctx,next)=>{
  if(!ctx.state.user.is_admin){
    return ctx.app.emit('error',hadNotAdminPermission,ctx)
  }
  await next()
}
module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  auth,
  hadAdminPermission
}
