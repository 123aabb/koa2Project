/**
 * @description //模型入口文件
 */
const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User,{
    foreignKey:'userId'
})

UserRelation.belongsTo(User,{
    foreignKey:'followerId'
})

User.hasMany(UserRelation,{
    foreignKey:'userId'
})

//三表查询 通过我的id 查出我的关注人 再查出关注人微博
//数据库中已经不能再建立外键关系 但是不影响
Blog.belongsTo(UserRelation,{
    foreignKey:'userId',
    targetKey:'followerId'  //如果外键关联的不是默认id  就使用 targetKey 指定
})

module.exports={
    User,
    Blog,
    UserRelation
}