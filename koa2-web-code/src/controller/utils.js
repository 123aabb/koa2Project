/**
 * @description  utils controller
 */

const path = require('path')
const fse = require('fs-extra')
const { ErrorModel, SuccessModle } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')


//文件存储的路径
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
//文件尺寸最大1m 
const MIN_SIZE = 1024 * 1024 * 024

//是否需要创建目录 (只执行一次)
fse.pathExists(DIST_FOLDER_PATH).then(exist=>{
    if(!exist){
        //创建目录
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 *  上传文件的方法
 * @param {String} name 
 * @param {Number} name
 * @param {String} type
 * @param {String} filePath
 */
async function saveFile({ name, size, type, filePath }) {
    if (size > MIN_SIZE) {
        //formidable-upload-koa 中间件使用时就把文件储存了，需要删除
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    const fileName = Date.now() + '.' + name  //避免重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)
    return new SuccessModle({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}