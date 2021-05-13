const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    blogData:[]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  const sessions = ctx.session
  // if(!sessions.viewNum){
  //   sessions.viewNum = 0
  // }
  // sessions.viewNum++; 
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:username', async (ctx, next) => {
  const {username} = ctx.params;
  ctx.body = {
    title: `this is ${username} profile`,
    code:0
  }
})

module.exports = router
