/**
 * @description //查询结果格式化
 */

const {DEFALUT_PICTURE} = require('../conf/constants')

 /**
  * 
  * @param {object} obj  用户对象 
  */
 function _formatUserPicture(obj){
     if(obj.picture == null){
         obj.picture = DEFALUT_PICTURE
     }
     return obj
 }


 /**
  * 
  * @param {Array|Object} list 用户列表 或 单个用户对象
  */
 function formatUser(list){
    if(list == null){
        return list
    }
    if(list instanceof Array){
        return list.map(_formatUserPicture)
    }

    return _formatUserPicture(list)
 }

 module.exports = {
    formatUser
 }