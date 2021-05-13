/**
 * @description //user 的controller
 * 
 */

const { getUserInfo, createUser, updateUser } = require('../services/user')
const { SuccessModle, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo, loginFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    //用户名已存在
    return new SuccessModle(userInfo)
  } else {
    //用户名不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {Number} gender 性别 (1.男 2.女 3.保密)
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    //用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }

  try {
    //注册成功
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModle()
  } catch (error) {
    //注册失败
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }

}
/**
 * 登陆
 * @param {object} ctx koa2 ctx 
 * @param {*} userName 用户名
 * @param {*} password 密码
 */
async function login(ctx, userName, password) {
  //获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModle()
}

/**
 * 修改用户信息
 * @param {Object} ctx 
 * @param {String} nickName 昵称
 * @param {String} city     城市
 * @param {String} picture  头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName }
  )
  if (result) {
    //修改成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModle()
  }
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param {String} userName 
 * @param {String} password 
 * @param {String} newPassword 
 */
async function changePassword(userName,password,newPassword){
  const result = await updateUser(
    {
      newPassword:doCrypto(newPassword)
    },
    { 
      userName,
      password:doCrypto(password)
    }
  )
  console.log(result,'结果')
  if(result) {
    return new SuccessModle()
  }
  return new ErrorModel(changePasswordFailInfo)
}
/**
 * 退出登陆
 */
async function logout(ctx){
   delete ctx.session.userInfo
   return new SuccessModle()
}
module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout
}