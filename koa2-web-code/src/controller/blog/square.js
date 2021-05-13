/**
 * @description 个人主页的controller
 */

const {PAGE_SIZE} = require('../../conf/constants')
const {SuccessModle} = require('../../model/ResModel')
const {getSquareCacheList} = require('../../cache/blog')
/**
 * 获取微博列表
 * @param {String} userName //用户名 
 * @param {Number} pageIndex  //当前页
 */
 async function getSquareBlogList(pageIndex = 0){
   const result = await getSquareCacheList(pageIndex,pageSize=PAGE_SIZE)
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
    getSquareBlogList
 }