const { getUserInfo } = require('../service/user.service.js')
const { userFormateError,userAlreadyExited } = require('../constant/err.type')
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
const verifyUser = async (ctx,next)=>{
  // 合理性
  const { user_name } = ctx.request.body
  if(await getUserInfo({user_name})){
    ctx.app.emit('error',userAlreadyExited,ctx)
    return
  }
  await next()
}
module.exports = {
  userValidator,
  verifyUser
}