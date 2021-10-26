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
npm i nodemon
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

```
# 五 添加路由
路由：根据不同的url，调用对应的处理函数
## 1.安装koa-router
```
npm install koa-router
```