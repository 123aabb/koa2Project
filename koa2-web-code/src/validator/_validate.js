/**
 * @description //json schema 校验
 */
const Ajv = require('ajv').default

const ajv = new Ajv({
    //allErrors:true  //返回所有错误
})

function validate(schema,data = {}){
    const vaild = ajv.validate(schema,data)
    if(!vaild){
        return ajv.errors[0]
    }
}

module.exports = validate