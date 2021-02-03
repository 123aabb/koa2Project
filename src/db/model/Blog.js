/**
 * @description 微博数据模型
 * 
 */

const seq = require('../seq')
const {INTEGER, STRING, TEXT } = require('../types')

// users
const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户Id'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '文章内容'
    },
    image: {
        type: STRING,
        allowNull: false,
        comment: '图片地址'
    }
})

module.exports = Blog
