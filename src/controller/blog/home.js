/**
 * @description 微博首页 controller
 */
const {SuccessModle,ErrorModel} = require('../../model/ResModel')
const {createBlogFailInfo} = require('../../model/ErrorInfo')
const {createBlog} = require('../../services/blog')
const xss = require('xss')
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

 module.exports = {
    create
 }