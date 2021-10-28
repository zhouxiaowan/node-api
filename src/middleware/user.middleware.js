const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service.js')
const { userFormateError,userAlreadyExited,userNotExited,userPasswordError,userLoginError } = require('../constant/err.type')
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
// 登录验证
const verifyLogin = async (ctx,next)=>{
  const { user_name,password } = ctx.request.body
  try {
    // 1.用户必须存在，否则登录不成功
    const res = await getUserInfo({user_name})
    if(!res){
      console.log(123);
      ctx.app.emit('error',userNotExited,ctx)
      return
    }
    // 2.密码正确
    const hash = res.password
    if(!bcrypt.compareSync(password, hash)){
      ctx.app.emit('error',userPasswordError,ctx)
      return
    }
    next()
  }catch (e) {
    console.error(e)
    ctx.app.emit('error',userLoginError,ctx)
  }

}
module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin
}
