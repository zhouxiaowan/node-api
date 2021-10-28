# 一.项目初始化
## 1.npm初始化
```
npm init -y
```
生成package.json 记录项目的依赖
## 2.git初始化
```
git init
```
生成git隐藏文件夹，git的本地仓库
新建.gitignore 
## 3.创建ReadeMe文件

# 二.搭建项目
## 1.安装Koa框架
```
npm install koa
```
## 2.编写最基础的app
```
const Koa = require('koa')

const app = new Koa()
app.use((context,next)=>{
  context.body = 'hello api'
})
app.listen(3000,()=>{
  console.log('server is running on http://127.0.0.1:3000')
})
```

# 三 自动重启服务
## 1.安装nodemon
更改内容之后，自动重启服务
```
npm i nodemon -D
```
## 2.编写package.json
```
"scripts": {
    "dev": "nodemon ./src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
# 四 环境变量
## 1.安装dotenv
```
npm i dotenv
```
## 2.使用dotenv
安装dotenv，读取根目录中的.env文件，将配置写到process.env中  
1.新建.env 文件
写入环境变量
```
APP_PORT=3500
...
...
...
```
2.新建配置文件,导出环境变量
```
const dotenv = require('dotenv')
dotenv.config()
// console.log(process.env.APP_PORT);
module.exports = process.env
```
3.main.js引入环境变量
```
const { APP_PORT } = require('./config/config.default.js')
```
# 五 添加路由
路由：根据不同的url，调用对应的处理函数
## 1.安装koa-router
```
npm install koa-router
```
步骤：
1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件
## 2.编写路由
创建`src/router`目录，编写user.route.js
```
const Router = require('koa-router')
const router = new Router({prefix:'/users'})
router.get('/',(ctx,next)=>{
  ctx.body = 'hello users'
})
module.exports = router
```
## 3.改写main.js
导入`const userRouter = require('./router/user.route')`  
注册中间件`app.use(userRouter.routes())`

# 六 目录优化
##  1.将http服务和app业务拆分
新建`app/index.js`文件
```
const Koa = require('koa')
const app = new Koa()
const userRouter = require('../router/user.route')
app.use(userRouter.routes())
module.exports = app
```
改写main.js
```
const app = require('./app')
```
## 2.将路由和控制器拆分
路由：解析URL，分发给控制器对应的方法    
控制器：处理不同的业务  
改写user.route.js
```
const Router = require('koa-router')
const router = new Router({prefix:'/users'})
const { register,login } = require('../controller/user.controller')
router.get('/',(ctx,next)=>{
  ctx.body = 'hello users'
})
router.post('/register',register)
router.post('/login',login)
module.exports = router
```
新建`controller/user.controller.js`
```
class UserController {
  async register(ctx,next){
    ctx.body = "用户注册成功"
  }
  async login(ctx,next){
    ctx.body = "登录成功"
  }
}
module.exports = new UserController()
```
# 7 解析body
## 1.安装koa-body
```
npm install koa-body
```
## 2.注册中间件
改写`app/index.js`
```
// 引入koa-body
const KoaBody = require('koa-body')
// 注册中间件
app.use(KoaBody())
```
## 3.解析请求数据
```
const { createUser } = require('../service/user.service.js')
class UserController {
  async register(ctx,next){
    //  1.获取数据
    console.log(ctx.request.body);
    // 2.操作数据库
    const { user_name,password} = ctx.request.body
    const res = await createUser(user_name,password)
    // 3.返回结果
    ctx.body = res
  }
  async login(ctx,next){
    ctx.body = "登录成功"
  }
}
module.exports = new UserController()
```
## 4.拆分service层
新建`service/user.service.js`
```
class UserService{
  async createUser(user_name,password){
    return "写入数据成功"
  }
}
module.exports = new UserService()
```
# 8 数据库操作
sequelize ORM数据库操作
ORM： 对象关系映射
1. 数据表对应（映射）一个类
2. 数据表中的数据行对应一个对象
3. 数据表字段对应对象的属性
4. 数据表的操作对应对象的方法
## 1.安装对应的插件
```
npm install mysql2 sequelize
```
## 2.连接数据库
`src/db/seq.js`
```
const { Sequelize } = require('sequelize');
const { MYSQL_HOST,MYSQL_USER,MYSQL_PWD,MYSQL_DB } = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql'
});

