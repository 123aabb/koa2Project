/**
 * @description  utils api 路由
 */

const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')  //上传文件的中间件 
const {saveFile} = require('../../controller/utils')


router.prefix('/api/utils')
router.post('/upload',loginCheck,koaForm(),async (ctx,next)=>{
     const file = ctx.req.files['file']
     const {name,size,type,path} = file
     ctx.body = await saveFile({name,size,type,filePath:path})
})

module.exports = router