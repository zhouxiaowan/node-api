const Goods = require('../model/goods.model')
class GoodsService{
    async createGoods(goods){
        const res = await Goods.create(goods)
        return res.dataValues
    }
    async goodsAlreadyExited({ id }){
        const res = await Goods.findOne({
            attributes:['id','goods_name','goods_price','goods_num'],
            where:{
                id:id
            }
        })
        return res ? res.dataValues:null
    }
    async updateGoods({id,goods_name,goods_price,goods_num,goods_image}){
        const whereOpt = {id}
        const newGood = {}
        goods_name && Object.assign(newGood,{goods_name})
        goods_price && Object.assign(newGood,{goods_price})
        goods_num && Object.assign(newGood,{goods_num})
        goods_image && Object.assign(newGood,{goods_image})
        const res = await Goods.update(newGood,{
            where:whereOpt
        })
        return res[0]>0 ? true : false
    }
    async removeGoods(id){
        const res = await Goods.destroy({
            where:{ id }
        })
        return res
    }
    async restoreGoods(id){
        const res = await Goods.restore({
            where:{ id }
        })
        return res
    }
    async selectGoods(pageNum,pageSize,ctx){
        const offset = (pageNum-1)*pageSize
        const res = Goods.findAndCountAll({
            offset:offset,
            limit:pageSize
        })
        return res
    }
}
module.exports = new GoodsService()
