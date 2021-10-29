const Koa = require('koa')
const KoaBody = require('koa-body')
const app = new Koa()
const router = require('../router/index')
const errorHandler = require('../app/errHandler')
// 注册中间件
app.use(KoaBody())
// 注册路由中间件
app.use(router.routes()).use(router.allowedMethods())
// 监听错误回调
app.on('error',errorHandler)
module.exports = app
