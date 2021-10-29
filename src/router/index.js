const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

fs.readdirSync(__dirname).forEach(file=>{
    if(file !== 'index.js'){
        let r = require('./'+file)
        // router注册中间件
        router.use(r.routes())
    }
})

module.exports = router
