const path = require('path')
const Koa = require('koa')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
const app = new Koa()
const router = require('../router/index')
const KoaBody = require('koa-body')
const errorHandler = require('../app/errHandler')
const successHandler = require('../app/successHandler')

app.use(parameter(app))


// 注册中间件
// 在option配置项里的路径，不是相对于当前文件，而是相对于process.cwd()
app.use(KoaBody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname,'../upload'),
        keepExtensions:true
    }
}))

// 注册路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 让图片在浏览器中可以访问
app.use(KoaStatic(path.join(__dirname, '../upload')))

// 监听错误回调
app.on('error',errorHandler)
app.on('success',successHandler)
module.exports = app
