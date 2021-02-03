/**
 * @description 微博缓存层
 */

 const {set,get} = require('./_redis')
 const {getBlogListByUser} = require('../services/blog')

 const KEY_PREFIX = 'weibo:square:'

 async function getSquareCacheList(pageIndex,pageSize){
     const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
     //获取缓存数据
     const cacheResult = await get(key)
     if(cacheResult != null){
         return cacheResult
     }
      //没有缓存从数据库获取
     const result = await getBlogListByUser({pageIndex,pageSize})
     //设置缓存 1min
     set(key,result,60)

     return result
 }

 module.exports = {
    getSquareCacheList
 }