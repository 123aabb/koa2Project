/**
 * @description 微博 service
 */

 const {Blog,User,UserRelation} = require('../db/model/index')
 const {formatUser} = require('./_format')
 /**
  * 创建微博
  * @param {Object} param0  {userId,content,image}
  */
 async function createBlog({userId,content,image}){
    const result = await Blog.create({
        userId,
        content,
        image
    })

    return result.dataValues
 }

/**
 * 查询微博列表
 * @param {Object} param0 查询调教 {userName,pageIndex,pageSize}
 */
 async function getBlogListByUser({userName,pageIndex,pageSize = 10}){
   let userWhereOpt = {}
   //没有用户名就差全部
   if(userName){
      userWhereOpt.userName = userName
   }
   const result = await Blog.findAndCountAll({
     limit:pageSize,
     offset:pageIndex * pageSize,  //跳过多少条 例如 pageIndex = 1 就跳过10条 到了第二页
     order:[
        ['id','desc'] //按id排序 倒序
      ],   
     //连表查
     include:[
        {
           model:User,
           attributes:['userName','nickName','picture'],
           where:userWhereOpt
        }
     ]
   })

   //result.count 列表总数
   //result.rows 结果(数组)
   let blogList = result.rows.map(row => row.dataValues)
   blogList = blogList.map(blogItem=>{
      blogItem.user = formatUser(blogItem.user.dataValues)
      return blogItem
   })
   return {
      count:result.count,
      blogList
   }
 }

 /**
  * 获取首页关注者的微博列表
  * @param {object} param0 
  */
 async function getFollowersBlogList({userId,pageIndex = 0,pageSize = 10}){
    const result = await Blog.findAndCountAll({
       limit:pageSize,
       offset:pageIndex * pageSize,
       order:[
          ['id','desc']
       ],
       include:[
          {
            model:User,
            attributes:['userName','nickName','picture']
          },
          {
            model:UserRelation,
            attributes:['userId','followerId'],
            where:{userId}
          }
       ]
    })
    //数据格式化
    let blogList = result.rows.map(row => row.dataValues)
    blogList = blogList.map(blogItem =>{
      blogItem.user = formatUser(blogItem.user.dataValues)
      return blogItem
    })

    return{
       count:result.count,
       blogList
    }
 }
 module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
 }