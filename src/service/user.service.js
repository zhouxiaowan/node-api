class UserService{
  async createUser(user_name,password){
    return "写入数据成功"
  }
}
module.exports = new UserService()