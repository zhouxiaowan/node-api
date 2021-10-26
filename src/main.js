const { APP_PORT } = require('./config/config.default.js')

const app = require('./app')
app.listen(APP_PORT,()=>{
  console.log(`server is running on http://127.0.0.1:${APP_PORT}`)
})