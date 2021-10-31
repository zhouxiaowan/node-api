const validator = (rules)=>{
    return async (ctx,next)=>{
        ctx.verifyParams(rules)

        await next()
    }
}

module.exports = {
    validator
}
