const Koa = require('koa')
const { APP_PORT } = require('./config/config.default.js')

const app = new Koa()
app.use((context,next)=>{
  context.body = 'hello api 23'
})
app.listen(APP_PORT,()=>{
  console.log(`server is running on http://127.0.0.1:${APP_PORT}`)
})