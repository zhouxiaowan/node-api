const path = require('path')
const { imgUploadError,serviceError } = require('../constant/err.type')
const { createGoods } = require('../service/goods.service')
class GoodsController{
    async upload(ctx,next){
        const { file } = ctx.request.files
        const fileTypes =['image/jpeg','image/png']
        console.log(file)
        if (file){
            if(!fileTypes.includes(file.type)){
                ctx.body = {
                    message: "不支持的图片格式"
                }
            }
            ctx.body = {
                code:0,
                message:"上传图片成功",
                result:{
                    imgUrl:path.basename(file.path)
                }
            }
        } else{
            return ctx.app.emit('error',imgUploadError,ctx)
        }
    }
    async create(ctx,next){
        try{
            const res = await createGoods(ctx.request.body)
            if(res){
                return ctx.app.emit('success',{"id" : res.id},ctx)
            }
        }catch (e) {
            return ctx.app.emit('error',serviceError,ctx)
        }
        await next()
    }
}
module.exports = new GoodsController()
