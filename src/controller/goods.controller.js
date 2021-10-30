const path = require('path')
const { imgUploadError,serviceError,GoodsNotExited } = require('../constant/err.type')
const { createGoods,updateGoods,removeGoods,restoreGoods,selectGoods } = require('../service/goods.service')
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
    async updated(ctx,next){
        try{
            const res = await updateGoods(ctx.request.body)
            if(res){
                return ctx.app.emit('success',{"id" : res.id},ctx)
            }
        }catch (e) {
            return ctx.app.emit('error',serviceError,ctx)
        }

    }
    async remove(ctx){
        const res = await removeGoods(ctx.params.id)
        if(res){
            ctx.app.emit('success',res,ctx)
        }else{
            ctx.app.emit('error',GoodsNotExited,ctx)
        }
    }
    async restore(ctx){
        const res = await restoreGoods(ctx.params.id)
        if(res){
            ctx.app.emit('success',res,ctx)
        }else{
            ctx.app.emit('error',GoodsNotExited,ctx)
        }
    }
    async findAndCountAll(ctx){
        const { pageNum=1,pageSize=10 } = ctx.request.body
        const res = await selectGoods(pageNum,pageSize,ctx.request.body)
        if(res){
            ctx.app.emit('success',res,ctx)
        }else{
            ctx.app.emit('error',GoodsNotExited,ctx)
        }
    }
}
module.exports = new GoodsController()
