const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service.js')
const { userFormateError,userAlreadyExited } = require('../constant/err.type')
// 校验参数是否为空
const userValidator = async (ctx,next)=>{
  // 合法性
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
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10);
  // hash 为生成的密文
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}
module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword
}