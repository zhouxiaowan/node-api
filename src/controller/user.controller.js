const { createUser,getUserInfo,updateById } = require('../service/user.service.js')
const { regiesterError } = require('../constant/err.type')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
class UserController {
  async register(ctx,next){
    //  1.获取数据
    console.log(ctx.request.body);
    // 2.操作数据库
    const { user_name,password} = ctx.request.body
    try {
      const res = await createUser(user_name,password)
      // 3.返回结果
      ctx.body = {
        code:0,
        message:"用户注册成功",
        result:{
          id:res.id,
          name:res.user_name
        }
      }
    } catch (error) {
      ctx.app.emit('error',regiesterError,ctx)
    }
  };
  async login(ctx,next){
    const { user_name } = ctx.request.body
    try{
      // const { password,...res } = ctx.request.body
      const { password,...res} = await getUserInfo({ user_name })
      ctx.body = {
        code:0,
        message:"用户登录成功",
        result:{
          token:jwt.sign(res,JWT_SECRET,{expiresIn: '1d'})
        }
      }
    }catch (e) {
      console.log(e)
    }
  }
  async changePassword(ctx,next){
    const id = ctx.state.user.id
    const password = ctx.request.body.password
    const res = await updateById({id,password})
    ctx.body = {
      code:0,
      message:"修改密码成功",
      result:res
    }
  }
}
module.exports = new UserController()
