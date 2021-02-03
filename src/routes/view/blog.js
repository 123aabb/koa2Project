/**
 * @description 微博 view 路由
 */

const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginChecks')
const {getProfileBlogList} = require('../../controller/blog/profile')
const {getSquareBlogList} = require('../../controller/blog/square')
const {isExist} = require('../../controller/user')
const {getFans,getFollowers} = require('../../controller/user-relation')

//首页
router.get('/',loginRedirect, async (ctx, next) => {
    //当前登录用户
    const myUserInfo = ctx.session.userInfo
    //获取粉丝列表
    const fanResult = await getFans(myUserInfo.id)
    const {count,userList:list} = fanResult.data
    //获取关注人列表
    const followerResult = await getFollowers(myUserInfo.id)
    const {count:followCount,userList:followList} = followerResult.data
    await ctx.render('index',{
        userData:{
            userInfo:myUserInfo,
            fansData:{
                count,
                list
            },
            followersData:{
                count:followCount,
                list:followList
            }
        }
    })
})

//个人主页
router.get('/profile',loginRedirect, async (ctx, next) => {
    const {userName} = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName',loginRedirect, async (ctx, next) => {
    //当前登录用户
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo;
    const {userName:curUserName} = ctx.params
    //判断是否是当前用户
    const isMe = myUserName === curUserName
    if(isMe) {
        curUserInfo = myUserInfo
    }else{
        const existResult = await isExist(curUserName)
        if(existResult.errno !=0){
            //用户名不存在
            return
        }
        //用户名存在
        curUserInfo = existResult.data
    }
     
    //获取微博第一页数据
    const result = await getProfileBlogList(curUserName,0)
    //获取粉丝列表
    const fanResult = await getFans(curUserInfo.id)
    const {count,userList:list} = fanResult.data
    //获取关注人列表
    const followerResult = await getFollowers(curUserInfo.id)
    const {count:followCount,userList:followList} = followerResult.data
    //我是否关注了此人？
    const amIFollowed = list.some(item=>{
       return item.userName == myUserName
    })

    await ctx.render('profile',{
        blogData:result.data,
        userData:{
            userInfo:curUserInfo,
            isMe,
            fansData:{
                count,
                list
            },
            followersData:{
                count:followCount,
                list:followList
            },
            amIFollowed
        }
    })
})

//广场页
router.get('/square',loginRedirect, async (ctx, next) => {
    //获取微博第一页数据
    const result = await getSquareBlogList()
    await ctx.render('square',{
        blogData:result.data
    })
})
module.exports = router