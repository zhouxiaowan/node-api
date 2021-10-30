const {goodsFormatError,serviceError,GoodsNotExited} = require('../constant/err.type')
const { goodsAlreadyExited } = require('../service/goods.service')
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
const verifyGoods = async (ctx,next)=>{
    try{
        const { id } = ctx.request.body
        const res = await goodsAlreadyExited({id})
        if(!res){
            return ctx.app.emit('error',GoodsNotExited,ctx)
        }
    }catch (e) {
        return ctx.app.emit('error',serviceError,ctx)
    }
    await next()
}
module.exports = {
    validator,
    verifyGoods
}
