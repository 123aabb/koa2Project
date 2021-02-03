/**
 * @description 登陆验证的中间件
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

 /**
  * 登陆的api验证
  * @param {Objcet} ctx 
  * @param {function} next 
  */
 async function loginCheck(ctx,next){
    const session = ctx.session
    if(session && session.userInfo){
        await next()
        return
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
 }

 /**
  * 登陆的页面验证
  * @param {Objcet} ctx 
  * @param {function} next 
  */
 async function loginRedirect(ctx,next){
    const session = ctx.session
    if(session && session.userInfo){
        await next()
        return
    }
    //获取当前要跳转的路径
    const culUrl = ctx.url
    //重定向到登陆页，然后带上路径登陆之后直接跳到该路径下  encodeURIComponent 给路径编码 防止客户端乱码
    ctx.redirect('login?url=' + encodeURIComponent(culUrl))
 }

 module.exports = {
    loginCheck,
    loginRedirect
 }