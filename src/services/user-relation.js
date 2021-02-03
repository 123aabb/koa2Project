/**
 * @description 用户关系 services
 */

const {User,UserRelation} = require('../db/model/index')
const {formatUser} = require('./_format')
const Sequelize = require('sequelize')
/**
 * 可以通过 followerId 能找到 userId 与用户表有关联
 * 可以再通过 userId 和 user表的id 关联 查询到用户信息(找粉丝)
 * @param {Number} followerId 被关注人id
 */
async function getUserByFollower(followerId){
     const result = await User.findAndCountAll({
        attributes:['id','userName','nickName','picture'],
        order:[
            ['id','desc']
        ],
        include:[
            {
                model:UserRelation,
                where:{
                    followerId,
                    userId:{
                        [Sequelize.Op.ne]:followerId  //userId 不等于followerId 不查自己
                    } 
                }
            }
        ]
     })

     //result.count 总数  result.rows 列表数据
     let userList = result.rows.map(row=>row.dataValues)
     userList = formatUser(userList)

     return {
        userList,
        count:result.count
     }
}

/**
 * 获取关注人列表 通过userId 能找到 followerId 与用户表有关联
 * 可以再通过 followerId 和 user表的id 关联 查询到用户信息(找关注人)
 * @param {Number} userId 
 */
async function getFollowByUser(userId){
   const result = await UserRelation.findAndCountAll({
       order:[
           ['id','desc']
,       ],
       include:{
           model:User,
           attributes:['id','userName','nickName','picture']
       },
       where:{
         userId,
         followerId:{
            [Sequelize.Op.ne]:userId  //userId 不等于followerId 不查自己
        }
       }
   })

   //result.count 总数  result.rows 列表数据
   let userList = result.rows.map(row=>row.dataValues)
   userList = userList.map(item=>{
       let user = item.user
       user = user.dataValues
       user = formatUser(user)
       return user
   })

   return {
      userList,
      count:result.count
   }
}
/**
 * 添加关注关系
 * @param {Number} userId     用户id
 * @param {Number} followerId 被关注的用户id
 */
async function addFollow(userId,followerId){
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result
}

/**
 * 删除添加关系
 * @param {Number} userId     用户id
 * @param {Number} followerId 被关注的用户id
 */
async function deleteFollow(userId,followerId){
    const result = await UserRelation.destroy({
        where:{
            userId,
            followerId
        }
    })
    return result
}
 module.exports = {
    getUserByFollower,
    getFollowByUser,
    addFollow,
    deleteFollow
 }