const Koa = require('koa')
const KoaBody = require('koa-body')
const app = new Koa()
const userRouter = require('../router/user.route')
// 注册中间件
app.use(KoaBody())
app.use(userRouter.routes())

module.exports = app