/**
 *  测试是否连接成功
 **/
seq
  .authenticate().then(()=>{
  console.log("数据库连接成功");
}).catch(()=>{
  console.log("数据库连接失败");
})
```
执行js脚本时，需要在根目录下执行即`node .\src\db\seq.js`;且不能`cd`到`db`目录下执行`node seq.js`，因为<font color='red'> .env文件变量只能在根目录下找到 </font>
## 3.编写配置文件
```
APP_PORT=3500
MYSQL_HOST = localhost
MYSQL_USER = root
MYSQL_PWD = 123456
MYSQL_DB = zdsc
```
# 9 创建User模型
# 1.拆分model层
sequelize主要通过Model对应数据表
创建`src/model/user.model.js` 
```
const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const User = seq.define('zd_user', {
  // id 会自动创建
  // 在这里定义模型属性
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    comment:'用户名，唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:0,
    comment:'是否管理员，0否，1是'
  }
});

// 强制同步数据库
// User.sync({ force: true });

module.exports = User
```
# 10 添加数据入库和错误处理
所有的数据库操作都在Service层完成，Service层调用Model层完成数据库操作  
改写`user.service.js`
```
const User = require('../model/user.model')
class UserService{
  async createUser(user_name,password){
    const res = await User.create({user_name:user_name,password:password})
    return res.dataValues
  }
  async getUserInfo({id,user_name,password,is_admin}){
    const whereOpt = {}
    id && Object.assign(whereOpt,{id})
    user_name && Object.assign(whereOpt,{user_name})
    password && Object.assign(whereOpt,{password})
    is_admin && Object.assign(whereOpt,{is_admin})
    const res = await User.findOne({
      attributes:['id','user_name','password','is_admin'],
      where:whereOpt
    })
    return res
  }
}
module.exports = new UserService()
```
改写`user.controller.js`
```
const { createUser,getUserInfo } = require('../service/user.service.js')
class UserController {
  async register(ctx,next){
    //  1.获取数据
    console.log(ctx.request.body);
    // 2.操作数据库
    const { user_name,password} = ctx.request.body
    // 错误处理
    // 错误处理-合法性
    if(!user_name || !password){
      ctx.status = 401
      ctx.body = {
        code:1001,
        message:"用户名或密码不能为空",
        result:{}
      }
      return
    }
    // 错误处理-合理性
    if(getUserInfo({user_name})){
      ctx.status = 409
      ctx.body = {
        code:1002,
        message:"用户已存在",
        result:{}
      }
      return
    }
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
  }
  async login(ctx,next){
    ctx.body = "登录成功"
  }
}
module.exports = new UserController()
```
# 11 拆分中间件
在路由模块->处理中间件1->处理中间件2->....->处理中间件n  
例如：`userValidator`,`verifyUser`,`bcryptPassword`等都为中间件
```
router.post('/register',userValidator,verifyUser,bcryptPassword,register)
```
## 1.拆分中间件
添加`src/middleware/user.middleware.js`
```
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
```
## 2.错误处理
* 在出错的地方使用`ctx.app.emit`来提交错误
```
ctx.app.emit('error',userAlreadyExited,ctx)
```
编写统一的错误处理文件
```
module.exports = {
  userFormateError:{
    code:1001,
    message:"用户名或密码不能为空",
    result:null
  },
  userAlreadyExited:{
    code:1002,
    message:"用户已存在",
    result:null
  },
  regiesterError:{
    code:1002,
    message:"用户注册错误",
    result:null
  }
}
```
* 在app.js中通过`app.on`来监听
```
app.on('error',errorHandler)
```
封装`errorHandler`错误处理函数为:
```
module.exports = (error,ctx)=>{
  let status = 500
  switch (error.code) {
    case '1001':
      status = 400
      break;
    case '1002':
      status = 409
      break;
    default:
      status = 500
      break;
  }
  ctx.body = error,
  ctx.status = status
}
```

# 12 密码加密
## 1.安装bcryptjs
```
npm install bcryptjs 
```
## 2.使用bcryptjs加密(编写加密中间件)
```
const bcryptPassword = async (ctx,next)=>{
  // password为用户密码
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10);
  // hash 为生成的密文
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}
```
## 3.注册为router的中间件
```
router.post('/register',bcryptPassword,register)
```
