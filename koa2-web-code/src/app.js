const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const jetKoa = require('koa-jwt')
const koaStatic = require('koa-static')

const squareApiRouter = require('./routes/api/blog/square')
const profilesApiRouter = require('./routes/api/blog/profile')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const indexRouter = require('./routes/view/blog')
const utilsApiRouter = require('./routes/api/utils')
const homeApiRouter = require('./routes/api/blog/home')
const errorViewRouter = require('./routes/view/error')
const {REDIS_CONF} = require('./conf/db')
const {SECRET} = require('./conf/constants')
const {SESSION_SECRET_KEY} = require('./conf/secretKeys')


// error handler
let onerrorConf={}
onerrorConf={
  redirect:'/error'
}
onerror(app,onerrorConf)

//配置jwt
// app.use(jetKoa({
//   secret:SECRET
// }).unless({
//   path:[/^\/users\/login/]   //自定义那些目录忽略jwt
// }))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname,'..','uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'weibo.sid', // cookie name 默认是 `koa.sid`
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000  // 单位 ms
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// routes    
app.use(squareApiRouter.routes(), squareApiRouter.allowedMethods())
app.use(indexRouter.routes(), indexRouter.allowedMethods())
app.use(profilesApiRouter.routes(), profilesApiRouter.allowedMethods())
app.use(homeApiRouter.routes(), homeApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //404 页面在最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
