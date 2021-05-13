/**
 * @description 个人主页的controller
 */
const {getBlogListByUser} = require('../../services/blog')
const {PAGE_SIZE} = require('../../conf/constants')
const {SuccessModle,ErrorModel} = require('../../model/ResModel')
const {createBlogFailInfo} = require('../../model/ErrorInfo')

/**
 * 获取微博列表
 * @param {String} userName //用户名 
 * @param {Number} pageIndex  //当前页
 */
 async function getProfileBlogList(userName,pageIndex = 0){
   const result = await getBlogListByUser({userName,pageIndex,pageSize:PAGE_SIZE})
   const blogList = result.blogList
   return new SuccessModle({
        isEmpty:blogList.length === 0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count:result.count
   })
 }

 module.exports = {
    getProfileBlogList
 }