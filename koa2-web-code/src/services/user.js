/**
 * @description //user  的 services
 */
const {User} = require('../db/model/index')
const {formatUser} = require('../services/_format')
const {addFollow} = require('./user-relation')
/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName,password){
   let whereOpt = {userName}
   if(password) {
       Object.assign(whereOpt,{password})
   }
   const result = await User.findOne({
       attributes:['id','userName','nickName','gender','picture','city'],
       where:whereOpt
   })

   if(result == null){
       //没查到
       return result
   }
   
   //格式化查询结果
   const formatRes = formatUser(result.dataValues)
   return formatRes
}

/**
 * 创建用户
 * @param {string} userName
 * @param {string} password
 * @param {Number} gender
 * @param {string} nickName
 */
async function createUser({userName,password,gender = 3,nickName}){
  const result = await User.create({
    userName,
    password,
    nickName:nickName ? nickName : userName,
    gender
  })
  const data = result.dataValues
  
  //自己关注自己
  addFollow(data.id,data.id)
  return data
}

/**
 * 修改用户信息
 * @param {Object} param0 要修改的字段
 * @param {Object} param1 要查询的字段
 */
async function updateUser(
  {newPassword,newNickName,newCity,newPicture},
  {userName,password}
){
   //拼接修改内容
   let updateData = {}
   if(newPassword){
    updateData.password = newPassword
   }
   if(newNickName){
    updateData.nickName = newNickName
   }
   if(newCity){
    updateData.city = newCity
   }
   if(newPicture){
    updateData.picture = newPicture
   }
   //拼接查询条件
   let whereData = {
    userName
   }
   if(password){
    whereData.password = password
   }
   //执行查询
   const result = await User.update(updateData,{
     where:whereData
   })
   //修改成功 result[0] 返回 1
   return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    updateUser
}