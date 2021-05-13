/**
 * @description 微博首页 controller
 */
const {SuccessModle,ErrorModel} = require('../../model/ResModel')
const {createBlogFailInfo} = require('../../model/ErrorInfo')
const {createBlog,getFollowersBlogList} = require('../../services/blog')
const xss = require('xss')
const {PAGE_SIZE} = require('../../conf/constants')
 /**
  * 创建微博
  * @param {Object} param0 {userId,content,image}
  */
 async function create({userId,content,image}){
    try {
        //创建成功
        const blog = await createBlog({
            userId,
            content:xss(content),
            image
        })
        return new SuccessModle(blog)
    } catch (error) {
        //创建失败
        console.error(error.message, error.stack)
        return new ErrorModel(createBlogFailInfo)
    }
 }

 /**
  * 获取首页微博列表
  * @param {number} userId 
  * @param {number} pageIndex 
  */
 async function getHomeBlogList(userId,pageIndex = 0){
    const result = await getFollowersBlogList({
        userId,
        pageIndex,
        pageSize:PAGE_SIZE
    })
   
    const {count,blogList} = result

    return new SuccessModle({
        isEmpty:blogList.length === 0,
        blogList,
        pageIndex,
        pageSize:PAGE_SIZE,
        count
    })
 }
 module.exports = {
    create,
    getHomeBlogList
 }