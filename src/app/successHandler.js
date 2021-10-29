module.exports = (success,ctx)=>{
  let status = 200
  ctx.body = {
    code:0,
    message:"成功",
    result:success
  }
  ctx.status = status
}
