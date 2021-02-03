/**
 *@description 广场更多 api
 */

const router = require('koa-router')()
const {loginCheck} = require('../../../middlewares/loginChecks')
const {getBlogListStr} = require('../../../utils/blog')
const {getSquareBlogList} = require('../../../controller/blog/square')
router.prefix('/api/square')

//加载更多
router.get('/loadMore/:pageIndex',loginCheck,async (ctx,next)=>{
    let {pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getSquareBlogList(pageIndex)
     
    //渲染为html字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router