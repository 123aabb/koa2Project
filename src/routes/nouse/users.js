const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)  //util.promisify变成promiser 的方法
const {SECRET} = require('../conf/constants')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

//模拟登陆
router.post('/login', async (ctx, next)=>{
  const {username,password} = ctx.request.body;
  console.log(username,password)
  let userInfo 
  if(username === 'zhangsan' , password === 'abc'){
    userInfo={
      username:'zhangsan',
      nickName:'zhangsan',
      age:12
    }
  }

  let token
  if(userInfo){
    token=jwt.sign(userInfo,SECRET,{expiresIn:'1h'})
  }
  
  if(userInfo == null){
    ctx.body={
      code:-1,
      msg:'登陆失败'
    }
    return
  }

  
  ctx.body={
    code:0,
    msg:'登陆成功',
    data:token
  }
})


//获取用户信息
router.get('/getUserInfo', async (ctx, next)=> {
  const token = ctx.header.authorization
try {
 const plyload = await verify(token.split(' ')[1],SECRET)
 ctx.body = {
  code:0,
  userInfo:plyload
}
} catch (error) {
  ctx.body = {
    code:-1,
    msg:'verify 获取失败'
  }
}
 
})
module.exports = router
