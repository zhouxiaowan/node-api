const Router = require('koa-router')
const router = new Router({prefix:'/goods'})


router.post('/upload',(ctx,next)=>{
    ctx.body = "上传成功"
})

module.exports = router
