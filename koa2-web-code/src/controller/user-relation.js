/**
 * @description 用户关系 controller
 */

const {getUserByFollower,getFollowByUser} = require('../services/user-relation')
const { SuccessModle, ErrorModel } = require('../model/ResModel')
const {addFollow} = require('../services/user-relation')
const {addFollowerFailInfo,deleteFollowerFailInfo} = require('../model/ErrorInfo')
const {deleteFollow} = require('../services/user-relation')
/**
 * 根据用户id 获取粉丝列表
 * @param {number} userId 用户id
 */
async function getFans(userId){
   const {userList,count} = await getUserByFollower(userId)
   return new SuccessModle({
      userList,
      count
   })
}

/**
 * 获取关注人列表
 * @param {Number} userId 
 */
async function getFollowers(userId){
   const {userList,count} = await getFollowByUser(userId)
   return new SuccessModle({
      userList,
      count
   })
}
/**
 * 关注
 * @param {Number} myUserId 当前登陆用户id
 * @param {Number} curUserId 要被关注的用户Id
 */
async function follow(myUserId,curUserId){
   try {
      await addFollow(myUserId,curUserId)
      return new SuccessModle()
   } catch (error) {
      console.log(error)
      return new ErrorModel(addFollowerFailInfo)
   }
}

/**
 * 取消关注
 * @param {Number} myUserId 当前登陆用户id
 * @param {Number} curUserId 要被关注的用户Id
 */
async function unFollow(myUserId,curUserId){
   const result = await deleteFollow(myUserId,curUserId)
   if(!result){
      return new ErrorModel(deleteFollowerFailInfo)
   }
   return new SuccessModle()
}
module.exports = {
    getFans,
    getFollowers,
    follow,
    unFollow
}