const { createUser } = require('../service/user.service.js')
const { regiesterError } = require('../constant/err.type')
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
    
  }
  async login(ctx,next){
    ctx.body = "登录成功"
  }
}
module.exports = new UserController()