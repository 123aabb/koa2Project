/**
 * @description 链接redis的方法
 */

 const redis = require('redis');
 const {REDIS_CONF} = require('../conf/db');

 //创建客户端
 const {port,host} = REDIS_CONF
 const redisClient = redis.createClient(port,host);

 redisClient.on('error',err=>{
     console.log('error:',err)
 })

/**
 * 
 * @param {String} key 键
 * @param {String} val 值
 * @param {number} timeout 过期时间
 */
 function set(key,val,timeout=60*60){
   if(typeof val ==='object'){
       val = JSON.stringify(val)
   }
   //存入值
   redisClient.set(key,val)
   //设置过期时间
   redisClient.expire(key,timeout)
 }

 /**
  * 
  * @param {String} key 键
  */
 function get(key){
   return new Promise((resolve,rejest)=>{
    redisClient.get(key,(err,val)=>{
        if(err){
            rejest(err)
            return
        }
        if(val == null){
            resolve(null)
            return
        }
        try{
            resolve(JSON.parse(val))
        }
        catch(ex){
            resolve(val)
        }
    })
   })
 }

 module.exports = {
     set,
     get
 }