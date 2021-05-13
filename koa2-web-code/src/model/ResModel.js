/**
 * @description //处理返回结果的模块
 */

class BaseModel{
    constructor({errno,data,message}){
       this.errno = errno
       if(data){
           this.data = data 
       }
       if(message){
           this.message = message
       }
    }
}

class SuccessModle extends BaseModel{
    constructor(data = {}){
       super({
        errno:0,
        data 
       })
    }
}

class ErrorModel extends BaseModel{
    constructor({errno,message}){
      super({
        errno,
        message
      })
    }
}

module.exports = {
    SuccessModle,
    ErrorModel
}