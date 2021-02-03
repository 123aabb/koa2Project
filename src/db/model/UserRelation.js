/**
 * @description 关注列表模型
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

// users
const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户的id'
    }
})

module.exports = UserRelation