const {goodsFormatError} = require('../constant/err.type')
const validator = async (ctx,next)=>{
    try{
        ctx.verifyParams({
            goods_name:{type:'string',required:true},
            goods_price:{type:'number',required:true},
            goods_num:{type:'number',required:true},
            goods_image:{type:'string',required:true},
        })
    }catch (e) {
        goodsFormatError.result = e
        ctx.app.emit('error',goodsFormatError,ctx)
        console.log(e)
    }
    await next()
}
module.exports = {
    validator
}
