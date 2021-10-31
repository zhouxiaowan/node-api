const { Op } = require('sequelize')
const Carts = require('../model/carts.model')
const Goods = require('../model/goods.model')
class CartsService{
    async createOrUpdate(user_id,goods_id){
        let res = await Carts.findOne({
            where:{
                [Op.and]: {
                    user_id,
                    goods_id,
                },
            }
        })
        if(res){
            await res.increment('number')
            await res.reload();
            return res
        }else {
            const res = await Carts.create({
                user_id,goods_id
            })
            return res
        }
    }
    async findAll(user_id,page_num,page_size){
        return await Carts.findAndCountAll({
            where:{
                user_id
            },
            attributes: ['id', 'number', 'selected'],
            offset: (page_num - 1) * page_size,
            limit: page_size * 1,
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['goods_name', 'goods_price', 'goods_num', 'goods_image'],
            }
        })
    }
    async updateCarts({ id,number,selected }){
        const res = await Carts.findByPk(id)
        if(!res) return ''
        number ? (res.number = number):''
        selected!==undefined ? (res.selected = selected):''
        return await res.save()
    }
    async removeCarts(ids){
        const res = await Carts.destroy({
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        })
        return res
    }
    async selectAll(user_id,selected){
        try{
            const res =  await Carts.update(
                { selected: selected },
                {
                    where: {
                        user_id,
                    },
                })
            return res
        }catch (e) {
            console.log(e)
        }

    }
}
module.exports = new CartsService()
