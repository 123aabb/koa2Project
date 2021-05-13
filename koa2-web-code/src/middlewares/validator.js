/**
 * @description //数据格式校验中间件
 */
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生成 验证 json schema 的中间价
 * @param {function} validateFn //验证函数
 */
function genValidator(validateFn) {
   async function validator(ctx, next) {
      const data = ctx.request.body
      const error = validateFn(data)
      if (error) {
         ctx.body = new ErrorModel(jsonSchemaFileInfo)
         return
      }
      await next()
   }
   return validator
}

module.exports = {
   genValidator
}