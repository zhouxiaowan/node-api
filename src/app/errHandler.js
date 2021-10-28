module.exports = (error,ctx)=>{
  let status = 500
  switch (error.code) {
    case '1001':
      status = 400
      break;
    case '1002':
      status = 409
      break;
    default:
      status = 500
      break;
  }
  ctx.body = error,
  ctx.status = status
}