const {createOrUpdate,findAll,updateCarts,removeCarts,selectAll} = require('../service/carts.service')
const {formatError} = require('../constant/err.type')
class CartsController{
    async add(ctx){
        const user_id = ctx.state.user.id
        const goods_id = ctx.request.body.goods_id
        const res = await createOrUpdate(user_id,goods_id)
        ctx.app.emit('success',res,ctx)
    }
    async findCarts(ctx){
        const user_id = ctx.state.user.id
        const {page_num=1,page_size=10} = ctx.request.body
        const res = await findAll(user_id,page_num,page_size)
        ctx.app.emit('success',res,ctx)
    }
    async update(ctx){
        const {id} = ctx.request.params
        const {number,selected} = ctx.request.body
        if(!number && !selected){
            return ctx.app.emit('error',formatError,ctx)
        }
        const res = await updateCarts({id,number,selected})
        ctx.app.emit('success',res,ctx)

    }
    async remove(ctx){
        const { ids } = ctx.request.body
        const res = await removeCarts(ids)
        return ctx.app.emit('success',res,ctx)
    }
    async selectAll(ctx){
        const user_id = ctx.state.user.id
        const selected= ctx.request.body.selected
        console.log(user_id,selected)
        const res = await selectAll(user_id,selected)
        if(res){
            ctx.app.emit('success',res,ctx)
        }
    }
}
module.exports = new CartsController()
